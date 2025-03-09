import React, { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import style from './Register.module.css'
import ooo2 from "./../../assets/ooo  2.png";
import ooo from "./../../assets/ooo.png";
import logo from "./../../assets/white_logo.png";
import p2 from './../../assets/p2.png'
import bg from './../../assets/bg1.jpg'
import bg2 from './../../assets/bg2.jpg'
import bg3 from './../../assets/bg3.jpg'
import bg4 from './../../assets/bg4.jpg'
import {motion,AnimatePresence} from 'framer-motion'
import { Link } from "react-router-dom";
export default function Register() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const governorates = ["القاهرة", "الإسكندرية", "الجيزة"];
  const centers = ["المعادي", "مدينة نصر", "الزمالك"];





      useEffect(() => {
             
              document.body.style.overflow = "hidden";
        
              return () => {
                document.body.style.overflow = "auto";
              };
            }, []);
          
  return (
    <>
    
    
{/*     
     <div className="relative overflow-hidden flex justify-center items-center w-full h-screen ">
          <div className="h-[80vh]">
          <div >
              <img
                src={ooo2}
                alt="backgrond1"
                className="absolute top-0 end-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px]"
              />
              <img
                src={p2}
                alt="backgrond2"
                className="absolute bottom-0 start-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-lg"
              />
            </div>
          </div>
            <div className="w-2/3  h-[450px] flex gap-8   bg-white shadow-lg shadow-gray-500/50 drop-shadow-[6px_6px_10px_rgba(0,0,0,0.3)]">
              <div className="w-[40%] flex ">
                
                <img src={ooo} alt="Background3" className="w-full h-full " />
    
                
                <img
                  src={logo}
                  alt="Overlay"
                  className="absolute top-40 w-20 md:w-48 z-10 right-0 opacity-80"
                />
              </div>
              <div className="w-1/2">
             <div className="  mx-auto  me-3 ">
             <h1 className=" text-center py-3">أنشىء حساب جديد</h1>
            <form action="">
            <div className="w-full">
               
               <input type="name" name="name"  id="name" className=" w-full shadow-md border-t-1 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#018A80 ] focus:border-[#018A80] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#018A80] dark:focus:border-[#018A80]" placeholder=" اسم المستخدم" required />
           </div>
           <div className="w-full">
              
              <input type="text" name="phone"  id="phone" className=" w-full mt-2 shadow-md border-t-1 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#018A80 ] focus:border-[#018A80] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#018A80] dark:focus:border-[#018A80]" placeholder=" رقم الهاتف" required />
          </div>
          <div className="w-full">
              
              <input type="email" name="email"  id="email" className=" w-full mt-2 shadow-md border-t-1 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#018A80 ] focus:border-[#018A80] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#018A80] dark:focus:border-[#018A80]" placeholder=" البريد الالكتروني" required />
          </div>
         
          <div className="w-full">
              
              <input type="password" name="password"  id="password" className=" w-full mt-2 shadow-md border-t-1 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#018A80 ] focus:border-[#018A80] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#018A80] dark:focus:border-[#018A80]" placeholder="كلمه المرور" required />
          </div>
          <div className="w-full">
              
              <input type="password" name="repassword"  id="repassword" className=" w-full mt-2 shadow-md border-t-1 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#018A80 ] focus:border-[#018A80] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#018A80] dark:focus:border-[#018A80]" placeholder="تاكيد كلمه المرور" required />
          </div>
          
            </form>
            
            <div className="flex items-center py-3 justify-center ">
          <div className="w-20 h-[2px] bg-gray-300"></div>
          <span className="px-3 text-gray-600 text-lg font-semibold translate-y-[-2px]">أو</span>
          <div className="w-20 h-[2px] bg-gray-300"></div>
        </div>
        <div className="flex flex-nowrap justify-center pb-3 gap-10 ">
      
      <div className="bg-white shadow-lg rounded-full p-2 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
        <FaFacebook className="text-blue-500 text-xl sm:text-2xl md:text-3xl" />
      </div>
      
      <div className="bg-white shadow-lg rounded-full p-3 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
        <FcGoogle className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </div>
    </div>
    
             </div>
            </div>
            </div>
          </div> */}
    
    <div
  className="flex h-screen items-center justify-center"
  style={{
    backgroundImage: `url(${bg2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
    className="w-full max-w-2xl mb-11 flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden"
  >
    {/* Registration Form */}
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="order-2 md:order-1 w-full md:w-1/2 p-8"
    >
      <h2 className="text-2xl font-bold text-teal-600 text-center">Create an Account</h2>

      <form className="mt-3">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-1 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
        />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-1 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-1 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
        />
         <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-1 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
        />
        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-1 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
        />
     

      
<button id="dropdownDefaultButton" data-dropdown-toggle="dropdown"  className="w-full flex justify-between items-center p-1 mb-2 border border-gray-500 text-gray-600 rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600" type="button">Select Government <svg className="w-2.5 h-2.5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
</svg>
</button>



<div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
    <ul className="py-2  text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
    <li>
        <Link to="" className="block px-4 py-2 hover:bg-teal-600 dark:hover:bg-gray-600 dark:hover:text-white">Select Government1</Link>
      </li>
      <li>
        <Link to="" className="block px-4 py-2 hover:bg-teal-600 dark:hover:bg-gray-600 dark:hover:text-white">Select Government2</Link>
      </li>
      <li>
        <Link to="" className="block px-4 py-2 hover:bg-teal-600 dark:hover:bg-gray-600 dark:hover:text-white">Select Government3</Link>
      </li>
     
    </ul>
</div>
{/* center */}

<button id="dropdownCenterButton" data-dropdown-toggle="dropdownCenterMenu" className="w-full mb-5 flex justify-between items-center p-1  border border-gray-500 text-gray-600 rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600" type="button">
  Select Center
  <svg className="w-2.5 h-2.5 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
  </svg>
</button>

<div id="dropdownCenterMenu" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCenterButton">
    <li>
      <Link to="" className="block px-4 py-2 hover:bg-teal-600 dark:hover:bg-gray-600 dark:hover:text-white">Select Center1</Link>
    </li>
    <li>
      <Link to="" className="block px-4 py-2 hover:bg-teal-600 dark:hover:bg-gray-600 dark:hover:text-white">Select Center2</Link>
    </li>
    <li>
      <Link to="" className="block px-4 py-2 hover:bg-teal-600 dark:hover:bg-gray-600 dark:hover:text-white">Select Center3</Link>
    </li>
  </ul>
</div>

   



        <button className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700">
          Sign Up
        </button>

        <div className="flex justify-center items-center space-x-4 mt-2">
          {/* Facebook Icon */}
          <div className="w-8 h-8 flex items-center me-4 justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
            <FaFacebookF className="text-sm" />
          </div>

          {/* Google Icon */}
          <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
            <FaGoogle className="text-sm" />
          </div>
        </div>
      </form>
    </motion.div>

    {/* Colored Section */}
    <motion.div
      className="order-1 md:order-2 w-full md:w-1/2 bg-gradient-to-br from-teal-900 to-teal-400 text-white p-8 flex flex-col justify-center items-center"
    >
      <h2 className="text-3xl font-bold">Join Us!</h2>
      <p className="text-center mt-2">Already have an account?</p>
      <Link to="/login">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-teal-600"
        >
          Sign In
        </motion.button>
      </Link>
    </motion.div>
  </motion.div>
</div>




    </>
  )
}
