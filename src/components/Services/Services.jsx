import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import worker1 from "./../../assets/worker1.png";
import worker2 from "./../../assets/worker2.png";
import worker3 from "./../../assets/worker3.png";
import worker4 from "./../../assets/worker4.png";
import worker5 from "./../../assets/worker5.png";

export default function Services() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, x: 0 });
    } else {
      controls.start({ opacity: 0, x: -100 });
    }
  }, [inView, controls]);

  const services = [
    { id: 1, name: "Electrical Services", img: worker1 },
    { id: 2, name: "Plumbing Services", img: worker2 },
    { id: 3, name: "Carpentry Services", img: worker3 },
    { id: 4, name: "Painting Services", img: worker4 },
    { id: 5, name: "Decoration Services", img: worker5 },
  ];

  return (
    <div ref={ref} className="container mx-auto py-10 px-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-12 tracking-wide"
      >
        Our Services
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {services.slice(0, 3).map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={controls}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.1, rotate: 2 }}
            className="bg-white border-2 text-center mx-auto h-48 border-[#018A80] p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img src={service.img} alt={service.name} className="w-28 h-28 object-cover rounded-full mb-4" />
            <h3 className="text-lg font-semibold">{service.name}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 justify-center">
        {services.slice(3).map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={controls}
            transition={{ duration: 0.6, delay: (index + 3) * 0.2 }}
            whileHover={{ scale: 1.1, rotate: -2 }}
            className="bg-white mx-auto border-2 border-[#018A80] p-4 rounded-lg shadow-lg flex flex-col items-center"
          >
            <img src={service.img} alt={service.name} className="w-28 h-28 object-cover rounded-full mb-4" />
            <h3 className="text-lg font-semibold">{service.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
