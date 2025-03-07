import React, { useState } from "react";
import logo from "./../../assets/white_logo.png";
import photoprofile from "./../../assets/ProfileSmall.png";
import "./Navbar.module.css";
import { FaUser, FaSearch, FaUserCircle } from "react-icons/fa";

import { NavLink } from "react-router-dom";
export default function Navbar() {
  const [showInput, setShowInput] = useState(false); // حالة للتحكم في إظهار وإخفاء حقل الإدخال
  const [search, setSearch] = useState(""); 
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <>
     <nav className="border-gray-200 bg-teal-600 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="flex items-center w-[9%] space-x-3 rtl:space-x-reverse">
      <img src={logo} className="w-full min-h-7 object-cover" alt="Logo" />
    </div>
    <div className="flex rel text-xl items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <div className="items-center pr-3 justify-between hidden w-full md:flex md:w-auto md:order-1">
        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 ml-3 text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <NavLink to="login" className="block btn transition-colors duration-300 text-white hover:text-gray-800 dark:text-white dark:hover:text-gray-300 bg-transparent  px-3 py-0.5 rounded-3xl shadow-lg ring ring-white">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="register" className="block btn transition-colors duration-300 text-white hover:text-gray-800 dark:text-white dark:hover:text-gray-300 bg-transparent px-3 py-0.5 rounded-3xl shadow-lg ring ring-white">
              Sign Up
            </NavLink>
          </li>
        </ul>
      </div>

      {/* User Icon */}
      <div className="relative z-10" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
        <button type="button" className="flex w-8 h-8  items-center justify-center rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded={isOpen} data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={() => setIsOpen(false)}>
          <span className="sr-only">Open user menu</span>
          <FaUserCircle className="text-gray-100  text-3xl" />
        </button>
        {isOpen && (
          <div className="absolute left-1/2 top-12 -translate-x-1/2 w-40 bg-white shadow-lg rounded-lg transition-all duration-300 z-[-10]">
            <h2 className="px-4 py-2 cursor-pointer">Profile</h2>
          </div>
        )}
      </div>
    </div>
    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
      <ul className="flex flex-col font-medium text-xl p-4 md:p-0 mt-4 text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink to="/" className="relative group btn block py-2 px-3 text-gray-800 hover:text-gray-800 bg-transparent rounded-sm md:bg-transparent md:text-gray-800 md:p-0">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="#" className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0">
            About Us
          </NavLink>
        </li>
        <li>
          <NavLink to="services" className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0">
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="rate" className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0">
            Rate us
          </NavLink>
        </li>
        <li>
          <NavLink to="#" className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  );
}
