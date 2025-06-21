// components/ToastHandler/ToastHandler.js
import { toast } from "react-toastify";

export const showToast = (type, key, lang = "en") => {
  const messages = {
    sessionExpired: {
      en: "Session expired, please log in again.",
      ar: "انتهت صلاحية الجلسة، الرجاء تسجيل الدخول مرة أخرى."
    }
  };

  const message = messages[key]?.[lang] || key;

  toast[type](message, {
    position: "top-center",
    autoClose: 4000,
    icon: "⚠",
    style: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#fff3cd",
      color: "#856404",
      border: "1px solid #ffeeba",
      borderRadius: "8px",
    }
  });
};