from fastapi import FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import traceback
import os
import json
import hashlib
import time
import logging
from dotenv import load_dotenv
from agentic_ai_backend import run_agentic_logic  # External logic
from openai import OpenAI
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(name)s - %(message)s"
)
logger = logging.getLogger("DhraviqBackend")

# Firebase Setup
try:
    import firebase_admin
    from firebase_admin import credentials, firestore

    cred_path = "firebase_credentials.json"
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        if not firebase_admin._apps:
            firebase_admin.initialize_app(cred)
        db = firestore.client()
        print("✅ Firebase initialized successfully.")
    else:
        print(f"❌ Firebase credential file not found at: {cred_path}")
        db = None
except Exception:
    print(f"🔥 Firebase initialization failed:\n{traceback.format_exc()}")
    db = None

# OpenAI Client
client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    timeout=30.0,
    max_retries=2
)

# Request Schemas
class RunAgentRequest(BaseModel):
    userId: str
    question: str
    agents: List[str]
    email: Optional[str] = None
    send_email: Optional[bool] = False

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    email: str
    name: Optional[str] = None
    uid: Optional[str] = None

# FastAPI Setup
app = FastAPI(
    title="Dhraviq Agentic AI Gateway",
    description="Routes requests to agent logic and logs sessions",
    version="2.2.0"
)

# Rate Limiting
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS
ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "https://dhraviq.com,https://www.dhraviq.com,https://dhraviq.vercel.app,http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Chat Memory & Cache
SESSION_MEMORY: dict[str, list[dict]] = {}
RESPONSE_CACHE = {}
CACHE_TTL = 3600

def get_cache_key(text: str) -> str:
    return hashlib.md5(text.lower().strip().encode()).hexdigest()

def get_cached_response(key: str):
    item = RESPONSE_CACHE.get(key)
    if item and time.time() < item["expires"]:
        return item["response"]
    RESPONSE_CACHE.pop(key, None)
    return None

def set_cached_response(key: str, response: str):
    RESPONSE_CACHE[key] = {
        "response": response,
        "expires": time.time() + CACHE_TTL
    }

# OpenAI Tools
tools = [
    {
        "type": "function",
        "function": {
            "name": "save_ticket",
            "description": "Save a user support request for follow-up",
            "parameters": {
                "type": "object",
                "properties": {
                    "instagram_id": {"type": "string"},
                    "issue_description": {"type": "string"}
                },
                "required": ["instagram_id", "issue_description"]
            }
        }
    }
]

# System Prompt
SYSTEM_PROMPT = """
You are the official AI assistant for **Dhraviq**, an AI-powered career and goal achievement platform.

Dhraviq helps users gain:
- Career clarity
- Skill roadmaps
- Realistic timelines
- Accountability and progress tracking

You assist with:
- Understanding AI agents (GoalClarifier, SkillMap, TimelineWizard, ProgressCoach, MindsetMentor)
- Career and learning guidance questions
- Platform usage and navigation
- Account, access, or backend issues

RULES:

1. Greet the user by name naturally.
2. Keep responses short, clear, and professional.
3. Do NOT mention internal systems, models, or tools.
4. If the user reports an issue or asks for human follow-up:

   STEP 1: Ask for Instagram ID.
   STEP 2: Ask for issue details.
   STEP 3: Save ticket and reply ONLY:
   "We've received your request. Our team will contact you shortly."

Tone:
- Calm
- Supportive
- Career-focused
- No marketing fluff
"""

def save_ticket_to_db(data: dict, uid: Optional[str]):
    if not db:
        return False
    data["createdAt"] = firestore.SERVER_TIMESTAMP
    data["status"] = "open"
    if uid:
        db.collection("users").document(uid).collection("tickets").add(data)
    else:
        db.collection("tickets").add(data)
    return True

# Routes
@app.get("/health", include_in_schema=False)
@app.head("/health")
def health_check():
    return {
        "status": "OK",
        "firebase": "connected" if db else "not connected",
        "message": "Dhraviq gateway is live 🔥"
    }

@app.post("/run_agents", tags=["Core Agents"])
async def run_agents(data: RunAgentRequest, authorization: Optional[str] = Header(None)):
    try:
        print(f"📩 Incoming request from: {data.userId} | Agents: {data.agents}")
        result = await run_agentic_logic(data)
        return result
    except Exception:
        print(f"❌ Exception in /run_agents:\n{traceback.format_exc()}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/chat", tags=["Customer Care"])
@limiter.limit("20/minute")
def chat(request: Request, chat_request: ChatRequest):
    try:
        email = chat_request.email
        name = chat_request.name or "there"

        SESSION_MEMORY.setdefault(email, [])
        history = SESSION_MEMORY[email][-20:]

        latest_user_msg = next(
            (m.content for m in reversed(chat_request.messages) if m.role == "user"),
            None
        )

        if latest_user_msg and not history:
            key = get_cache_key(latest_user_msg)
            cached = get_cached_response(key)
            if cached:
                return {"response": cached}

        conversation = [
            {"role": "system", "content": SYSTEM_PROMPT.replace("<name>", name)}
        ] + history

        for m in chat_request.messages:
            conversation.append(m.dict())

        res = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=conversation,
            tools=tools,
            tool_choice="auto"
        )

        msg = res.choices[0].message

        if msg.tool_calls:
            args = json.loads(msg.tool_calls[0].function.arguments)
            save_ticket_to_db({
                "email": email,
                "instagram": args["instagram_id"],
                "message": args["issue_description"]
            }, chat_request.uid)
            return {"response": "We've received your request. Our team will contact you shortly."}

        reply = msg.content
        SESSION_MEMORY[email].append({"role": "assistant", "content": reply})

        if latest_user_msg and not history:
            set_cached_response(get_cache_key(latest_user_msg), reply)

        return {"response": reply}

    except Exception as e:
        logger.error(e)
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Server error")
