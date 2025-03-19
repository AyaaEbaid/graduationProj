import React, { useState } from "react";
import * as Yup from "yup";
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Register() {
  // استخدام i18next للترجمة
  const { t,i18n } = useTranslation();
  const isArabic=i18n.language==="ar";
  // حالات إظهار/إخفاء كلمات المرور
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const navigate = useNavigate();

  // دوال التبديل لعرض أو إخفاء كلمات المرور
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRePasswordVisibility = () => setShowRePassword(!showRePassword);

  // التحقق من صحة النموذج باستخدام Yup مع مفاتيح الترجمة
  let mySchema = Yup.object({
    name: Yup.string()
      .required(t("validation.required"))
      .min(3, t("validation.minLength", { min: 3 }))
      .max(10, t("validation.maxLength", { max: 10 })),
    email: Yup.string()
      .required(t("validation.required"))
      .email(t("validation.email")),
    password: Yup.string()
      .required(t("validation.required"))
      .matches(/^[A-Z][a-z0-9]{3,8}$/, t("validation.passwordPattern")),
    repassword: Yup.string()
      .required(t("validation.required"))
      .oneOf([Yup.ref("password")], t("validation.passwordMatch")),
    phone: Yup.string()
      .required(t("validation.required"))
      .matches(/^(?:\+20|0)1[0125]\d{8}$/, t("validation.phone")),
    government: Yup.string().required(t("validation.required")),
    district: Yup.string().required(t("validation.required")),
    admin: Yup.string().required(t("validation.required")),
  });

  // إعداد Formik مع القيم الابتدائية والتحقق من صحة النموذج
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
      government: "",
      district: "",
      admin: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      navigate("/");
    },
  });

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mb-3 mt-2 flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        {/* الجزء الخاص بالنموذج */}
        <motion.div className="order-2 md:order-1 w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-teal-600 text-center">
            {t("register.title")}
          </h2>
          <form className="mt-2" onSubmit={formik.handleSubmit}>
            {/* حقل الاسم الكامل */}
            <div className="mb-1.5">
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder={t("register.name")}
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-600 text-sm">{formik.errors.name}</div>
              )}
            </div>
            {/* حقل البريد الإلكتروني */}
            <div className="mb-1.5">
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                autoComplete="username"
                placeholder={t("register.email")}
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-600 text-sm">{formik.errors.email}</div>
              )}
            </div>
            {/* حقل كلمة المرور */}
            <div className="mb-1.5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder={t("register.password")}
                  autoComplete="new-password"
                  className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600 pr-10"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-teal-600 z-10"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-600 text-sm">{formik.errors.password}</div>
              )}
            </div>
            {/* حقل تأكيد كلمة المرور */}
            <div className="mb-1.5">
              <div className="relative">
                <input
                  type={showRePassword ? "text" : "password"}
                  name="repassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.repassword}
                  autoComplete="new-password"
                  placeholder={t("register.confirmPassword")}
                  className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600 pr-10"
                />
                <span
                  onClick={toggleRePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-teal-600 z-10"
                >
                  {showRePassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.repassword && formik.errors.repassword && (
                <div className="text-red-600 text-sm">{formik.errors.repassword}</div>
              )}
            </div>
            {/* حقل رقم الهاتف */}
            <div className="mb-1.5">
              <input
                type="text"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder={t("register.phone")}
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-600 text-sm">{formik.errors.phone}</div>
              )}
            </div>
            {/* حقل اختيار المحافظة */}
            <div className="mb-1.5">
              <select
                name="government"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.government}
                className="w-full text-gray-600 p-1 border rounded outline-none transition-transform duration-200 focus:border-teal-600"
              >
                <option value="">{t("register.government")}</option>
                <option value="Government1">Government1</option>
                <option value="Government2">Government2</option>
                <option value="Government3">Government3</option>
                <option value="Government4">Government4</option>
              </select>
              {formik.touched.government && formik.errors.government && (
                <div className="text-red-600 text-sm">{formik.errors.government}</div>
              )}
            </div>
            {/* حقل اختيار المنطقة */}
            <div className="mb-1.5">
              <select
                name="district"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.district}
                className="w-full text-gray-600 p-1 border rounded outline-none transition-transform duration-200 focus:border-teal-600"
              >
                <option value="">{t("register.district")}</option>
                <option value="district1">district1</option>
                <option value="district2">district2</option>
                <option value="district3">district3</option>
                <option value="district4">district4</option>
              </select>
              {formik.touched.district && formik.errors.district && (
                <div className="text-red-600 text-sm">{formik.errors.district}</div>
              )}
            </div>
            {/* حقل اختيار نوع الحساب (الراديو) */}
            <div className={`flex ${isArabic?"space-x-reverse":""}  space-x-2 mt-3 mb-2 text-sm`}>
              <label className={`flex items-center ${isArabic?"space-x-reverse":""}  space-x-1`}>
                <input
                  type="radio"
                  name="admin"
                  value="admin"
                  onChange={formik.handleChange}
                  checked={formik.values.admin === "admin"}
                  className="w-5 h-5 text-teal-600"
                />
                <span>{t("register.admin")}</span>
              </label>
              <label className={`${isArabic?"space-x-reverse":""}  flex items-center space-x-1`}>
                <input
                  type="radio"
                  name="admin"
                  value="user"
                  onChange={formik.handleChange}
                  checked={formik.values.admin === "user"}
                  className="w-5 h-5 text-teal-600"
                />
                <span>{t("register.user")}</span>
              </label>
              <label className={`${isArabic?"space-x-reverse":""}  flex items-center space-x-1`}>
                <input
                  type="radio"
                  name="admin"
                  value="worker"
                  onChange={formik.handleChange}
                  checked={formik.values.admin === "worker"}
                  className="w-5 h-5 text-teal-600"
                />
                <span>{t("register.worker")}</span>
              </label>
              <label className={`${isArabic?"space-x-reverse":""}  flex items-center space-x-1`}>
                <input
                  type="radio"
                  name="admin"
                  value="supervisor"
                  onChange={formik.handleChange}
                  checked={formik.values.admin === "supervisor"}
                  className="w-5 h-5 text-teal-600"
                />
                <span>{t("register.supervisor")}</span>
              </label>
            </div>
            {formik.touched.admin && formik.errors.admin && (
              <div className="text-red-600 mb-5 text-sm">{formik.errors.admin}</div>
            )}
            {/* زر الإرسال */}
            <button
              type="submit"
              disabled={!formik.isValid}
              className={`w-full p-2 mt-3 rounded transition duration-300 ${
                formik.isValid
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "bg-gray-400 text-gray-200 cursor-not-allowed"
              }`}
            >
              {t("register.signUp")}
            </button>
            {/* أيقونات الدخول عبر فيسبوك وجوجل (موضوعة تحت زر الإرسال) */}
            <div className={`flex justify-center items-center ${isArabic?"space-x-reverse":""}  space-x-4 mt-4`}>
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                <FaFacebookF className="text-sm" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                <FaGoogle className="text-sm" />
              </div>
            </div>
          </form>
        </motion.div>
        {/* الجزء الخاص بالتسجيل البديل (الشعار وروابط تسجيل الدخول) */}
        <motion.div className="order-1 md:order-2 w-full md:w-1/2 bg-gradient-to-br from-teal-900 to-teal-400 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">{t("register.haveAccount")}</h2>
          <p className="text-center mt-2">{t("register.alreadyAccount")}</p>
          <Link to="/login">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-teal-600"
            >
              {t("register.signIn")}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
