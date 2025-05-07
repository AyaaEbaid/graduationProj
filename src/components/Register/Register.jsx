import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { FaFacebookF, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Register() {
  // تعريف الـ state لرسائل المستخدم وحالة التحميل
  const [userMessage, setUserMessage] = useState(null);
  const [userError, setUserError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [governorates, setGovernorates] = useState([]);
  const [governorateDetails, setGovernorateDetails] = useState(null);
  const [centers, setCenters] = useState([]);
  const [centerDetails, setCenterDetails] = useState(null);
  const [specializations, setSpecializations] = useState([]);
  const [specializationDetails, setSpecializationDetails] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  // جلب المحافظات عند تحميل الصفحة أو تغيير اللغة
  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Governorate?=${i18n.language}`
        );
        setGovernorates(response.data.data.$values);
      } catch (error) {
        console.error("Error fetching governorates:", error);
        setUserError(t("register.failedToLoadGovernorates"));
      }
    };
    fetchGovernorates();
  }, [i18n.language, t]);

  // دالة لجلب المراكز بناءً على المحافظة
  const fetchCenters = async (govId) => {
    if (govId) {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Center?govGovernoratId=${govId}&language=${i18n.language}`
        );
        const fetchedCenters = response?.data?.data?.$values || [];
        if (fetchedCenters.length === 0) {
          setUserError(t("register.noCentersForGovernorate"));
        }
        setCenters(fetchedCenters);
      } catch (error) {
        console.error("Error fetching centers:", error);
        setCenters([]);
        setUserError(t("register.failedToLoadCenters"));
      }
    } else {
      setCenters([]);
    }
  };

  // دالة لجلب تفاصيل المركز
  const fetchCenterDetails = async (centerId) => {
    if (centerId) {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Center/${centerId}?language=${i18n.language}`
        );
        setCenterDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching center details:", error);
        setCenterDetails(null);
        setUserError(t("register.failedToLoadCenterDetails"));
      }
    } else {
      setCenterDetails(null);
    }
  };

  // دالة لجلب تفاصيل المحافظة
  const fetchGovernorateDetails = async (govId) => {
    if (govId) {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Governorate/${govId}?language=${i18n.language}`
        );
        setGovernorateDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching governorate details:", error);
        setGovernorateDetails(null);
        setUserError(t("register.failedToLoadGovernorateDetails"));
      }
    } else {
      setGovernorateDetails(null);
    }
  };

  // دوال للتحكم في إظهار/إخفاء كلمة المرور
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRePasswordVisibility = () => setShowRePassword(!showRePassword);

  // تعريف مخطط التحقق باستخدام Yup
  let mySchema = Yup.object({
    fullName: Yup.string()
      .required(t("register.fullNameRequired"))
      .min(2, t("register.fullNameMinLength"))
      .max(20, t("register.fullNameMaxLength")),
    governorate: Yup.string().required(t("register.governmentRequired")),
    center: Yup.string().required(t("register.districtRequired")),
    phoneNumber: Yup.string()
      .required(t("register.phoneRequired"))
      .matches(/^(002)?01[0125][0-9]{8}$/, t("register.invalidPhone")),
    email: Yup.string()
      .required(t("register.emailRequired"))
      .email(t("register.invalidEmail")),
    password: Yup.string()
      .required(t("register.passwordRequired"))
      .min(8, t("register.passwordMinLength"))
      .matches(/^[A-Z][a-z0-9]+$/, t("register.invalidPassword")),
    confirmPassword: Yup.string()
      .required(t("register.confirmPasswordRequired"))
      .oneOf([Yup.ref("password")], t("register.passwordNotMatch")),
    role: Yup.string().required(t("register.roleRequired")),
    specialization: Yup.string().test(
      "specialization-for-craftsman",
      t("register.specializationRequired"),
      function (value) {
        const role = this.parent.role;
        return role === "craftsman" ? !!value : true;
      }
    ),
  });

  // إعداد Formik
  let formik = useFormik({
    initialValues: {
      fullName: "",
      governorate: "",
      center: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      specialization: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  // دالة للتعامل مع تغيير المحافظة
  const handleGovernorateChange = (e) => {
    const govId = e.target.value;
    formik.setFieldValue("governorate", govId);
    fetchGovernorateDetails(govId);
    fetchCenters(govId);
    formik.setFieldValue("center", ""); // إعادة تعيين المركز عند تغيير المحافظة
  };

  // دالة للتعامل مع تغيير المركز
  const handleCenterChange = (e) => {
    const centerId = e.target.value;
    formik.setFieldValue("center", centerId);
    fetchCenterDetails(centerId);
  };

  // دالة للتعامل مع تغيير الدور
  const handleRoleChange = (e) => {
    const role = e.target.value;
    formik.setFieldValue("role", role);
    if (role !== "craftsman") {
      formik.setFieldValue("specialization", "");
    }
  };

  // جلب التخصصات عند تحميل الصفحة أو تغيير اللغة
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Specialization?language=${i18n.language}`
        );
        setSpecializations(response.data.data.$values);
      } catch (error) {
        console.error("Error fetching specializations:", error);
        setUserError(t("register.failedToLoadSpecializations"));
      }
    };
    fetchSpecializations();
  }, [i18n.language, t]);

  const fetchSpecializationDetails = async (specId) => {
    if (specId) {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Specialization/${specId}?language=${i18n.language}`
        );
        setSpecializationDetails(response.data.data);
      } catch (error) {
        console.error(error.message);
        setSpecializationDetails(null);
        setUserError(error.message);
      }
    } else {
      setSpecializationDetails(null);
    }
  };

  // استدعاء الدالة عند تغيير التخصص
  const handleSpecializationChange = (e) => {
    const specId = e.target.value;
    formik.setFieldValue("specialization", specId);
    fetchSpecializationDetails(specId);
  };

  // دالة إرسال النموذج
  async function registerForm(values) {
    setIsLoading(true);
    try {
      // تحويل البيانات إلى الصيغة المتوقعة من الخادم
      const payload = {
        fullName: values.fullName,
        governorateId: parseInt(values.governorate) || 0,
        centerId: parseInt(values.center) || 0,
        phoneNumber: values.phoneNumber,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        role: values.role,
        specializationId: values.specialization ? parseInt(values.specialization) : 0,
      };

      const response = await axios.post(
        `https://hanshatabhalak.runasp.net/api/Auth/register?language=${i18n.language}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserMessage(response.data.message);
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setUserError(errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mb-3 mt-2 flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        <motion.div className="order-2 md:order-1 w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-teal-600 text-center">
            {t("register.title")}
          </h2>
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
          <form className="mt-2" onSubmit={formik.handleSubmit}>
            {/* حقل الاسم */}
            <div className="mb-1.5">
              <input
                type="text"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
                placeholder={t("register.name")}
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div
                  className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.fullName}
                </div>
              ) : null}
            </div>
            {/* حقل الإيميل */}
            <div className="mb-1.5">
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                autoComplete="username"
                placeholder={t("register.email")}
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.email && formik.errors.email ? (
                <div
                  className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            {/* حقل كلمة المرور */}
            <div className="mb-1.5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  placeholder={t("register.password")}
                  autoComplete="new-password"
                  className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
                />
                <span
                  onClick={togglePasswordVisibility}
                  className={`absolute ${
                    isArabic ? "left-3" : "right-3"
                  } top-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-teal-600 z-10`}
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div
                  className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            {/* حقل تأكيد كلمة المرور */}
            <div className="mb-1.5">
              <div className="relative">
                <input
                  type={showRePassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  onBlur={formik.handleBlur}
                  autoComplete="new-password"
                  placeholder={t("register.confirmPassword")}
                  className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
                />
                <span
                  onClick={toggleRePasswordVisibility}
                  className={`absolute ${
                    isArabic ? "left-3" : "right-3"
                  } top-4 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-teal-600 z-10`}
                >
                  {!showRePassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div
                  className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            {/* حقل رقم الهاتف */}
            <div className="mb-1.5">
              <input
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                onBlur={formik.handleBlur}
                placeholder={t("register.phone")}
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div
                  className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.phoneNumber}
                </div>
              ) : null}
            </div>
            {/* قائمة المحافظات */}
            <div className="mb-1.5">
              <select
                name="governorate"
                onChange={handleGovernorateChange}
                value={formik.values.governorate}
                onBlur={formik.handleBlur}
                className="w-full text-gray-600 p-1 border rounded outline-none transition-transform duration-200 focus:border-teal-600"
                disabled={governorates.length === 0}
              >
                <option value="">{t("register.government")}</option>
                {governorates.length > 0 ? (
                  governorates.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {gov.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {t("register.noGovernoratesAvailable")}
                  </option>
                )}
              </select>
              {formik.touched.governorate && formik.errors.governorate ? (
                <div
                  className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.governorate}
                </div>
              ) : null}
            </div>
            {/* قائمة المراكز */}
            <div className="mb-1.5">
              <select
                name="center"
                onChange={handleCenterChange}
                value={formik.values.center}
                onBlur={formik.handleBlur}
                className="w-full text-gray-600 p-1 border rounded outline-none transition-transform duration-200 focus:border-teal-600"
                disabled={centers.length === 0 || !formik.values.governorate}
              >
                <option value="">{t("register.district")}</option>
                {centers.length > 0 ? (
                  centers.map((center) => (
                    <option key={center.id} value={center.id}>
                      {center.name}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    {t("register.noCentersAvailable")}
                  </option>
                )}
              </select>
              {formik.touched.center && formik.errors.center ? (
                <div
                  className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {formik.errors.center}
                </div>
              ) : null}
            </div>
            {/* اختيار الدور */}
            <div
              className={`flex ${
                isArabic ? "space-x-reverse" : ""
              } space-x-12 mt-3 mb-2 text-sm`}
            >
              <label
                className={`${
                  isArabic ? "space-x-reverse" : ""
                } flex items-center space-x-1`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  onChange={handleRoleChange}
                  checked={formik.values.role === "user"}
                  onBlur={formik.handleBlur}
                  className="w-5 h-5 text-teal-600"
                />
                <span>{t("register.user")}</span>
              </label>
              <label
                className={`${
                  isArabic ? "space-x-reverse" : ""
                } flex items-center space-x-1`}
              >
                <input
                  type="radio"
                  name="role"
                  value="craftsman"
                  onChange={handleRoleChange}
                  checked={formik.values.role === "craftsman"}
                  onBlur={formik.handleBlur}
                  className="w-5 h-5 text-teal-600"
                />
                <span>{t("register.worker")}</span>
              </label>
            </div>
            {formik.touched.role && formik.errors.role ? (
              <div
                className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                {formik.errors.role}
              </div>
            ) : null}
            {/* قائمة التخصصات (تظهر فقط إذا كان الدور craftsman) */}
            {formik.values.role === "craftsman" && (
              <div className="mb-1.5">
                <select
                  name="specialization"
                  onChange={handleSpecializationChange}
                  value={formik.values.specialization}
                  onBlur={formik.handleBlur}
                  className="w-full text-gray-600 p-1 border rounded outline-none transition-transform duration-200 focus:border-teal-600"
                >
                  <option value="">{t("register.selectSpecialization")}</option>
                  {specializations.length > 0 ? (
                    specializations.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.nameEn || spec.nameAr || `specializations ${spec.id}`}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      {t("register.noSpecializationsAvailable")}
                    </option>
                  )}
                </select>
                {formik.touched.specialization && formik.errors.specialization ? (
                 <div
                    className="p-4 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.specialization}
                  </div>
                ) : null}
              </div>
            )}
            {/* زر الإرسال */}
            {isLoading ? (
              <button
                type="submit"
                className="w-full p-2 mt-3 rounded transition duration-300 bg-teal-600 hover:bg-teal-700 text-white"
              >
                <i className="fa fa-spinner fa-spin"></i>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full p-2 mt-3 rounded transition duration-300 bg-teal-600 hover:bg-teal-700 text-white"
                disabled={!(formik.isValid && formik.dirty)}
              >
                {t("register.signUp")}
              </button>
            )}
            {/* أزرار التسجيل عبر فيسبوك وجوجل */}
            <div
              className={`flex justify-center items-center ${
                isArabic ? "space-x-reverse" : ""
              } space-x-4 mt-4`}
            >
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                <FaFacebookF className="text-sm" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                <FaGoogle className="text-sm" />
              </div>
            </div>
          </form>
        </motion.div>
        {/* الجزء الجانبي لتسجيل الدخول */}
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