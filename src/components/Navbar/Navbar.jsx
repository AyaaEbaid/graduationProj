import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"; // أضفت FaBars وFaTimes
import LanguageSwitcher from "../../LanguageSwitcher";
import logo from "./../../assets/logo.png";
import { TokenContext } from "../../Context/TokenContext";

export default function Navbar() {
  let navigate = useNavigate();
  function signOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/");
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token, setToken } = useContext(TokenContext);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };
  const inputVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  };
  const underlineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: { scaleX: 1, originX: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  };

  return (
    <nav className="bg-teal-600 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* شعار الموقع */}
        <NavLink
          to=""
          className="flex text-white hover:text-white items-center rtl:space-x-reverse"
        >
          <img src={logo} className="h-9 w-14 pt-1" alt="Hanshtabhalk Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            {t("navbar.brand")}
          </span>
        </NavLink>

        {/* الـ Toggle والقائمة */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {token ? (
            <>
              <div className="relative ltr:md:right-4 mx-4 flex flex-col items-start">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-100 focus:outline-none"
                >
                  <FaSearch size={20} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute rtl:left-0 ltr:right-0 mt-12 z-50"
                    >
                      <motion.input
                        type="text"
                        variants={inputVariants}
                        className="border border-gray-300 rounded-md p-1 w-72 focus:outline-none"
                        placeholder={t("navbar.placeholder")}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded={dropdownOpen}
                >
                  <span className="sr-only">{t("navbar.openUserMenu")}</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-3.jpg"
                    alt={t("navbar.userPhoto")}
                  />
                </button>

                {/* قائمة المستخدم */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                      id="user-dropdown"
                    >
                      <div className="px-4 py-3">
                        <span className="block text-sm text-gray-900 dark:text-white">
                          Bonnie Green
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                          name@flowbite.com
                        </span>
                      </div>
                      <div
                        data-popover
                        id="popover-default"
                        role="tooltip"
                        className="absolute z-50 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-xs opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                      >
                        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {t("popoverTitle")}
                          </h3>
                        </div>
                        <div className="px-3 py-2">
                          <p>{t("navbar.popoverContent")}</p>
                        </div>
                        <div data-popper-arrow></div>
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <NavLink
                            to="dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            {t("navbar.dashboard")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="profile"
                            onClick={() => setDropdownOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            {t("navbar.settings")}
                          </NavLink>
                        </li>
                        <li>
                          <a
                            onClick={() => {
                              signOut();
                              setDropdownOpen(false);
                            }}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                          >
                            {t("navbar.signOut")}
                          </a>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div
              className={`${
                menuOpen
                  ? "block absolute top-0 right-0 mt-16 w-full bg-teal-600 shadow-lg z-50"
                  : "hidden"
              } md:flex md:w-auto md:static md:shadow-none md:order-1 md:z-auto`}
              id="navbar-user"
            >
              <ul className="flex flex-col z-50  mx-4 font-medium p-4 md:p-0  ml-3 text-white md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="login"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-6 px-3 text-white md:bg-transparent md:px-3 md:py-0.5 md:rounded-3xl md:shadow-lg md:ring md:ring-white ${
                        isActive ? "bg-teal-800 text-white" : "hover:bg-teal-500"
                      }`
                    }
                  >
                    {t("navbar.login")}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="register"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 text-white md:bg-transparent md:px-3 md:py-0.5 md:rounded-3xl md:shadow-lg md:ring md:ring-white ${
                        isActive ? "bg-teal-800 text-white" : "hover:bg-teal-500"
                      }`
                    }
                  >
                    {t("navbar.signUp")}
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {token ? null : <LanguageSwitcher />}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
            className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              menuOpen
                ? "bg-teal-800 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <span className="sr-only">{t("openMainMenu")}</span>
            {menuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>

        {/* القائمة الرئيسية للمستخدم المسجل */}
        <div
          className={`${
            menuOpen
              ? "block absolute top-0 right-0 mt-16 w-full bg-teal-600 shadow-lg z-50"
              : "hidden"
          } md:flex md:w-auto md:static md:shadow-none md:order-1 md:z-auto`}
          id="navbar-user"
        >
          <ul className="flex flex-col text-teal-600 font-medium p-4 md:p-0 mt-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {token ? (
              <>
                <li className="relative">
                  <NavLink
                    to=""
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 text-white rounded-sm transition-colors duration-200 relative group ${
                        isActive ? "text-white" : "hover:text-white"
                      }`
                    }
                    aria-current="page"
                  >
                    {({ isActive }) => (
                      <>
                        {t("navbar.home")}
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                          variants={underlineVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                          whileHover={{ scaleX: 1 }}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    to="#about-us"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3 text-white rounded-sm transition-colors duration-200 relative group hover:text-white"
                  >
                    {() => (
                      <>
                        {t("navbar.about")}
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                          variants={underlineVariants}
                          initial="hidden"
                          whileHover={{ scaleX: 1 }}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    to="services"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 text-white rounded-sm transition-colors duration-200 relative group ${
                        isActive ? "text-white" : "hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t("navbar.services")}
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                          variants={underlineVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                          whileHover={{ scaleX: 1 }}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    to="rate"
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 text-white rounded-sm transition-colors duration-200 relative group ${
                        isActive ? "text-white" : "hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t("navbar.rateUs")}
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                          variants={underlineVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                          whileHover={{ scaleX: 1 }}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
                <li className="relative">
                  <NavLink
                    to="#contact-us"
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-3 text-white rounded-sm transition-colors duration-200 relative group hover:text-white"
                  >
                    {() => (
                      <>
                        {t("navbar.contactUs")}
                        <motion.div
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                          variants={underlineVariants}
                          initial="hidden"
                          whileHover={{ scaleX: 1 }}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}