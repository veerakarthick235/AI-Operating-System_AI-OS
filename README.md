# 🧠 AI Operating System (AI-OS)

An **AI Operating System layer** that automates real tasks on Windows by combining **AI planning** with **system-level execution**.

This project demonstrates how AI can **control applications, generate execution plans, and perform real-world actions**, not just chat.

---

## 🚀 What This Project Does

AI-OS acts as an intelligent layer on top of the operating system that can:

- 🧩 Understand natural-language instructions  
- 🧠 Generate structured execution plans using AI models  
- 🖥️ Open and control real desktop applications (e.g., Notepad)  
- ⌨️ Type content automatically  
- 📜 Execute multi-step workflows  
- 📡 Communicate between UI and system processes  

**This is not a simulation.**  
It performs **real OS-level actions**.

---

## 🛠️ Tech Stack

### Frontend
- React  
- Webpack  
- HTML / CSS  

### Desktop Layer
- Electron (IPC, preload, native window)  

### Backend / Automation
- Python  
- PyAutoGUI  
- OS process control  

### AI Layer
- Gemini / GPT models  
- Plan generation from natural language  

---

## 📂 Project Structure

```
ai-os/
│
├── ui/                     # Electron + React UI
│   ├── renderer/           # React frontend
│   ├── public/
│   │   ├── electron.js     # Electron main process
│   │   └── preload.js      # Secure IPC bridge
│
├── executor.py             # Executes system actions
├── run_plan.py             # Converts text → action plan
├── sample_flow.py          # Demo automation flow
├── requirements.txt        # Python dependencies
├── .env                    # API keys 
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Install Requirements

**Node.js & npm**  
Ensure Node.js is installed.

**Python**  
Install Python **3.9+**

---

### 2️⃣ Install Python Dependencies

```bash
pip install -r requirements.txt
```

Required modules include:
- pyautogui  
- python-dotenv  
- google-generativeai (or OpenAI)  

---

### 3️⃣ Set API Key

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

---

### 4️⃣ Install UI Dependencies

```bash
cd ui
npm install
cd renderer
npm install
```

---

## ▶️ How to Run

Start the React UI + Electron App:

```bash
cd ui
npm run start
```

Electron will open and load the UI automatically.

---

## 🧪 Example Commands

From the UI, enter instructions such as:

- Open notepad and write a chatbot code  
- Open notepad and type Hello World  
- Generate a plan for writing a Python script  

The AI will:
1. Generate a plan  
2. Execute the plan  
3. Control the application  

---

## 🧠 Key Learnings

- AI systems are **engineering systems**, not magic  
- **Planning + execution** is more powerful than chat  
- Real automation requires:
  - Clear architecture  
  - Safe execution layers  
  - Deterministic actions  

---

## 📌 Disclaimer

This project executes **real OS actions**.  
Run **only on trusted environments**.

---

## 👤 Author

**Veera Karthick**  
AI & Full-Stack Systems Builder
