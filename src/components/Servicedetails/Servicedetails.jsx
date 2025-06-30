import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ServiceDetails = () => {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Icon mapping for specializations
  const iconMapping = {
    Plumbing: "fas fa-wrench",
    Carpentry: "fas fa-hammer",
    Electrician: "fas fa-bolt",
    Painting: "fas fa-paint-roller",
    Masonry: "fas fa-trowel",
    Default: "fas fa-tools",
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const possibleSpecializationIds = [1, 2, 3, 4, 5];
        const allWorkersData = [];

        for (const id of possibleSpecializationIds) {
          try {
            const response = await axios.get(
              `https://hanshatabhalak.runasp.net/api/Craftsman?SpecializationId=${id}&language=${i18n.language}`
            );
            const workers = response.data?.data?.$values || [];
            // Fetch image for each worker
            for (const worker of workers) {
              let imageUrl = "";
              try {
                const imageResponse = await axios.get(
                  `https://hanshatabhalak.runasp.net/api/Craftsman/${worker.id}/getImage?language=${i18n.language}`
                );
                imageUrl = imageResponse.data.imageUrl;
              } catch (imageErr) {
                console.error(`Error fetching image for worker ${worker.id}: `, imageErr.message);
                worker.imageUrl = null;
                continue;
              }
              const isValidImageUrl = imageUrl && typeof imageUrl === "string" && imageUrl.startsWith("/") && !imageUrl.includes(t("serviceDetails.no_image"));
              worker.imageUrl = isValidImageUrl ? `https://hanshatabhalak.runasp.net${imageUrl}` : null;
            }
            allWorkersData.push(...workers);
          } catch (err) {
            console.error(`Error fetching SpecializationId ${id}:`, err.message);
          }
        }

        const uniqueSpecializations = [
          ...new Set(allWorkersData.map((worker) => worker.specialization)),
        ].filter(Boolean);

        const servicesData = uniqueSpecializations.map((specialization, index) => {
          const workers = allWorkersData
            .filter((worker) => worker.specialization === specialization)
            .slice(0, 4)
            .map((worker) => ({
              id: worker.id,
              name: worker.name || t("serviceDetails.unknown"),
              job: worker.specialization.split(" ")[0], // May need translation if API doesn't handle it
              governorate: worker.governorate || t("serviceDetails.unknown"),
              center: worker.center || t("serviceDetails.unknown"),
              imageUrl: worker.imageUrl || "",
            }));
          return {
            id: index + 1,
            title: t(`${specialization}`), // Translate specialization
            icon: iconMapping[specialization] || iconMapping.Default,
            workers,
          };
        });

        setServices(servicesData);
        setError(null);
      } catch (error) {
        console.error("General Error fetching data:", error.message);
        setError(t("serviceDetails.error_message"));
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [i18n.language]); // Re-fetch when language changes

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg">{t("serviceDetails.loading_services")}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="p-6" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-4xl font-extrabold mb-16 text-center text-gray-800 tracking-tight">
        {t("serviceDetails.services_title")}
      </h1>

      {services.map((service) => (
        <motion.div
          key={service.id}
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              {service.icon ? (
                <i className={`${service.icon} text-teal-500 text-2xl`}></i>
              ) : null}
              <h2 className="text-2xl font-semibold text-gray-700">{service.title}</h2>
            </div>
            <Link
              to={
                service.id === 1
                  ? "/serviceworker"
                  : service.id === 2
                  ? "/serviceworker3"
                  : service.id === 3
                  ? "/serviceworker4"
                  : service.id === 4
                  ? "/serviceworker2"
                  : "/serviceworker5"
              }
              className="text-teal-500 hover:underline font-medium"
            >
              {t("serviceDetails.see_more")}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.isArray(service.workers) && service.workers.length > 0 ? (
              service.workers.map((worker, index) => (
              <Link to={`/workerportfolio/${worker.id}`} key={index} className="block">
  <motion.div
    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    {/* صورة العامل */}
    <div className="w-24 h-24 rounded-full mb-4 border-2 border-gray-300 overflow-hidden">
      {worker.imageUrl ? (
        <img
          src={worker.imageUrl}
          alt={worker.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">{t("serviceDetails.no_image")}</span>
        </div>
      )}
    </div>

    {/* بيانات العامل */}
    <h3 className="text-xl font-bold text-gray-800 mb-2">{worker.name}</h3>
    <p className="text-gray-600 text-sm font-medium mb-1">{worker.job}</p>
    <p className="text-gray-500 text-sm mb-1">
      <span className="font-semibold">{t("serviceDetails.governorate_label")}</span> {worker.governorate}
    </p>
    <p className="text-gray-500 text-sm mb-4">
      <span className="font-semibold">{t("serviceDetails.center_label")}</span> {worker.center}
    </p>

    {/* زر بدون لينك داخلي */}
    <button
      type="button"
      className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
    >
      {t("serviceDetails.view_profile")}
    </button>
  </motion.div>
</Link>

              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full text-lg">
                {t("serviceDetails.no_workers")}
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceDetails;