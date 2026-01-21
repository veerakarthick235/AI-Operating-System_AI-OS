import os
import sys
import json

import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env
#
load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise RuntimeError("GEMINI_API_KEY not found in .env file")

# Configure Gemini
genai.configure(api_key=API_KEY)

model = genai.GenerativeModel("models/gemini-2.5-flash")

# Read plan text from CLI
if "--plan" not in sys.argv:
    raise ValueError("Missing --plan argument")

user_instruction = sys.argv[sys.argv.index("--plan") + 1]

# Prompt Gemini to generate ONLY code
prompt = f"""
You are an expert programmer.

Task:
{user_instruction}

Rules:
- Generate ONLY valid Python code
- No explanations
- No markdown
- No backticks
- The code must be runnable as-is
"""

response = model.generate_content(prompt)

code = response.text.strip()

if not code:
    raise RuntimeError("Gemini returned empty code")

# Build execution plan for executor.py
plan = [
    {
        "action": "open_app",
        "path": "notepad.exe"
    },
    {
        "action": "type",
        "text": code
    }
]

# Output JSON for Electron IPC
print(json.dumps({
    "status": "ok",
    "received_plan": user_instruction,
    "plan": plan
}))
