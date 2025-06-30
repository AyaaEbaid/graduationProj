import React, { useState, useEffect, useMemo, useContext } from "react";
import { FaMapMarkerAlt, FaFileAlt, FaWrench, FaStar, FaImage, FaBriefcase } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingModal from "../Booking/Booking";

import { TokenContext } from "../../Context/TokenContext";
import { useTranslation } from "react-i18next";

const WorkerPortfolio = () => {
  const { id } = useParams();
 
  const [worker, setWorker] = useState(null);
  const [services, setServices] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const [activeTab, setActiveTab] = useState("about");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const { token } = useContext(TokenContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Set direction based on language
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isNaN(id)) {
        console.error("Invalid or undefined id from useParams:", id);
        setLoading(false);
        return;
      }

      let specializationId = 1;
      try {
        const workerResponse = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Craftsman/${id}?language=${i18n.language}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const workerData = workerResponse.data.data;

        specializationId = workerData.specializationId || 1;
        let expectedSpecializationId;
        if (workerData.specialization === (i18n.language === "ar" ? "كهرباء" : "Electrical")) expectedSpecializationId = 1;
        else if (workerData.specialization === (i18n.language === "ar" ? "سباكة" : "Plumbing")) expectedSpecializationId = 2;
        else if (workerData.specialization === (i18n.language === "ar" ? "دهان" : "Painting")) expectedSpecializationId = 3;
        else if (workerData.specialization === (i18n.language === "ar" ? "نجارة" : "Carpentry")) expectedSpecializationId = 4;
        else if (workerData.specialization === (i18n.language === "ar" ? "ألواح جبس" : "Gypsum Board")) expectedSpecializationId = 5;
        else expectedSpecializationId = specializationId;

        if (specializationId !== expectedSpecializationId) {
          console.warn(
            `Warning: Specialization ID (${specializationId}) does not match specialization (${workerData.specialization})! Using ${expectedSpecializationId}`
          );
          specializationId = expectedSpecializationId;
        }

        setWorker({
          id: id,
          name: workerData.name || "Unknown",
          specialty: workerData.specialization || "Unknown Specialty",
          rating: workerData.rating || 0,
          image: workerData.image || "",
          experience: workerData.experience || 0,
          completedJobs: workerData.completedJobs || 0,
          location: `${workerData.governorate || "Unknown"}, ${workerData.center || "Unknown"}`,
          about: workerData.description || t("workerPortfolio.noWorkerData"),
          specializationId: specializationId,
          portfolioImages: workerData.image ? [workerData.image] : [],
          reviews: [
            { name: "John Doe", date: "May 10, 2024", rating: 4.5, comment: "Great service!" },
            { name: "Jane Smith", date: "April 15, 2024", rating: 5, comment: "Amazing work!" },
          ],
        });
      } catch (err) {
        console.error("Error fetching worker data:", err.message, err.response?.data, err.response?.status);
        setLoading(false);
        return;
      }

      try {
        const specializationResponse = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Service?SpecializationId=${specializationId}&language=${i18n.language}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const servicesData = specializationResponse.data?.data?.$values || [];
        setServices(
          servicesData.map((service) => ({
            name: service.name || t("workerPortfolio.noServices"),
            price: service.price || 0,
            description: service.description || t("workerPortfolio.noServices"),
          }))
        );
      } catch (err) {
        console.error("Error fetching services:", err.message, err.response?.data, err.response?.status);
        setServices([]);
      }

      try {
        const portfolioResponse = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Cataloge/${id}/getCatalogeImages?language=${i18n.language}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
const imagesRaw = portfolioResponse.data?.data?.result?.$values || [];

const images = imagesRaw.filter(
  (img) =>
    img &&
    typeof img === "string" &&
    img.trim() !== "" &&
    !img.toLowerCase().includes("no image")
);


setPortfolioImages(
  images.map((img) => {
    const url = img.startsWith("http")
      ? img
      : `https://hanshatabhalak.runasp.net${img}`;
    return {
      url,
      alt: `Portfolio Image ${img.split("/").pop() || ""}`,
    };
  })
);


       
      } catch (err) {
        console.error("Error fetching portfolio images:", err.message, err.response?.data, err.response?.status);
        setPortfolioImages([]);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, token, i18n.language]);

  const workerData = useMemo(() => worker, [worker]);

  const handleRequestService = () => {
    setIsModalOpen(true);
  };

  const handleBook = (selectedServices, totalPrice, selectedDate) => {
    console.log("Booked:", { selectedServices, totalPrice, selectedDate });
    setIsModalOpen(false);
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % portfolioImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + portfolioImages.length) % portfolioImages.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
          <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-teal-600 text-lg font-semibold">{t("workerPortfolio.loading")}</p>
        </div>
      </div>
    );
  }

  if (!workerData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">{t("workerPortfolio.noWorkerData")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 md:px-8" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
 {workerData?.image && !workerData.image.toLowerCase().includes("no image") ? (
  <img
    className="w-32 h-32 rounded-full border-4 border-teal-500 object-cover"
    src={
      workerData.image.startsWith("http")
        ? workerData.image
        : `https://hanshatabhalak.runasp.net${workerData.image}`
    }
    alt={workerData.name}
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "/default-avatar.png"; // ← صورة افتراضية عند الفشل
    }}
  />
) : (
  <div className="w-32 h-32 rounded-full border-4 border-teal-500 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
    {t("workerPortfolio.noImage")}
  </div>
)}


            <div className="text-center md:text-start mt-4 md:mt-0">
              <h2 className="text-2xl font-bold">{workerData.name}</h2>
              <p className="bg-teal-100 text-teal-700 inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold">
                {workerData.specialty}
              </p>
            </div>
          </div>

          <div className="flex gap-6 sm:gap-8 md:gap-10 mt-6 md:mt-0">
            <div className="text-center flex flex-col items-center">
              <FaStar className="text-yellow-400 text-3xl mb-1" />
              <p className="font-bold text-xl">{workerData.rating}</p>
              <p className="text-gray-500 text-sm">{t("workerPortfolio.rating")}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <FaBriefcase className="text-teal-600 text-3xl mb-1" />
              <p className="font-bold text-xl">{workerData.experience}</p>
              <p className="text-gray-500 text-sm">{t("workerPortfolio.experience")}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-teal-600 text-3xl mb-1">✓</p>
              <p className="font-bold text-xl">{workerData.completedJobs}</p>
              <p className="text-gray-500 text-sm">{t("workerPortfolio.completedJobs")}</p>
            </div>
          </div>
        </div>

     <div
  className="flex justify-center gap-6 sm:gap-8 md:gap-12 mt-8 md:mt-12 border-b border-gray-300"
