# 🌸 FemCare (Demo) — AI Women’s Health Monitoring Platform

**FemCare** is a modern, mobile-first web application designed to help women monitor health risks using AI-powered prediction tools.

The current demo focuses on **Anemia Risk Prediction**, with upcoming modules planned for **PCOS detection, cervical cancer screening, and personalized health insights**.

This project was built for **hackathons and AI health innovation**, demonstrating how machine learning and modern web technologies can support preventive healthcare.

---

# ✨ Features

### 🩸 Anemia Risk Prediction

* Simple health input form
* AI-based risk estimation
* Instant explanation and recommendation
* Health history tracking

### 📊 Dashboard

* View previous anemia screenings
* Risk history visualization
* Quick health checks

### 🧠 AI-ready Architecture

* Designed to integrate **ML models**
* Currently uses **rule-based scoring** for demo purposes
* Easily replaceable with **trained models**

###  Mobile-first UI

* Modern responsive design
* Smooth animations using Framer Motion
* Clean health dashboard interface

---

# 🧰 Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 TailwindCSS
* 🎬 Framer Motion
* 🔀 React Router

### Backend

* ⚡ FastAPI
* 🔗 REST API
* 📦 Python services architecture

### AI / ML

* 🤗 Hugging Face compatible
* Future model integration ready
* Currently uses **simulated rule-based risk scoring**

---

# 🏗 Project Architecture

```
FemCare/
│
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Application pages
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript models
│
├── backend/
│   ├── main.py              # FastAPI app entry
│   ├── routes/              # API routes
│   ├── services/            # Health prediction logic
│   └── models/              # Data models
│
└── README.md
```

---

# 🚀 Getting Started

## 1️⃣ Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/femcare.git
cd femcare
```

---

# ⚙️ Run the Backend (FastAPI)

Navigate to the project root directory:

```bash
python -m venv .venv
```

Activate the environment:

**Windows**

```bash
.\.venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Start the server:

```bash
uvicorn backend.main:app --reload --port 8000
```

Backend will run at:

```
http://localhost:8000
```

Health check endpoint:

```
GET /api/health
```

---

# 💻 Run the Frontend (React + Vite)

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

API requests from the frontend are **proxied to the backend**:

```
/api/* → http://localhost:8000
```

---

# 🔌 API Endpoints

### Health Check

```
GET /api/health
```

Response:

```json
{
  "status": "ok"
}
```

---

### Anemia Risk Prediction

```
POST /api/predict/anemia
```

Example Request:

```json
{
  "hemoglobin": 10.2,
  "fatigueLevel": 4,
  "dietType": "vegetarian"
}
```

Example Response:

```json
{
  "riskLevel": "Moderate Risk",
  "explanation": "Low hemoglobin levels with reported fatigue may indicate anemia risk."
}
```

---

# 🧪 AI Model Integration (Future)

Currently the system uses **rule-based logic**, but the architecture supports:

* XGBoost
* Logistic Regression
* Random Forest
* HuggingFace hosted models
* FastAPI ML inference endpoints

---

# 📌 Planned Features

* PCOS / PCOD risk prediction
* Cervical cancer screening
* Breast cancer screening
* AI health chatbot
* Personalized health insights
* User authentication
* Health report export

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Added new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---
 
---

# ❤️ Acknowledgement

Built to explore how **AI + web technologies**
