from executor import execute_plan

def run_sample_direct():
    plan = [
        {
            "action": "open_app",
            "path": "notepad.exe"
        },
        {
            "action": "type",
            "text": "Hello from AI-OS Full Upgrade!\nBuilt-in sample flow."
        }
    ]

    logs = execute_plan(plan)

    return {
        "status": "ok",
        "logs": logs
    }


if __name__ == "__main__":
    result = run_sample_direct()
    print(result)
