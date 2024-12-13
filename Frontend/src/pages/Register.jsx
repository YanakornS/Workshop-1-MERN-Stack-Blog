import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service"; // ถ้าคุณใช้ AuthService
import { useNavigate } from "react-router"; // เปลี่ยนเป็น useNavigate ที่ถูกต้อง
import Swal from "sweetalert2"; // เพิ่ม SweetAlert2 สำหรับแจ้งเตือน
import { useAuthContext } from "../Contexts/AuthContext"; // import useAuthContext

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const { user: loggedUser } = useAuthContext(); // เรียกใช้ login จาก context
  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อกด Submit

    try {
      const response = await AuthService.register(user.username, user.password); // ใช้ async/await สำหรับการสมัคร
      if (response.status === 200) {
        Swal.fire({
          title: "User Registration",
          text: response.data.message || "Registration successful!",
          icon: "success",
        });
        navigate("/login"); // หลังจากสมัครเสร็จให้ไปหน้า login
      } else {
        Swal.fire({
          title: "Error",
          text:
            response.data.message || "Registration failed. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
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
              name="username" // เพิ่ม name attribute
              className="input input-bordered w-full"
              value={user.username} // ใช้ user.username
              onChange={handleChange} // ใช้ handleChange
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
              name="password" // เพิ่ม name attribute
              className="input input-bordered w-full"
              value={user.password} // ใช้ user.password
              onChange={handleChange} // ใช้ handleChange
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
