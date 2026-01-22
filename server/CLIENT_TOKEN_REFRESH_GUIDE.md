# 🔄 Client-Side Token Refresh Guide

## ❓ Quick Answer

**No, it does NOT happen automatically on the server.**

The **client (your app/frontend) must handle token refresh manually**.

Think of it like this:

- ⚙️ **Server** = The gatekeeper (tells you "your ticket expired")
- 📱 **Client (Your App)** = You (responsible for getting a new ticket)

---

## 🔴 What Happens When Token Expires

### Server Response:

```json
{
  "success": false,
  "message": "Token expired",
  "code": "TOKEN_EXPIRED",
  "expiredAt": "2026-01-22T15:30:00.000Z"
}
Status: 401
```

### Your App Must:

1. ✅ Detect this response
2. ✅ Use refresh token to get new access token
3. ✅ Retry the original request with new token
4. ✅ Continue app normally

---

## 💻 Implementation Examples

### **Option 1: Vanilla JavaScript**

```javascript
// 1. Create a fetch wrapper function
async function apiCall(url, options = {}) {
    let token = localStorage.getItem("accessToken");

    // Add token to headers
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    let response = await fetch(url, {
        ...options,
        headers,
    });

    // 2. Check if token expired (401 with TOKEN_EXPIRED)
    if (response.status === 401) {
        const data = await response.json();

        if (data.code === "TOKEN_EXPIRED") {
            // 3. Try to refresh the token
            const refreshed = await refreshToken();

            if (refreshed) {
                // 4. Get new token and retry request
                const newToken = localStorage.getItem("accessToken");
                headers.Authorization = `Bearer ${newToken}`;

                response = await fetch(url, {
                    ...options,
                    headers,
                });
            } else {
                // Refresh failed - user must login again
                window.location.href = "/login";
                return null;
            }
        }
    }

    return response;
}

// 5. Refresh token function
async function refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        return false; // No refresh token available
    }

    try {
        const response = await fetch("/api/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
        });

        if (!response.ok) {
            throw new Error("Refresh failed");
        }

        const data = await response.json();

        // 6. Save new access token
        localStorage.setItem("accessToken", data.accessToken);

        return true;
    } catch (error) {
        console.error("Token refresh error:", error);
        return false;
    }
}

// 7. Use it like normal fetch:
async function getTasks() {
    const response = await apiCall("/api/tasks");

    if (response) {
        const tasks = await response.json();
        console.log("Tasks:", tasks);
    }
}
```

---

### **Option 2: React with Axios Interceptor**

```javascript
// api/axiosConfig.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

let isRefreshing = false;
let failedQueue = [];

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if token expired
        if (
            error.response?.status === 401 &&
            error.response?.data?.code === "TOKEN_EXPIRED" &&
            !originalRequest._retry
        ) {
            if (isRefreshing) {
                // Queue this request to retry after refresh
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post("/api/auth/refresh", {
                    refreshToken,
                });

                const { accessToken } = response.data;
                localStorage.setItem("accessToken", accessToken);

                api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                // Retry all queued requests
                failedQueue.forEach(({ resolve }) => resolve(accessToken));
                failedQueue = [];

                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed - redirect to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);

// Add token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
```

**Usage in React:**

```javascript
import api from "./api/axiosConfig";

function Tasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Just use api normally - refresh handled automatically!
                const response = await api.get("/api/tasks");
                setTasks(response.data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return <div>{/* Render tasks */}</div>;
}
```

---

### **Option 3: React Context + Custom Hook**

