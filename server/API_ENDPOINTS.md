# 📚 FocusOS API Endpoints Documentation

## 🔐 Authentication Endpoints

Base URL: `/api/auth`

### 1. User Registration

- **Method**: `POST`
- **Path**: `/api/auth/register`
- **Authentication**: ❌ Not Required
- **Description**: Register a new user account
- **Request Body**:
    ```json
    {
        "name": "string",
        "email": "string",
        "password": "string"
    }
    ```
- **Response** (201):
    ```json
    {
        "success": true,
        "message": "User registered successfully",
        "token": "JWT_TOKEN"
    }
    ```

### 2. User Login

- **Method**: `POST`
- **Path**: `/api/auth/login`
- **Authentication**: ❌ Not Required
- **Description**: Authenticate user and get JWT token
- **Request Body**:
    ```json
    {
        "email": "string",
        "password": "string"
    }
    ```
- **Response** (200):
    ```json
    {
        "success": true,
        "message": "Logged in successfully",
        "token": "JWT_TOKEN"
    }
    ```

---

## ✅ Task Management Endpoints

Base URL: `/api/tasks`

### 3. Create Task

- **Method**: `POST`
- **Path**: `/api/tasks/`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Create a new task for the authenticated user
- **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string (optional)",
        "dueDate": "ISO_DATE (optional)",
        "completed": "boolean (optional, default: false)"
    }
    ```
- **Response** (201):
    ```json
    {
        "message": "Task created successfully",
        "task": {
            "_id": "ObjectId",
            "title": "string",
            "description": "string",
            "dueDate": "ISO_DATE",
            "completed": false,
            "user": "ObjectId",
            "createdAt": "ISO_DATE",
            "updatedAt": "ISO_DATE"
        }
    }
    ```

### 4. Get All Tasks

- **Method**: `GET`
- **Path**: `/api/tasks/`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Retrieve all tasks for the authenticated user
- **Query Parameters**: None
- **Response** (200):
    ```json
    {
      "tasks": [
        {
          "_id": "ObjectId",
          "title": "string",
          "description": "string",
          "dueDate": "ISO_DATE",
          "completed": boolean,
          "user": "ObjectId",
          "createdAt": "ISO_DATE",
          "updatedAt": "ISO_DATE"
        }
      ]
    }
    ```

### 5. Get Today's Tasks

- **Method**: `GET`
- **Path**: `/api/tasks/today`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Retrieve tasks due today for the authenticated user
- **Query Parameters**: None
- **Response** (200):
    ```json
    {
      "status": "success",
      "results": 3,
      "data": [
        {
          "_id": "ObjectId",
          "title": "string",
          "description": "string",
          "dueDate": "ISO_DATE",
          "completed": boolean,
          "user": "ObjectId",
          "createdAt": "ISO_DATE",
          "updatedAt": "ISO_DATE"
        }
      ]
    }
    ```

### 6. Update Task

- **Method**: `PUT`
- **Path**: `/api/tasks/:id`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Update a specific task
- **URL Parameters**:
    - `id` - Task ID (required)
- **Request Body**:
    ```json
    {
        "title": "string (optional)",
        "description": "string (optional)",
        "dueDate": "ISO_DATE (optional)",
        "completed": "boolean (optional)"
    }
    ```
- **Response** (200):
    ```json
    {
      "message": "Task updated successfully",
      "update": {
        "_id": "ObjectId",
        "title": "string",
        "description": "string",
        "dueDate": "ISO_DATE",
        "completed": boolean,
        "user": "ObjectId",
        "createdAt": "ISO_DATE",
        "updatedAt": "ISO_DATE"
      }
    }
    ```

### 7. Delete Task

- **Method**: `DELETE`
- **Path**: `/api/tasks/:id`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Delete a specific task
- **URL Parameters**:
    - `id` - Task ID (required)
- **Response** (200):
    ```json
    {
        "message": "Task deleted successfully"
    }
    ```

---

## 📝 Daily Problem (DSA) Endpoints

Base URL: `/api/dsa`

### 8. Get Today's Daily Problem

- **Method**: `GET`
- **Path**: `/api/dsa/today`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Retrieve today's DSA problem for the user
- **Query Parameters**: None
- **Response** (200):
    ```json
    {
      "key": "string",
      "topic": "string",
      "insight": "string",
      "leetcodeUrl": "string",
      "understandPrompts": ["string"],
      "rotationIndex": number,
      "_id": "ObjectId",
      "createdAt": "ISO_DATE",
      "updatedAt": "ISO_DATE"
    }
    ```

### 9. Mark DSA Problem as Completed

- **Method**: `POST`
- **Path**: `/api/dsa/complete`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Mark today's DSA problem as completed and advance to next rotation
- **Request Body**: None
- **Response** (200):
    ```json
    {
        "message": "DSA marked as completed"
    }
    ```

---

## 🚀 Project Management Endpoints

Base URL: `/api/projects`

### 10. Create Project

- **Method**: `POST`
- **Path**: `/api/projects/`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Create a new project with GitHub repository tracking
- **Request Body**:
    ```json
    {
        "title": "string",
        "description": "string (optional)",
        "repoUrl": "string (required - GitHub repo URL)",
        "resources": [
            {
                "title": "string",
                "url": "string"
            }
        ]
    }
    ```
- **Response** (201):
    ```json
    {
        "_id": "ObjectId",
        "userId": "ObjectId",
        "repoUrl": "string",
        "owner": "string",
        "repo": "string",
        "title": "string",
        "description": "string",
        "resources": [
            {
                "title": "string",
                "url": "string"
            }
        ],
        "lastCheckedAt": "ISO_DATE",
        "createdAt": "ISO_DATE",
        "updatedAt": "ISO_DATE"
    }
    ```

### 11. Get All Projects

- **Method**: `GET`
- **Path**: `/api/projects/`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Retrieve all projects for the authenticated user with GitHub activity status
- **Query Parameters**: None
- **Response** (200):
    ```json
    [
      {
        "_id": "ObjectId",
        "userId": "ObjectId",
        "repoUrl": "string",
        "owner": "string",
        "repo": "string",
        "title": "string",
        "description": "string",
        "resources": [
          {
            "title": "string",
            "url": "string"
          }
        ],
        "lastCheckedAt": "ISO_DATE",
        "isActive": boolean,
        "activity": {
          "lastCommitAt": "ISO_DATE",
          "commits48h": number
        },
        "createdAt": "ISO_DATE",
        "updatedAt": "ISO_DATE"
      }
    ]
    ```

### 12. Get Project by ID

- **Method**: `GET`
- **Path**: `/api/projects/:id`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Retrieve a specific project by ID
- **URL Parameters**:
    - `id` - Project ID (required)
- **Response** (200):
    ```json
    {
        "_id": "ObjectId",
        "userId": "ObjectId",
        "repoUrl": "string",
        "owner": "string",
        "repo": "string",
        "title": "string",
        "description": "string",
        "resources": [
            {
                "title": "string",
                "url": "string"
            }
        ],
        "lastCheckedAt": "ISO_DATE",
        "createdAt": "ISO_DATE",
        "updatedAt": "ISO_DATE"
    }
    ```

### 13. Update Project

- **Method**: `PATCH`
- **Path**: `/api/projects/:id`
- **Authentication**: ✅ Required (Bearer Token)
- **Description**: Update a specific project
- **URL Parameters**:
    - `id` - Project ID (required)
- **Request Body**:
    ```json
    {
        "title": "string (optional)",
        "description": "string (optional)",
        "resources": [
            {
                "title": "string",
                "url": "string"
            }
        ]
    }
    ```
- **Response** (200):
    ```json
    {
        "_id": "ObjectId",
        "userId": "ObjectId",
        "repoUrl": "string",
        "owner": "string",
        "repo": "string",
        "title": "string",
        "description": "string",
        "resources": [
            {
                "title": "string",
                "url": "string"
            }
        ],
        "lastCheckedAt": "ISO_DATE",
        "createdAt": "ISO_DATE",
        "updatedAt": "ISO_DATE"
    }
    ```

---

## 📊 Endpoints Summary Table

| #   | Method | Path                 | Auth | Description       |
| --- | ------ | -------------------- | ---- | ----------------- |
| 1   | POST   | `/api/auth/register` | ❌   | Register new user |
| 2   | POST   | `/api/auth/login`    | ❌   | Authenticate user |
| 3   | POST   | `/api/tasks/`        | ✅   | Create task       |
| 4   | GET    | `/api/tasks/`        | ✅   | Get all tasks     |
| 5   | GET    | `/api/tasks/today`   | ✅   | Get today's tasks |
| 6   | PUT    | `/api/tasks/:id`     | ✅   | Update task       |
| 7   | DELETE | `/api/tasks/:id`     | ✅   | Delete task       |
| 8   | GET    | `/api/dsa/today`     | ✅   | Get today's DSA   |
| 9   | POST   | `/api/dsa/complete`  | ✅   | Complete DSA      |
| 10  | POST   | `/api/projects/`     | ✅   | Create project    |
| 11  | GET    | `/api/projects/`     | ✅   | Get all projects  |
| 12  | GET    | `/api/projects/:id`  | ✅   | Get project by ID |
| 13  | PATCH  | `/api/projects/:id`  | ✅   | Update project    |

---

## 🔑 Authentication Header Format

For all authenticated endpoints, include the following header:

```
Authorization: Bearer <JWT_TOKEN>
```

Example:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## ⚠️ Error Response Format

All endpoints follow a consistent error response format:

```json
{
    "success": false,
    "message": "Error description",
    "statusCode": 400
}
```

Common HTTP Status Codes:

- `200` - OK / Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🚀 Example Usage

### Register and Login Flow

```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'

# 2. Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'

# 3. Use token for authenticated requests
curl -X GET http://localhost:5000/api/tasks/ \
  -H "Authorization: Bearer <TOKEN_FROM_LOGIN>"
```

---

**Last Updated**: January 22, 2026  
**API Version**: 1.0.0  
**Base URL**: `http://localhost:5000`
