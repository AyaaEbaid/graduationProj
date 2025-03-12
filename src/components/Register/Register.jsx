import React, { useEffect } from "react";
import * as Yup from "yup";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import bg2 from "./../../assets/bg2.jpg"; // استيراد الصورة

export default function Register() {
  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is Required")
      .min(3, "يجب ألا يكون أقل من 3 أحرف")
      .max(10, "يجب ألا يزيد عن 10 أحرف"),
    email: Yup.string().required("email is required").email("not valid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
        "password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
    repassword: Yup.string()
      .required("confirm password is required")
      .oneOf([Yup.ref("password")], "كلمات المرور غير متطابقة"),
    phone: Yup.string()
      .required("رقم الهاتف مطلوب")
      .matches(/^(?:\+20|0)1[0125]\d{8}$/, "رقم الهاتف غير صحيح"),
    government: Yup.string().required("اختر حكومة"),
    center: Yup.string().required("اختر مركزًا"),
    admin: Yup.string().required("اختر نوع الحساب"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repassword: "",
      phone: "",
      government: "",
      center: "",
      admin: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  return (
    <div
      className="flex h-screen  items-center justify-center"
      style={{
        backgroundImage:` url(${bg2})`, // استخدام المتغير المستورد مباشرة
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl   mb-3 mt-2 flex  flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden"
      >
        {/* باقي الكود بتاعك زي ما هو */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="order-2 md:order-1 w-full md:w-1/2 p-8"
        >
          <h2 className="text-2xl font-bold text-teal-600 text-center">
            Create an Account
          </h2>

          <form className="mt-2" onSubmit={formik.handleSubmit}>
            <div className="mb-1.5">
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Full Name"
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="mb-1.5">
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                autoComplete="username"
                placeholder="Email Address"
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-1.5">
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
                autoComplete="new-password"
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-600 text-sm">{formik.errors.password}</div>
              ) : null}
            </div>

            <div className="mb-1.5">
              <input
                type="password"
                name="repassword"
                onChange={formik.handleChange}
                value={formik.values.repassword}
                autoComplete="new-password"
                placeholder="Confirm Password"
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.repassword && formik.errors.repassword ? (
                <div className="text-red-600 text-sm">{formik.errors.repassword}</div>
              ) : null}
            </div>

            <div className="mb-2">
              <input
                type="text"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder="Phone Number"
                className="w-full p-1 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-600 text-sm">{formik.errors.phone}</div>
              ) : null}
            </div>

            <div className="mb-2">
              <select
                name="government"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.government}
                className="w-full text-gray-600 p-1 border rounded outline-none transition-transform duration-200 focus:border-teal-600"
              >
                <option value="">Choose a Government</option>
                <option value="Government1">Government1</option>
                <option value="Government2">Government2</option>
                <option value="Government3">Government3</option>
                <option value="Government4">Government4</option>
              </select>
              {formik.touched.government && formik.errors.government ? (
                <div className="text-red-600 text-sm">{formik.errors.government}</div>
              ) : null}
            </div>

            <div className="mb-2">
              <select
                name="center"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.center}
                className="w-full text-gray-600 p-1 border rounded outline-none transition-transform duration-200 focus:border-teal-600"
              >
                <option value="">Choose a Center</option>
                <option value="Center1">Center1</option>
                <option value="Center2">Center2</option>
                <option value="Center3">Center3</option>
                <option value="Center4">Center4</option>
              </select>
              {formik.touched.center && formik.errors.center ? (
                <div className="text-red-600 text-sm">{formik.errors.center}</div>
              ) : null}
            </div>

            <div className="flex space-x-4 mb-5 mt-1">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="admin"
                  value="admin"
                  onChange={formik.handleChange}
                  checked={formik.values.admin === "admin"}
                  className="w-5 h-5 text-teal-600"
                />
                <span>Admin</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="admin"
                  value="user"
                  onChange={formik.handleChange}
                  checked={formik.values.admin === "user"}
                  className="w-5 h-5 text-teal-600"
                />
                <span>User</span>
              </label>
              {formik.touched.admin && formik.errors.admin ? (
                <div className="text-red-600 text-sm">{formik.errors.admin}</div>
              ) : null}
            </div>

            <button
              type="submit"
              
              className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
            >
              Sign Up
            </button>

            <div className="flex justify-center items-center space-x-4 mt-2">
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                <FaFacebookF className="text-sm" />
              </div>
              <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                <FaGoogle className="text-sm" />
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div className="order-1 md:order-2 w-full md:w-1/2 bg-gradient-to-br from-teal-900 to-teal-400 text-white p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold">Join Us!</h2>
          <p className="text-center mt-2">Already have an account?</p>
          <Link to="/login">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-teal-600"
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}