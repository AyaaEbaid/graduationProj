import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json", // تأكد من أن الملفات موجودة في public/locales
    },
    interpolation: {
      escapeValue: false,
    },
  });

// ضبط لغة واتجاه الصفحة بناءً على اللغة المختارة
const updateDocumentLanguage = (lng) => {
  document.documentElement.lang = lng;
  document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
};

// تحديث اللغة عند التحميل
updateDocumentLanguage(i18n.language);

// تحديث اللغة عند تغييرها
i18n.on("languageChanged", (lng) => {
  updateDocumentLanguage(lng);
});

export default i18n;