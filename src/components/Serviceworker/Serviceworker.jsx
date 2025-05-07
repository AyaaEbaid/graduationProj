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

  // الحالات الأساسية للمكون
  const [governorates, setGovernorates] = useState([]);
  const [centers, setCenters] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [workersData, setWorkersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 3; // عدد العناصر لكل صفحة
  const specializationId = 18; // معرف التخصص (يمكن تعديله حسب الحاجة)

  // جلب قائمة المحافظات
  useEffect(() => {
    const fetchGovernorates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Governorate?language=${i18n.language}`
        );
        const govData = response.data.data?.$values || [];
        setGovernorates(govData);
      } catch (err) {
        setError(err.message || t("failedToLoadGovernorates"));
      } finally {
        setLoading(false);
      }
    };

    fetchGovernorates();
  }, [i18n.language, t]);

  // جلب قائمة المراكز بناءً على المحافظة المختارة
  useEffect(() => {
    if (!selectedGovernorate) {
      setCenters([]);
      setSelectedCenter("");
      setWorkersData([]);
      setTotalRecords(0);
      setTotalPages(1);
      return;
    }

    const fetchCenters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Center?govGovernoratId=${selectedGovernorate}&language=${i18n.language}`
        );
        const centerData = response.data.data?.$values || [];
        if (centerData.length === 0) {
          setError(t("noCentersForGovernorate"));
        }
        setCenters(centerData);
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
    if (!selectedCenter) {
      setWorkersData([]);
      setTotalRecords(0);
      setTotalPages(1);
      return;
    }

    const fetchWorkers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Craftsman/GetCraftsmenPaginated?specializationId=${3}&centerId=${selectedCenter}&pageNumber=${2}&pageSize=${itemsPerPage}&language=${i18n.language}`
        );
        const workers = response.data.data?.data?.$values || [];
        setWorkersData(workers);

        const totalRecordsFromApi = response.data.data?.totalRecords || 0;
        setTotalRecords(totalRecordsFromApi);
        const calculatedTotalPages = Math.ceil(totalRecordsFromApi / itemsPerPage);
        setTotalPages(calculatedTotalPages || 1);
      } catch (err) {
        setError(err.message || t("failedToFetchWorkers"));
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [selectedCenter, currentPage, i18n.language, t]);

  // معالجات الأحداث
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
    setSelectedCenter("");
    setCurrentPage(1);
  };

  const handleCenterChange = (e) => {
    setSelectedCenter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-5xl min-h-screen mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">{t("worker_list")}</h2>

      {/* فلاتر المحافظات والمراكز */}
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
            value={selectedCenter}
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

      {/* حالات التحميل والخطأ */}
      {loading && <p className="text-center">{t("loading")}</p>}
      {error && <p className="text-center text-red-500">{t("error")}: {error}</p>}
      {!loading && !error && !selectedCenter && (
        <p className="text-center">{t("select_center_to_view_workers")}</p>
      )}
      {!loading && !error && selectedCenter && workersData.length === 0 && (
        <p className="text-center">{t("no_workers_found")}</p>
      )}

      {/* عرض قائمة العمال */}
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
                <p className="text-gray-500">{worker.specialization || "غير محدد"}</p>
                <p className="text-gray-400 text-sm">{worker.governorate} - {worker.center}</p>
                <p className="text-gray-400 text-sm">{t("experience")}: {worker.experience || 0} {t("years")}</p>
              </motion.div>
            ))}
          </div>

          {/* التصفح */}
          {totalPages > 1 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <p className="text-center text-gray-500 mt-2">
                {t("showing")} {workersData.length} {t("of")} {totalRecords} {t("workers")}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}