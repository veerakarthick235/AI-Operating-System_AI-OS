const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  runSampleFlow: () => ipcRenderer.invoke("runSampleFlow"),
  runPlanner: (text) => ipcRenderer.invoke("runPlanner", text),
  runPlan: (plan) => ipcRenderer.invoke("runPlan", plan),
  onFlowLog: (callback) =>
    ipcRenderer.on("flow-log", (event, data) => callback(data))
});
