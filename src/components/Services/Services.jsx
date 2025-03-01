import React from "react";

import worker1 from "./../../assets/worker1.png";
import worker2 from "./../../assets/worker2.png";
import worker3 from "./../../assets/worker3.png";
import worker4 from "./../../assets/worker4.png";
import worker5 from "./../../assets/worker5.png";

export default function Services() {
  
  const services = [
    { id: 1, name: "خدمات الكهرباء", img: worker1 },
    { id: 2, name: "خدمات السباكة", img: worker2 },
    { id: 3, name: "خدمات النجارة", img: worker3 },
    { id: 4, name: "خدمات النقاشة", img: worker4 },
    { id: 5, name: "خدمات الديكور", img: worker5 },
  ];

  return (<>
    <div className="container mx-auto py-10 px-10">
      <h2 className="text-3xl font-bold text-center mb-12 tracking-wide">الخدمات </h2>
      
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {services.slice(0, 3).map((service) => (
          <div
            key={service.id}
            className="bg-white border-2 w-40 text-center mx-auto h-44 border-[#018A80] p-4 rounded-lg shadow-lg
                       flex flex-col items-center transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={service.img}
              alt={service.name}
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{service.name}</h3>
          </div>
        ))}
      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 justify-center">
        {services.slice(3).map((service) => (
          <div
            key={service.id}
            className="bg-white w-40 h-44 mx-auto border-2 border-[#018A80] p-4 rounded-lg shadow-lg 
                       flex flex-col items-center transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={service.img}
              alt={service.name}
              className="w-24 h-24 object-cover rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{service.name}</h3>
          </div>
        ))}
      </div>
    </div>
    <h3>hhhh</h3>
    </>
  );
}