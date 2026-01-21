import React, { useState, useEffect } from "react";

export default function App() {
  const [tab, setTab] = useState("home");
  const [logs, setLogs] = useState([]);
  const [planText, setPlanText] = useState("");
  const [planObj, setPlanObj] = useState(null);

  // Listen for Python logs
  useEffect(() => {
    if (window.api && window.api.onFlowLog) {
      window.api.onFlowLog((d) => {
        setLogs((l) => [...l, d]);
      });
    }
  }, []);

  const runSample = async () => {
    setLogs([]);
    const r = await window.api.runSampleFlow();
    setLogs((l) => [...l, JSON.stringify(r)]);
  };

  const genPlan = async () => {
    setLogs((l) => [...l, "Generating plan..."]);
    const r = await window.api.runPlanner(planText);
    setPlanObj(r);
    setLogs((l) => [...l, JSON.stringify(r)]);
  };

  const runPlan = async () => {
    if (!planObj?.plan) return;

    setLogs((l) => [...l, "Running plan..."]);
    const r = await window.api.runPlan(planObj.plan);
    setLogs((l) => [...l, JSON.stringify(r)]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#0f1724",
          color: "#fff",
          padding: 20,
        }}
      >
        <h2>AI-OS</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={() => setTab("home")}>Home</button>
          <button onClick={() => setTab("planner")}>Planner</button>
          <button onClick={() => setTab("editor")}>Editor</button>
          <button onClick={() => setTab("logs")}>Logs</button>
          <button onClick={() => setTab("settings")}>Settings</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 20 }}>
        {tab === "home" && (
          <div>
            <h1>Full Upgrade</h1>
            <button onClick={runSample}>Run Sample Flow</button>
          </div>
        )}

        {tab === "planner" && (
          <div>
            <h3>Planner</h3>

            <textarea
              value={planText}
              onChange={(e) => setPlanText(e.target.value)}
              style={{ width: "100%", height: 120 }}
              placeholder="Describe automation task..."
            ></textarea>

            <br />

            <button onClick={genPlan}>Generate Plan</button>
            <button onClick={runPlan} style={{ marginLeft: 10 }}>
              Run Plan
            </button>

            <pre style={{ marginTop: 20 }}>
              {planObj ? JSON.stringify(planObj, null, 2) : "No plan yet"}
            </pre>
          </div>
        )}

        {tab === "editor" && (
          <div>
            <h3>Editor</h3>
            <p>Workflow editor (save/load flows coming soon)</p>
          </div>
        )}

        {tab === "logs" && (
          <div>
            <h3>Logs</h3>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                height: "70vh",
                overflow: "auto",
                background: "#f1f1f1",
                padding: 10,
              }}
            >
              {logs.join("")}
            </pre>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h3>Settings</h3>
            <p>
              Set <b>GEMINI_API_KEY</b> in environment variable.
              <br />
              UI-based key storage will be added soon.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
