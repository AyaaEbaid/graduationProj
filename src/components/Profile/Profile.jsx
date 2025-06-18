// AccountSettings.jsx
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaEdit, FaCamera, FaUser, FaEnvelope, FaPhone, FaMapMarker } from "react-icons/fa";
import { TokenContext } from "../../Context/TokenContext";
import { LocationContext } from "../../Context/LocationContext";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import profileImage from "../../assets/profile.png"; 

// إعداد react-modal لتحسين الوصولية
Modal.setAppElement('#root'); // استبدل '#root' بمعرف العنصر الجذر في تطبيقك

// عنوان الخادم الأساسي للصور
const BASE_URL = "https://hanshatabhalak.runasp.net";

export default function AccountSettings() {
  const { t, i18n } = useTranslation();
  const { token } = useContext(TokenContext);
  const { governorates, centers, fetchCenters } = useContext(LocationContext);

  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // جلب بيانات العميل
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Customer/GetCustomer?language=${i18n.language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.data) {
        setUserData(response.data.data);
        if (response.data.data.governorateId) {
          fetchCenters(response.data.data.governorateId);
        } else {
          toast.warn(t("Governorate ID not found, centers not fetched"));
        }
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Fetch failed:", error.response || error.message);
      toast.error(t("Failed to fetch profile"));
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [i18n.language, token, fetchCustomerData]);

  // التعامل مع التعديل
  const handleEdit = () => {
    if (!userData) {
      toast.error(t("User data not loaded"));
      return;
    }
    setEditData({
      fullName: userData.name,
      email: userData.email,
      phoneNumber: userData.phone,
      governorateId: userData.governorateId,
      centerId: userData.centerId,
    });
    if (userData.governorateId) {
      fetchCenters(userData.governorateId);
    }
    setIsEditModalOpen(true);
  };

  // تحديث البيانات
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/Auth/update-profile?language=${i18n.language}`,
        editData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(t("Updated successfully"));
      setIsEditModalOpen(false);
      fetchCustomerData();
    } catch (error) {
      console.error("Update failed:", error.response || error.message);
      toast.error(t("Update failed"));
    }
  };

  // التعامل مع رفع الصورة
const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!userData?.id) {
    toast.error(t("User ID not found"));
    return;
  }

  const formData = new FormData();
  formData.append("file", file); 

  try {
    const res = await axios.post(
      `${BASE_URL}/api/Customer/${userData.id}/uploadImage?language=${i18n.language}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    toast.success(t("Profile image updated successfully"));
    fetchCustomerData();
  } catch (error) {
    console.error("Upload failed:", error.response || error.message);
    toast.error(
      error?.response?.data?.message || t("Failed to upload image")
    );
  }
};

  if (!userData) return <div className="text-center mt-10">{t("Loading")}...</div>;

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        {/* قسم الصورة الشخصية والاسم */}
        <div className="flex items-center mb-6">
          <div className="relative mr-6">
            <img
              src={userData.image ? `${BASE_URL}${userData.image}` : profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md border-4 border-white"
            />
            <label
              htmlFor="upload-photo"
              className="absolute bottom-2 right-2 bg-white border-2 border-teal-500 rounded-full p-2 text-teal-600 shadow-md cursor-pointer"
            >
              <FaCamera />
            </label>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-teal-600">{userData.name}</h2>
            <p className="text-gray-500">User</p>
          </div>
        </div>

        {/* قسم بيانات المستخدم */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">{t("Personal Information")}</h2>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FaUser className="text-teal-600 mr-3" />
            <span className="font-medium">{t("Full Name")}</span>
            <span className="ml-auto text-gray-600">{userData.name}</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FaEnvelope className="text-teal-600 mr-3" />
            <span className="font-medium">{t("Email")}</span>
            <span className="ml-auto text-gray-600">{userData.email}</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FaPhone className="text-teal-600 mr-3" />
            <span className="font-medium">{t("Phone Number")}</span>
            <span className="ml-auto text-gray-600">{userData.phone}</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <FaMapMarker className="text-teal-600 mr-3" />
            <span className="font-medium">{t("Location")}</span>
            <span className="ml-auto text-gray-600">{userData.governorate}</span>
          </div>
          <button
            onClick={handleEdit}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
          >
            <FaEdit />
            {t("Edit My Profile")}
          </button>
        </div>
      </div>

      {/* نافذة التعديل */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        

        <div className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 focus-within:ring-2 focus-within:ring-teal-500">
            <FaUser className="text-teal-600 mr-3" />
            <input
              type="text"
              placeholder={t("Full Name")}
              value={editData.fullName || ""}
              onChange={(e) => setEditData({ ...editData, fullName: e.target.value })}
              className="w-full border-none focus:outline-none"
              aria-label={t("Full Name")}
            />
          </div>
          
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 focus-within:ring-2 focus-within:ring-teal-500">
            <FaEnvelope className="text-teal-600 mr-3" />
            <input
              type="email"
              placeholder={t("Email")}
              value={editData.email || ""}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })}
              className="w-full border-none focus:outline-none"
              aria-label={t("Email")}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 focus-within:ring-2 focus-within:ring-teal-500">
            <FaPhone className="text-teal-600 mr-3" />
            <input
              type="text"
              placeholder={t("Phone")}
              value={editData.phoneNumber || ""}
              onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })}
              className="w-full border-none focus:outline-none"
              aria-label={t("Phone")}
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 focus-within:ring-2 focus-within:ring-teal-500">
            <FaMapMarker className="text-teal-600 mr-3" />
            <select
              value={editData.governorateId || ""}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                setEditData({ ...editData, governorateId: id, centerId: 0 });
                fetchCenters(id);
              }}
              className="w-full border-none focus:outline-none"
              aria-label={t("Select Governorate")}
            >
              <option value="">{t("Select Governorate")}</option>
              {governorates.map((gov) => (
                <option key={gov.id} value={gov.id}>
                  {gov.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 focus-within:ring-2 focus-within:ring-teal-500">
            <FaMapMarker className="text-teal-600 mr-3" />
            <select
              value={editData.centerId || ""}
              onChange={(e) =>
                setEditData({ ...editData, centerId: parseInt(e.target.value) })
              }
              className="w-full border-none focus:outline-none"
              aria-label={t("Select Center")}
            >
              <option value="">{t("Select Center")}</option>
              {centers.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            >
              {t("Cancel")}
            </button>
            <button
              onClick={handleUpdate}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
            >
              {t("Save")}
            </button>
          
          </div>
         </div>
       
      </Modal>
      
      

      
    </motion.div>
  );
}