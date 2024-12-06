import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // เพิ่มฟังก์ชันสำหรับการล็อกอิน เช่น ส่งข้อมูลไป API
    console.log({ email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-[#8B5DFF] to-[#5A3DFF]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
