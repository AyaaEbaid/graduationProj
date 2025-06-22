import React, { useContext, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  FaEdit,
  FaCamera,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
} from "react-icons/fa";
import { TokenContext } from "../../Context/TokenContext";
import { LocationContext } from "../../Context/LocationContext";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "react-modal";
import profileImage from "../../assets/profile.png";

Modal.setAppElement("#root");
const BASE_URL = "https://hanshatabhalak.runasp.net";

export default function AccountSettings() {
  const { t, i18n } = useTranslation();
  const { token } = useContext(TokenContext);
  const { governorates, centers, fetchCenters } = useContext(LocationContext);

  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchCustomerData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Customer/GetCustomer?language=${i18n.language}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data?.data) {
        setUserData(response.data.data);
        if (response.data.data.governorateId) {
          fetchCenters(response.data.data.governorateId);
        }
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Fetch failed:", error.response || error.message);
      toast.error(t("Failed to fetch profile"));
    }
  }, [i18n.language, token, fetchCenters, t]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  const handleEdit = () => {
    if (!userData) return toast.error(t("User data not loaded"));
    setEditData({
      fullName: userData.name,
      email: userData.email,
      phoneNumber: userData.phone,
      governorateId: userData.governorateId,
      centerId: userData.centerId,
    });
    fetchCenters(userData.governorateId);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/Auth/update-profile?language=${i18n.language}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !userData?.id) return toast.error(t("User ID not found"));

    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(
        `${BASE_URL}/api/Customer/${userData.id}/uploadImage?language=${i18n.language}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(t("Profile image updated successfully"));
      fetchCustomerData();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || t("Failed to upload image")
      );
    }
  };

  if (!userData)
    return <div className="text-center mt-10">{t("Loading")}...</div>;

  return (
    <motion.div
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        {/* صورة واسم */}
        <div className="flex items-center mb-6 gap-6">
          <div className="relative">
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

        {/* معلومات المستخدم */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            {t("Personal Information")}
          </h2>
          {[
            { icon: <FaUser />, label: t("Full Name"), value: userData.name },
            { icon: <FaEnvelope />, label: t("Email"), value: userData.email },
            { icon: <FaPhone />, label: t("Phone Number"), value: userData.phone },
            { icon: <FaMapMarker />, label: t("Location"), value: userData.governorate },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="text-teal-600">{item.icon}</div>
              <span className="font-medium">{item.label}</span>
              <span className="ml-auto text-gray-600">{item.value}</span>
            </div>
          ))}

          <button
            onClick={handleEdit}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
          >
            <FaEdit />
            {t("Edit My Profile")}
          </button>
        </div>
      </div>

      {/* المودال */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="space-y-4" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
          {/* Full Name */}
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 gap-2">
            <FaUser className="text-teal-600" />
            <input
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              type="text"
              placeholder={t("Full Name")}
              value={editData.fullName || ""}
              onChange={(e) =>
                setEditData({ ...editData, fullName: e.target.value })
              }
              className="w-full border-none focus:outline-none text-sm"
            />
          </div>
          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 gap-2">
            <FaEnvelope className="text-teal-600" />
            <input
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              type="email"
              placeholder={t("Email")}
              value={editData.email || ""}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              className="w-full border-none focus:outline-none text-sm"
            />
          </div>
          {/* Phone */}
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 gap-2">
            <FaPhone className="text-teal-600" />
            <input
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              type="text"
              placeholder={t("Phone")}
              value={editData.phoneNumber || ""}
              onChange={(e) =>
                setEditData({ ...editData, phoneNumber: e.target.value })
              }
              className="w-full border-none focus:outline-none text-sm"
            />
          </div>
          {/* Governorate */}
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 gap-2">
            <FaMapMarker className="text-teal-600" />
            <select
              value={editData.governorateId || ""}
              onChange={(e) => {
                const id = parseInt(e.target.value);
                setEditData({ ...editData, governorateId: id, centerId: 0 });
                fetchCenters(id);
              }}
              className="w-full border-none focus:outline-none text-sm"
            >
              <option value="">{t("Select Governorate")}</option>
              {governorates.map((gov) => (
                <option key={gov.id} value={gov.id}>
                  {gov.name}
                </option>
              ))}
            </select>
          </div>
          {/* Center */}
          <div className="flex items-center border border-gray-300 rounded px-4 py-2 gap-2">
            <FaMapMarker className="text-teal-600" />
            <select
              value={editData.centerId || ""}
              onChange={(e) =>
                setEditData({ ...editData, centerId: parseInt(e.target.value) })
              }
              className="w-full border-none focus:outline-none text-sm"
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
