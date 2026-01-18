# 🩺 PCOS Secure Predictor

A **secure, full-stack web application** for **PCOS (Polycystic Ovary Syndrome) risk prediction**, designed with **privacy-first architecture**, **encrypted ML inference**, and **role-based access for users and doctors**.

---

## 🚀 Project Overview

**PCOS Secure Predictor** enables women to perform a **self-screening assessment** for PCOS using medical parameters and lifestyle indicators.
The system securely processes sensitive health data using **encryption, hashing, and HMAC verification**, ensuring data confidentiality throughout the pipeline.

The application supports:

* 👩‍⚕️ **Doctor role** for appointment handling
* 👩 **User role** for screening, reports, and history
* 🔐 **Secure ML microservice** for prediction

---

## 🧠 Key Features

### 👩 User Module

* Secure signup & login
* Multi-stage PCOS screening form (24 clinical features)
* ML-based probability prediction
* Auto-generated medical report
* Download report with passkey authentication
* View screening history
* Consult a doctor (appointment request)

### 👨‍⚕️ Doctor Module

* Doctor authentication
* View appointment requests
* Confirm appointments with timestamp
* Access patient details securely

### 🔐 Security Highlights

* Encrypted ML payload transmission (Fernet)
* HMAC integrity verification
* Password hashing using Django PBKDF2
* Passkey-protected reports & appointments
* No raw medical data stored in ML service

---

## 🏗️ System Architecture

```
React Frontend
      ↓ (Encrypted + HMAC)
Django Backend (Auth, API, Audit)
      ↓
FastAPI ML Service (Inference Only)
```

* **Frontend:** React.js
* **Backend:** Django + Django REST
* **ML Service:** FastAPI (isolated microservice)
* **Database:** MySQL
* **ML Model:** Scikit-learn (StandardScaler + Classifier)

---

## 📊 Machine Learning Details

* **Input Features:** 24 medically relevant attributes
* **Preprocessing:** StandardScaler (trained)
* **Output:** PCOS probability score (0–1)
* **Inference:** Secure, stateless prediction service

---

## 🧪 Tech Stack

| Layer      | Technology             |
| ---------- | ---------------------- |
| Frontend   | React.js, React Router |
| Backend    | Django, Django Auth    |
| ML Service | FastAPI, Scikit-learn  |
| Database   | MySQL                  |
| Security   | Fernet, HMAC, PBKDF2   |
| Tools      | Git, REST APIs         |

---

## 📂 Project Structure

```
pcos-secure-predictor/
├── backend/        # Django backend
├── frontend/       # React frontend
├── ml_service/     # Secure ML microservice
├── README.md
└── SECURITY_OVERVIEW.md
```

---

## ▶️ How to Run (Local)

### Backend

```bash
cd backend
python manage.py runserver
```

### ML Service

```bash
cd ml_service
uvicorn app:app --port 8001
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🎯 Academic Value

* Demonstrates **secure system design**
* Real-world **healthcare application**
* Clear separation of concerns (Frontend, Backend, ML)
* Strong alignment with **CNS / Cyber Security / ML coursework**

---

