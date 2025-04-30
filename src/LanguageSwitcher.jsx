import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaGlobe } from "react-icons/fa";


const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
    setIsOpen(false);
  };

  return (
    <div className="relative   inline-block bg-white text-teal-600 rounded-full text-left  z-20">
      <button
        className="flex items-center gap-2  px-2 py-1.5 overflow-x-hidden text- rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaGlobe className="text-xl" />
        <span>{i18n.language === "ar" ? "Ar" : "En"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white shadow-md rounded-md">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => changeLanguage("en")}
          >
             English
          </button>
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={() => changeLanguage("ar")}
          >
             العربية
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;