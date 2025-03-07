import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceDetails() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sentence = "Choose our service";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 1,
        staggerChildren: 0.06,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    hidden: { x: 200, opacity: 0 },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: custom * 3,
        duration: 3,
      },
    }),
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 1 },
    },
  };

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const centers = ["Center 1", "Center 2", "Center 3"];
  const governorates = ["Governorate 1", "Governorate 2", "Governorate 3"];
  const services = ["Service 1", "Service 2", "Service 3"];

  return (
    <div className="h-[100vh] w-full pb-20 bg-gradient-to-br from-teal-900 to-teal-100 flex justify-center items-center overflow-hidden">
      <div className="relative z-10">
        <motion.div
          className="w-96 p-8 rounded-xl bg-teal-900/20 backdrop-blur-lg shadow-lg border border-white/20 text-center"
          initial={{ x: 300, rotate: 0, opacity: 0 }}
          animate={{ x: 0, rotate: 360, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center font text-white text-2xl"
          >
            {sentence.split("").map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          <div className="p-4 py-12 space-y-4 max-w-xs mx-auto">
            {/* Choose Service Button */}
            <div className="relative">
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={0.5}
                onClick={() => toggleDropdown("service")}
                className="w-full bg-teal-500 text-white py-2 px-4 rounded flex justify-between items-center focus:outline-none"
              >
                Choose Service
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openDropdown === "service" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
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
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                      >
                        {service}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Choose Center Button */}
            <div className="relative">
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={1}
                onClick={() => toggleDropdown("center")}
                className="w-full bg-teal-500 text-white py-2 px-4 rounded flex justify-between items-center focus:outline-none"
              >
                Choose Center
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openDropdown === "center" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
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
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                      >
                        {center}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Choose Governorate Button */}
            <div className="relative">
              <motion.button
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                custom={1.5}
                onClick={() => toggleDropdown("governorate")}
                className="w-full bg-teal-500 text-white py-2 px-4 rounded flex justify-between items-center focus:outline-none"
              >
                Choose Governorate
                <svg
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    openDropdown === "governorate" ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
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
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
                      >
                        {gov}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
