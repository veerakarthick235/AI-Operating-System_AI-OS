import os, json, re
import google.generativeai as genai

PLACEHOLDER_KEY = "PASTE_YOUR_KEY_HERE"

def configure_genai(key=None):
    k = key or os.environ.get("GEMINI_API_KEY") or PLACEHOLDER_KEY
    genai.configure(api_key=k)

def plan_from_prompt(prompt, api_key=None):
    configure_genai(api_key)
    model = genai.GenerativeModel('models/gemini-2.5-flash')
    system = "You are an automation planner. Return strict JSON object with top-level 'plan' array."
    user = f"{system}\nUser: {prompt}\nReturn JSON only."
    resp = model.generate(input=user, temperature=0.0, max_output_tokens=800)
    text = getattr(resp, 'text', None) or (resp.candidates[0].content[0].text if getattr(resp,'candidates',None) else None)
    if not text:
        raise RuntimeError('No planner text response.')
    # extract JSON
    m = re.search(r'\{.*\}', text, flags=re.S)
    if not m:
        raise RuntimeError('Planner returned non-JSON. Response:\n' + text[:1000])
    obj = json.loads(m.group(0))
    return obj


if __name__ == "__main__":
    import sys, json
    prompt = " ".join(sys.argv[1:]) if len(sys.argv)>1 else "Sample: Open notepad and write hello"
    try:
        obj = plan_from_prompt(prompt)
        print(json.dumps(obj), flush=True)
    except Exception as e:
        print(json.dumps({"status":"error","error":str(e),"raw":""}), flush=True)
