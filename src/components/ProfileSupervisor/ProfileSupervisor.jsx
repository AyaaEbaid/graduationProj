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

export default function ProfileSupervisor() {
  const { t, i18n } = useTranslation();
  const { token } = useContext(TokenContext);
  const { governorates, centers, fetchCenters } = useContext(LocationContext);

  const [userData, setUserData] = useState(null);
  const [editData, setEditData] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchSupervisorData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/Supervisor/GetSupervisor?language=${i18n.language}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data?.data) {
        setUserData(response.data.data);
        if (response.data.data.governorateId) {
          fetchCenters(response.data.data.governorateId);
        }
      }
    } catch (error) {
      toast.error(t("Failed to fetch profile"));
    }
  }, [i18n.language, token, fetchCenters, t]);

  useEffect(() => {
    fetchSupervisorData();
  }, [fetchSupervisorData]);

  const handleEdit = () => {
    if (!userData) return;
    setEditData({
      fullName: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      governorateId: userData.governorateId,
      centerId: userData.centerId,
    });
    if (userData.governorateId) {
      fetchCenters(userData.governorateId);
    }
    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${BASE_URL}/api/Auth/update-profile?language=${i18n.language}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(t("Updated successfully"));
      setIsEditModalOpen(false);
      fetchSupervisorData();
    } catch (error) {
      toast.error(t("Update failed"));
    }
  };
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
      await axios.post(
        `${BASE_URL}/api/Supervisor/${userData.id}/uploadImage?language=${i18n.language}`,
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
  if (!userData)
    return <div className="text-center mt-10">{t("Loading")}...</div>;

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <div className="flex items-center mb-6 gap-6">
          <div className="relative">
            <img
              // src={
              //                 userData.image ? `${BASE_URL}${userData.image}` : profileImage
              //               }
              // alt="Profile"
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
              disabled
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-teal-600">{userData.name}</h2>
            <p className="text-gray-500">{t("Supervisor")}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            {t("Personal Information")}
          </h2>
          <InfoRow icon={<FaUser />} label={t("Full Name")} value={userData.name} />
          <InfoRow icon={<FaEnvelope />} label={t("Email")} value={userData.email} />
          <InfoRow icon={<FaPhone />} label={t("Phone Number")} value={userData.phoneNumber} />
          <InfoRow
            icon={<FaMapMarker />}
            label={t("Location")}
            value={
              i18n.language === "ar"
                ? `${userData.center} - ${userData.governorate}`
                : `${userData.governorate} - ${userData.center}`
            }
          />
          <button
            onClick={handleEdit}
            className="mt-6 w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
          >
            <FaEdit />
            {t("Edit My Profile")}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="space-y-4">
          <InputField label={t("Full Name")} value={editData.fullName} onChange={(e) => setEditData({ ...editData, fullName: e.target.value })} />
          <InputField label={t("Email")} value={editData.email} onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
          <InputField label={t("Phone Number")} value={editData.phoneNumber} onChange={(e) => setEditData({ ...editData, phoneNumber: e.target.value })} />
          <SelectField
            label={t("Select Governorate")}
            value={editData.governorateId || ""}
            options={governorates}
            onChange={(e) => {
              const id = parseInt(e.target.value);
              setEditData({ ...editData, governorateId: id, centerId: 0 });
              fetchCenters(id);
            }}
          />
          <SelectField
            label={t("Select Center")}
            value={editData.centerId || ""}
            options={centers}
            onChange={(e) => setEditData({ ...editData, centerId: parseInt(e.target.value) })}
          />
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
              {t("Cancel")}
            </button>
            <button onClick={handleUpdate} className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded">
              {t("Save")}
            </button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}

function InfoRow({ icon, label, value }) {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg ${
        i18n.language === "ar" ? "gap-6" : "gap-4"
      }`}
    >
      <div className="flex items-center gap-2 text-gray-700">
        <span className="text-teal-600">{icon}</span>
        <span className="font-medium">{label}</span>
      </div>
      <span className="text-gray-600">{value || "—"}</span>
    </div>
  );
}


function InputField({ label, value, onChange }) {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex items-center border border-gray-300 rounded px-4 py-2 ${
        i18n.language === "ar" ? "gap-8" : "gap-4"
      }`}
    >
      <span className="text-teal-600 whitespace-nowrap">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full border-none focus:outline-none"
      />
    </div>
  );
}

function SelectField({ label, value, options = [], onChange }) {
  const { i18n } = useTranslation();

  return (
    <div
      className={`flex items-center border border-gray-300 rounded px-4 py-2 ${
        i18n.language === "ar" ? "gap-8" : "gap-4"
      }`}
    >
      <span className="text-teal-600 whitespace-nowrap">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="w-full border-none focus:outline-none"
      >
        <option value="" disabled>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}
