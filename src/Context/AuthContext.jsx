import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserDataState] = useState({
    fullName: "",
    role: "",
    imageURL: "",
  });

  // ⬇️ 1. تحميل البيانات من localStorage عند أول تحميل للصفحة
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserDataState(JSON.parse(storedData));
    }
  }, []);

  // ⬇️ 2. دالة تحفظ البيانات في context + localStorage
  const setUserData = (data) => {
    setUserDataState(data);
    localStorage.setItem("userData", JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
