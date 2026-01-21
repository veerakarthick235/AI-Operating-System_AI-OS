const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const url = process.env.ELECTRON_START_URL || "http://localhost:3000";
  console.log("Loading URL:", url);
  mainWindow.loadURL(url);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

// ---------------- IPC HANDLERS ----------------

// Execute Python sample flow
ipcMain.handle("runSampleFlow", async () => {
  return runPython("sample_flow.py");
});

// Run planner with natural language text
ipcMain.handle("runPlanner", async (event, text) => {
  return runPython("run_plan.py", ["--plan", text]);
});

// Run a generated plan object
ipcMain.handle("runPlan", async (event, planObj) => {
  return runPython("executor.py", ["--plan", JSON.stringify(planObj)]);
});

// ---------------- PYTHON EXECUTION ----------------

function runPython(script, args = []) {
  return new Promise((resolve) => {
    const python = process.env.PYTHON_PATH || "python";

    // FINAL CORRECT PATH (2 LEVELS UP)
    const scriptPath = path.join(__dirname, "..", "..", script);

    console.log("Launching Python script:", scriptPath);
    console.log("Args:", args);

    const processObj = spawn(python, [scriptPath, ...args]);

    let output = "";

    processObj.stdout.on("data", (data) => {
      const text = data.toString();
      output += text;
      console.log("PYTHON STDOUT:", text);
      if (mainWindow) {
        mainWindow.webContents.send("flow-log", text);
      }
    });

    processObj.stderr.on("data", (data) => {
      const text = data.toString();
      console.log("PYTHON ERROR:", text);
      if (mainWindow) {
        mainWindow.webContents.send("flow-log", text);
      }
    });

    processObj.on("close", () => {
      console.log("Python closed. Raw output:", output);

      let result;
      try {
        const lines = output.trim().split("\n");
        result = JSON.parse(lines[lines.length - 1]);
      } catch (err) {
        result = {
          error: true,
          message: "Failed parsing Python output",
          raw: output
        };
      }

      resolve(result);
    });
  });
}
