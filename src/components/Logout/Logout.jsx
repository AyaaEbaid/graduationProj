import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("تم تسجيل الخروج!");
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">تسجيل الخروج</h2>
      <button onClick={handleLogout} className="bg-red-600 text-white p-2">تسجيل الخروج</button>
    </div>
  );
};

export default Logout;