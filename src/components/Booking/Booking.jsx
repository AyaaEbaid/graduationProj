import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Bind modal to app element (accessibility requirement for react-modal)
Modal.setAppElement("#root");

const BookingModal = ({ isOpen, onClose, workerId, onBook }) => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Service?SpecializationId=${workerId}&language=en`
        );
        const servicesData = response.data?.data?.$values || [];
        setServices(
          servicesData.map((service) => ({
            name: service.name || "Unnamed Service",
            price: service.price || 0,
          }))
        );
      } catch (err) {
        console.error("Error fetching services:", err.message, err.response?.data);
        setServices([]);
      }
      setLoading(false);
    };

    if (isOpen) {
      fetchServices();
    }
  }, [isOpen, workerId]);

  const handleServiceToggle = (service) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        const newSelected = prev.filter((s) => s !== service);
        setTotalPrice(newSelected.reduce((total, s) => total + s.price, 0));
        return newSelected;
      } else {
        const newSelected = [...prev, service];
        setTotalPrice(newSelected.reduce((total, s) => total + s.price, 0));
        return newSelected;
      }
    });
  };

  const handleBook = () => {
    if (selectedServices.length > 0 && selectedDate) {
      onBook(selectedServices, totalPrice, selectedDate);
      onClose();
    }
  };

  if (loading) return <div className="text-center p-4 text-gray-500">Loading...</div>;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white rounded-lg p-4 max-w-md mx-auto mt-10 shadow-lg border border-gray-200"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        {/* Services Selection */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Choose Services</h3>
        <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
          {services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="w-5 h-5 text-teal-600 rounded border-gray-300 focus:ring-teal-500"
                  />
                  <span className="ml-3 text-gray-700 text-sm">{service.name}</span>
                </div>
                <span className="text-gray-700 ml-3 text-sm">{service.price} EGP</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">No services available.</p>
          )}
        </div>

        {/* Sticky Footer Section (Total, Date Picker, Book Button) */}
        <div className="sticky bottom-0 bg-white pt-3">
          {/* Total Price */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-base font-semibold text-gray-800">Total:</span>
            <span className="text-base font-bold text-gray-800">{totalPrice} EGP</span>
          </div>

          {/* Date Picker */}
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
              {/* Calendar Icon using Font Awesome */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <i className="fas fa-calendar-alt text-gray-500 text-lg"></i>
              </div>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBook}
            disabled={selectedServices.length === 0 || !selectedDate}
            className={`w-full py-2 rounded-lg text-white font-semibold text-sm ${
              selectedServices.length > 0 && selectedDate
                ? "bg-teal-600 hover:bg-teal-700"
                : "bg-teal-300 cursor-not-allowed"
            }`}
          >
            Book
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingModal;