import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaUser, FaCalendarAlt, FaTools, FaCalendarTimes } from 'react-icons/fa';
import { TokenContext } from '../../Context/TokenContext';

const BookingUser = () => {
  const { t, i18n } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'cancelled':
      case 'rejected':
        return 'bg-red-200 text-red-800';
      case 'confirmed':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const calculateTotal = (services) => {
    return services?.$values?.reduce((sum, service) => sum + (service.price || 0), 0) || 0;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {bookings.map((booking) => {
            const total = calculateTotal(booking.services);
            return (
              <div
                key={booking.bookingId}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">
                    {t('booking.bookingNumber')} {booking.bookingId}
                  </h2>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

              

                <div className="flex items-center mb-4 text-sm text-gray-700">
                  <FaUser className="mr-2 text-teal-600" />
                  <span className="font-medium">
                    {t('booking.craftsManName')}: {booking.craftsManName || t('booking.noCraftsman')}
                  </span>
                </div>

              
                <div className="flex items-center mb-4 text-sm text-gray-700">
                  <FaCalendarAlt className="mr-2 text-teal-600" />
                  <span>
                    {t('booking.bookDate')}: {booking.bookDate ? new Date(booking.bookDate).toLocaleDateString() : t('booking.noDate')}
                  </span>
                </div>

                <hr className="border-gray-200 my-2" />

                <h3 className="font-semibold mb-2 text-teal-700 flex items-center">
                  <FaTools className="mr-2 text-teal-600" />
                  {t('booking.services')}
                </h3>

                <ul className="text-sm mb-4 space-y-2">
                  {booking.services?.$values?.length > 0 ? (
                    booking.services.$values.map((service, index) => (
                      <li key={`${booking.bookingId}-service-${index}`} className="flex justify-between">
                        <span>{service.name}</span>
                        <span className="text-teal-600 font-semibold">${service.price || 0}</span>
                      </li>
                    ))
                  ) : (
                    <li>{t('booking.noServices')}</li>
                  )}
                </ul>

             
                <p className="font-semibold text-right mt-2 text-teal-700">
                  {t('booking.totalPrice')}: ${total.toFixed(2)}
                </p>
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