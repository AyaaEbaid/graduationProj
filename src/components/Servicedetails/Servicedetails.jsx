// import React, { useEffect, useState, useMemo } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// export default function ServiceDetails() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const sentence = t('serviceDetails.title');

//   // خيارات الدروب داون باستخدام useMemo لتتحدث تلقائيًا مع تغيير اللغة
//   const options = useMemo(() => ({
//     service: [
//       t("serviceDetails.options.service1"),
//       t("serviceDetails.options.service2"),
//       t("serviceDetails.options.service3")
//     ],
//     governorate: [
//       t("serviceDetails.options.governorate1"),
//       t("serviceDetails.options.governorate2"),
//       t("serviceDetails.options.governorate3")
//     ],
//     center: [
//       t("serviceDetails.options.center1"),
//       t("serviceDetails.options.center2"),
//       t("serviceDetails.options.center3")
//     ]
//   }), [t]);

//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [selectedValues, setSelectedValues] = useState({
//     service: t("serviceDetails.servicePlaceholder"),
//     governorate: t("serviceDetails.governoratePlaceholder"),
//     center: t("serviceDetails.centerPlaceholder")
//   });

//   // لما اللغة تتغير، نرجّع القيم placeholder الجديدة
//   useEffect(() => {
//     setSelectedValues({
//       service: t("serviceDetails.servicePlaceholder"),
//       governorate: t("serviceDetails.governoratePlaceholder"),
//       center: t("serviceDetails.centerPlaceholder")
//     });
//   }, [t]);

//   const toggleDropdown = (dropdownName) => {
//     setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
//     setSearchTerm("");
//   };

//   const handleSelect = (dropdownName, value) => {
//     setSelectedValues((prev) => ({ ...prev, [dropdownName]: value }));
//     formik.setFieldValue(dropdownName, value);
//     setOpenDropdown(null);
//   };

//   const formik = useFormik({
//     initialValues: {
//       service: "",
//       governorate: "",
//       center: "",
//     },
//     validationSchema: Yup.object({
//       service: Yup.string().required(t("serviceDetails.validation.service")),
//       governorate: Yup.string().required(t("serviceDetails.validation.governorate")),
//       center: Yup.string().required(t("serviceDetails.validation.center")),
//     }),
//     onSubmit: (values) => {
//       console.log("Form Submitted", values);
//       navigate("/serviceworker");
//     },
//   });

