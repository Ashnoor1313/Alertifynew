# Alertifynew

![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white)  
![License](https://img.shields.io/badge/license-ISC-green)

## 📝 Description

Alertifynew is a full-stack web application designed to detect and prevent digital fraud using Express.js, React, and integrated Machine Learning models.  
It allows users to analyze and detect suspicious QR codes, SMS, UPI IDs, URLs, and phone numbers using pre-trained ML models.

The application includes secure authentication, community discussion features, 3D animations, and an intuitive dashboard for all scanning tools.

---

## ✨ Features

- User Authentication (JWT + Cookies)  
- Spam & Fraud Detection for:  
  - SMS  
  - QR  
  - UPI  
  - URLs  
  - Phone Numbers  
- 3D Animations (Spline + React Three Fiber)  
- Built-in Chatbot  
- Community Discussion System  
- Integrated Python ML Models  
- MongoDB Database  
- Modern React UI with Tailwind CSS  

---

## 🛠️ Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Framer Motion  
- GSAP  
- React Three Fiber  
- Vite  

### Backend
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Bcrypt / BcryptJS  
- Cookie-Parser  
- CORS  
- FastAPI (ML Model Endpoints)

---

## 📦 Key Dependencies

@react-three/drei: ^9.88.7  
@react-three/fiber: ^8.15.11  
@splinetool/react-spline: ^2.2.6  
bcrypt: ^5.1.1  
bcryptjs: ^2.4.3  
cookie-parser: ^1.4.6  
cors: ^2.8.5  
crypto: ^1.0.1  
dotenv: ^16.3.1  
express: ^4.18.2  
framer-motion: ^10.16.4  
gsap: ^3.12.2  
jsonwebtoken: ^9.0.2  
jsqr: ^1.4.0  
mongoose: ^8.0.0  

---

## 🚀 Run Commands (Frontend)

npm run dev  
npm run build  
npm run lint  
npm run preview  

---

## 📁 Project Structure

.
├── backend  
│   ├── app  
│   │   ├── main.py  
│   │   ├── routers  
│   │   │   ├── phone_router.py  
│   │   │   ├── qr_router.py  
│   │   │   ├── sms_router.py  
│   │   │   ├── upi_router.py  
│   │   │   └── url_router.py  
│   │   └── utils  
│   │       └── features.py  
│   ├── controllers  
│   │   ├── auth.controller.js  
│   │   └── community.controller.js  
│   ├── db  
│   │   └── connectDB.js  
│   ├── middleware  
│   │   ├── uploadMiddleware.js  
│   │   └── verifyToken.js  
│   ├── ml_models  
│   │   ├── best_qr_model.h5  
│   │   ├── phone_spam_pipeline.joblib  
│   │   ├── sms_spam_model  
│   │   │   ├── config.json  
│   │   │   ├── special_tokens_map.json  
│   │   │   ├── tokenizer.json  
│   │   │   ├── tokenizer_config.json  
│   │   │   └── vocab.txt  
│   │   ├── upi_model.pkl  
│   │   ├── urlspam.pkl  
│   │   └── vectorizer.pkl  
│   ├── models  
│   │   ├── community.model.js  
│   │   └── user.model.js  
│   ├── requirements.txt  
│   ├── routes  
│   │   ├── auth.route.js  
│   │   └── community.route.js  
│   ├── server.js  
│   └── utils  
│       └── generateTokenAndSetCookie.js  
├── frontend  
│   ├── eslint.config.js  
│   ├── index.html  
│   ├── package.json  
│   ├── postcss.config.cjs  
│   ├── public  
│   │   └── vite.svg  
│   ├── src  
│   │   ├── App.css  
│   │   ├── App.jsx  
│   │   ├── assets  
│   │   ├── components  
│   │   ├── index.css  
│   │   ├── main.jsx  
│   │   ├── pages  
│   │   ├── store  
│   │   └── utils  
│   ├── tailwind.config.js  
│   └── vite.config.js  
└── package.json  

---

## 🛠️ Development Setup

### Frontend (React + Vite)
cd frontend  
npm install  
npm run dev  

### Backend (Express.js)
cd backend  
npm install  
node server.js  

### ML Backend (Python FastAPI)
cd backend/app  
pip install -r requirements.txt  
uvicorn app.main:app --reload --port 8001  

---

## 👥 Contributing

1. Fork the repository  
2. Clone your fork  
3. Create a new feature branch  
4. Commit changes  
5. Push your branch  
6. Open a Pull Request  

---

## 📜 License

This project is licensed under the ISC License.

