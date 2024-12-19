import api from "./api";
import Tokenservice from "./token.service"; // นำเข้า Tokenservice
import { Cookies } from "react-cookie";

const BASE_URL = import.meta.env.VITE_BASE_URL; // ต้องตรวจสอบว่า BASE_URL ถูกต้อง
const API_URL = import.meta.env.VITE_BASE_URL;

const register = async (username, password) => {
  return await api.post(BASE_URL + "/register", { username, password });
};

const cookies = new Cookies();

///Login เก็บข้อมูลไว้ใน Cookies
const loginCookies = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });
  const { status, data } = response;
  if (status === 200) {
    if (data.accessToken) {
      cookies.set("accesstoken", data.accessToken, {
        path: "/",
        expires: new Date(Date.now() + 86400 * 1000), // 24 ชั่วโมง
        sameSite: "Lax",
        secure: false, // true ถ้ารันบน HTTPS
      });
    }
    cookies.set("user", JSON.stringify(data.user), {
      path: "/",
    });
  }
  console.log("Cookies set:", cookies.get("accesstoken"));
  return response;
};

///Login เก็บข้อมูลไว้ใน localStorage
const login = async (username, password) => {
  try {
    const response = await api.post(BASE_URL + "/login", {
      username,
      password,
    });
    if (response.data.token) {
      // เก็บข้อมูลทั้ง user และ token ลงใน localStorage
      Tokenservice.setUser({
        ...response.data.user,
        accessToken: response.data.token,
      });
      console.log(
        "User data saved in localStorage:",
        localStorage.getItem("user")
      );
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

const logoutCookies = () => {
  cookies.remove("token", { path: "/" }); // ลบข้อมูลเมื่อ logout
  cookies.remove("user", { path: "/" });
};

const getCurrentUser = () => {
  return Tokenservice.getUser(); // ดึงข้อมูลผู้ใช้ปัจจุบันจาก Tokenservice
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  logoutCookies,
  loginCookies,
};

export default AuthService;
