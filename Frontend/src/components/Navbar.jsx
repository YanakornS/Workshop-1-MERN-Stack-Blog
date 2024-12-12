import React, { useEffect, useState } from "react";
import { useAuthContext } from "../Contexts/AuthContext";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import Header from "./Header";
import UserProfile from "./UserProfile";

const Navbar = () => {
  const { user } = useAuthContext(); // ดึงข้อมูลผู้ใช้จาก context

  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 font-semibold  text-neutral rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><a href="/create">Create new Post</a></li>
              <li><a href="#">Item 3</a></li>
            </ul>
          </div>
          <a href="/Home" className="btn btn-ghost text-xl">
            <Header />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/create">Create new Post</a>
            </li>
            <li>
              <a href="#">Item 3</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex items-center space-x-2">
            {user ? (
              <div className="flex items-center space-x-2 border border-gray-300 rounded-lg shadow-xl px-2 py-1.5">
                <span className="text-sm">
                  Welcome, <span className="font-semibold">{user.username}</span>
                </span>
                <UserProfile />
              </div>
            ) : (
              <>
                <a href="/login">
                  <LoginButton />
                </a>
                <a href="/register">
                  <RegisterButton />
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
