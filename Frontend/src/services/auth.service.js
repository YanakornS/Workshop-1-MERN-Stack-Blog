import api from "./api";
import Tokenservice from "./token.service"; // นำเข้า Tokenservice

const BASE_URL = import.meta.env.VITE_BASE_URL; // ต้องตรวจสอบว่า BASE_URL ถูกต้อง

const register = async (username, password) => {
  return await api.post(BASE_URL + "/register", { username, password });
};

const login = async (username, password) => {
  try {
    const response = await api.post(BASE_URL + "/login", { username, password });
    if (response.data.token) {
      // เก็บข้อมูลทั้ง user และ token ลงใน localStorage
      Tokenservice.setUser({
        ...response.data.user,
        accessToken: response.data.token,
      });
      console.log("User data saved in localStorage:", localStorage.getItem("user"));
    }
    return response;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

const logout = () => {
  Tokenservice.removeUser(); // ลบข้อมูลเมื่อ logout
};

const getCurrentUser = () => {
  return Tokenservice.getUser(); // ดึงข้อมูลผู้ใช้ปัจจุบันจาก Tokenservice
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
