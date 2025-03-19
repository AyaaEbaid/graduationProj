import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import bg2 from './../../assets/bg2.jpg';

export default function Resetpassword() {
  const { t } = useTranslation();

  return (
    <div 
      className="flex h-screen items-center justify-center" 
      style={{
        backgroundImage: `url(${bg2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="w-full max-w-md bg-white p-8 shadow-2xl rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-teal-600 text-center">
          {t("resetpassword.title")}
        </h2>
        
        <form>
          <input
            type="email"
            placeholder={t("resetpassword.email_placeholder")}
            className="w-full p-2 mb-2 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
          />
          <input
            type="password"
            placeholder={t("resetpassword.password_placeholder")}
            className="w-full p-2 mb-4 border rounded outline-none transition-transform duration-200 focus:scale-105 focus:border-teal-600"
          />
          <button className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700">
            {t("resetpassword.send_link")}
          </button>
        </form>

        <p className="text-center mt-4">
          <Link to="/login" className="text-teal-600 hover:underline">
            {t("resetpassword.back_to_login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
