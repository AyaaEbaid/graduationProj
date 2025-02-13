import React, { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import style from "./Login.module.css";
import ooo2 from "./../../assets/ooo  2.png";
import ooo from "./../../assets/ooo.png";
import logo from "./../../assets/white_logo.png";
import e from "./../../assets/Ellipse 2.png";
import p2 from './../../assets/p2.png'
import Navbar from "../Navbar/Navbar";

export default function Login() {

        useEffect(() => {
         
          document.body.style.overflow = "hidden";
    
          return () => {
            document.body.style.overflow = "auto";
          };
        }, []);
      
  return (
    <>
    
      <div className="relative overflow-hidden flex justify-center items-center w-full h-screen ">
      <div className="h-[80vh]">
      <div >
          <img
            src={ooo2}
            alt="backgrond1"
            className="absolute top-0 end-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[500px] xl:h-[500px] rounded-lg"
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
         <h1 className=" text-center py-5">تسجيل الدخول لحسابك</h1>
        <form action="">
        <div className="w-full">
           
           <input type="email" name="email"  id="email" className=" w-full shadow-md border-t-1 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#018A80 ] focus:border-[#018A80] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#018A80] dark:focus:border-[#018A80]" placeholder="البريد الالكتروني" required />
       </div>
       <div className="w-full">
          
          <input type="password" name="password"  id="password" className=" w-full mt-6 shadow-md border-t-1 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#018A80 ] focus:border-[#018A80] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#018A80] dark:focus:border-[#018A80]" placeholder="كلمه المرور" required />
      </div>
        </form>
        <p className="text-main pt-3 ps-3">نسيت كلمة المرور؟  </p>
        <div className="flex items-center py-6 justify-center my-6">
      <div className="w-20 h-[2px] bg-gray-300"></div>
      <span className="px-3 text-gray-600 text-lg font-semibold translate-y-[-2px]">أو</span>
      <div className="w-20 h-[2px] bg-gray-300"></div>
    </div>
    <div className="flex flex-nowrap justify-center gap-10 mt-4">
  
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
      </div>
    </>
  );
}
