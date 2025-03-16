import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import style from './Aboutus.module.css';
import photo1 from './../../assets/photo1.png';
import photo2 from "./../../assets/pic 2.png";
import photo3 from "./../../assets/photo2.png";

export default function About() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <>
      <section className="py-16" ref={ref}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center font-changa">
            {t("aboutus.title")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[photo3, photo2, photo1].map((photo, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: -50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: 2, delay: index * 0.8 }}
              >
                <div className="w-72 h-72">
                  <img
                    src={photo}
                    alt={`icon${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="mt-6 text-gray-700 text-lg leading-loose text-center font-medium">
                  {index === 0 && t("aboutus.paragraph1")}
                  {index === 1 && t("aboutus.paragraph2")}
                  {index === 2 && t("aboutus.paragraph3")}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}