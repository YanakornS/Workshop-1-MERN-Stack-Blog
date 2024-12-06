import React from "react";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import Header from "./Header";

const menus = {
  ROLES_USER: [
    { name: "Home", link: "/home" },
    { name: "AddHotel", link: "/AddHotel" },
  ],
};

const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content text-white ">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a> Create</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a href="/Home" className="btn btn-ghost text-xl">
            <Header />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Create new Post</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="space-x-2">
            <a href="/login">
              <LoginButton />
            </a>
            <a href="/register">
              <RegisterButton />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
