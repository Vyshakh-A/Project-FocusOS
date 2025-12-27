import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const fetchTasks = (params) => API.get("/tasks", { params });
export const createTask = (payload) => API.post("/tasks", payload);
export const updateTask = (id, payload) => API.put(`/tasks/${id}`, payload);
