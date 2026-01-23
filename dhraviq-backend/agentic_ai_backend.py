from typing import List, Optional, Dict
from datetime import datetime
import os, asyncio, traceback, time
from dotenv import load_dotenv
import firebase_admin
from firebase_admin import firestore, credentials
import openai as genai
import requests
from pydantic import BaseModel

load_dotenv()

# Firebase Setup
firebase_path = "firebase_credentials.json"
if os.path.exists(firebase_path):
    cred = credentials.Certificate(firebase_path)
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    db = firestore.client()
else:
    print(f"❌ Firebase credentials missing: {firebase_path}")
    db = None

# OpenAI API
client = genai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Pushover
PUSHOVER_TOKEN = os.getenv("PUSHOVER_TOKEN")
PUSHOVER_USER = os.getenv("PUSHOVER_USER")

# Agent Roles
AGENT_SPECIALIZATIONS = {
    "GoalClarifier": {
        "name": "Goal Clarifier",
        "focus": "Helps users define SMART goals.",
        "technical": "Breaks down ambitions using goal frameworks."
    },
    "SkillMap": {
        "name": "Skill Map",
        "focus": "Identifies skills needed for success.",
        "technical": "Maps learning paths, courses, and gaps."
    },
    "TimelineWizard": {
        "name": "Timeline Wizard",
        "focus": "Creates realistic timelines to reach goals.",
        "technical": "Uses sprints, time-blocking, and planning."
    },
    "ProgressCoach": {
        "name": "Progress Coach",
        "focus": "Monitors execution and keeps momentum.",
        "technical": "Applies habit tracking and feedback."
    },
    "MindsetMentor": {
        "name": "Mindset Mentor",
        "focus": "Builds mental resilience.",
        "technical": "Uses CBT and habit reinforcement tools."
    }
}

class AgentRequest(BaseModel):
    userId: str
    question: str
    agents: List[str]
    email: Optional[str] = None
    send_email: Optional[bool] = False

def send_pushover_notification(user_id, question, email=None):
    try:
        msg = f"New question from {user_id}:\n\n{question}"
        if email:
            msg += f"\n\nEmail: {email}"
        requests.post(
            "https://api.pushover.net/1/messages.json",
            data={
                "token": PUSHOVER_TOKEN,
                "user": PUSHOVER_USER,
                "message": msg,
                "title": "New User Question",
                "priority": 0,
                "sound": "magic",
                "html": 1
            },
            timeout=10
        )
    except Exception as e:
        print(f"Pushover failed: {e}")

async def send_pushover_notification_async(user_id, question, email=None):
    await asyncio.sleep(1)
    send_pushover_notification(user_id, question, email)

TECH_TERMS_SET = {
    'python', 'javascript', 'react', 'node', 'django', 'flask',
    'machine learning', 'ai', 'data science', 'database',
    'frontend', 'backend', 'fullstack', 'devops'
}

def extract_tech_keywords(text: str) -> List[str]:
    text_lower = text.lower()
    return [term for term in TECH_TERMS_SET if term in text_lower]

async def process_agent_response(agent: str, question: str) -> Dict:
    try:
        start_time = time.time()
        spec = AGENT_SPECIALIZATIONS.get(agent, {
            "name": agent,
            "focus": "General support",
            "technical": "Provide helpful guidance"
        })

        system_prompt = (
            f"You are {spec['name']}.\n"
            f"Focus: {spec['focus']}\n"
            f"Technical Role: {spec['technical']}\n\n"
            "Instructions:\n"
            "- Respond only in your role.\n"
            "- Use markdown (bold, lists, etc).\n"
            "- Stay focused and professional.\n"
            "- Intro for greetings, guidance for questions.\n"
            "- Ensure your response is concise and only 2 lines long."
        )

        response = await asyncio.wait_for(
            asyncio.to_thread(
                client.chat.completions.create,
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": question.strip()}
                ],
                temperature=0.3,
                max_tokens=150
            ),
            timeout=15
        )

        duration = time.time() - start_time
        print(f"[{agent}] OpenAI response time: {duration:.2f}s")

        return {
            "agent": agent,
            "response": response.choices[0].message.content or "⚠️ No response.",
            "isTechnical": True
        }

    except Exception as e:
        print(f"[{agent}] Error: {e}")
        return {
            "agent": agent,
            "response": f"⚠️ {agent} is currently unavailable.",
            "isTechnical": False
        }

async def run_agentic_logic(req: AgentRequest) -> Dict:
    try:
        if len(req.agents) > 2:
            req.agents = req.agents[:2]  # Automatically select any two (first two) if more are provided

        tasks = [process_agent_response(agent, req.question) for agent in req.agents]
        results = await asyncio.gather(*tasks)
        responses = {r["agent"]: str(r["response"]) for r in results}

        if db:
            try:
                db.collection("sessions").document().set({
                    "userId": req.userId,
                    "question": req.question,
                    "agents": req.agents,
                    "responses": responses,
                    "createdAt": firestore.SERVER_TIMESTAMP,
                    "isTechnical": any(r["isTechnical"] for r in results),
                    "technicalKeywords": extract_tech_keywords(req.question)
                })
            except Exception as log_err:
                print(f"⚠️ Firebase logging failed: {log_err}")

        if req.send_email:
            if db:
                db.collection("users").document(req.userId).set({
                    "reminderEnabled": True,
                    "reminderQuestion": req.question.strip(),
                    "lastUpdated": firestore.SERVER_TIMESTAMP,
                    "email": req.email if req.email else None
                }, merge=True)
            asyncio.create_task(send_pushover_notification_async(req.userId, req.question, req.email))

        return {
            "status": "success",
            "sessionId": datetime.utcnow().isoformat(),
            "responses": responses
        }

    except Exception as e:
        error_id = datetime.utcnow().isoformat()
        print(f"[{error_id}] Critical error:\n{traceback.format_exc()}")
        return {
            "status": "failure",
            "responses": {
                "System": f"⚠️ Internal error occurred. Try again. (Error ID: {error_id})"
            }
        }
