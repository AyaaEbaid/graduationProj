import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../Pagination/Pagination";
import porofile from "./../../assets/profile.png";
import { motion } from "framer-motion";

const itemsPerPage = 6;

export default function WorkersList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const workersData = useMemo(
    () => [
      { id: 1, name: "Mohammed Ali", job: "electrician", rating: 4.5, reviews: 15 },
      { id: 2, name: "Ahmed Youssef", job: "decorator", rating: 4.7, reviews: 22 },
      { id: 3, name: "Khalid Hassan", job: "painter", rating: 4.2, reviews: 10 },
      { id: 4, name: "Youssef Omar", job: "plumber", rating: 4.0, reviews: 8 },
      { id: 5, name: "Omar Ibrahim", job: "carpenter", rating: 4.8, reviews: 18 },
      { id: 6, name: "Ali Hassan", job: "electrician", rating: 4.3, reviews: 12 },
      { id: 7, name: "Hassan Saleh", job: "decorator", rating: 4.6, reviews: 9 },
      { id: 8, name: "Mostafa Ahmed", job: "painter", rating: 4.1, reviews: 11 },
      { id: 9, name: "Tarek Mohamed", job: "plumber", rating: 4.9, reviews: 20 },
      { id: 10, name: "Mahmoud Adel", job: "carpenter", rating: 4.4, reviews: 7 },
      { id: 11, name: "Adel Galal", job: "carpenter", rating: 4.2, reviews: 7 },
      { id: 12, name: "Moaz Ali", job: "plumber", rating: 4.4, reviews: 7 }
    ],
    []
  );

  const totalPages = Math.ceil(workersData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedWorkers = workersData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-5xl min-h-screen mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">{t("workers_list")}</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {selectedWorkers.map((worker) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-3">
              <img src={porofile} alt={worker.name} className="w-full h-full object-cover" />
            </div>

            <h3 className="text-lg font-semibold">{worker.name}</h3>
            <p className="text-gray-500">{t(`job.${worker.job}`)}</p>

            <div className="flex items-center justify-center mt-2">
              <span className="text-yellow-500 text-lg mr-1">★</span>
              <span className="text-sm">{worker.rating} ({worker.reviews})</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
}