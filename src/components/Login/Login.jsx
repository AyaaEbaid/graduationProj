import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import bg2 from "./../../assets/bg2.jpg";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { TokenContext } from "../../Context/TokenContext";

export default function Login() {
  const { token, setToken } = useContext(TokenContext);
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setuserError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  //translate
  const { t, i18n } = useTranslation("login");
  const isArabic = i18n.language === "ar";
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  let loginSchema = Yup.object({
    email: Yup.string()
      .required(t("login.email_required"))
      .email(t("email_invalid")),
    password: Yup.string()
      .required(t("login.password_required"))
      .min(8, t("Password must be 8 chars long"))
      .matches(/^[A-Z][a-z0-9]+$/, t("login.password_validation")),
  });

  // Formik
  let formik = useFormik({
    initialValues: {
      email: localStorage.getItem("rememberEmail") || "",
      password: localStorage.getItem("rememberPassword") || "",
      rememberMe: localStorage.getItem("rememberEmail") ? false : true,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  // Api
  async function loginForm(values) {
    setisLoading(true);
    console.log("Remember Me value:", values.rememberMe); // لوج عشان نتأكد إن القيمة بتتغير

    // حفظ أو مسح البيانات في localStorage بناءً على قيمة rememberMe
    if (values.rememberMe) {
      localStorage.setItem("rememberEmail", values.email);
      localStorage.setItem("rememberPassword", values.password);
    } else {
      localStorage.removeItem("rememberEmail");
      localStorage.removeItem("rememberPassword");
    }

    try {
      const data = await axios.post(
        `https://hanshatabhalak.runasp.net/api/Auth/login?language=${i18n.language}`,
        values
      );
      console.log(data.data.message);
      setUserMessage(data.data.message);
      localStorage.setItem("userToken", data.data.token);
      setToken(data.data.token);
      setisLoading(false);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setuserError(err.message);
      setisLoading(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ backgroundImage:`url(${bg2})`, backgroundSize: "cover" }}
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        <motion.div className="order-1 md:order-1 w-full md:w-1/2 bg-gradient-to-br from-teal-900 to-teal-500 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">{t("login.welcome_back")}</h2>
          <p className="text-center mt-2">{t("login.stay_connected")}</p>
          <Link to="/register">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-teal-600"
            >
              {t("login.create_account")}
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="order-2 w-full md:w-1/2 p-8"
        >
          <h2 className="text-2xl font-bold text-teal-600 text-center">
            {t("login.sign_in")}
          </h2>
          {userError ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {userError}
            </div>
          ) : null}
          {userMessage ? (
            <div
              className="p-4 mt-2 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              {userMessage}
            </div>
          ) : null}
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder={t("login.email_placeholder")}
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              autoComplete="username"
              className="w-full p-2 mb-2 border rounded"
            />
            {formik.touched.email && formik.errors.email ? (
              <div
                className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            ) : null}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder={t("login.password_placeholder")}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                autoComplete="new-password"
                className="w-full p-2 mb-2 border rounded"
              />
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              ) : null}
              <span
                onClick={togglePasswordVisibility}
                className={`absolute ${
                  isArabic ? "left-3" : "right-3"
                } top-5 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-teal-600`}
              >
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="flex justify-between mb-4">
              {console.log("Current rememberMe state:", formik.values.rememberMe)} {/* لوج عشان نتأكد */}
              <label className="flex text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formik.values.rememberMe}
                  onChange={formik.handleChange}
                  className="ml-2 ltr:mr-2"
                />
                {t("login.remember_me")}
              </label>
              <Link
                to="/forgetpassword"
                className="text-sm text-teal-600 hover:underline"
              >
                {t("login.forgot_password")}
              </Link>
            </div>

            {isLoading ? (
              <button
                type="submit"
                className="w-full p-2 rounded text-white bg-teal-600 hover:bg-teal-700"
              >
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full p-2 rounded text-white bg-teal-600 hover:bg-teal-700"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {t("login.sign_in_button")}
              </button>
            )}

            <div
              className={`flex justify-center items-center ${
                isArabic ? "space-x-reverse" : ""
              } space-x-4 mt-2`}
            >
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full hover:bg-teal-500 hover:text-white cursor-pointer">
                <FaFacebookF />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full hover:bg-teal-500 hover:text-white cursor-pointer">
                <FaGoogle />
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}