import React, { useState, useEffect, useMemo, useContext } from "react";
import { FaMapMarkerAlt, FaFileAlt, FaWrench, FaStar, FaImage, FaBriefcase } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingModal from "../Booking/Booking";
import { useImageCraftsman } from "../../Context/ImageCraftsmanContext";
import { TokenContext } from "../../Context/TokenContext"; // استورد الـ Context من المسار الصحيح

const WorkerPortfolio = () => {
  const { id } = useParams();
  const { imageUrl } = useImageCraftsman();
  const [worker, setWorker] = useState(null);
  const [services, setServices] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const [activeTab, setActiveTab] = useState("about");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const { token } = useContext(TokenContext); // استخدام التوكن من الـ Context

  // تحديث craftsmanId في localStorage
  useEffect(() => {
    if (id && !isNaN(id)) {
      localStorage.setItem("craftsmanId", id);
      console.log("Stored craftsmanId in localStorage:", id); // للتحقق
    } else {
      console.warn("Invalid or undefined id from useParams:", id);
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isNaN(id)) {
        console.error("Invalid or undefined id from useParams:", id);
        setLoading(false);
        return;
      }

      let specializationId = 1;
      try {
        console.log("Fetching worker with ID:", id);
        const workerResponse = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Craftsman/${id}?language=en`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // إضافة التوكن في الـ header
            },
          }
        );
        console.log("Worker Data from API:", workerResponse.data);
        const workerData = workerResponse.data.data;

        specializationId = workerData.specializationId || 1;

        let expectedSpecializationId;
        if (workerData.specialization === "Electrical") expectedSpecializationId = 1;
        else if (workerData.specialization === "Plumbing") expectedSpecializationId = 2;
        else if (workerData.specialization === "Painting") expectedSpecializationId = 3;
        else if (workerData.specialization === "Carpentry") expectedSpecializationId = 4;
        else if (workerData.specialization === "Gypsum Board") expectedSpecializationId = 5;
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
          experience: workerData.experience || 0,
          completedJobs: workerData.completedJobs || 0,
          location: `${workerData.governorate || "Unknown"}, ${workerData.center || "Unknown"}`,
          about: workerData.description || "No description available",
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
          `https://hanshatabhalak.runasp.net/api/Service?SpecializationId=${specializationId}&language=en`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // إضافة التوكن في الـ header
            },
          }
        );
        console.log("Services from Specialization API:", specializationResponse.data);
        const servicesData = specializationResponse.data?.data?.$values || [];
        setServices(
          servicesData.map((service) => ({
            name: service.name || "Unnamed Service",
            price: service.price || 0,
            description: service.description || "No description available",
          }))
        );
      } catch (err) {
        console.error("Error fetching services:", err.message, err.response?.data, err.response?.status);
        setServices([]);
      }

      // جلب صور البورتفوليو من الـ API
      try {
        const portfolioResponse = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Cataloge/${id}/getCatalogeImages?language=en`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // إضافة التوكن في الـ header
            },
          }
        );
        console.log("Portfolio Images from API:", portfolioResponse.data);
        const images = portfolioResponse.data?.data?.result?.$values || [];
        setPortfolioImages(
          images.map((img) => ({
            url: `https://hanshatabhalak.runasp.net${img}`, // تحويل المسار النسبي لكامل
            alt: `Portfolio Image ${img.split("/").pop() || ""}`,
          }))
        );
      } catch (err) {
        console.error("Error fetching portfolio images:", err.message, err.response?.data, err.response?.status);
        setPortfolioImages([]); // إذا فشل الطلب، يظهر placeholder
      }

      setLoading(false);
    };

    fetchData();
  }, [id, token]);

  const workerData = useMemo(() => worker, [worker]);

  const handleRequestService = () => {
    setIsModalOpen(true);
  };

  const handleBook = (selectedServices, totalPrice, selectedDate) => {
    console.log("Booked:", { selectedServices, totalPrice, selectedDate });
    setIsModalOpen(false);
  };

  // التحكم في lightbox
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

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!workerData) return <div className="text-center p-6">No worker data available.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-10">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-teal-500 object-cover"
              src={imageUrl || "/default-avatar.png"}
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

          <div className="flex gap-10 mt-8 md:mt-0">
            <div className="text-center flex flex-col items-center">
              <FaStar className="text-yellow-400 text-3xl mb-1" />
              <p className="font-bold text-xl">{workerData.rating}</p>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <FaBriefcase className="text-teal-600 text-3xl mb-1" />
              <p className="font-bold text-xl">{workerData.experience}</p>
              <p className="text-gray-500 text-sm">Experience</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-teal-600 text-3xl mb-1">✓</p>
              <p className="font-bold text-xl">{workerData.completedJobs}</p>
              <p className="text-gray-500 text-sm">Completed Jobs</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-12 mt-12 border-b border-gray-300">
          {["about", "portfolio", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize text-lg font-semibold pb-4 ${
                activeTab === tab ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {activeTab === "about" && (
            <div className="space-y-8 text-gray-700">
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaMapMarkerAlt className="text-teal-500 mr-2" />
                  Location
                </h3>
                <p>{workerData.location}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaFileAlt className="text-teal-500 mr-2" />
                  About
                </h3>
                <p>{workerData.about}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaWrench className="text-teal-500 mr-2" />
                  Services
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
                      No services available
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
                  <div key={index} className="relative cursor-pointer" onClick={() => openLightbox(index)}>
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
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="font-semibold">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{review.comment}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  <p>No reviews available yet.</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleRequestService}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-10 rounded-full text-lg flex items-center"
          >
            Request Service
          </button>
        </div>

        {/* Lightbox */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeLightbox}>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              ←
            </button>
            <img
              src={portfolioImages[selectedImageIndex].url}
              alt={portfolioImages[selectedImageIndex].alt}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()} // منع إغلاق الـ lightbox بالنقر على الصورة
            />
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              →
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300"
            >
              ×
            </button>
          </div>
        )}

        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          craftsmanId={workerData ? workerData.id : id} // استخدام workerData.id أو id من useParams كـ backup
          specializationId={workerData ? workerData.specializationId : 1} // قيمة backup
          onBook={handleBook}
        />
      </div>
    </div>
  );
};

export default WorkerPortfolio;