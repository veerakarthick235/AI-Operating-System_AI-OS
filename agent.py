from pywinauto import Desktop, Application
from typing import List, Dict
import time

def list_top_windows() -> List[Dict]:
    windows = []
    desktop = Desktop(backend="uia")
    for w in desktop.windows():
        try:
            ctrl = w
            windows.append({
                "title": ctrl.window_text(),
                "control_type": ctrl.friendly_class_name(),
                "handle": ctrl.handle
            })
        except Exception:
            continue
    return windows
