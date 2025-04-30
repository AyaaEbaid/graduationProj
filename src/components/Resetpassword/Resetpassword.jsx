import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import bg2 from "./../../assets/bg2.jpg";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Resetpassword() {
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const navigate = useNavigate();
  const location = useLocation();
  const { t ,i18n} = useTranslation();

  // استخراج التوكن من الـ URL
const token=localStorage.getItem("resetToken")
console.log("tokenn",token);

  ; // استخراج التوكن من الرابط


  // Yup validation
  const mySchema = Yup.object({
    email: Yup.string().required("Email is Required").email("Invalid Email"),
    newPassword: Yup.string()
      .required("Password is Required").min(8,"Password must be 8 chars long")
      .matches(/^[A-Z][a-z0-9]+$/, "Password Invalid"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
     
      
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      resetForm(values);
    },
  });

  async function resetForm(values) {
    setisLoading(true);
    try {
      console.log("resettoken:",token);
      
      const response = await axios.post(
        "https://hanshatabhalak.runasp.net/api/Auth/reset-password",
        {
          email: values.email,
          newPassword: values.newPassword,
          token: token, 
        }
      );

      toast.success("Password reset successfully");
      setisLoading(false);
      localStorage.removeItem("resetToken")
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Failed to reset password");
      console.log(error);
      
      setisLoading(false);
    }
  }

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg relative">
        <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
          {t("resetpassword.title")}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            autoComplete="email"
            placeholder={t("resetpassword.email_placeholder")}
            className="w-full p-2 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
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
              name="newPassword"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              onBlur={formik.handleBlur}
              autoComplete="newPassword"
              placeholder={t("resetpassword.password_placeholder")}
              className="w-full p-2 mb-4 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
                <div
                  className="p-4 mt-1 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.newPassword}
                </div>
              ) : null}
            <span
              onClick={togglePasswordVisibility}
              className="absolute ltr:right-3 rtl:left-3 top-3 cursor-pointer text-gray-500 hover:text-teal-600"
            >
              {!showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
           
          </div>
{isLoading?  <button
            type="submit"
           
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
            
          >
              <i className="fa fa-spinner fa-spin"></i>
          </button>:  <button
            type="submit"
           
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 transition"
            disabled={!(formik.isValid&&formik.dirty)}
          >
           { t("resetpassword.send_link")}
          </button>}
        
        </form>

        <p className="text-center mt-4">
          <Link to="/login" className="text-teal-600 hover:underline">
            {t("resetpassword.back_to_login")}
          </Link>
        </p>
      </div>
    </div>
  );
}