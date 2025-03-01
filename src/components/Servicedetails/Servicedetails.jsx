import React, { useEffect, useState } from 'react'
import {motion ,AnimatePresence, delay} from 'framer-motion'
import style from './Servicedetails.module.css'
export default function Servicedetails() {
    useEffect(() => {
                
                 document.body.style.overflow = "hidden";
           
                 return () => {
                   document.body.style.overflow = "auto";
                 };
               }, []);
  const sentence = "اختر خدمتنا.. بوابتك لتحقيق التميز.";

  // متغيرات الحاوية لتأخير ظهور كل حرف
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren:1,
        staggerChildren: 0.06, // تأخير 0.1 ثانية لكل حرف
      },
    },
  };

  // متغيرات ظهور كل حرف
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, delay:3, y: 0 },
  };

  const buttonVariants = {
    hidden: { x: 200, opacity: 0 },
    visible: (custom)=>({
      x: 0,
      opacity: 1,
      transition: {
        delay:custom*3,
        duration: 3,
      },
    }),
  };
  
  // أنيميشن القائمة
  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 1 },
    },
  };
  
  
 
   
  
  const [openDropdown, setOpenDropdown] = React.useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const centers = ["مركز 1", "مركز 2", "مركز 3"];
  const governorates = ["محافظة 1", "محافظة 2", "محافظة 3"];
  const services = ["خدمة 1", "خدمة 2", "خدمة 3"];

 

    
    
  return (
    <>
   
   <div className="h-[100vh] w-full pb-20 bg-gradient-to-br from-teal-900 to-teal-100 flex justify-center items-center overflow-hidden">
      <div className="relative z-10">
        <motion.div
          className="w-96 p-8  rounded-xl bg-teal-900/20 backdrop-blur-lg shadow-lg border border-white/20 text-center"
          initial={{ x: 300, rotate: 0, opacity: 0 }}
          animate={{ x: 0, rotate: 360, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
    
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center font text-white text-2xl"
      dir="rtl"
    >
      {sentence.split("").map((char, index) => (
        <motion.span key={index} variants={letterVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>

   
  

    <div className="p-4 py-12 space-y-4 max-w-xs mx-auto">
      {/* زر اختيار الخدمة */}
      <div className="relative">
        <motion.button
         variants={buttonVariants}
         initial="hidden"
         animate="visible"
         custom={.5}
          onClick={() => toggleDropdown("service")}
          className="w-full bg-teal-500 text-white py-2 px-4 rounded flex justify-between items-center focus:outline-none"
        >
          اختر الخدمة
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${
              openDropdown === "service" ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {openDropdown === "service" && (
            <motion.ul
              initial="hidden"
              animate="visible"
              
              exit="hidden"
              variants={dropdownVariants}
              className="absolute mt-2 w-full bg-white rounded shadow-lg overflow-hidden z-10"
            >
              {services.map((service, index) => (
                <li key={index} className="px-4 py-2 hover:bg-teal-100 cursor-pointer">
                  {service}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {/* زر اختيار المركز */}
      <div className="relative">
        <motion.button
         variants={buttonVariants}
         initial="hidden"
         animate="visible"
         custom={1}
          onClick={() => toggleDropdown("center")}
          className="w-full bg-teal-500 text-white py-2 px-4 rounded flex justify-between items-center focus:outline-none"
        >
          اختر المركز
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${
              openDropdown === "center" ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {openDropdown === "center" && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="absolute mt-2 w-full bg-white rounded shadow-lg overflow-hidden z-10"
            >
              {centers.map((center, index) => (
                <li key={index} className="px-4 py-2 hover:bg-teal-100 cursor-pointer">
                  {center}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* زر اختيار المحافظة */}
      <div className="relative">
        <motion.button
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        custom={1.5}
          onClick={() => toggleDropdown("governorate")}
          className="w-full bg-teal-500 text-white py-2 px-4 rounded flex justify-between items-center focus:outline-none"
        >
          اختر المحافظة
          <svg
            className={`w-5 h-5 transform transition-transform duration-300 ${
              openDropdown === "governorate" ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {openDropdown === "governorate" && (
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={dropdownVariants}
              className="absolute mt-2 w-full bg-white rounded shadow-lg overflow-hidden z-10"
            >
              {governorates.map((gov, index) => (
                <li key={index} className="px-4 py-2 hover:bg-teal-100 cursor-pointer">
                  {gov}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>   
    </div>
 <h2>hi</h2>
 <h3>hello</h3>
         
        </motion.div>
      </div>
    </div>


    </>
  )
}
