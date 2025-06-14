import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaUser, FaCalendarAlt, FaTools, FaCalendarTimes, FaCheck } from 'react-icons/fa';
import { TokenContext } from '../../Context/TokenContext';

const BookingCraftsman = () => {
  const { t, i18n } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Booking/GetAllBookingsByCraftsManId?language=${i18n.language}`,
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'confirmed':
        return 'bg-green-200 text-green-800';
      case 'inprogress':
        return 'bg-blue-200 text-blue-800';
      case 'completed':
        return 'bg-purple-200 text-purple-800';
      case 'canceled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white bg-teal-600 rounded-t-lg py-4 px-6 text-center">
          {t('bookingcraftsman.title')}
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
        {t('bookingcraftsman.title')}
      </h1>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {bookings.map((booking) => (
            <div
              key={booking.bookingId}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                  {t('bookingcraftsman.bookingNumber')}
                </h2>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                <FaUser className="text-teal-600" />
                <span className="font-medium">
                  {t('bookingcraftsman.customerName')}: {booking.customerName || t('bookingcraftsman.noCustomer')}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                <FaCalendarAlt className="text-teal-600" />
                <span>
                  {t('bookingcraftsman.bookDate')}: {booking.bookDate ? new Date(booking.bookDate).toLocaleDateString() : t('bookingcraftsman.noDate')}
                </span>
              </div>

              <hr className="border-gray-200 my-2" />

              <h3 className="font-semibold mb-2 text-teal-700 flex items-center gap-2">
                <FaTools className="text-teal-600" />
                {t('bookingcraftsman.services')}
              </h3>

              <ul className="text-sm mb-4 space-y-2">
                {booking.services?.$values?.length > 0 ? (
                  booking.services.$values.map((service, index) => (
                    <li key={`${booking.bookingId}-service-${index}`} className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-teal-600" />
                        <span>{service.name} ({service.specializationName})</span>
                      </div>
                      <span className="text-teal-600 font-semibold">${service.price || 0}</span>
                    </li>
                  ))
                ) : (
                  <li>{t('bookingcraftsman.noServices')}</li>
                )}
              </ul>

              <hr className="border-gray-200 my-2" />

              <p className="font-semibold text-right mt-2 text-teal-700">
                {t('bookingcraftsman.totalPrice')}: ${booking.totalPrice?.toFixed(2) || 0}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <FaCalendarTimes className="text-gray-400 mb-6 w-16 h-16" />
          <p className="text-xl font-bold text-gray-700 mb-2">{t('bookingcraftsman.noBookings')}</p>
          <p className="text-gray-500">{t('bookingcraftsman.noBookingsYet')}</p>
        </div>
      )}
    </div>
  );
};

export default BookingCraftsman;