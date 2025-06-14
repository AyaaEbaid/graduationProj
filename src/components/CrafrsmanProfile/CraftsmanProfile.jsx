import React, { useState, useEffect, useContext } from "react";
import { FaMapMarkerAlt, FaWrench, FaStar, FaImage, FaBriefcase } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";

const CraftsmanProfile = () => {
  const { t, i18n } = useTranslation();
  const { token } = useContext(TokenContext);
  const [workerData, setWorkerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // ضبط اتجاه النص بناءً على اللغة
  document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";

  // جلب بيانات الحرفي من الـ API
  useEffect(() => {
    const fetchCraftsman = async () => {
      if (!token) {
        setError("unauthorized");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
            `https://hanshatabhalak.runasp.net/api/Craftsman/GetCraftsman?language=${i18n.language}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data.data;

        if (!data) {
          throw new Error("No craftsman data found");
        }

        console.log("API Response cataloge:", data.cataloge);

        setWorkerData({
          id: data.id,
          name: data.name || (i18n.language === "ar" ? "غير معروف" : "Unknown"),
          specialty: data.specialization || (i18n.language === "ar" ? "تخصص غير معروف" : "Unknown Specialty"),
          rating: data.rating || 0,
          experience: data.experience || 0,
          completedJobs: data.completedJobs || 0,
          location: `${data.governorate || (i18n.language === "ar" ? "غير معروف" : "Unknown")}, ${
            data.center || (i18n.language === "ar" ? "غير معروف" : "Unknown")
          }`,
          availability: data.availability || false,
          image: data.image ? `https://hanshatabhalak.runasp.net${data.image}` : "/default-avatar.png",
          cataloge: Array.isArray(data.cataloge)
            ? data.cataloge.map((img, index) => ({
                url: `https://hanshatabhalak.runasp.net${img}`,
                alt: `i18n.language === "ar" ? صورة معرض ${index + 1} : Portfolio Image ${index + 1}`,
              }))
            : [],
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching craftsman data:", error.message);
        setError(error.response?.status === 401 ? "unauthorized" : "noData");
        setWorkerData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCraftsman();
  }, [token, i18n.language]);

  // التحكم في lightbox
  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % workerData.cataloge.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + workerData.cataloge.length) % workerData.cataloge.length);
  };

  if (loading) {
    return <div className="text-center p-6">{t("header.craftsmanProfile.loading")}</div>;
  }

  if (error) {
    return <div className="text-center p-6">{t(`header.craftsmanProfile.${error}`)}</div>;
  }

  if (!workerData) {
    return <div className="text-center p-6">{t("header.craftsmanProfile.noData")}</div>;
  }

  return (
    <div className={ `min-h-screen bg-gray-100 py-10 px-4 ${i18n.language === "ar" ? "text-right" : "text-left"}`}>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-10">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-teal-500 object-cover"
              src={workerData.image}
              alt={workerData.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h2 className="text-2xl font-bold">{workerData.name}</h2>
              <p className="bg-teal-100 text-teal-700 inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold">
                {workerData.specialty}
              </p>
            </div>
          </div>

          <div className="flex gap-12 mt-8 md:mt-0">
            <div className="text-center flex flex-col items-center">
              <FaBriefcase className="text-teal-600 text-3xl mb-2" />
              <p className="font-bold text-xl">{workerData.experience}</p>
              <p className="text-gray-500 text-sm">{t("header.craftsmanProfile.experience")}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-teal-600 text-3xl mb-2">✓</p>
              <p className="font-bold text-xl">{workerData.completedJobs}</p>
              <p className="text-gray-500 text-sm">{t("header.craftsmanProfile.completedJobs")}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-16 mt-12 border-b border-gray-300">
          {["about", "portfolio"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize text-lg font-semibold pb-4 px-4 ${
                activeTab === tab ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-400"
              }`}
            >
              {t(`header.craftsmanProfile.${tab}Tab`)}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {activeTab === "about" && (
            <div className="space-y-8 text-gray-700">
              <div>
                <h3 className="flex items-center font-bold text-lg mb-4">
                  <FaMapMarkerAlt className={i18n.language === "ar" ? "me-2" : "ms-2"} />
                  {t("header.craftsmanProfile.location")}
                </h3>
                <p>{workerData.location}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-4">
                  <FaWrench className={i18n.language === "ar" ? "me-2" : "ms-2"} />
                  {t("header.craftsmanProfile.availability")}
                </h3>
                <p className="flex items-center  text-lg mb-4">
                  {workerData.availability
                    ? t("header.craftsmanProfile.available")
                    : t("header.craftsmanProfile.notAvailable")}
                </p>
              </div>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {workerData.cataloge.length > 0 ? (
                workerData.cataloge.map((image, index) => (
                  <div key={index} className="relative cursor-pointer" onClick={() => openLightbox(index)}>
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-avatar.png";
                      }}
                    />
                  </div>
                ))
              ) : (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 h-48 flex items-center justify-center rounded-lg"
                    >
                      <FaImage className="text-gray-400 text-3xl" />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-10 rounded-full text-lg flex items-center">
            {t("header.craftsmanProfile.requestService")}
          </button>
        </div>

        {/* Lightbox */}
        {selectedImageIndex !== null && workerData.cataloge.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeLightbox}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              ←
            </button>
            <img
              src={workerData.cataloge[selectedImageIndex].url}
              alt={workerData.cataloge[selectedImageIndex].alt}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              →
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CraftsmanProfile;