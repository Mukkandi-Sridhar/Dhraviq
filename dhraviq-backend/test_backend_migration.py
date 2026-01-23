import asyncio
import os
from dotenv import load_dotenv
# Add the current directory to sys.path to ensure we can import the backend module
import sys
sys.path.append(os.getcwd())

from agentic_ai_backend import run_agentic_logic, AgentRequest

load_dotenv()

async def test():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ OPENAI_API_KEY not found in environment.")
        print("Please set it in your .env file or environment variables.")
        return

    print(f"✅ Found OPENAI_API_KEY: {api_key[:5]}...{api_key[-4:]}")

    req = AgentRequest(
        userId="test_user",
        question="What is the best way to learn React?",
        agents=["GoalClarifier"],
        email=None,
        send_email=False
    )
    
    print("Sending request to OpenAI...")
    try:
        result = await run_agentic_logic(req)
        print("\n--- Result ---")
        print(result)
        
        if result.get("status") == "success":
            response_text = result["responses"].get("GoalClarifier", "")
            if "⚠️" in response_text:
                 print("\n⚠️ Warning: Agent returned an error or empty response.")
            else:
                 print("\n✅ Success: Received valid response from Agent.")
        else:
            print("\n❌ Failure: Backend returned failure status.")

    except Exception as e:
        print(f"\n❌ Exception during test: {e}")

if __name__ == "__main__":
    asyncio.run(test())
