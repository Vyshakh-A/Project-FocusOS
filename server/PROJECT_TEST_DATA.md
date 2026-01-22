# 📋 Project Schema API Testing - Test Data

## 📌 Project Schema Structure

```javascript
{
  userId: ObjectId (auto from auth),
  repoUrl: String (required),
  owner: String (required),
  repo: String (required),
  title: String (optional),
  description: String (optional),
  resources: [
    {
      title: String,
      url: String
    }
  ],
  lastCheckedAt: Date (auto)
}
```

---

## 🧪 Test Inputs

### **Test 1: Minimal Project (Required Fields Only)**

```json
{
    "repoUrl": "https://github.com/facebook/react",
    "title": "React Library"
}
```

**Response (201):**

```json
{
    "_id": "67a1b2c3d4e5f6g7h8i9j0k1",
    "userId": "67a1b2c3d4e5f6g7h8i9j999",
    "repoUrl": "https://github.com/facebook/react",
    "owner": "facebook",
    "repo": "react",
    "title": "React Library",
    "description": null,
    "resources": [],
    "lastCheckedAt": null,
    "createdAt": "2026-01-22T10:30:00.000Z",
    "updatedAt": "2026-01-22T10:30:00.000Z"
}
```

---

### **Test 2: Complete Project (All Fields)**

```json
{
    "repoUrl": "https://github.com/nodejs/node",
    "title": "Node.js Runtime",
    "description": "Node.js is an open-source, cross-platform JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more.",
    "resources": [
        {
            "title": "Official Documentation",
            "url": "https://nodejs.org/docs"
        },
        {
            "title": "API Reference",
            "url": "https://nodejs.org/api"
        },
        {
            "title": "Getting Started Guide",
            "url": "https://nodejs.org/en/docs/guides"
        }
    ]
}
```

**Response (201):**

```json
{
    "_id": "67a1b2c3d4e5f6g7h8i9j0k2",
    "userId": "67a1b2c3d4e5f6g7h8i9j999",
    "repoUrl": "https://github.com/nodejs/node",
    "owner": "nodejs",
    "repo": "node",
    "title": "Node.js Runtime",
    "description": "Node.js is an open-source, cross-platform JavaScript runtime environment that can run on Windows, Linux, Unix, macOS, and more.",
    "resources": [
        {
            "title": "Official Documentation",
            "url": "https://nodejs.org/docs"
        },
        {
            "title": "API Reference",
            "url": "https://nodejs.org/api"
        },
        {
            "title": "Getting Started Guide",
            "url": "https://nodejs.org/en/docs/guides"
        }
    ],
    "lastCheckedAt": null,
    "createdAt": "2026-01-22T10:32:00.000Z",
    "updatedAt": "2026-01-22T10:32:00.000Z"
}
```

---

### **Test 3: Project with Single Resource**

```json
{
    "repoUrl": "https://github.com/vuejs/vue",
    "title": "Vue.js Framework",
    "description": "The Progressive JavaScript Framework",
    "resources": [
        {
            "title": "Vue.js Guide",
            "url": "https://vuejs.org/guide"
        }
    ]
}
```

---

### **Test 4: Python Project Example**

```json
{
    "repoUrl": "https://github.com/django/django",
    "title": "Django Web Framework",
    "description": "The web framework for perfectionists with deadlines.",
    "resources": [
        {
            "title": "Django Documentation",
            "url": "https://docs.djangoproject.com"
        },
        {
            "title": "Django REST Framework",
            "url": "https://www.django-rest-framework.org"
        },
        {
            "title": "Django Tutorials",
            "url": "https://www.djangoproject.com/weblog"
        }
    ]
}
```

---

### **Test 5: Machine Learning Project**

```json
{
    "repoUrl": "https://github.com/tensorflow/tensorflow",
    "title": "TensorFlow",
    "description": "An Open Source Machine Learning Framework for Everyone",
    "resources": [
        {
            "title": "Official Website",
            "url": "https://www.tensorflow.org"
        },
        {
            "title": "Learn TensorFlow",
            "url": "https://www.tensorflow.org/learn"
        },
        {
            "title": "Tutorials",
            "url": "https://www.tensorflow.org/tutorials"
        },
        {
            "title": "API Documentation",
            "url": "https://www.tensorflow.org/api_docs"
        }
    ]
}
```

---

## 🔗 API Testing with cURL

### **Test 1: Create Minimal Project**

```bash
curl -X POST http://localhost:5000/api/projects/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "repoUrl": "https://github.com/facebook/react",
    "title": "React Library"
  }'
```

---

### **Test 2: Create Complete Project**

```bash
curl -X POST http://localhost:5000/api/projects/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "repoUrl": "https://github.com/nodejs/node",
    "title": "Node.js Runtime",
    "description": "Node.js is an open-source, cross-platform JavaScript runtime environment",
    "resources": [
      {
        "title": "Official Documentation",
        "url": "https://nodejs.org/docs"
      },
      {
        "title": "API Reference",
        "url": "https://nodejs.org/api"
      }
    ]
  }'
```

---

### **Test 3: Get All Projects**

```bash
curl -X GET http://localhost:5000/api/projects/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

### **Test 4: Get Project by ID**

```bash
curl -X GET http://localhost:5000/api/projects/67a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

---

### **Test 5: Update Project**

