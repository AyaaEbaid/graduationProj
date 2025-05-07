import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import porofile from "./../../assets/profile.png";
import { motion } from "framer-motion";

export default function WorkersList() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [governorates, setGovernorates] = useState([]); // قايمة المحافظات
  const [selectedGovernorate, setSelectedGovernorate] = useState(""); // المحافظة المختارة
  const [centers, setCenters] = useState([]); // قايمة المراكز
  const [centerId, setCenterId] = useState(null); // المركز المختار
  const [currentPage, setCurrentPage] = useState(1);
  const [workersData, setWorkersData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  // جلب قايمة المحافظات
  useEffect(() => {
    const fetchGovernorates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Governorate?language=${i18n.language}`
        );
        console.log("Governorates Response:", response.data);
        setGovernorates(response.data.data?.$values || []);
      } catch (err) {
        setError(err.message || t("failedToLoadGovernorates"));
      } finally {
        setLoading(false);
      }
    };

    fetchGovernorates();
  }, [i18n.language, t]);

  // جلب قايمة المراكز بناءً على المحافظة المختارة
  useEffect(() => {
    if (!selectedGovernorate) {
      setCenters([]);
      setCenterId(null);
      setWorkersData([]);
      return;
    }

    const fetchCenters = async () => {
      setLoading(true);
      setError(null);
      setCenters([]); // إفراغ المراكز القديمة
      setCenterId(null); // إفراغ المركز المختار
      setWorkersData([]); // إفراغ بيانات العمال
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Center?govGovernoratId=${selectedGovernorate}&language=${i18n.language}`
        );
        console.log("Centers Response:", response.data);
        const fetchedCenters = response.data.data?.$values || [];
        if (fetchedCenters.length === 0) {
          setError(t("noCentersForGovernorate"));
        }
        setCenters(fetchedCenters);
      } catch (err) {
        setError(err.message || t("failedToLoadCenters"));
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, [selectedGovernorate, i18n.language, t]);

  // جلب بيانات العمال بناءً على المركز المختار
  useEffect(() => {
    if (!centerId) return;

    const fetchWorkers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Craftsman/list?centerId=${centerId}&PageNumber=${2}&PageSize=${itemsPerPage}&language=${i18n.language}`
        );
        console.log("Workers API Response:", response.data);

        setWorkersData(response.data.data?.data?.$values || []);
        const totalRecords = response.data.data?.totalRecords || 0;
        const calculatedTotalPages = Math.ceil(totalRecords / itemsPerPage);
        setTotalPages(calculatedTotalPages || 1);
      } catch (err) {
        setError(err.message || t("failedToFetchWorkers"));
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [centerId, currentPage, itemsPerPage, i18n.language, t]);

  const handleCardClick = (workerId) => {
    navigate(`/workerportfolio/${workerId}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleGovernorateChange = (e) => {
    setSelectedGovernorate(e.target.value);
    setCenterId(null); // إعادة تعيين المركز المختار عند تغيير المحافظة
  };

  const handleCenterChange = (e) => {
    setCenterId(e.target.value ? parseInt(e.target.value) : null);
    setCurrentPage(1); // إعادة تعيين الصفحة للأولى عند تغيير المركز
  };

  return (
    <div className="max-w-5xl min-h-screen mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">{t("worker_list")}</h2>

      {/* فلترة المحافظة والمركز */}
      <div className="flex justify-center space-x-4 mb-6">
        <div>
          <label htmlFor="governorate" className="block text-sm font-medium text-gray-700">
            {t("governorate")}
          </label>
          <select
            id="governorate"
            value={selectedGovernorate}
            onChange={handleGovernorateChange}
            className="mt-1 block w-48 p-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">{t("select_governorate")}</option>
            {governorates.map((gov) => (
              <option key={gov.id} value={gov.id}>
                {gov.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="center" className="block text-sm font-medium text-gray-700">
            {t("center")}
          </label>
          <select
            id="center"
            value={centerId || ""}
            onChange={handleCenterChange}
            className="mt-1 block w-48 p-2 border rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            disabled={!selectedGovernorate}
          >
            <option value="">{t("select_center")}</option>
            {centers.map((center) => (
              <option key={center.id} value={center.id}>
                {center.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p className="text-center">{t("loading")}</p>}
      {error && <p className="text-center text-red-500">{t("error")}: {error}</p>}
      {!loading && !error && !centerId && (
        <p className="text-center">{t("select_center_to_view_workers")}</p>
      )}
      {!loading && !error && workersData.length === 0 && centerId && (
        <p className="text-center">{t("no_workers_found")}</p>
      )}

      {!loading && !error && workersData.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {workersData.map((worker) => (
              <motion.div
                key={worker.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300 cursor-pointer"
                onClick={() => handleCardClick(worker.id)}
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <img
                    src={worker.image || porofile}
                    alt={worker.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-lg font-semibold">{worker.name}</h3>
                <p className="text-gray-500">{t(`job.specialization_${worker.specializationId}`) || "غير محدد"}</p>
                <p className="text-gray-400 text-sm">{worker.governorate} - {worker.center}</p>
                <p className="text-gray-400 text-sm">{t("experience")}: {worker.experience || 0} {t("years")}</p>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}