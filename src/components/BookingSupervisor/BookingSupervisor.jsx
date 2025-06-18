import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { FaUser, FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaTools, FaCalendarTimes, FaCaretDown, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner, FaEdit } from 'react-icons/fa';
import { TokenContext } from '../../Context/TokenContext';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingSupervisor = () => {
  const { t, i18n } = useTranslation();
  const { token } = useContext(TokenContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showServices, setShowServices] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editedData, setEditedData] = useState({ bookDate: "", status: "" });

  const GET_URL = 'https://hanshatabhalak.runasp.net/api/Booking/GetAllBookingsBySupervisorId';
  const PUT_URL = 'https://hanshatabhalak.runasp.net/api/Booking';

  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      Modal.setAppElement('#root');
    } else {
      console.warn('Root element not found for Modal accessibility');
    }
    fetchBookings();
  }, [token, i18n.language]);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        setError(t('bookingSupervisor.loginRequired'));
        setLoading(false);
        return;
      }
      const response = await axios.get(GET_URL, {
        headers: { Authorization: `Bearer ${token}` },
        params: { language: i18n.language },
      });
      const bookingsData = response?.data?.data?.bookings?.$values || [];
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(t('bookingSupervisor.errorFetchingBookings'));
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Pending':
        return { color: 'bg-yellow-400 text-yellow-800', icon: FaClock };
      case 'Canceled':
      case 'Rejected':
        return { color: 'bg-red-400 text-red-800', icon: FaTimesCircle };
      case 'Confirmed':
        return { color: 'bg-green-400 text-green-800', icon: FaCheckCircle };
      case 'InProgress':
        return { color: 'bg-blue-400 text-blue-800', icon: FaSpinner };
      case 'Completed':
        return { color: 'bg-green-600 text-white', icon: FaCheckCircle };
      default:
        return { color: 'bg-gray-400 text-gray-800', icon: FaClock };
    }
  };

  const calculateTotal = (services) => {
    return services?.reduce((sum, service) => sum + (service.price || 0), 0) || 0;
  };

  const toggleServices = (bookingId) => {
    setShowServices((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }));
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setEditedData({
      bookDate: booking.bookDate ? new Date(booking.bookDate).toISOString().split('T')[0] : '',
      status: booking.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    if (!selectedBooking) {
      console.error('No booking selected');
      toast.error(t('bookingSupervisor.noBookingSelected'), {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'no-booking-error',
      });
      return;
    }

    try {
      console.log('Starting save changes...');
      const requestData = {
        bookDate: new Date(editedData.bookDate).toISOString(),
        status: editedData.status,
        id: selectedBooking.bookingId,
      };

      // التحقق من صلاحية التاريخ
      if (isNaN(new Date(editedData.bookDate).getTime())) {
        throw new Error('Invalid date');
      }

      const putUrl = `${PUT_URL}?id=${selectedBooking.bookingId}&language=${i18n.language}`;

      if (process.env.NODE_ENV !== 'production') {
        console.log('PUT URL:', putUrl);
        console.log('Request Headers:', { Authorization: `Bearer ${token}` });
        console.log('Request Body:', requestData);
      }

      console.log('Sending API request...');
      await axios.put(putUrl, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('API request successful, showing success toast...');

      // عرض toast قبل إغلاق النافذة
      toast.success(t('bookingSupervisor.saveSuccess'), {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'save-success',
      });

      // تأخير إغلاق النافذة لضمان ظهور الـ toast
      setTimeout(() => {
        fetchBookings();
        closeModal();
      }, 1000); // تأخير 500 ميلي ثانية
    } catch (error) {
      console.error('Error in handleSaveChanges:', error.message, error.response?.data);
      const errorMessage = error.response?.data?.message || error.response?.data?.title || t('bookingSupervisor.saveError');
      const statusCode = error.response?.status;

      let userMessage = errorMessage;
      if (statusCode === 401) {
        userMessage = t('bookingSupervisor.unauthorized');
      } else if (statusCode === 400) {
        userMessage = t('bookingSupervisor.invalidData');
      } else if (error.message === 'Invalid date') {
        userMessage = t('bookingSupervisor.invalidDate');
      }

      toast.error(userMessage, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: 'save-error',
      });

      // تأخير إغلاق النافذة في حالة الخطأ أيضًا
      setTimeout(() => {
        closeModal();
      }, 500);
    }
  };

  // زر اختبار للتحقق من عمل toast (يمكن إزالته بعد الاختبار)
  const testToast = () => {
    toast.info('This is a test toast!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      toastId: 'test-toast',
    });
  };

  const totalCommission = bookings.reduce((sum, booking) => sum + (booking.commission || 0), 0);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <h1 className="text-2xl font-bold text-white bg-teal-600 rounded-t-lg py-4 px-6 text-center">
          {t('bookingSupervisor.title')}
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
          {t('bookingSupervisor.title')}
        </h1>
        <div className="flex flex-col items-center justify-center py-20">
          <FaCalendarTimes className="text-gray-400 mb-6 w-16 h-16" />
          <p className="text-xl font-bold text-gray-700 mb-2">{t('bookingSupervisor.error')}</p>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-2xl font-bold text-white bg-gradient-to-b from-teal-600 to-teal-400 rounded-t-lg py-4 px-6 text-center">
        {t('bookingSupervisor.title')}
      </h1>
      <div className="bg-teal-400 py-2 px-6 text-center text-white text-xl flex justify-center items-center">
        <span className="mr-2">{t('bookingSupervisor.totalCommission')}: {totalCommission.toFixed(2)} {t('bookingSupervisor.currency')}</span>
        <span role="img" aria-label="money" className="text-xl">💰</span>
      </div>

      {/* زر اختبار للتحقق من عمل toast (يمكن إزالته بعد الاختبار) */}
      <button
        onClick={testToast}
      >
        
      </button>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {bookings.map((booking) => {
            const total = calculateTotal(booking.services?.$values || []);
            const { color, icon: StatusIcon } = getStatusInfo(booking.status);
            return (
              <div
                key={booking.bookingId}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition-all"
              >
                <div className="border-b border-gray-200 pb-2 mb-4">
                  <h2 className="font-semibold text-lg text-teal-600">{t('bookingSupervisor.bookingNumber')} {booking.bookingId}</h2>
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
                  <span className="font-medium">{t('bookingSupervisor.customerName')}: {booking.customerName || t('bookingSupervisor.noCustomer')}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaUser className="text-blue-500" />
                  <span className="font-medium">{t('bookingSupervisor.craftsmanName')}: {booking.craftsManName || t('bookingSupervisor.noCraftsman')}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaCalendarAlt className="text-orange-500" />
                  <span>{t('bookingSupervisor.bookDate')}: {booking.bookDate ? new Date(booking.bookDate).toLocaleDateString(i18n.language) : t('bookingSupervisor.noDate')}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaMapMarkerAlt className="text-purple-500" />
                  <span>{t('bookingSupervisor.governorate')}: {booking.governorate}</span>
                </div>

                <div className="flex items-center gap-2 mb-2 text-sm text-gray-700">
                  <FaBuilding className="text-indigo-500" />
                  <span>{t('bookingSupervisor.center')}: {booking.center}</span>
                </div>

                <div
                  className="flex items-center justify-between mb-4 p-2 rounded-lg border border-teal-200 shadow-sm cursor-pointer bg-teal-50 hover:bg-teal-100"
                  onClick={() => toggleServices(booking.bookingId)}
                >
                  <div className="flex items-center gap-2 text-sm text-teal-700">
                    <FaTools className="text-teal-600" />
                    <span className='' >{t('bookingSupervisor.services')} <span>{(booking.services?.$values || []).length || 0} {t('bookingSupervisor.servicesCount')}</span></span>
                  </div>
                  <span className="flex items-center gap-1 text-teal-600 font-semibold">
                    ${total.toFixed(2)} EGP <FaCaretDown className="text-teal-600" />
                  </span>
                </div>

                {showServices[booking.bookingId] && (
                  <ul className="text-sm mb-4 space-y-2 text-gray-700">
                    {(booking.services?.$values || []).length > 0 ? (
                      (booking.services.$values || []).map((service, index) => (
                        <li key={`${booking.bookingId}-service-${index}`} className="flex justify-between items-center">
                          <span>{service.name} ({service.specializationName})</span>
                          <span className="text-teal-600 font-semibold">${service.price?.toFixed(2) || '0.00'} EGP</span>
                        </li>
                      ))
                    ) : (
                      <li>{t('bookingSupervisor.noServices')}</li>
                    )}
                  </ul>
                )}
                   <hr className="border-gray-300 my-4" />
                <div className="flex justify-between mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg border border-blue-200 text-center">
                    <p className="text-sm text-blue-700">%</p>
                    <p className="text-sm font-semibold text-blue-800">
                      {t('bookingSupervisor.commission')}: <span>${booking.commission?.toFixed(2) || '0.00'} EGP</span>
                    </p>
                  </div>
                  <div className="p-2 mx-2 bg-green-50 rounded-lg border border-green-200 text-center">
                    <p className="text-sm text-green-700">∑</p>
                    <p className="text-sm font-semibold text-green-800">
                      {t('bookingSupervisor.totalPrice')}: <span>${booking.totalPrice?.toFixed(2) || '0.00'} EGP</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openModal(booking)}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <FaEdit className="text-white" /> {t('bookingSupervisor.edit')}
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <FaCalendarTimes className="text-gray-400 mb-6 w-16 h-16" />
          <p className="text-xl font-bold text-gray-700 mb-2">{t('bookingSupervisor.noBookings')}</p>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '400px',
            padding: '20px',
            direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
            zIndex: 1000,
          },
        }}
        contentLabel="Edit Booking"
      >
        <h2 className="text-xl font-bold mb-4 text-teal-600">{t('bookingSupervisor.editBooking')}</h2>
        {selectedBooking && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{t('bookingSupervisor.bookDate')}</label>
              <input
                type="date"
                name="bookDate"
                value={editedData.bookDate.split('T')[0]}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">{t('bookingSupervisor.status')}</label>
              <select
                name="status"
                value={editedData.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                <option value="Pending">{t('bookingSupervisor.pending')}</option>
                <option value="InProgress">{t('bookingSupervisor.inProgress')}</option>
                <option value="Confirmed">{t('bookingSupervisor.confirmed')}</option>
                <option value="Completed">{t('bookingSupervisor.completed')}</option>
                <option value="Canceled">{t('bookingSupervisor.canceled')}</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                {t('bookingSupervisor.cancel')}
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                {t('bookingSupervisor.save')}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={i18n.language === 'ar'}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default BookingSupervisor;