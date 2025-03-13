import React, { useEffect,useState } from "react";
import * as Yup from "yup";
import { FaFacebookF, FaGoogle , FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import bg2 from "./../../assets/bg2.jpg";
import ooo2 from "./../../assets/ooo  2.png";
import ooo from "./../../assets/ooo.png";
import logo from "./../../assets/white_logo.png";
import e from "./../../assets/Ellipse 2.png";
import p2 from "./../../assets/p2.png";
import Navbar from "../Navbar/Navbar";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const navigate=useNavigate();
  // Validation Schema باستخدام Yup
  let loginSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Not a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{3,8}$/,
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
      ),
  });

  // Formik Setup
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Login submitted:", values);
      navigate("/")
      // هنا ممكن تضيف API call لتسجيل الدخول
    },
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div
        className="flex h-screen items-center justify-center"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl flex flex-col md:flex-row bg-white shadow-2xl rounded-lg overflow-hidden"
        >
          {/* Colored Section */}
          <motion.div
            className="order-1 md:order-1 w-full md:w-1/2 bg-gradient-to-br from-teal-900 to-teal-500 text-white p-8 flex flex-col justify-center items-center"
          >
            <h2 className="text-3xl font-bold">Welcome Back!</h2>
            <p className="text-center mt-2">
              To stay connected with us, please log in with your personal
              information.
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 border border-white rounded hover:bg-white hover:text-teal-600"
              >
                Create an Account
              </motion.button>
            </Link>
          </motion.div>

          {/* Login Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="order-2 w-full md:w-1/2 p-8"
          >
            <h2 className="text-2xl font-bold text-teal-600 text-center">
              Sign In
            </h2>
            <form className="mt-4" onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Email Address"
                  className="w-full p-2 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-600 text-sm mb-2">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

            
                       <div className="mb-1.5 ">
                <div className="relative"> {/* حاوية ثابتة الارتفاع */}
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Password"
                    autoComplete="new-password"
                    className="w-full p-2 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600 pr-10"
                  />
                 <div> <span
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 pb-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-teal-600 z-10"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span></div>
                </div>
                {formik.errors.password && (
                  <div className="text-red-600 text-sm">{formik.errors.password}</div>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end mb-4">
                <Link
                  to="/reset-password"
                  className="text-sm text-teal-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              
              <button
              
              
  type="submit"
  disabled={!formik.isValid || !formik.dirty}
  className={`w-full p-2 rounded text-white transition duration-300 
    ${!formik.isValid || !formik.dirty ? "bg-gray-400 cursor-not-allowed" : "bg-teal-600 hover:bg-teal-700"}`}
>
  Sign In
</button>
            

              {/* Social Login Icons */}
              <div className="flex justify-center items-center space-x-4 mt-2">
                <div className="w-8 h-8 flex items-center me-4 justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                  <FaFacebookF className="text-sm" />
                </div>
                <div className="w-8 h-8 flex items-center justify-center border border-teal-500 text-teal-500 rounded-full transition duration-300 ease-in-out hover:bg-teal-500 hover:text-white shadow-md cursor-pointer">
                  <FaGoogle className="text-sm" />
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}