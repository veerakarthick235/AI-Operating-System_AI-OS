from playwright.sync_api import sync_playwright
import time, json

def run_browser_steps(steps):
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        for s in steps:
            a = s.get("action")
            args = s.get("args",{})
            if a == "browser_open":
                page.goto(args.get("url"))
                results.append({"status":"ok","url":args.get("url")})
            elif a == "browser_click":
                page.click(args.get("selector"))
                results.append({"status":"ok","clicked":args.get("selector")})
            elif a == "browser_type":
                page.fill(args.get("selector"), args.get("text",""))
                results.append({"status":"ok","typed":args.get("selector")})
            time.sleep(args.get("wait",0.5))
        html = page.content()
        browser.close()
        return {"status":"ok","results":results,"html_snippet": html[:1000]}
