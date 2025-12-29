import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally, verify token or set user
      setUser({ token }); // Simple, assume valid
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const res = await API.post("/auth/register", userData);
      const { token, newUser } = res.data;
      localStorage.setItem("token", token);
      setUser({ ...newUser, token });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const login = async (userData) => {
    try {
      const res = await API.post("/auth/login", userData);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setUser({ ...user, token });
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
