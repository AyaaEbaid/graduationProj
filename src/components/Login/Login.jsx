import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import bg2 from "./../../assets/bg2.jpg";

import Navbar from "../Navbar/Navbar";

export default function Login() {
  
  const { t,i18n } = useTranslation("login");
  const isArabic=i18n.language==="ar";
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  let loginSchema = Yup.object({
    email: Yup.string().required(t("login.email_required")).email(t("email_invalid")),
    password: Yup.string().required(t("login.password_required")).matches(
      /^[A-Z][a-z0-9]{3,8}$/,
      t("login.password_validation")
    ),
  });

  let formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Login submitted:", values);
      navigate("/");
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "auto"; };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center" style={{ backgroundImage: `url(${bg2})`, backgroundSize: "cover" }}>
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden">
        <motion.div className="order-1 md:order-1 w-full md:w-1/2 bg-gradient-to-br from-teal-900 to-teal-500 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">{t("login.welcome_back")}</h2>
          <p className="text-center mt-2">{t("login.stay_connected")}</p>
          <Link to="/register">
            <motion.button whileHover={{ scale: 1.05 }} className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-teal-600">
              {t("login.create_account")}
            </motion.button>
          </Link>
        </motion.div>

        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="order-2 w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-teal-600 text-center">{t("login.sign_in")}</h2>
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <input type="email" name="email" placeholder={t("login.email_placeholder")} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="w-full p-2 mb-2 border rounded" />
            {formik.touched.email && formik.errors.email && <div className="text-red-600 text-sm mb-2">{formik.errors.email}</div>}
            
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder={t("login.password_placeholder")} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="w-full p-2 mb-2  border rounded " />
              <span onClick={togglePasswordVisibility} className={`absolute ${isArabic?"left-3":"right-3"}  top-5 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-teal-600`}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {formik.errors.password && <div className="text-red-600 text-sm">{formik.errors.password}</div>}

            <div className="flex justify-end mb-4">
              <Link to="/reset-password" className="text-sm text-teal-600 hover:underline">{t("login.forgot_password")}</Link>
            </div>
            
            <button type="submit" disabled={!formik.isValid || !formik.dirty} className={`w-full p-2 rounded text-white ${!formik.isValid || !formik.dirty ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}>
              {t("login.sign_in_button")}
            </button>
            
            <div  className={ `flex justify-center items-center ${isArabic?"space-x-reverse":""} space-x-4 mt-2`}>
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full hover:bg-teal-500 hover:text-white cursor-pointer">
                <FaFacebookF />
              </div>
              <div className="w-8 h-8   flex items-center justify-center border border-teal-500 text-teal-500 rounded-full hover:bg-teal-500 hover:text-white cursor-pointer">
                <FaGoogle />
              </div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
