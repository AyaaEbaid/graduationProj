import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TokenContext } from "../../Context/TokenContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

Modal.setAppElement("#root");

const SELECTED_SERVICES_KEY = "selectedServices";

const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => {
  const { i18n } = useTranslation();
  
  const isRTL = i18n.dir() === "rtl";

  return (
    <div className="relative w-full">
      <input
        type="button"
        ref={ref}
        onClick={onClick}
        value={value || placeholder}
        className={`w-full border border-gray-300 rounded-full py-3 px-12 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
          isRTL ? "text-right pr-12" : "text-left pl-12"
        }`}
        style={{ backgroundColor: "white", cursor: "pointer" }}
      />
      <i
        className={`fas fa-calendar-alt text-gray-500 absolute top-1/2 transform -translate-y-1/2 text-lg ${
          isRTL ? "left-4" : "right-4"
        }`}
      />
    </div>
  );
});

const BookingModal = ({ isOpen, onClose, craftsmanId, specializationId, onBook }) => {
  const { token } = useContext(TokenContext);
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState("");

  const apiBaseUrl = "https://hanshatabhalak.runasp.net/api";

  useEffect(() => {
    if (isOpen) {
      const savedServices = localStorage.getItem(SELECTED_SERVICES_KEY);
      if (savedServices) {
        const parsed = JSON.parse(savedServices);
        setSelectedServices(parsed);
        const newTotal = parsed.reduce((total, id) => {
          const service = services.find((s) => s.id === id);
          return total + (service?.price || 0);
        }, 0);
        setTotalPrice(newTotal);
      }
    }
  }, [isOpen, services]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (!specializationId || isNaN(specializationId)) throw new Error("Invalid specializationId.");
        const response = await axios.get(
          `${apiBaseUrl}/Service?SpecializationId=${specializationId}&language=${i18n.language}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data?.data?.$values || [];
        setServices(data.map((s) => ({ id: s.id, name: s.name, price: s.price })));
      } catch (err) {
        setServices([]);
        toast.error(err.response?.data?.message || err.message, { autoClose: 3000 });
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && token) fetchServices();
  }, [isOpen, specializationId, token, i18n.language]);

  useEffect(() => {
    localStorage.setItem(SELECTED_SERVICES_KEY, JSON.stringify(selectedServices));
  }, [selectedServices]);

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => {
      const exists = prev.includes(service.id);
      const updated = exists ? prev.filter((id) => id !== service.id) : [...prev, service.id];
      const newTotal = updated.reduce((total, id) => {
        const s = services.find((s) => s.id === id);
        return total + (s?.price || 0);
      }, 0);
      setTotalPrice(newTotal);
      return updated;
    });
  };

const handleBook = async () => {
  console.log("Initial CraftsmanId:", craftsmanId);
  console.log("Initial SelectedDate:", selectedDate);
  console.log("Initial SelectedServices:", selectedServices);

  if (selectedServices.length === 0) {
    toast.error("Please select at least one service.", { autoClose: 3000 });
    return;
  }
  if (!selectedDate) {
    toast.error("Please select a date.", { autoClose: 3000 });
    return;
  }
  if (!craftsmanId || isNaN(craftsmanId) || craftsmanId <= 0) {
    toast.error("Invalid craftsmanId. Please check the worker data.", { autoClose: 3000 });
    return;
  }

  try {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    console.log("CraftsmanId:", craftsmanId);
    console.log("Booking Date:", formattedDate);
    const requestBody = {
      craftsManId: craftsmanId.toString(),
      bookDate: formattedDate,
      servicesId: selectedServices,
    };
    console.log("Request Body:", requestBody);

    const response = await axios.post(
      `${apiBaseUrl}/Booking?language=en`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success("Booking Successful", { autoClose: 3000 });
      onBook(
        selectedServices.map((id) => services.find((s) => s.id === id)),
        totalPrice,
        selectedDate
      );
      localStorage.removeItem(SELECTED_SERVICES_KEY);
      setTimeout(() => {
         setDebugInfo("data")
        onClose();
      }, 3000);
    } else {
      throw new Error("Unexpected response from server: " + JSON.stringify(response.data));
    }
  } catch (err) {
    console.error("Error booking:", err.message, err.response?.data);
    toast.error(
      err.response?.status === 401
        ? "Authorization Error: Please log in again."
        : err.response?.data?.message || "Booking Failed. Please try again.",
      { autoClose: 3000 }
    );
  }
};

  const handleClose = () => {
    localStorage.removeItem(SELECTED_SERVICES_KEY);
    onClose();
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} theme="light" />
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        className="bg-white rounded-lg p-6 max-w-md mx-auto mt-10 shadow-lg border"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="relative">
          <button
            onClick={handleClose}
            className={`absolute top-2 text-gray-500 hover:text-gray-700 text-lg ${
              i18n.dir() === "rtl" ? "left-2" : "right-2"
            }`}
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold mb-4">{t("bookingModal.chooseServices")}</h3>

          {loading ? (
            <p className="text-center text-gray-500">{t("bookingModal.loading")}</p>
          ) : services.length > 0 ? (
            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto">
              {services.map((service) => (
                <div key={service.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-5 h-5 text-teal-600 border-gray-300 rounded"
                    />
                    <span className={`ml-3 rtl:mr-3 text-sm text-gray-700`}>{service.name}</span>
                  </div>
                  <span className="text-sm text-gray-700">{service.price} EGP</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">{t("bookingModal.noServices")}</p>
          )}

          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">{t("bookingModal.total")}</span>
              <span className="font-bold">{totalPrice} EGP</span>
            </div>
            <div className="mb-4">
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                placeholderText={t("bookingModal.chooseDate")}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                customInput={<CustomDateInput />}
              />
            </div>
            <button
              onClick={handleBook}
              disabled={selectedServices.length === 0 || !selectedDate || loading}
              className={`w-full py-2 rounded-lg text-white font-semibold text-sm ${
                selectedServices.length > 0 && selectedDate && !loading
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-teal-300 cursor-not-allowed"
              }`}
            >
              {t("bookingModal.book")}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingModal;
