import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import worker1 from "./../../assets/worker1.png";
import worker2 from "./../../assets/worker2.png";
import worker3 from "./../../assets/worker3.png";
import worker4 from "./../../assets/worker4.png";
import worker5 from "./../../assets/worker5.png";

export default function Services() {
  const { t } = useTranslation();
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
    { id: 1, nameKey: "services.electrical", img: worker1, link: "/serviceworker" },
    { id: 2, nameKey: "services.plumbing", img: worker2, link: "/serviceworker3" },
    { id: 3, nameKey: "services.carpentry", img: worker3, link: "/serviceworker2" },
    { id: 4, nameKey: "services.painting", img: worker4, link: "/serviceworker4" },
    { id: 5, nameKey: "services.decoration", img: worker5, link: "/serviceworker5" },
  ];

  const handleNavigation = (link) => {
    window.location.href = link;
  };

  return (
    <div ref={ref} className="container mx-auto py-10 px-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-12 tracking-wide"
      >
        {t("services.title")}
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {services.slice(0, 3).map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={controls}
            transition={{ duration: 1, delay: index * 0.6 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleNavigation(service.link)}
            className="bg-white border-2 text-center mx-auto h-48 border-[#018A80] p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
          >
            <img
              src={service.img}
              alt={t(service.nameKey)}
              className="w-28 h-28 object-cover rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{t(service.nameKey)}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 justify-center">
        {services.slice(3).map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={controls}
            transition={{ duration: 0.9, delay: (index + 3) * 0.2 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleNavigation(service.link)}
            className="bg-white mx-auto border-2 border-[#018A80] p-4 rounded-lg shadow-lg flex flex-col items-center cursor-pointer"
          >
            <img
              src={service.img}
              alt={t(service.nameKey)}
              className="w-28 h-28 object-cover rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{t(service.nameKey)}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}