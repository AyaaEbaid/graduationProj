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

  const [governorates, setGovernorates] = useState([]);
  const [centers, setCenters] = useState([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [selectedCenter, setSelectedCenter] = useState("");
  const [workersData, setWorkersData] = useState([]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const specializationId = 3; // قيمة ثابتة
  const itemsPerPage = 3;

  // جلب المحافظات
  useEffect(() => {
    const fetchGovernorates = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Governorate?language=${i18n.language}`
        );
        setGovernorates(response.data.data?.$values || []);
      } catch (err) {
        setError(err.message || t("failedToLoadGovernorates"));
      } finally {
        setLoading(false);
      }
    };
    fetchGovernorates();
  }, [i18n.language, t]);

  // جلب المراكز
  useEffect(() => {
    if (!selectedGovernorate) {
      setCenters([]);
      setSelectedCenter("");
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

  // جلب العمال
  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Craftsman/GetCraftsmenPaginated?specializationId=${4}&centerId=${selectedCenter}&PageNumber=${currentPage}&PageSize=${itemsPerPage}&language=${i18n.language}`
        );
        const workers = response.data.data?.data?.$values || [];
        setWorkersData(workers);
        console.log("استجابة الـ API:", response.data);
        console.log("بيانات كل العمال:", workers);

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
  }, [currentPage, selectedCenter, i18n.language, t, specializationId]);

  // فلترة العمال
  useEffect(() => {
    let filtered = workersData;

    console.log("المحافظات:", governorates);
    console.log("المراكز:", centers);
    console.log("بيانات العمال قبل الفلترة:", workersData);

    if (selectedGovernorate) {
      const gov = governorates.find((g) => g.id === parseInt(selectedGovernorate));
      if (gov) {
        filtered = filtered.filter((worker) => worker.governorate === gov.name);
      } else {
        console.warn("مفيش محافظة بالـ ID ده:", selectedGovernorate);
        filtered = [];
      }
    }

    if (selectedCenter) {
      const center = centers.find((c) => c.id === parseInt(selectedCenter));
      if (center) {
        filtered = filtered.filter((worker) => worker.center === center.name);
      } else {
        console.warn("مفيش مركز بالـ ID ده:", selectedCenter);
        filtered = [];
      }
    }

    setFilteredWorkers(filtered);
    console.log("بيانات العمال بعد الفلترة:", filtered);
  }, [workersData, selectedGovernorate, selectedCenter, governorates, centers]);

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
      <h2 className="text-2xl font-bold text-center mb-6">Available Worker For Carpentry  Service</h2>

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

      {loading && <p className="text-center">  <i className="fa fa-spinner fa-spin"></i></p>}
      {error && <p className="text-center text-red-500">{t("error")}: {error}</p>}
      {!loading && !error && filteredWorkers.length === 0 && (
        <p className="text-center">{t("no_workers_found")}</p>
      )}

      {!loading && !error && filteredWorkers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredWorkers.map((worker) => (
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
              <p className="text-gray-500">{worker.specialization || t("not_specified")}</p>
              <p className="text-gray-400 text-sm">
                {worker.governorate} - {worker.center}
              </p>
              <p className="text-gray-400 text-sm">
                {t("experience")}: {worker.experience || 0} {t("years")}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card's onClick from firing
                  handleCardClick(worker.id);
                }}
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
              >
                {t("view_profile")}
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <p className="text-center text-gray-500 mt-2">
            {t("showing")} {filteredWorkers.length} {t("of")} {totalRecords} {t("workers")}
          </p>
        </div>
      )}
    </div>
  );
}