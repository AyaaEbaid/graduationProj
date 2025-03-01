import React, { useEffect } from "react";
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
import {motion} from 'framer-motion'
import { Link } from "react-router-dom";
export default function Register() {
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
    
    <div className="flex h-screen items-center justify-center  " style={{backgroundImage:`url(${bg2})`,backgroundSize:`cover`,backgroundPosition:`center`,backgroundPosition:`no-repeat`}}>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl mb-11 flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        {/* نموذج التسجيل */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="order-2  md:order-1 w-full md:w-1/2 p-8"
        >
          <h2 className="text-2xl font-bold text-teal-600 text-center">إنشاء حساب</h2>
         
          <form className="mt-2">
            <input
              type="text"
              placeholder="الاسم"
              className="w-full p-2 mb-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
            />
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full p-2 mb-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              className="w-full p-2 mb-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
            />
            <input
              type="text"
              placeholder=" رقم الهاتف"
              className="w-full p-2 mb-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
            />
            <input
              type="password"
              placeholder="تاكيد كلمة المرور"
              className="w-full p-2 mb-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
            />
             <input
              type="text"
              placeholder="  العنوان"
              className="w-full p-2 mb-3 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
            />

            <button className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700">
              إنشاء حساب
            </button>
                 <div className="flex justify-center items-center space-x-4 mt-2">
                  {/* أيقونة فيسبوك */}
                  <div className="w-8 h-8 flex items-center me-4 justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                    <FaFacebookF className="text-sm" />
                  </div>
            
                  {/* أيقونة جوجل */}
                  <div className="w-8 h-8 flex items-center  justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                    <FaGoogle className="text-sm" />
                  </div>
                </div>
          </form>
       

        </motion.div>

        {/* الجزء الملون */}
        <motion.div
          className="order-1 md:order-2 w-full md:w-1/2  bg-gradient-to-br from-teal-900 to-teal-400 text-white p-8 flex flex-col justify-center items-center"
        >
          <h2 className="text-3xl font-bold">انضم إلينا!</h2>
          <p className="text-center mt-2">هل لديك حساب بالفعل؟</p>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-teal-600"
            >
              تسجيل الدخول
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>



    </>
  )
}
