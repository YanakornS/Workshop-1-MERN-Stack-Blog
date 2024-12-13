import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"; // ใช้สำหรับการนำทาง
import AuthService from "../services/auth.service"; // เชื่อมต่อ AuthService
import Swal from "sweetalert2"; // แจ้งเตือน
import { useAuthContext } from "../Contexts/AuthContext"; // import useAuthContext

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, user: loggedUser } = useAuthContext(); // เรียกใช้ login จาก context
  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AuthService.loginCookies(username, password);
      if (response.status === 200) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome back!",
          icon: "success",
        });
        login(response.data.user); // เรียกใช้ login จาก context เพื่ออัปเดตสถานะผู้ใช้
        navigate("/Home");
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid username or password.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
