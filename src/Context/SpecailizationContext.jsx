
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// سياق التخصصات

export const SpecializationContext = createContext();

export const SpecializationProvider = ({ children }) => {
  const { i18n } = useTranslation();

  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const res = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Specialization?language=${i18n.language}`
        );
        setSpecializations(res?.data?.data?.$values || []);

      } catch (err) {
        console.error("Error fetching specializations", err);
        setSpecializations([]);

      }
    };
    fetchSpecializations();
  }, [i18n.language]);

  return (
    <SpecializationContext.Provider
      value={{ specializations }}
    >
      {children}
    </SpecializationContext.Provider>
  )
};