//   const containerVariants = {
//     hidden: { opacity: 1 },
//     visible: {
//       opacity: 1,
//       transition: {
//         delayChildren: 1,
//         staggerChildren: 0.06,
//       },
//     },
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const buttonVariants = {
//     hidden: { x: 200, opacity: 0 },
//     visible: (custom) => ({
//       x: 0,
//       opacity: 1,
//       transition: {
//         delay: custom * 3,
//         duration: 3,
//       },
//     }),
//   };

//   const dropdownVariants = {
//     hidden: { opacity: 0, height: 0 },
//     visible: {
//       opacity: 1,
//       height: "auto",
//       transition: { duration: 1 },
//     },
//   };

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   return (
//     <div className="h-[100vh] w-full pb-20 bg-gradient-to-br from-teal-900 to-teal-100 flex justify-center items-center overflow-hidden">
//       <div className="relative z-10">
//         <motion.div
//           className="w-96 p-8 rounded-xl bg-teal-900/20 backdrop-blur-lg shadow-lg border border-white/20 text-center"
//           initial={{ x: 300, rotate: 0, opacity: 0 }}
//           animate={{ x: 0, rotate: 360, opacity: 1 }}
//           transition={{ duration: .8, ease: "easeOut" }}
//         >
//           <motion.h2
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="text-center mb-5 font text-white text-2xl"
//           >
//             {sentence.split("").map((char, index) => (
//               <motion.span key={index} variants={letterVariants}>
//                 {char === " " ? "\u00A0" : char}
//               </motion.span>
//             ))}
//           </motion.h2>

//           <form onSubmit={formik.handleSubmit} className="space-y-4">
//             {Object.keys(options).map((key, index) => (
//               <div key={key} className="relative">
//                 <motion.button
//                   type="button"
//                   onClick={() => toggleDropdown(key)}
//                   className="w-full bg-teal-500 text-white py-2 px-4 rounded flex justify-between items-center focus:outline-none"
//                   variants={buttonVariants}
//                   initial="hidden"
//                   animate="visible"
//                   custom={0.5}
//                 >
//                   {selectedValues[key]}
//                   <span className={openDropdown === key ? "rotate-180" : "rotate-0"}>▼</span>
//                 </motion.button>
//                 {formik.touched[key] && formik.errors[key] && (
//                   <div className="text-red-500 text-sm mt-1">{formik.errors[key]}</div>
//                 )}

//                 <AnimatePresence>
//                   {openDropdown === key && (
//                     <motion.div
//                       initial="hidden"
//                       animate="visible"
//                       exit="hidden"
//                       variants={dropdownVariants}
//                       className="absolute w-full bg-white shadow-lg rounded mt-2 z-10"
//                     >
//                       <input
//                         type="search"
//                         placeholder={t("serviceDetails.searchPlaceholder")}
//                         className="w-72 p-2 mt-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-teal-600"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                       <ul>
//                         {options[key]
//                           .filter((item) =>
//                             item.toLowerCase().includes(searchTerm.toLowerCase())
//                           )
//                           .map((item, index) => (
//                             <li
//                               key={index}
//                               onClick={() => handleSelect(key, item)}
//                               className="px-4 py-2 hover:bg-teal-100 cursor-pointer"
//                             >
//                               {item}
//                             </li>
//                           ))}
//                       </ul>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             ))}

//             <motion.button
//               type="submit"
//               className={`w-full mt-8 py-2 rounded ${
//                 formik.isValid
//                   ? "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br text-white"
//                   : "bg-gray-400 text-gray-700 cursor-not-allowed"
//               }`}
//               disabled={!formik.isValid}
//               variants={buttonVariants}
//               initial="hidden"
//               animate="visible"
//               custom={0.7}
//             >
//               {t("serviceDetails.submit")}
//             </motion.button>
//           </form>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ServiceDetails = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // هنا مكان استدعاء الـ API الحقيقي لاحقاً
    // مثلا: axios.get('/api/services').then(res => setServices(res.data));

    // بيانات مؤقتة للعرض
    setServices([
      {
        id: 5,
        title: "Painting Service",
        workers: [
          { name: "Tariq", job: "Painter", rating: 4.9, reviews: 17 },
          { name: "Amr", job: "Painter", rating: 4.6, reviews: 12 },
          { name: "Bassam", job: "Painter", rating: 5.0, reviews: 15 },
          { name: "Ziad", job: "Painter", rating: 4.7, reviews: 8 }
        ]
      },
      {
        id: 1,
        title: "Plumbing Service",
        workers: [
          { name: "Mohammed", job: "Plumber", rating: 4.0, reviews: 10 },
          { name: "Ahmed", job: "Plumber", rating: 5.0, reviews: 15 },
          { name: "Omar", job: "Plumber", rating: 4.5, reviews: 8 },
          { name: "Ali", job: "Plumber", rating: 4.2, reviews: 5 }
        ]
      },
      {
        id: 2,
        title: "Electrical Service",
        workers: [
          { name: "Khalid", job: "Electrician", rating: 5.0, reviews: 12 },
          { name: "Yousef", job: "Electrician", rating: 4.0, reviews: 20 },
          { name: "Hani", job: "Electrician", rating: 4.7, reviews: 9 },
          { name: "Saad", job: "Electrician", rating: 5.0, reviews: 7 }
        ]
      },
      {
        id: 3,
        title: "Carpentry Service",
        workers: [
          { name: "Sami", job: "Carpenter", rating: 5.0, reviews: 8 },
          { name: "Rami", job: "Carpenter", rating: 4.0, reviews: 14 },
          { name: "Fahad", job: "Carpenter", rating: 4.5, reviews: 11 },
          { name: "Nasser", job: "Carpenter", rating: 4.8, reviews: 6 }
        ]
      },
      {
        id: 4,
        title: "Decoration Service",
        workers: [
          { name: "Hassan", job: "Decorator", rating: 4.8, reviews: 18 },
          { name: "Omar", job: "Decorator", rating: 4.5, reviews: 10 },
          { name: "Salem", job: "Decorator", rating: 5.0, reviews: 13 },
          { name: "Majed", job: "Decorator", rating: 4.7, reviews: 9 }
        ]
      }
    ]);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-16 text-center">Services</h1>

      {services.map((service) => (
        <motion.div
          key={service.id}
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">{service.title}</h2>
            <Link
              to="/serviceworker" // غيّري اللينك لما تجهزي صفحة الباجينيشن
              className="text-teal-500 hover:underline"
            >
              See More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {service.workers.map((worker, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
                <h3 className="font-bold text-lg mb-1">{worker.name}</h3>
                <p className="text-gray-600 mb-1">{worker.job}</p>
                <div className="text-yellow-500">
                  {worker.rating} ⭐ ({worker.reviews})
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceDetails;