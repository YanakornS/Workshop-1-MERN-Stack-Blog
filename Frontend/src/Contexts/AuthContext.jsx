import React, { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user)); // เก็บผู้ใช้ลง localStorage
    } else {
      localStorage.removeItem("user"); // ลบผู้ใช้เมื่อออกจากระบบ
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
