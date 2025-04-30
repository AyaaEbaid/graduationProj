import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ForgetPassword = () => {
  const { t ,i18n} = useTranslation();
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setuserError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  // Yup validation
  let mySchema = Yup.object({
    email: Yup.string()
      .required(t("forgetPassword.email_required"))
      .email(t("forgetPassword.email_invalid")),
  });

  // Formik
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      ForgetForm(values);
    },
  });

  async function ForgetForm(values) {
    setisLoading(true);
    return await axios
      .post(`https://hanshatabhalak.runasp.net/api/Auth/forgot-password?language=${i18n.language}`, values)
      .then((data) => {
        setUserMessage("Success");
        localStorage.setItem("resetToken", data.data.resetToken);
        setisLoading(false);
        navigate("/reset-password");
      })
      .catch((err) => {
        setuserError("failed");
        setisLoading(false);
      });
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 via-white to-teal-200 overflow-hidden">
      {/* Circles */}
      <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-teal-300 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-teal-400 rounded-full opacity-20 blur-3xl animate-bounce"></div>
      <div className="absolute top-[30%] right-[-40px] w-40 h-40 bg-teal-200 rounded-full opacity-25 blur-xl animate-ping"></div>

      {/* Form */}
      <div className="relative z-10 bg-white bg-opacity-70 backdrop-blur-md border border-white/40 shadow-xl rounded-xl px-8 py-10 max-w-md w-full">
        
        <h2 className="text-2xl font-bold text-center text-teal-700 mb-4">
          {t("forgetPassword.title")}
        </h2>
        <p className="text-center text-gray-700 mb-6 text-sm">
          {t("forgetPassword.description")}
        </p>

        {userError && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {userError}
          </div>
        )}
        {userMessage && (
          <div
            className="p-4 mt-2 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {userMessage}
          </div>
        )}

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 text-sm mb-2">
              {t("forgetPassword.email_label")}
            </label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder={t("forgetPassword.email_placeholder")}
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div
                className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.email}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
            disabled={isLoading || !(formik.isValid && formik.dirty)}
          >
            {isLoading ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              t("forgetPassword.send_button")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;