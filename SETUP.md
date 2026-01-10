# Setup Instructions

Follow these steps to set up the AuthBoard project locally on your machine.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas account)

---

## 1. Clone the Repository

```bash
git clone https://github.com/Bharath-Kumar-K-0930/AuthBoard.git
cd AuthBoard
```

---

## 2. Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your details:
     - `MONGO_URI`: Your MongoDB connection string.
     - `JWT_SECRET`: A secure random string for JWT.

4. **Run the Backend:**
   ```bash
   npm run dev
   ```
   The backend should now be running on `http://localhost:5000`.

---

## 3. Frontend Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and ensure `VITE_API_URL` points to your backend (default: `http://localhost:5000/api`).

4. **Run the Frontend:**
   ```bash
   npm run dev
   ```
   The frontend should now be running on `http://localhost:5173` (or the port shown in your terminal).

---

## 4. Troubleshooting

- **MongoDB Connection:** Ensure your `MONGO_URI` is correct and your IP is whitelisted if using MongoDB Atlas.
- **Port Conflicts:** If `5000` or `5173` are in use, you can change them in the respective `.env` or configuration files.
