import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaTools, FaCalendarTimes, FaCaretDown, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { TokenContext } from '../../Context/TokenContext';

const BookingCraftsman = () => {
   const { token } = useContext(TokenContext);
  const { t, i18n } = useTranslation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showServices, setShowServices] = useState({});
 

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
        const bookingsData = response?.data?.data?.bookings?.$values || [];
        setBookings(bookingsData);
        setError(null);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
        setError(t('bookingcraftsman.errorFetchingBookings'));
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    } else {
      setLoading(false);
      setError(t('bookingcraftsman.loginRequired'));
    }
  }, [token, i18n.language, t]);

  const getStatusInfo = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { color: 'bg-yellow-400 text-yellow-800', icon: FaClock };
      case 'cancelled':
      case 'rejected':
        return { color: 'bg-red-400 text-red-800', icon: FaTimesCircle };
      case 'confirmed':
        return { color: 'bg-green-400 text-green-800', icon: FaCheckCircle };
         case 'complete':
        return { color: 'bg-green-400 text-yellow-800', icon: FaCheckCircle };
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

  // احتساب الإجمالي لـ totalOfCommission من البيانات
  const totalCommission = bookings.reduce((sum, booking) => sum + (booking.commission || 0), 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <h1 className="text-2xl font-bold text-white bg-teal-600 rounded-t-lg py-4 px-6 text-center">
          {t('bookingcraftsman.title')}
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <h1 className="text-2xl font-bold text-white bg-teal-600 rounded-t-lg py-4 px-6 text-center">
          {t('bookingcraftsman.title')}
        </h1>
        <div className="flex flex-col items-center justify-center py-20">
          <FaCalendarTimes className="text-gray-400 mb-6 w-16 h-16" />
          <p className="text-xl font-bold text-gray-700 mb-2">{t('bookingcraftsman.error')}</p>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
<h1 className="text-2xl font-bold text-white bg-gradient-to-b from-teal-600 to-teal-400 rounded-t-lg py-4 px-6 text-center">
  {t('bookingcraftsman.title')}
</h1>
<div className="bg-teal-400 py-2 px-6 text-center text-white text-xl flex justify-center items-center">
  <span className="mr-2">{t('bookingcraftsman.totalCommission')}: {85.0} {t('bookingcraftsman.currency')}</span>
  <span role="img" aria-label="money" className="text-xl">💰</span>


</div>

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
                <div className="border-b border-gray-200 pb-2 mb-4">
                  <h2 className="font-semibold text-lg text-teal-600">{t('bookingcraftsman.bookingNumber')} </h2>
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
                  <span className="font-medium">{t('bookingcraftsman.customerName')}: {booking.customerName || t('bookingcraftsman.noCustomer')}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaCalendarAlt className="text-orange-500" />
                  <span>{t('bookingcraftsman.bookDate')}: {booking.bookDate ? new Date(booking.bookDate).toLocaleDateString(i18n.language) : t('bookingcraftsman.noDate')}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>{t('bookingcraftsman.governorate')}: {booking.governorate}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaBuilding className="text-indigo-500" />
                  <span>{t('bookingcraftsman.center')}: {booking.center}</span>
                </div>

                <div
                  className="flex items-center justify-between mb-4 p-2 rounded-lg border border-teal-200 shadow-sm cursor-pointer bg-teal-50 hover:bg-teal-100"
                  onClick={() => toggleServices(booking.bookingId)}
                >
                  <div className="flex items-center gap-2 text-sm text-teal-700">
                    <FaTools className="text-teal-600" />
                    <span>{t('bookingcraftsman.services')} <span className="font-medium">{booking.services?.$values?.length || 0} {t('bookingcraftsman.servicesCount')}</span></span>
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
                          <span>{service.name} ({service.specializationName})</span>
                          <span className="text-teal-600 font-semibold">${service.price?.toFixed(2) || '0.00'} EGP</span>
                        </li>
                      ))
                    ) : (
                      <li>{t('bookingcraftsman.noServices')}</li>
                    )}
                  </ul>
                )}
<hr className="border-gray-300 my-4" />
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <p className="text-sm text-blue-700">%</p>
                    <p className="text-sm font-semibold text-blue-800">
                      {t('bookingcraftsman.commission')}: <span>${booking.commission?.toFixed(2) || '0.00'} EGP</span>
                    </p>
                  </div>
                  <div className="p-2 mx-2 bg-green-50 rounded-lg border border-green-200 text-center">
                    <p className="text-sm text-green-700">∑</p>
                    <p className="text-sm font-semibold text-green-800">
                      {t('bookingcraftsman.totalPrice')}: <span>${booking.totalPrice?.toFixed(2) || '0.00'} EGP</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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