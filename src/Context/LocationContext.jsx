import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// سياق الموقع (محافظات ومراكز)
export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [governorates, setGovernorates] = useState([]);
  const [centers, setCenters] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState(null);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب جميع المحافظات
  useEffect(() => {
    const fetchGovernorates = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Governorate?language=${i18n.language}`
        );
        setGovernorates(response.data.data.$values || []);
      } catch (err) {
        console.error("Error fetching governorates:", err);
        setError("Failed to load governorates");
      } finally {
        setLoading(false);
      }
    };
    fetchGovernorates();
  }, [i18n.language]);

  // جلب تفاصيل محافظة معينة
  const fetchGovernorateDetails = async (govId) => {
    if (!govId) {
      setSelectedGovernorate(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hanshatabhalak.runasp.net/api/Governorate/${govId}?language=${i18n.language}`
      );
      setSelectedGovernorate(response.data.data);
    } catch (err) {
      console.error("Error fetching governorate details:", err);
      setSelectedGovernorate(null);
      setError("Failed to load governorate details");
    } finally {
      setLoading(false);
    }
  };

  // جلب المراكز حسب المحافظة
  const fetchCenters = async (govId) => {
    if (!govId) {
      setCenters([]);
      setSelectedCenter(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hanshatabhalak.runasp.net/api/Center?govGovernoratId=${govId}&language=${i18n.language}`
      );
      const fetchedCenters = response.data.data.$values || [];
      if (fetchedCenters.length === 0) {
        setError("No centers available for this governorate");
      }
      setCenters(fetchedCenters);
    } catch (err) {
      console.error("Error fetching centers:", err);
      setCenters([]);
      setError("Failed to load centers");
    } finally {
      setLoading(false);
    }
  };

  // جلب تفاصيل مركز معين
  const fetchCenterDetails = async (centerId) => {
    if (!centerId) {
      setSelectedCenter(null);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hanshatabhalak.runasp.net/api/Center/${centerId}?language=${i18n.language}`
      );
      setSelectedCenter(response.data.data);
    } catch (err) {
      console.error("Error fetching center details:", err);
      setSelectedCenter(null);
      setError("Failed to load center details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        governorates,
        centers,
        selectedGovernorate,
        selectedCenter,
        fetchGovernorateDetails,
        fetchCenters,
        fetchCenterDetails,
        loading,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};