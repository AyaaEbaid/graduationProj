import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaTools, FaCalendarTimes, FaCaretDown, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { TokenContext } from '../../Context/TokenContext';

const BookingUser = () => {
  const { t, i18n } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showServices, setShowServices] = useState({});
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Booking/GetAllBookingsByCustomerId?language=${i18n.language}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBookings(response.data.data?.$values || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [token, i18n.language]);

  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { color: 'bg-yellow-400 text-yellow-800', icon: FaClock };
      case 'cancelled':
      case 'rejected':
        return { color: 'bg-red-400 text-red-800', icon: FaTimesCircle };
      case 'confirmed':
        return { color: 'bg-green-400 text-green-800', icon: FaCheckCircle };
      case 'inprogress':
        return { color: 'bg-blue-400 text-blue-800', icon: FaSpinner };
      default:
        return { color: 'bg-gray-400 text-gray-800', icon: FaClock };
    }
  };

  const calculateTotal = (services) => {
    return services?.$values?.reduce((sum, service) => sum + (service.price || 0), 0) || 0;
  };

  const toggleServices = (bookingId) => {
    setShowServices((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white bg-teal-600 rounded-t-lg py-4 px-6 text-center">
          {t('booking.title')}
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-white bg-teal-600 rounded-t-lg py-4 px-6 text-center">
        {t('booking.title')}
      </h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {bookings.map((booking) => {
            const total = calculateTotal(booking.services);
            const { color, icon: StatusIcon } = getStatusInfo(booking.status);
            return (
              <div
                key={booking.bookingId}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all"
              >
                <div className="border-b border-gray-300 pb-2 mb-4">
                  <h2 className="font-semibold text-lg text-teal-600">{t('booking.booking')}</h2>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-1"></div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color} flex items-center gap-1`}>
                    <StatusIcon className="w-3 h-3" />
                    {booking.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaUser className="text-blue-500" />
                  <span className="font-medium">{t('booking.craftsManName')}: {booking.craftsManName || t('booking.noCraftsman')}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaCalendarAlt className="text-orange-500" />
                  <span>{t('booking.bookDate')}: {booking.bookDate ? new Date(booking.bookDate).toLocaleDateString(i18n.language) : t('booking.noDate')}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>{t('booking.governorate')}: {booking.governorate}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaBuilding className="text-indigo-500" />
                  <span>{t('booking.center')}: {booking.center}</span>
                </div>
                <hr className="border-gray-300 my-4" />
                <div
                  className="flex items-center justify-between mb-4 p-2 rounded-lg border border-teal-300 shadow-md cursor-pointer bg-teal-50 hover:bg-teal-100"
                  onClick={() => toggleServices(booking.bookingId)}
                >
                  <div className="flex items-center gap-2 text-sm text-teal-700">
                    <FaTools className="text-teal-600" />
                    <span>{t('booking.services')} <span className="font-medium">{booking.services?.$values?.length || 0} {t('booking.servicesCount')}</span></span>
                  </div>
                  <span className="flex items-center gap-1 text-teal-600 font-semibold">
                    ${total.toFixed(2)} EGP <FaCaretDown className="text-teal-600" />
                  </span>
                </div>

                {showServices[booking.bookingId] && (
                  <ul className="text-sm mb-4 space-y-2 text-gray-700">
                    {booking.services?.$values?.length > 0 ? (
                      booking.services.$values.map((service, index) => (
                        <li key={`${booking.bookingId}-service-${index}`} className="flex justify-between items-center">
                          <span>{service.name}</span>
                          <span className="text-teal-600 font-semibold">${service.price?.toFixed(2) || '0.00'} EGP</span>
                        </li>
                      ))
                    ) : (
                      <li>{t('booking.noServices')}</li>
                    )}
                  </ul>
                )}

                <hr className="border-gray-300 my-4" />

                <div className="flex justify-end">
                  <p className="font-bold text-xl text-teal-700 bg-teal-100 px-4 py-2 rounded-lg border border-teal-300">
                    {t('booking.totalPrice').toUpperCase()}: <span className="text-teal-800">${booking.totalPrice?.toFixed(2) || '0.00'} EGP</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <FaCalendarTimes className="text-gray-400 mb-6 w-16 h-16" />
          <p className="text-xl font-bold text-gray-700 mb-2">{t('booking.noBookings')}</p>
          <p className="text-gray-500">{t('booking.noBookingsYet')}</p>
        </div>
      )}
    </div>
  );
};

export default BookingUser;