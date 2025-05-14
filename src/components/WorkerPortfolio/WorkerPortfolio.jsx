import React, { useState, useEffect, useMemo } from "react";
import { FaMapMarkerAlt, FaFileAlt, FaWrench, FaStar, FaImage, FaBriefcase } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

const WorkerPortfolio = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState(null);
  const [services, setServices] = useState([]); // خدمات (قسم واحد بس)
  const [loading, setLoading] = useState(true);
  const [workerError, setWorkerError] = useState(null);
  const [servicesError, setServicesError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [profileImage, setProfileImage] = useState("/default-avatar.png");

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isNaN(id)) {
        setWorkerError("Worker ID is missing or invalid. Please go back and try again.");
        setLoading(false);
        return;
      }

      // 1. جلب بيانات العامل أولًا
      let specializationId = 1; // قيمة افتراضية
      try {
        const workerResponse = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Craftsman/${id}?language=en`
        );
        console.log("Worker Data from API:", workerResponse.data);
        const workerData = workerResponse.data.data;

        const imageUrl = workerData.image && workerData.image !== "" ? workerData.image : "/default-avatar.png";
        specializationId = workerData.specializationId || 1; // استخدام specializationId من بيانات العامل
        console.log("Specialization ID from Worker Data:", specializationId); // للتأكد من القيمة

        setWorker({
          name: workerData.name || "Unknown",
          specialty: workerData.specializationName || "Professional Carpenter",
          rating: workerData.rating || 0,
          experience: workerData.experience || 0,
          completedJobs: workerData.completed_jobs || 0,
          location: `${workerData.governorate || "Unknown"}, ${workerData.center || "Unknown"}`,
          about: workerData.description || "No description available",
          specializationId: specializationId,
          portfolioImages: workerData.image ? [workerData.image] : [],
          reviews: [
            {
              name: "John Doe",
              date: "May 10, 2024",
              rating: 4.5,
              comment: "Great service! Very professional and on time.",
            },
            {
              name: "Jane Smith",
              date: "April 15, 2024",
              rating: 5,
              comment: "Amazing work! Highly recommend.",
            },
          ],
        });

        setProfileImage(imageUrl);
      } catch (err) {
        console.error("Error fetching worker data:", err.message, err.response?.data);
        setWorkerError("Failed to fetch worker data. Please try again later.");
      }

      // 2. جلب كل الخدمات بناءً على specializationId (الـ API الأولى بس)
      try {
        const specializationResponse = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Service?SpecializationId=${specializationId}&language=en`
        );
        console.log("Services from Specialization API:", specializationResponse.data);
        const servicesData = specializationResponse.data?.data?.$values || [];
        setServices(servicesData.map(service => ({
          name: service.name,
          price: service.price,
          description: service.description,
        })));
      } catch (err) {
        console.error("Error fetching services from Specialization API:", err.message, err.response?.data);
        setServicesError("Failed to fetch services. Please try again later.");
        setServices([]); // ضبط القيمة على Array فاضي في حالة الخطأ
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const workerData = useMemo(() => worker, [worker]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (workerError) return <div className="text-center text-red-500 p-6">{workerError}</div>;
  if (!workerData) return <div className="text-center p-6">No data available.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-10">
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-teal-500 object-cover"
              src={profileImage}
              alt={workerData.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h2 className="text-3xl font-bold">{workerData.name}</h2>
              <p className="bg-teal-100 text-teal-700 inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold">
                {workerData.specialty}
              </p>
            </div>
          </div>

          {/* Stats */}
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

        {/* Tabs */}
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

        {/* Tab Content */}
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
                {servicesError && <p className="text-red-500 mb-2">{servicesError}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.length > 0 ? (
                    services.map((service, index) => (
                      <div
                        key={index}
                        className="bg-teal-100 text-teal-700 p-2 rounded-lg text-center"
                      >
                        <span>{service.name} - ${service.price}</span>
                        <p className="text-sm text-gray-600">{service.description}</p>
                      </div>
                    ))
                  ) : (
                    <span className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-center">
                      No services available
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "portfolio" && (
            <div className="grid grid-cols-2 gap-4">
              {workerData.portfolioImages.length > 0 ? (
                workerData.portfolioImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-avatar.png";
                    }}
                  />
                ))
              ) : (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-200 h-32 flex items-center justify-center rounded-lg"
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

        {/* Request Button */}
        <div className="mt-12 flex justify-center">
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-10 rounded-full text-lg flex items-center">
            Request Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkerPortfolio;