import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export default function VerifyOTP() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // جلب الإيميل من state أو localStorage
  const email = state?.email || localStorage.getItem("verifyEmail");

  // تأكد من وجود الإيميل
  if (!email) {
    toast.error(t("verification.emailMissing") || "Email not found. Please register again.");
    navigate("/register");
    return null;
  }

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string()
        .required(t("verification.enter6Digit"))
        .matches(/^[0-9]{6}$/, t("verification.invalidCode")),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(
          `https://hanshatabhalak.runasp.net/api/Auth/verify-otp?language=${i18n.language}`,
          {
            email,
            code: values.code,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        toast.success(response.data.message);
        localStorage.removeItem("verifyEmail"); // تنظيف
        navigate("/login");
      } catch (err) {
        setErrors({
          code: err.response?.data?.message || t("verification.invalidCode"),
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg text-center"
      >
        <div className="flex justify-center mb-4">
          <FaEnvelope className="text-4xl text-teal-600" />
        </div>

        <h2 className="text-2xl font-bold text-teal-600 mb-2">
          {t("verification.emailVerification")}
        </h2>

        <p className="text-gray-600 text-sm mb-1">{t("verification.codeSentTo")}</p>
        <p className="text-teal-600 font-medium mb-3">{email}</p>

        <div className="mb-4 text-sm text-gray-500 bg-gray-100 p-2 rounded">
          {t("verification.checkSpamFolder")}
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("verification.enter6Digit")}
              className={`w-full pl-10 pr-4 py-2 border rounded outline-none focus:border-teal-600 ${
                formik.errors.code && formik.touched.code ? "border-red-500" : ""
              }`}
              maxLength={6}
            />
            <FaShieldAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-teal-600" />
          </div>

          {formik.touched.code && formik.errors.code && (
            <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
              {formik.errors.code}
            </div>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition"
          >
            {formik.isSubmitting
              ? t("verification.verifying")
              : t("verification.verifyEmail")}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          {t("verification.backTo")}{" "}
          <Link to="/login" className="text-teal-600 font-semibold">
            {t("verification.login")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
