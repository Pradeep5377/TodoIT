# ✅ TodoIT– Fullstack Todo List/Task Manager App

Todoit is a powerful, real-time Todo List web application built with the MERN stack and integrated with **Google & GitHub OAuth**, **task sharing**, and **real-time updates via Socket.IO**.

---

## 🚀 Live Demo

- **Frontend**: [https://todoit.vercel.app](https://todoit.vercel.app)  
- **Backend**: [https://todoit-vv91.onrender.com](https://todoit-vv91.onrender.com)

---

## 🔧 Tech Stack

- **Frontend**: React, Vite, Axios, Socket.IO - client
- **Backend**: Node.js, Express, MongoDB, Mongoose, Passport.js, JWT, Socket.IO  
- **OAuth**: Google & GitHub login using Passport strategies  
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## ✨ Features

- 🔐 Google & GitHub OAuth Login  
- 📋 Create, Read, Update, Delete, and Filter Tasks  
- 👥 Share tasks with other users by email  
- 🔎 Search and Priority-based filtering  
- 📆 Due Date Tracking  
- ⚡ Real-time sync using Socket.IO  
- 📱 Responsive design  
- 🧑 User avatar with dropdown & logout  
- 🎨 Styled with modern CSS

---

## 📁 Folder Structure

```
TodoIT
├── client/       # React frontend (Vite)
├── server/       # Express backend
└── README.md     # This file
```

---

## 🛠️ Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/Pradeep5377/TodoIT
cd TodoIT
```

2. **Frontend Setup (`client/`):**

```bash
cd client
npm install
```

3. **Backend Setup (`server/`):**

```bash
cd ../server
npm install
```

4. **Environment Variables:**

Create two `.env` files:

- In `client/.env`:
```env
VITE_BACKEND_URL=https://todoit-vv91.onrender.com
```

- In `server/.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=https://todoit.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

---

## 🔐 Google & GitHub OAuth Setup

- In Google Cloud Console & GitHub Developer Settings:
  - **Authorized redirect URIs**:
    ```
    https://todoit-vv91.onrender.com/auth/google/callback
    https://todoit-vv91.onrender.com/auth/github/callback
    ```
  - Add respective client IDs and secrets to your `.env` file.

---

## 🧪 Run Locally

**Start Backend:**

```bash
cd server
npm start
```

**Start Frontend:**

```bash
cd client
npm run dev
```

---

## 🌐 Deployment

### Backend (Render):
- Build Command: `npm install`
- Start Command: `node index.js`
- Root Directory: `server`

### Frontend (Vercel):
- Build Command: `npm run build`
- Output Directory: `dist`
- Root Directory: `client`


## Hackathon

This project was developed as part of the **Katomaran Full Stack Hackathon** challenge. 