```javascript
// AuthContext.js
import { createContext, useState, useCallback } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [tokens, setTokens] = useState(() => ({
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
    }));

    const refreshAccessToken = useCallback(async () => {
        try {
            const response = await fetch("/api/auth/refresh", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken: tokens.refreshToken }),
            });

            if (!response.ok) throw new Error("Refresh failed");

            const data = await response.json();
            const newAccessToken = data.accessToken;

            localStorage.setItem("accessToken", newAccessToken);
            setTokens((prev) => ({
                ...prev,
                accessToken: newAccessToken,
            }));

            return newAccessToken;
        } catch (error) {
            // Refresh failed
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setTokens({ accessToken: null, refreshToken: null });
            throw error;
        }
    }, [tokens.refreshToken]);

    return (
        <AuthContext.Provider value={{ tokens, refreshAccessToken }}>
            {children}
        </AuthContext.Provider>
    );
}

// useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
    return useContext(AuthContext);
}

// useFetch.js
import { useAuth } from "./useAuth";

export function useFetch() {
    const { tokens, refreshAccessToken } = useAuth();

    async function fetchWithRefresh(url, options = {}) {
        let response = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });

        // If token expired, refresh and retry
        if (response.status === 401) {
            const data = await response.json();
            if (data.code === "TOKEN_EXPIRED") {
                const newToken = await refreshAccessToken();
                response = await fetch(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        Authorization: `Bearer ${newToken}`,
                    },
                });
            }
        }

        return response;
    }

    return { fetchWithRefresh };
}

// Usage in component:
function Tasks() {
    const { fetchWithRefresh } = useFetch();

    useEffect(() => {
        const getTasks = async () => {
            const response = await fetchWithRefresh("/api/tasks");
            const data = await response.json();
            setTasks(data.tasks);
        };

        getTasks();
    }, []);
}
```

---

## 🎯 Flow Diagram

```
User makes API request
        ↓
Does accessToken exist?
    YES ↙                ↘ NO
   Send request       Redirect to login
        ↓
   401 + TOKEN_EXPIRED?
    YES ↙                ↘ NO
   Call /refresh      Return response
        ↓
   Got new token?
    YES ↙                ↘ NO
   Retry request     Redirect to login
        ↓
   Return response
```

---

## 🔒 Token Storage Security

### ⚠️ **localStorage** (Current - Simple)

```javascript
localStorage.setItem("accessToken", token);
localStorage.setItem("refreshToken", token);
```

**Pros:** Easy to use  
**Cons:** Vulnerable to XSS attacks

### ✅ **httpOnly Cookies** (More Secure - Recommended)

```javascript
// Server sets this (not JavaScript)
// Response header: Set-Cookie: accessToken=...; HttpOnly; Secure
```

**Pros:** Protected from JavaScript attacks  
**Cons:** Requires server setup

### 🟡 **Memory** (Most Secure but loses on refresh)

```javascript
let accessToken = null; // Lost on page refresh
```

---

## 📋 Checklist for Implementation

- [ ] Login endpoint returns both `accessToken` and `refreshToken`
- [ ] Client stores both tokens (localStorage or cookie)
- [ ] Every API request includes `Authorization: Bearer {accessToken}` header
- [ ] Check response for `401` + `TOKEN_EXPIRED` status
- [ ] If expired, call `/api/auth/refresh` with `refreshToken`
- [ ] Store new `accessToken`
- [ ] Retry original request with new token
- [ ] If refresh fails, redirect to login page
- [ ] Add loading state while refreshing

---

## ⚡ Quick Test

**Terminal:**

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Get accessToken and refreshToken from response
# Wait 15 minutes, then try to access protected route with old token

# Should get:
# {
#   "success": false,
#   "message": "Token expired",
#   "code": "TOKEN_EXPIRED"
# }

# Then use refreshToken to get new one:
curl -X POST http://localhost:5000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your_refresh_token_here"
  }'

# Should get new accessToken
```

---

## 🎓 Key Takeaways

1. ✅ **Server tells you when token expires** (401 + TOKEN_EXPIRED)
2. ✅ **Client must handle the refresh logic**
3. ✅ **Automatic refresh needs a wrapper function** (interceptor or custom hook)
4. ✅ **Always retry the original request** after getting new token
5. ✅ **Redirect to login if refresh fails**

---

## 🚀 Next Steps

1. Choose your approach (Vanilla JS, Axios, or React Context)
2. Implement the wrapper/interceptor
3. Use it instead of plain `fetch` or `axios`
4. Test by waiting for token to expire
5. Verify automatic refresh works

---

**Still confused?** Ask me to explain any specific part! 🎉
