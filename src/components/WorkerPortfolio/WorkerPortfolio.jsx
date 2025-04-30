import React, { useState } from 'react';
import { FaMapMarkerAlt, FaFileAlt, FaWrench, FaStar, FaImage } from 'react-icons/fa';
import porofile from "./../../assets/profile.png";
const WorkerPortfolio = () => {
  const [activeTab, setActiveTab] = useState('about');

  const worker = {
    name: 'Mostafa',
    specialty: 'Painter',
    rating: 4.9,
    completedJobs: 25,
    location: 'Giza, Dokki',
    about: 'Professional painter with expertise in interior and exterior painting. Specializes in residential and commercial projects with attention to detail and quality finishes.',
    services: [
      'Interior Painting',
      'Exterior Painting',
      'Wall Texturing',
      'Wallpaper Installation',
      'Color Consultation',
      'Special Finishes',
    ],
    portfolioImages: [], // لا توجد صور متاحة (سيتم عرض أيقونة "غير متاح")
    reviews: [
      { name: 'Ahmed Hassan', date: '2023-04-15', rating: 5.0, comment: 'Excellent work, very professional and punctual.' },
      { name: 'Sara Mahmoud', date: '2023-03-22', rating: 4.5, comment: 'Great attention to detail. The paint job looks amazing.' },
      { name: 'Mohamed Ali', date: '2023-02-10', rating: 4.0, comment: 'Good service, finished on time, but left a bit of a mess.' },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-10">
        
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
            <img
              className="w-32 h-32 rounded-full border-4 border-teal-500 object-cover"
              src={porofile}
              alt="Worker"
            />
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h2 className="text-3xl font-bold">{worker.name}</h2>
              <p className="bg-teal-100 text-teal-700 inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold">
                {worker.specialty}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-8 md:mt-0">
            <div className="text-center">
              <p className="text-yellow-400 text-3xl mb-1">★</p>
              <p className="font-bold text-xl">{worker.rating}</p>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
            <div className="text-center">
              <p className="text-teal-600 text-3xl mb-1">✓</p>
              <p className="font-bold text-xl">{worker.completedJobs}</p>
              <p className="text-gray-500 text-sm">Completed Jobs</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-12 mt-12 border-b border-gray-300">
          {['about', 'portfolio', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize text-lg font-semibold pb-4 ${
                activeTab === tab ? 'text-teal-600 border-b-2 border-teal-600' : 'text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="mt-10">
          {activeTab === 'about' && (
            <div className="space-y-8 text-gray-700">
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaMapMarkerAlt className="text-teal-500 mr-2" />
                  Location
                </h3>
                <p>{worker.location}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaFileAlt className="text-teal-500 mr-2" />
                  About
                </h3>
                <p>{worker.about}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-2">
                  <FaWrench className="text-teal-500 mr-2" />
                  Services
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {worker.services.map((service, index) => (
                    <span
                      key={index}
                      className="bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-center"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-2 gap-4">
              {worker.portfolioImages.length > 0 ? (
                worker.portfolioImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                  
                    className="w-full h-32 object-cover rounded-lg"
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

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {worker.reviews.length > 0 ? (
                worker.reviews.map((review, index) => (
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