```bash
curl -X PATCH http://localhost:5000/api/projects/67a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -d '{
    "title": "React - Updated Title",
    "description": "A JavaScript library for building user interfaces with components",
    "resources": [
      {
        "title": "React Docs",
        "url": "https://react.dev"
      },
      {
        "title": "React Tutorial",
        "url": "https://react.dev/learn"
      },
      {
        "title": "React Blog",
        "url": "https://react.dev/blog"
      }
    ]
  }'
```

---

## 🧪 Postman/Insomnia JSON

If using Postman or Insomnia, import this collection:

```json
{
    "info": {
        "name": "FocusOS Projects API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "Create Minimal Project",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    },
                    {
                        "key": "Authorization",
                        "value": "Bearer {{accessToken}}"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n  \"repoUrl\": \"https://github.com/facebook/react\",\n  \"title\": \"React Library\"\n}"
                },
                "url": {
                    "raw": "http://localhost:5000/api/projects/",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "5000",
                    "path": ["api", "projects", ""]
                }
            }
        },
        {
            "name": "Create Full Project",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    },
                    {
                        "key": "Authorization",
                        "value": "Bearer {{accessToken}}"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n  \"repoUrl\": \"https://github.com/nodejs/node\",\n  \"title\": \"Node.js Runtime\",\n  \"description\": \"Node.js is an open-source, cross-platform JavaScript runtime environment\",\n  \"resources\": [\n    {\n      \"title\": \"Official Documentation\",\n      \"url\": \"https://nodejs.org/docs\"\n    },\n    {\n      \"title\": \"API Reference\",\n      \"url\": \"https://nodejs.org/api\"\n    }\n  ]\n}"
                },
                "url": {
                    "raw": "http://localhost:5000/api/projects/",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "5000",
                    "path": ["api", "projects", ""]
                }
            }
        },
        {
            "name": "Get All Projects",
            "request": {
                "method": "GET",
                "header": [
                    {
                        "key": "Authorization",
                        "value": "Bearer {{accessToken}}"
                    }
                ],
                "url": {
                    "raw": "http://localhost:5000/api/projects/",
                    "protocol": "http",
                    "host": ["localhost"],
                    "port": "5000",
                    "path": ["api", "projects", ""]
                }
            }
        }
    ]
}
```

---

## 🔑 Field Validation Rules

| Field               | Type   | Required      | Max Length | Notes                       |
| ------------------- | ------ | ------------- | ---------- | --------------------------- |
| `repoUrl`           | String | ✅ Yes        | -          | Must be valid GitHub URL    |
| `owner`             | String | ✅ Yes (auto) | -          | Auto-extracted from repoUrl |
| `repo`              | String | ✅ Yes (auto) | -          | Auto-extracted from repoUrl |
| `title`             | String | ❌ No         | 200        | From API validation         |
| `description`       | String | ❌ No         | 1000       | From API validation         |
| `resources`         | Array  | ❌ No         | -          | Must be array of objects    |
| `resources[].title` | String | ❌ No         | -          | Resource title              |
| `resources[].url`   | String | ❌ No         | -          | Resource URL                |

---

## ⚠️ Error Test Cases

### **Missing Required Field**

```json
{
    "title": "My Project"
}
```

**Response (400):**

```json
{
    "success": false,
    "message": "GitHub repository is required"
}
```

---

### **Invalid GitHub URL**

```json
{
    "repoUrl": "not-a-url",
    "title": "My Project"
}
```

**Response (400):**

```json
{
    "success": false,
    "message": "Invalid GitHub repository URL"
}
```

---

### **Unauthorized (Missing Token)**

```bash
curl -X POST http://localhost:5000/api/projects/ \
  -H "Content-Type: application/json" \
  -d '{"repoUrl": "https://github.com/user/repo"}'
```

**Response (401):**

```json
{
    "message": "Not authorized, no token"
}
```

---

## 📱 JavaScript Fetch Example

```javascript
// Get access token first (from login)
const accessToken = "your_access_token_here";

const projectData = {
    repoUrl: "https://github.com/facebook/react",
    title: "React Library",
    description: "A JavaScript library for building user interfaces",
    resources: [
        {
            title: "React Official",
            url: "https://react.dev",
        },
    ],
};

fetch("http://localhost:5000/api/projects/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(projectData),
})
    .then((res) => res.json())
    .then((data) => console.log("Created:", data))
    .catch((err) => console.error("Error:", err));
```

---

## 🎯 Complete Testing Flow

1. **Register** → Get accessToken
2. **Create Project 1** (minimal) → Get ID
3. **Create Project 2** (with resources) → Get ID
4. **Get All Projects** → Verify both exist
5. **Get Project by ID** → Verify data
6. **Update Project** → Change title/resources
7. **Get Updated Project** → Verify changes

---

## 💾 Sample Valid GitHub URLs

```
https://github.com/facebook/react
https://github.com/nodejs/node
https://github.com/vuejs/vue
https://github.com/angular/angular
https://github.com/torvalds/linux
https://github.com/kubernetes/kubernetes
https://github.com/openai/gpt-2
https://github.com/tensorflow/tensorflow
https://github.com/pandas-dev/pandas
https://github.com/psf/cpython
```

---

**Copy any test input and use with curl, Postman, or your frontend!** 🚀
