import React from 'react'
import logo from './../../assets/white_logo.png'
import photoprofile from './../../assets/ProfileSmall.png'
import "./Navbar.module.css"

import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
    

<nav className=" border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl  flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="" className="flexitems-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className="h-8  w-full " alt=" Logo" />
      
  </a>
  <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      
      
      
      <button type="button" className="flex  text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
        <span className="sr-only">Open user menu</span>
        <img className="w-8 h-8  rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
      </button>
      
      
      <div className="z-50  hidden border absolute right-0 top-6 border-black  text-base list-none bg-[#018A80] divide-y divide-gray-100 rounded-xl shadow-sm dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
     
      <div className=" flex items-center  justify-center">
      {/* البطاقة */}
      <div className="relative bg-[#018A80]  w-80 rounded-2xl shadow-lg overflow-hidden">
        
        {/* الجزء العلوي الأخضر */}
        <div className="bg-[#018A80]  h-24 relative">
          {/* صورة المستخدم في المنتصف بين اللونين */}
          <div className="absolute  left-1/2 transform -translate-x-1/2 -bottom-10 w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center shadow-md border-4 border-white">
            <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.75 0 5-2.25 5-5s-2.25-5-5-5-5 2.25-5 5 2.25 5 5zm0 2c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7z" />
            </svg>
          </div>
        </div>

        {/* القسم الأبيض مع اسم المستخدم والمهنة */}
        <div className="pt-12  pb-6 text-center bg-white  font-[tahoma] rounded-t-[50px]">
          <h2 className="text-lg font-bold text-gray-800">اسم المستخدم</h2>
          <p className="text-gray-500  text-sm">المهنة</p>
        </div>

        {/* معلومات المستخدم */}
        <div className="px-6 pb-6 bg-white text-gray-700">
          <div className="flex items-center space-x-2 mb-3">
        
          <input type="text"
        className="w-full py-1 px-6  border-t-1 border-gray-200 text-gray-700 bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#018A80] focus:bg-white shadow-md"
      />
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-green-500">📞</span>
            <span>رقم الهاتف</span>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-red-500">✉️</span>
            <span>البريد الإلكتروني</span>
          </div>
        </div>

        {/* زر المزيد */}
        <div className="bg-white py-3 text-center rounded-b-2xl">
          <Link href="#" className="text-[#018A80] font-[tahoma] text-lg font-medium">المزيد </Link>
        </div>
      </div>
    </div>

      
      </div>
      
      <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        {/* <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg> */}
    </button>
  </div>
  <div className="items-center justify-between  hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4   text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <Link to="/" className="btn block py-2 px-3 text-white bg-[#8acdc7] rounded-sm md:bg-transparent md:text-[#8acdc7] md:p-0 md:dark:text-blue-500" aria-current="page">الرئيسيه</Link>
      </li>
      <li>
        <Link href="#" className="block btn py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#8acdc7] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">نبذه عنا</Link>
      </li>
      <li>
        <Link href="#" className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">الخدمات</Link>
      </li>
      <li>
        <Link href="#" className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">تواصل معنا</Link>
      </li>
      
    </ul>
  </div>
  </div>
</nav>



</>
  )
}
