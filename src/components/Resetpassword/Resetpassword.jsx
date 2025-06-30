import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import bg2 from "./../../assets/bg2.jpg";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);
  const { t, i18n } = useTranslation("resetpassword");
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("resetEmail");
  const token = localStorage.getItem("resetToken");

  const validationSchema = Yup.object({
    otpCode: Yup.string()
      .required(t("resetpassword.validation.code_required"))
      .matches(/^\d{6}$/, t("resetpassword.validation.code_invalid")),
    newPassword: Yup.string()
      .required(t("resetpassword.validation.password_required"))
      .min(8, t("resetpassword.validation.password_length"))
      .matches(
        /^[A-Z][a-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
        t("resetpassword.validation.password_invalid")
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], t("resetpassword.validation.password_match"))
      .required(t("resetpassword.validation.confirm_required")),
  });

  const formik = useFormik({
    initialValues: {
      otpCode: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  async function handleSubmit(values) {
    if (!storedEmail || !token) {
      toast.error(t("resetpassword.messages.token_or_email_missing"));
      return;
    }

    try {
      await axios.post(
        `https://hanshatabhalak.runasp.net/api/Auth/reset-password?language=${i18n.language}`,
        {
          email: storedEmail,
          otpCode: values.otpCode,
          newPassword: values.newPassword,
          token,
        }
      );

      toast.success(t("resetpassword.messages.success"));
      localStorage.removeItem("resetToken");
      localStorage.removeItem("resetEmail");
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || t("resetpassword.messages.failed"));
    }
  }

  return (
    <div
      className="flex h-screen items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">{t("resetpassword.title")}</h2>
          <p className="text-gray-600">{t("resetpassword.subtitle")}</p>
        </div>

        <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded border border-blue-300">
          {t("resetpassword.check_spam")}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="otpCode"
            placeholder={t("resetpassword.code_placeholder")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otpCode}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {formik.touched.otpCode && formik.errors.otpCode && (
            <p className="text-red-500 text-sm">{formik.errors.otpCode}</p>
          )}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder={t("resetpassword.password_placeholder")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <span
              onClick={togglePassword}
              className="absolute top-3 cursor-pointer text-gray-500 hover:text-teal-600 ltr:right-3 rtl:left-3"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
          )}

          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder={t("resetpassword.confirm_password_placeholder")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <span
              onClick={toggleConfirm}
              className="absolute top-3 cursor-pointer text-gray-500 hover:text-teal-600 ltr:right-3 rtl:left-3"
            >
              {showConfirm ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{formik.errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            {t("resetpassword.submit_button")}
          </button>
        </form>

        <p className="text-center text-sm mt-2">
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            {t("resetpassword.back_to_login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