>

  {["about", "portfolio", "reviews"].map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`capitalize text-lg font-semibold pb-4 ${
        activeTab === tab ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-400"
      }`}
    >
      {t(`workerPortfolio.tabs.${tab}`)}
    </button>
  ))}
</div>


        <div className="mt-8 ml:4 md:mt-10">
          {activeTab === "about" && (
            <div className="space-y-6 sm:space-y-8 text-gray-700">
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaMapMarkerAlt className="text-teal-500 me-2" />
                  {t("workerPortfolio.location")}
                </h3>
                <p>{workerData.location}</p>
              </div>
              <div>
                <h3 className="flex  items-center font-bold text-lg mb-2">
                  <FaFileAlt className="text-teal-500 me-2" />
                  {t("workerPortfolio.about")}
                </h3>
                <p>{workerData.about}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaWrench className="text-teal-500 me-2" />
                  {t("workerPortfolio.services")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.length > 0 ? (
                    services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-white text-teal-700 p-4 rounded-lg text-center flex flex-col justify-between h-32 shadow-md border border-gray-200"
                      >
                        <span className="font-semibold">{service.name}</span>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        <p className="font-bold mt-2">{service.price} EGP</p>
                      </div>
                    ))
                  ) : (
                    <span className="bg-white text-teal-700 px-4 py-2 rounded-full text-center col-span-full">
                      {t("workerPortfolio.noServices")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

         {activeTab === "portfolio" && (
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
    {portfolioImages.length > 0 ? (
      portfolioImages.map((image, index) => (
        <div
          key={index}
          className="relative cursor-pointer"
          onClick={() => openLightbox(index)}
        >
          {imageLoading[index] !== false && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
              <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-48 object-cover rounded-lg"
            onLoad={() => setImageLoading((prev) => ({ ...prev, [index]: false }))}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-avatar.png";
              setImageLoading((prev) => ({ ...prev, [index]: false }));
            }}
          />
        </div>
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500 text-lg">
        {t("workerPortfolio.noCatalog")}
      </div>
    )}
  </div>
)}


          {activeTab === "reviews" && (
            <div className="space-y-6">
              {workerData.reviews.length > 0 ? (
                workerData.reviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold">{review.name}</p>
                          <p className="text-gray-500 text-sm">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 me-1" />
                        <span className="font-semibold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  <p>{t("workerPortfolio.noReviews")}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 md:mt-12 flex justify-center">
          <button
            onClick={handleRequestService}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-10 rounded-full text-lg flex items-center"
          >
            {t("workerPortfolio.requestService")}
          </button>
        </div>

        {/* Lightbox */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeLightbox}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute start-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              {i18n.language === "ar" ? "→" : "←"}
            </button>
            <img
              src={portfolioImages[selectedImageIndex].url}
              alt={portfolioImages[selectedImageIndex].alt}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute end-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              {i18n.language === "ar" ? "←" : "→"}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute top-4 end-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              ×
            </button>
          </div>
        )}

   <BookingModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  craftsmanId={parseInt(id)} // 👈 واضح وبسيط
  specializationId={workerData?.specializationId || 1}
  onBook={handleBook}
/>


      </div>
    </div>
  );
};

export default WorkerPortfolio;