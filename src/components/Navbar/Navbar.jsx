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
      <nav className=" border-gray-200 bg-teal-600 dark:bg-gray-900">
        <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flexitems-center   w-[9%] space-x-3 rtl:space-x-reverse">
            <img src={logo} className="  w-full min-h-7   object-cover   " alt=" Logo" />
          </div>
          <div className="flex rel text-xl items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div className=" items-center pr-3  justify-between  hidden w-full  md:flex md:w-auto md:order-1 ">
              <ul className="flex flex-col font-medium  p-4 md:p-0 mt-4 text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="login"
                    className="block btn transition-colors duration-300 text-white hover:text-gray-800 dark:text-white dark:hover:text-gray-300 bg-transparent px-3 py-0.5 rounded-3xl  shadow-lg ring ring-white"
                  >
                    تسجيل الدخول
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    className="block btn transition-colors duration-300 text-white hover:text-gray-800 dark:text-white dark:hover:text-gray-300 bg-transparent px-3 py-0.5 rounded-3xl   shadow-lg ring ring-white"
                  >
                    انشاء حساب
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* <div className="flex space-x-4 p-4 bg-gray-200">
      <FaUser className="text-gray-700 text-2xl" />
      <FaSearch className="text-gray-700 text-2xl" />
    </div> */}
      {/* <div className="flex items-center justify-center ">
      <button
        className="p-2 pl-6 text-white rounded-full hover:text-gray-800 transition"
        onClick={() => setShowInput(!showInput)}
      >
        <FaSearch className="text-xl" />
      </button>

      
      <div
        className={`absolute left-[25%] z-10 top-14 transition-all duration-500 transform ${
          showInput ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <input
          type="text"
          className="w-96 h-8 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-700 shadow-md"
          placeholder="ابحث هنا..."
        />
      </div>
    </div> */}
  

  


 
      {/* أيقونة المستخدم */}
      <div 
        className="relative z-10" // جعل الأيقونة فوق الـ popup
        onMouseEnter={() => setIsOpen(true)} // عند تمرير الماوس يظهر البوب أب
        onMouseLeave={() => setIsOpen(false)} // عند الخروج يختفي إلا إذا تم الضغط
      >
        <button
          type="button"
          className="flex w-8 h-8 items-center justify-center rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded={isOpen}
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
          onClick={() => setIsOpen(false)} // عند الضغط، يتم إخفاء البوب أب
        >
          <span className="sr-only">Open user menu</span>
          {/* <FaUser className=" h-5 w-5 text-2xl " /> */}
          <FaUserCircle className="text-gray-100 text-3xl" />
        </button>

        {/* البوب أب (يظهر عند hover ويختفي عند الضغط) */}
        {isOpen && (
          <div className="absolute left-1/2 top-12 -translate-x-1/2 w-40 bg-white shadow-lg rounded-lg transition-all duration-300 z-[-10]">
           
              <h2 className="px-4 py-2  cursor-pointer">الملف الشخصي</h2>

           
          </div>
        )}
      </div>


            <div
              className="z-50  hidden border absolute   border-black  text-base list-none bg-[#018A80] divide-y divide-gray-100 rounded-xl shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              <div className=" flex items-center  justify-center">
                {/* البطاقة */}
                <div className=" bg-[#018A80]  w-80 rounded-2xl shadow-lg overflow-hidden">
                  {/* الجزء العلوي الأخضر */}
                  <div className="bg-[#018A80]  h-24 ">
                    {/* صورة المستخدم في المنتصف بين اللونين */}
                    <div className="absolute  left-1/2 top-12 transform -translate-x-1/2  w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center shadow-md border-4 border-white">
                      {/* <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.75 0 5-2.25 5-5s-2.25-5-5-5-5 2.25-5 5 2.25 5 5zm0 2c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7z" />
            </svg> */}
                    </div>
                  </div>

                  {/* القسم الأبيض مع اسم المستخدم والمهنة */}
                  <div className="pt-12  pb-6 text-center bg-white  font-[tahoma] rounded-t-[50px]">
                    <h2 className="text-lg font-bold text-gray-800">
                      اسم المستخدم
                    </h2>
                    <p className="text-gray-500  text-sm">المهنة</p>
                  </div>

                  {/* معلومات المستخدم */}
                  <div className="px-6 pb-6 bg-white text-gray-700">
                    <div className="flex items-center space-x-2 mb-3">
                     
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                     
                    </div>
                  </div>

                  {/* زر المزيد */}
                  <div className="bg-white py-3 text-center rounded-b-2xl">
                    <NavLink
                      href="#"
                      className="text-[#018A80] font-[tahoma] text-lg font-medium"
                    >
                      المزيد{" "}
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between  hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium text-xl p-4 md:p-0 mt-4 text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="relative group btn block py-2 px-3 text-gray-800 hover:text-gray-800 bg-transparent rounded-sm md:bg-transparent md:text-gray-800 md:p-0"
                  aria-current="page"
                >
                  الرئيسيه
                  <span className="hidden md:block absolute bottom-0 left-0 h-0.5 w-full bg-gray-800 transform scale-x-100 transition-transform duration-500 ease-out"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0"
                >
                  نبذه عنا
                  <span className="hidden md:block absolute bottom-0 left-0 h-0.5 w-full bg-gray-800 transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="services"
                  className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0"
                >
                  الخدمات
                  <span className="hidden md:block absolute bottom-0 left-0 h-0.5 w-full bg-gray-800 transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                </NavLink>
                
              </li>
              <li>
                <NavLink
                  to="rate"
                  className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0"
                >
                  قيمنا
                  <span className="hidden md:block absolute bottom-0 left-0 h-0.5 w-full bg-gray-800 transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  href="#"
                  className="relative group btn block py-2 px-3 text-white hover:text-gray-800 rounded-sm md:p-0"
                >
                  تواصل معنا
                  <span className="hidden md:block absolute bottom-0 left-0 h-0.5 w-full bg-gray-800 transform scale-x-0 origin-right transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
