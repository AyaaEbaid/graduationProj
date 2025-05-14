import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ServiceDetails = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  const serviceIcons = {
    1: "fa-solid fa-bolt",
    2: "fa-solid fa-hammer",
    3: "fa-solid fa-wrench",
    4: "fa-solid fa-paint-roller",
    5: "fa-solid fa-palette",
  };

  useEffect(() => {
    const fetchServices = async () => {
      const specializations = [
        { id: 1, title: "Electrical Service", apiId: 1 },
        { id: 2, title: "Carpentry Service", apiId: 2 },
        { id: 3, title: "Plumbing Service", apiId: 3 },
        { id: 4, title: "Painting Service", apiId: 4 },
        { id: 5, title: "Decoration Service", apiId: 5 },
      ];

      try {
        const servicesData = await Promise.all(
          specializations.map(async (spec) => {
            try {
              const response = await axios.get(
                `https://hanshatabhalak.runasp.net/api/Craftsman?SpecializationId=${spec.apiId}&language=en`
              );
              console.log(`Full Response for ${spec.title}:`, response.data);
              console.log(`Workers Data for ${spec.title}:`, response.data?.data?.$values);

              const workers = Array.isArray(response.data?.data?.$values) ? response.data.data.$values : [];
              const limitedWorkers = workers.slice(0, 4);

              return {
                id: spec.id,
                title: spec.title,
                workers: limitedWorkers
                  .filter((worker) => worker.id) // التأكد من وجود الـ id
                  .map((worker) => ({
                    id: worker.id,
                    name: worker.name || "Unknown",
                    job: worker.description || spec.title.split(" ")[0],
                    governorate: worker.governorate || "Unknown",
                    center: worker.center || "Unknown",
                  })),
              };
            } catch (err) {
              console.error(`Error fetching ${spec.title}:`, err.message, err.response?.data);
              return {
                id: spec.id,
                title: spec.title,
                workers: [],
              };
            }
          })
        );

        setServices(servicesData);
        setError(null);
      } catch (error) {
        console.error("General Error fetching data:", error.message, error.response?.data);
        setError("Failed to fetch services. Please try again later.");
        setServices(
          specializations.map((spec) => ({
            id: spec.id,
            title: spec.title,
            workers: [],
          }))
        );
      } finally {
        setLoading(false); // Set loading to false after fetching (success or failure)
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading Services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-16 text-center text-gray-800 tracking-tight">
        Services
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
              <i className={`${serviceIcons[service.id]} text-teal-500 text-2xl`}></i>
              <h2 className="text-2xl font-semibold text-gray-700">{service.title}</h2>
            </div>
            <Link
              to={
                service.id === 1 ? "/serviceworker" :
                service.id === 2 ? "/serviceworker2" :
                service.id === 3 ? "/serviceworker3" :
                service.id === 4 ? "/serviceworker4" :
                "/serviceworker5"
              }
              className="text-teal-500 hover:underline font-medium"
            >
              See More
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.isArray(service.workers) && service.workers.length > 0 ? (
              service.workers.map((worker, index) => (
                <Link
                  to={`/workerportfolio/${worker.id}`} // الكارد كله بقى Link
                  key={index}
                  className="block" // عشان الـ Link يشتغل كـ block
                >
                  <motion.div
                    className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 border-2 border-gray-300" />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{worker.name}</h3>
                    <p className="text-gray-600 text-sm font-medium mb-1">{worker.job}</p>
                    <p className="text-gray-500 text-sm mb-1">
                      <span className="font-semibold">Governorate:</span> {worker.governorate}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                      <span className="font-semibold">Center:</span> {worker.center}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // منع الـ Link بتاع الكارد من التفعيل
                        window.location.href = `/workerportfolio/${worker.id}`; // توجيه مباشر
                      }}
                      className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      View Profile
                    </button>
                  </motion.div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full text-lg">
                No workers available at the moment.
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceDetails;