import sys
import json
import subprocess
import time


def open_app(path):
    subprocess.Popen(path)


def type_text(text):
    import pyautogui
    time.sleep(1)
    pyautogui.write(text)


def execute_plan(plan):
    logs = []

    for step in plan:
        action = step.get("action")

        if action == "open_app":
            path = step.get("path")
            if not path:
                logs.append("Missing path for open_app")
                continue

            open_app(path)
            logs.append(f"Opened {path}")

        elif action == "type":
            text = step.get("text", "")
            type_text(text)
            logs.append("Typed text")

        else:
            logs.append(f"Unknown action: {action}")

    return logs


# -------------------------------------------------
# CLI ENTRY POINT (used by Electron only)
# -------------------------------------------------
if __name__ == "__main__":

    if "--plan" not in sys.argv:
        raise ValueError("No plan JSON provided")

    plan_json = sys.argv[sys.argv.index("--plan") + 1]
    plan = json.loads(plan_json)

    logs = execute_plan(plan)

    print(json.dumps({
        "status": "ok",
        "logs": logs
    }))
