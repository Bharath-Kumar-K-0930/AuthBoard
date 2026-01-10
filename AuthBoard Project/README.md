# AuthBoard

AuthBoard is a production-ready full-stack web application designed to demonstrate frontend excellence, secure authentication, and clean backend architecture. It features a JWT-based authentication system, a protected dashboard, and full CRUD capabilities for task management.

## 🚀 Features

- **Authentication**: Secure Register & Login (JWT + bcrypt).
- **Dashboard**: Protected route only accessible to authenticated users.
- **Task Management**: Create, Read, Update, Delete (CRUD) tasks.
- **Search & Filter**: Real-time filtering of tasks by status and content.
- **Analytics Dashboard**: Visual charts and stats for task productivity.
- **Responsive Design**: Built with TailwindCSS for mobile-first responsiveness (Futuristic Theme).
- **Architecture**: MVC Pattern on Backend, Context API + Component-based structure on Frontend.
- **Profile Management**: Profile picture upload and password change features.
- **Notifications**: Custom toast notifications for real-time feedback.
- **Landing Page**: Modern, animated landing page with "Deep Galactic Blue" theme.

## 🛠️ Tech Stack

### Frontend
- **React.js (Vite)**: Fast, modern bundler and UI library.
- **TailwindCSS**: Utility-first CSS framework.
- **Axios**: HTTP client with interceptors for auth headers.
- **React Router**: Client-side routing.
- **Context API**: State management for user authentication.
- **Recharts**: Composable charting library for React.

### Backend
- **Node.js & Express.js**: Scalable server environment.
- **MongoDB & Mongoose**: NoSQL database and ODM.
- **JWT (JSON Web Tokens)**: Stateless authentication.
- **Bcryptjs**: Password hashing.
- **Multer**: Middleware for handling file uploads.

## 📂 Project Structure

```
AuthBoard/
├── backend/            # Express Server
│   ├── config/         # DB Connection
│   ├── controllers/    # Route Logic
│   ├── middleware/     # Auth & Error Middleware
│   ├── models/         # Mongoose Models
│   ├── routes/         # API Routes
│   └── server.js       # Entry Point
├── frontend/           # React App
│   ├── src/
│   │   ├── components/ # Reusable UI (Navbar, Toast, etc.)
│   │   ├── context/    # Global State (Auth, Toast)
│   │   ├── pages/      # Views (Login, Dashboard, Landing)
│   │   ├── services/   # Axios Setup
│   │   └── App.jsx     # Routing
└── README.md
```

## ⚙️ How to Run

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URI)

### 1. Backend Setup
1. Open a terminal and navigate to `backend/`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/authboard  # Or your Atlas URI
   JWT_SECRET=supersecretkey123
   NODE_ENV=development
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   (Server runs on http://localhost:5000)

### 2. Frontend Setup
1. Open a **new terminal** and navigate to `frontend/`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   (App accessible at http://localhost:5173)

## � API Reference

| Endpoint | Method | Description | Protected |
| :--- | :--- | :--- | :--- |
| **Auth** | | | |
| `/api/auth/register` | POST | Register a new user | No |
| `/api/auth/login` | POST | Login user & get token | No |
| `/api/auth/me` | GET | Get current user data | Yes |
| `/api/auth/updatedetails` | PUT | Update name/email | Yes |
| `/api/auth/upload-photo` | POST | Upload profile picture | Yes |
| `/api/auth/change-password` | PUT | Change password | Yes |
| **Tasks** | | | |
| `/api/tasks` | GET | Get all user tasks | Yes |
| `/api/tasks` | POST | Create a new task | Yes |
| `/api/tasks/:id` | PUT | Update a task | Yes |
| `/api/tasks/:id` | DELETE | Delete a task | Yes |
| **Analytics** | | | |
| `/api/analytics` | GET | Get dashboard analytics data | Yes |

## �🔐 How Authentication Works

1. **Register/Login**: User sends credentials. Backend verifies and returns a **JWT**.
2. **Storage**: Frontend stores the JWT in `localStorage` (via AuthContext).
3. **Requests**: Axios interceptor attaches `Authorization: Bearer <token>` to every request header.
4. **Validation**: Backend `authMiddleware` verifies the signature of the token on protected routes.
5. **Expiry**: Tokens expire in 30 days (configurable).

## 📈 Scalability

"The UI focuses on clarity, accessibility, and scalability, following real-world dashboard patterns."

### Why it scales:
- **Stateless Auth**: JWTs allow the backend to be stateless, suitable for horizontal scaling.
- **Modular Code**: Separation of concerns (Controllers, Routes, Services) makes the codebase maintainable.
- **Performance**: Vite + React ensures a fast, optimized frontend experience.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---
**Author**: Antigravity (AI Agent)
