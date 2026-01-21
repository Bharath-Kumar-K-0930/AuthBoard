# AuthBoard API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### 1. Register User
- **Endpoint**: `POST /auth/register`
- **Access**: Public
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 2. Login User
- **Endpoint**: `POST /auth/login`
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### 3. Get Current User
- **Endpoint**: `GET /auth/me`
- **Access**: Private (Bearer Token required)
- **Headers**:
  ```
  Authorization: Bearer <token>
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "60d0fe4f5311236168a109ca",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2021-06-21T10:00:00.000Z",
    "updatedAt": "2021-06-21T10:00:00.000Z"
  }
  ```

## Tasks

### 1. Get All Tasks
- **Endpoint**: `GET /tasks`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200 OK):
  ```json
  [
    {
      "_id": "60d0fe4f5311236168a109cb",
      "user": "60d0fe4f5311236168a109ca",
      "title": "Finish Project",
      "description": "Complete AuthBoard",
      "status": "pending",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
  ```

### 2. Create Task
- **Endpoint**: `POST /tasks`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task description details...",
    "status": "pending" 
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "_id": "...",
    "user": "...",
    "title": "New Task",
    "description": "Task description details...",
    "status": "pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
  ```

### 3. Update Task
- **Endpoint**: `PUT /tasks/:id`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body** (fields to update):
  ```json
  {
    "status": "completed"
  }
  ```
- **Response** (200 OK): Returns updated task object.

### 4. Delete Task
- **Endpoint**: `DELETE /tasks/:id`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Response** (200 OK):
  ```json
  {
    "id": "60d0fe4f5311236168a109cb"
  }
  ```
