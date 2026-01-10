# AuthBoard API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register User
- **Endpoint:** `POST /auth/register`
- **Description:** Register a new user and return a JWT token.
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secretpassword"
  }
  ```
- **Response (201):**
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### Login User
- **Endpoint:** `POST /auth/login`
- **Description:** Authenticate user and return a JWT token.
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "secretpassword"
  }
  ```
- **Response (200):** Same as Register.

### Get User Profile
- **Endpoint:** `GET /auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Description:** Get current logged-in user's data.

### Update User Profile
- **Endpoint:** `PUT /auth/updatedetails`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```
- **Description:** Update user's name or email.

---

## Tasks (Protected)

**All endpoints require:** `Authorization: Bearer <token>`

### Get All Tasks
- **Endpoint:** `GET /tasks`
- **Description:** Get all tasks for the logged-in user.
- **Response (200):**
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "user": "60d0fe4f5311236168a109ca",
      "title": "Learn React",
      "description": "Watch tutorials",
      "status": "pending",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
  ```

### Create Task
- **Endpoint:** `POST /tasks`
- **Body:**
  ```json
  {
    "title": "New Task",
    "description": "Description here"
  }
  ```

### Update Task
- **Endpoint:** `PUT /tasks/:id`
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "completed"
  }
  ```

### Delete Task
- **Endpoint:** `DELETE /tasks/:id`
- **Response (200):** ` { "id": "task_id" }`
