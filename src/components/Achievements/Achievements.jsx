import React from 'react';
import { FaPaintRoller, FaBuilding, FaTools, FaCouch } from "react-icons/fa";

const achievements = [
    { icon: <FaPaintRoller className="text-teal-600 text-4xl hover:cursor-pointer hover:text-gray-800" />, value: '150+', label: 'Completed Projects' },
    { icon: <FaBuilding className="text-teal-600 text-4xl hover:cursor-pointer hover:text-gray-800" />, value: '75+', label: 'Residential Buildings' },
    { icon: <FaTools className="text-teal-600 text-4xl hover:cursor-pointer hover:text-gray-800" />, value: '200+', label: 'Tools Used' },
    { icon: <FaCouch className="text-teal-600 text-4xl hover:cursor-pointer hover:text-gray-800" />, value: '120+', label: 'Interior Designs' }
];

export default function Achievements() {
  return (
    <section 
      className="relative bg-cover bg-center py-16 px-4 text-center" 
      style={{ backgroundImage: "url(./../src/assets/6.jpg)" }} 
    >
      {/* Transparent Layer */}
      <div className="absolute inset-0 bg-white bg-opacity-75"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {achievements.map((ach, index) => (
            <div key={index} className="p-6 flex flex-col items-center relative">
              <div className="text-teal-600 text-4xl transition-transform duration-300 transform hover:scale-125 hover:text-gray-700">
                {ach.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-4">{ach.value}</h3>
              <p className="text-gray-600 mt-2">{ach.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
