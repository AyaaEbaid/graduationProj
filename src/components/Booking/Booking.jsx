import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TokenContext } from "../../Context/TokenContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

const SELECTED_SERVICES_KEY = "selectedServices";

const BookingModal = ({ isOpen, onClose, craftsmanId, specializationId, onBook }) => {
  const { token } = useContext(TokenContext);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState("");

  useEffect(() => {
    console.log("BookingModal received craftsmanId:", craftsmanId); // تحقق من الـ prop
    if (isOpen) {
      const savedServices = localStorage.getItem(SELECTED_SERVICES_KEY);
      if (savedServices) {
        const parsedServices = JSON.parse(savedServices);
        setSelectedServices(parsedServices);
        const newTotal = parsedServices.reduce((total, id) => {
          const service = services.find((s) => s.id === id);
          return total + (service?.price || 0);
        }, 0);
        setTotalPrice(newTotal);
      }
    }
  }, [isOpen, services, craftsmanId]);

  useEffect(() => {
    console.log("CraftsmanId:", craftsmanId, "SpecializationId:", specializationId, "Token:", token);
  }, [craftsmanId, specializationId, token]);

  const apiBaseUrl = "https://hanshatabhalak.runasp.net/api";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        if (!specializationId || isNaN(specializationId)) {
          throw new Error("Invalid or undefined specializationId received.");
        }
        console.log("Fetching services with specializationId:", specializationId);
        const response = await axios.get(
          `${apiBaseUrl}/Service?SpecializationId=${specializationId}&language=en`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const servicesData = response.data?.data?.$values || [];
        if (servicesData.length === 0) {
          throw new Error("No services found for this specialization.");
        }
        setServices(
          servicesData.map((service) => ({
            id: service.id,
            name: service.name || "Unnamed Service",
            price: service.price || 0,
          }))
        );
      } catch (err) {
        console.error("Error fetching services:", err.message, err.response?.data);
        setServices([]);
        toast.error(
          err.response?.status === 401
            ? "Authorization Error: Please log in again."
            : err.response?.data?.message || err.message || "Failed to load services. Please try again.",
          { autoClose: 3000 }
        );
      }
      setLoading(false);
    };

    if (isOpen && token) {
      fetchServices();
    }
  }, [isOpen, specializationId, token, apiBaseUrl]);

  useEffect(() => {
    localStorage.setItem(SELECTED_SERVICES_KEY, JSON.stringify(selectedServices));
  }, [selectedServices]);

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => {
      const serviceId = service.id;
      const isSelected = prev.includes(serviceId);
      const newSelected = isSelected
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId];
      setTotalPrice(
        newSelected.reduce((total, id) => {
          const service = services.find((s) => s.id === id);
          return total + (service?.price || 0);
        }, 0)
      );
      console.log("Selected Service IDs:", newSelected);
      return newSelected;
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
      const formattedDate = selectedDate.toISOString().split("T")[0]; // تغيير التنسيق لـ yyyy-mm-dd
      console.log("CraftsmanId:", craftsmanId);
      console.log("Booking Date:", formattedDate);
      const requestBody = {
        craftsManId: craftsmanId.toString(),
        bookDate: formattedDate,
        servicesId: selectedServices,
      };
      console.log("Request Body:", requestBody);

      console.log("Headers:", { Authorization: `Bearer ${token}` });
      setDebugInfo(JSON.stringify(requestBody, null, 2));

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

      if (response.data.message === "The resource has been created successfully.") {
        toast.success("Booking Successful", { autoClose: 3000 });
        onBook(
          selectedServices.map((id) => services.find((s) => s.id === id)),
          totalPrice,
          selectedDate
        );
        localStorage.removeItem(SELECTED_SERVICES_KEY);
        setTimeout(() => {
          setDebugInfo("");
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        className="bg-white rounded-lg p-6 max-w-md mx-auto mt-10 shadow-lg border border-gray-200"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">Choose Services</h3>
          {loading ? (
            <p className="text-center text-gray-500">Loading services...</p>
          ) : (
            <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
              {services.length > 0 ? (
                services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.id)}
                        onChange={() => handleServiceToggle(service)}
                        className="w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                      />
                      <span className="ml-3 text-gray-700 text-sm">{service.name}</span>
                    </div>
                    <span className="text-gray-700 text-sm">{service.price} EGP</span>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-sm">No services available.</p>
              )}
            </div>
          )}

          <div className="sticky bottom-0 bg-white pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-base font-semibold text-gray-800">Total:</span>
              <span className="text-base font-bold text-gray-800">{totalPrice} EGP</span>
            </div>

            <div className="mb-4">
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Choose Date"
                  className="w-full border border-gray-300 rounded-lg py-2 pl-3 pr-10 text-gray-500 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <i className="fas fa-calendar-alt text-gray-500 text-lg"></i>
                </div>
              </div>
            </div>

            {/* {debugInfo && (
              <div className="mb-4 p-2 bg-gray-100 rounded text-sm text-gray-700">
                <strong>Debug Info:</strong>
                <pre>{debugInfo}</pre>
              </div>
            )} */}

            <button
              onClick={handleBook}
              disabled={selectedServices.length === 0 || !selectedDate || loading}
              className={`w-full py-2 rounded-lg text-white font-semibold text-sm ${
                selectedServices.length > 0 && selectedDate && !loading
                  ? "bg-teal-600 hover:bg-teal-700"
                  : "bg-teal-300 cursor-not-allowed"
              }`}
            >
              Book
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingModal;