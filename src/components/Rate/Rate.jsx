import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Rate() {
  const { t } = useTranslation("rate");
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");

  const getRatingText = () => {
    switch (rating) {
      case 5:
        return t("rate.excellent");
      case 4:
        return t("rate.very_good");
      case 3:
        return t("rate.good");
      case 2:
        return t("rate.fair");
      default:
        return t("rate.poor");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto mt-20 bg-white shadow-lg rounded-xl p-10 border border-gray-300"
    >
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        {t("rate.title")}
      </h2>

      <p className="text-xl font-medium text-gray-600 text-center mt-3">
        {getRatingText()}
      </p>

      {/* النجوم */}
      <div className="flex justify-center space-x-3 my-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FaStar
              className={`w-12 h-12 cursor-pointer transition-all ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          </motion.div>
        ))}
      </div>

      {/* حقل الإدخال */}
      <textarea
        className="w-full border border-gray-300 rounded-lg p-4 mt-4 focus:ring-2 focus:ring-teal-600 outline-none text-lg"
        placeholder={t("rate.placeholder")}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />

      {/* زر الإرسال */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="w-full bg-teal-600 text-white py-4 rounded-lg mt-6 text-xl font-semibold transition bg-gradient-to-br from-teal-400 to-teal-800 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 px-5 text-center"
      >
        {t("rate.submit")}
      </motion.button>
    </motion.div>
  );
}
