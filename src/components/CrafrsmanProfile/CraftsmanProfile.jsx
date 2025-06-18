import React, { useState, useEffect, useContext } from "react";
import { FaMapMarkerAlt, FaWrench, FaStar, FaImage, FaBriefcase, FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { TokenContext } from "../../Context/TokenContext";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { LocationContext } from "../../Context/LocationContext";

const CraftsmanProfile = () => {
  const { t, i18n } = useTranslation();
  const [isProfileImageOpen, setIsProfileImageOpen] = useState(false);

  const { token } = useContext(TokenContext);
  const {
    governorates,
    centers,
    selectedGovernorate,
    selectedCenter,
    fetchGovernorateDetails,
    fetchCenters,
    fetchCenterDetails,
    error,
  } = useContext(LocationContext);

  const [workerData, setWorkerData] = useState(null);
  const [errorProfile, setErrorProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, [i18n.language]);

  useEffect(() => {
    const fetchCraftsman = async () => {
      if (!token) {
        setErrorProfile("unauthorized");
        return;
      }
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Craftsman/GetCraftsman?language=${i18n.language}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = response.data.data;
        if (!data || Object.keys(data).length === 0) {
          setErrorProfile("noData");
          return;
        }
        await fetchGovernorateDetails(data.governorateId);
        await fetchCenters(data.governorateId);
        await fetchCenterDetails(data.centerId);
        const governorateName = selectedGovernorate?.name || (i18n.language === "ar" ? "غير معروف" : "Unknown");
        const centerName = selectedCenter?.name || (i18n.language === "ar" ? "غير معروف" : "Unknown");
        setWorkerData({
          ...data,
          governorate: governorateName,
          center: centerName,
          image: data.image ? `https://hanshatabhalak.runasp.net${data.image}` : null,
          cataloge: Array.isArray(data.cataloge?.images?.$values)
            ? data.cataloge.images.$values.map((img, index) => ({
                url: `https://hanshatabhalak.runasp.net${img}`,
                alt: `${i18n.language === "ar" ? "صورة معرض " : "Portfolio Image "}${index + 1}`,
              }))
            : [],
        });
        setEditedData({
          id: data.id,
          name: data.name || "",
          phone: data.phone || "",
          governorateId: data.governorateId || 0,
          centerId: data.centerId || 0,
          description: data.description || "",
          experience: data.experience || 0,
          availability: data.availability || false,
        });
        setErrorProfile(null);
      } catch (error) {
        console.error("Error fetching craftsman:", error);
        setErrorProfile("noData");
      }
    };
    fetchCraftsman();
  }, [token, i18n.language]);

  const handleSaveChanges = async () => {
    if (!editedData) return;
    try {
      const { id, ...updateData } = editedData;
      const response = await axios.put(
        `https://hanshatabhalak.runasp.net/api/Craftsman/${id}?language=${i18n.language}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorkerData((prev) => (prev ? { ...prev, ...updateData } : null));
      setIsEditModalOpen(false);
      toast.success(response.data?.message || t("header.craftsmanProfile.saveSuccess"), {
        position: "top-center", autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || t("header.craftsmanProfile.saveError"), {
        position: "top-center", autoClose: 3000,
      });
    }
  };
  const handleCatalogUpload = async (files) => {
  const formData = new FormData();
  for (let file of files) {
    formData.append("images", file); // حسب المطلوب من الـ backend
  }

  try {
    const response = await axios.put(
      `https://hanshatabhalak.runasp.net/api/Cataloge/1059/uploadCatalogeImages?language=en`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // لو عندك توكن من context
        },
      }
    );

    console.log(" Upload success:", response.data);
    toast.success(t("header.craftsmanProfile.uploadSuccess"), {
  position: "top-center",
  autoClose: 3000,
});

  } catch (error) {
    console.error(" Upload failed:", error);
    toast.error(t("header.craftsmanProfile.uploadFailed"), {
  position: "top-center",
  autoClose: 3000,
});

    
  }
};

const handleImageUpload = async (event) => {
  const file = event.target.files[0];
  if (file && workerData) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `https://hanshatabhalak.runasp.net/api/Craftsman/${workerData.id}/uploadImage?language=${i18n.language}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newImage = response.data.data;
      setWorkerData((prev) => ({
        ...prev,
        image: `https://hanshatabhalak.runasp.net${newImage}`,
      }));
      toast.success(t("header.craftsmanProfile.imageUpdated"), {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error(t("header.craftsmanProfile.imageUpdateError"), {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }
};

  if (errorProfile || error) return <div className="text-center p-6">{t(`header.craftsmanProfile.${errorProfile || error}`)}</div>;
  if (!workerData) return <div className="text-center p-6">{t("header.craftsmanProfile.noData")}</div>;
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-10" style={{ minHeight: "100vh" }}>
        {/* Top Section */}
        <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
            <div className="relative">
              {workerData.image ? (
                <>
                  <img
                    className="w-32 h-32 rounded-full border-4 border-teal-500 object-cover cursor-pointer"
                    src={workerData.image}
                    alt={workerData.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }}
                    onClick={() => setIsProfileImageOpen(true)}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    id="imageUpload"
                    onChange={handleImageUpload}
                  />
                  <button
                    onClick={() => document.getElementById("imageUpload").click()}
                    className="mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded-md"
                  >
                    {t("header.craftsmanProfile.changeImage")}
                  </button>
                </>
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-teal-500 flex items-center justify-center bg-gray-200 text-teal-600 text-lg font-semibold">
                  {t("header.craftsmanProfile.noImage")}
                </div>
              )}
            </div>
            <div className="text-center md:text-left mt-4 md:mt-0">
              <h2 className="text-2xl font-bold">{workerData.name}</h2>
              <p className="bg-teal-100 text-teal-700 inline-block mt-2 px-4 py-1 rounded-full text-sm font-semibold">
                {workerData.specialization}
              </p>
            </div>
          </div>
          <div className="flex gap-12 mt-8 md:mt-0">
            <div className="text-center flex flex-col items-center">
              <FaBriefcase className="text-teal-600 text-3xl mb-2" />
              <p className="font-bold text-xl">{workerData.experience}</p>
              <p className="text-gray-500 text-sm">{t("header.craftsmanProfile.experience")}</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <p className="text-teal-600 text-3xl mb-2">✓</p>
              <p className="font-bold text-xl">{workerData.completedJobs}</p>
              <p className="text-gray-500 text-sm">{t("header.craftsmanProfile.completedJobs")}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-16 mt-12 border-b border-gray-300">
          {["about", "portfolio"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize text-lg font-semibold pb-4 px-4 ${activeTab === tab ? "text-teal-600 border-b-2 border-teal-600" : "text-gray-400"}`}
            >
              {t(`header.craftsmanProfile.${tab}Tab`)}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {activeTab === "about" && (
            <div className="space-y-8 text-gray-700">
              <div>
                <h3 className="flex items-center font-bold text-lg mb-4">
                  <FaMapMarkerAlt className="mx-2" />
                  {t("header.craftsmanProfile.location")}
                </h3>
                <p>{`${workerData.governorate}, ${workerData.center}`}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-4">
                  <FaWrench className="mx-2" />
                  {t("header.craftsmanProfile.availability")}
                </h3>
                <p className="flex items-center text-lg mb-4">
                  {workerData.availability
                    ? t("header.craftsmanProfile.available")
                    : t("header.craftsmanProfile.notAvailable")}
                </p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-4">
                  <FaBriefcase className="mx-2" />
                  {t("header.craftsmanProfile.description")}
                </h3>
                <p>{workerData.description}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-4">
                  <FaBriefcase className="mx-2" />
                  {t("header.craftsmanProfile.email")}
                </h3>
                <p>{workerData.email}</p>
              </div>
              <div>
                <h3 className="flex items-center font-bold text-lg mb-4">
                  <FaBriefcase className="mx-2" />
                  {t("header.craftsmanProfile.phone")}
                </h3>
                <p>{workerData.phone}</p>
              </div>
            </div>
          )}

          {activeTab === "portfolio" && workerData && (
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
                {workerData.cataloge && workerData.cataloge.length > 0 ? (
                  workerData.cataloge.map((image, index) => (
                    <div key={index} className="relative cursor-pointer" onClick={() => openLightbox(index)}>
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-48 object-cover rounded-lg"
                        onError={(e) => { e.target.onerror = null; e.target.src = "/default-avatar.png"; }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-teal-600 text-lg font-semibold">
                    {t("header.craftsmanProfile.noCatalog")}
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-center w-full">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="catalogUpload"
                 onChange={(e) => handleCatalogUpload(e.target.files)}

                  multiple
                />
                <button
                  onClick={() => document.getElementById("catalogUpload").click()}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded-md"
                >
                  {t("header.craftsmanProfile.addCatalog")}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-10 rounded-full text-lg flex items-center"
          >
            <FaEdit className="ltr:mr-2 rtl:ml-2" /> {t("header.craftsmanProfile.editMyProfile")}
          </button>
        </div>

        {/* Modal for Editing */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "600px",
              maxHeight: "fit-content",
              overflowY: "auto",
              padding: "20px",
              borderRadius: "8px",
              position: "fixed",
            },
          }}
          shouldCloseOnOverlayClick={true}
        >
          <div className="relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-0 right-0 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">{t("header.craftsmanProfile.editMyProfile")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("header.craftsmanProfile.name")}</label>
                <input
                  type="text"
                  value={editedData?.name || ""}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("header.craftsmanProfile.phone")}</label>
                <input
                  type="text"
                  value={editedData?.phone || ""}
                  onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              {/* شيلنا الـ loading من هنا */}
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("header.craftsmanProfile.governorateId")}</label>
                <select
                  value={editedData?.governorateId || 0}
                  onChange={async (e) => {
                    const newGovId = parseInt(e.target.value) || 0;
                    setEditedData({ ...editedData, governorateId: newGovId, centerId: 0 });
                    await fetchGovernorateDetails(newGovId);
                    await fetchCenters(newGovId);
                    if (centers.length > 0 && centers.some((c) => c.id === editedData?.centerId)) {
                      await fetchCenterDetails(editedData.centerId);
                    }
                  }}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value={0}>{i18n.language === "ar" ? "اختر محافظة" : "Select Governorate"}</option>
                  {governorates.map((gov) => (
                    <option key={gov.id} value={gov.id}>{gov.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("header.craftsmanProfile.centerId")}</label>
                <select
                  value={editedData?.centerId || 0}
                  onChange={async (e) => {
                    const newCenterId = parseInt(e.target.value) || 0;
                    setEditedData({ ...editedData, centerId: newCenterId });
                    await fetchCenterDetails(newCenterId);
                  }}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  disabled={centers.length === 0}
                >
                  <option value={0}>{i18n.language === "ar" ? "اختر مركز" : "Select Center"}</option>
                  {centers.map((center) => (
                    <option key={center.id} value={center.id}>{center.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("header.craftsmanProfile.experience")}</label>
                <input
                  type="number"
                  value={editedData?.experience || 0}
                  onChange={(e) => setEditedData({ ...editedData, experience: parseInt(e.target.value) || 0 })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">{t("header.craftsmanProfile.availability")}</label>
                <select
                  value={editedData?.availability || false}
                  onChange={(e) => setEditedData({ ...editedData, availability: e.target.value === "true" })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                >
                  <option value={true}>{t("header.craftsmanProfile.available")}</option>
                  <option value={false}>{t("header.craftsmanProfile.notAvailable")}</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">{t("header.craftsmanProfile.description")}</label>
                <textarea
                  value={editedData?.description || ""}
                  onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  rows="3"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleSaveChanges}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1.5 px-4 rounded-full text-sm"
              >
                {t("header.craftsmanProfile.saveChanges")}
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1.5 px-4 rounded-full text-sm"
              >
                {t("header.craftsmanProfile.close")}
              </button>
            </div>
          </div>
        </Modal>

        {/* Lightbox */}
        {selectedImageIndex !== null && workerData && workerData.cataloge && workerData.cataloge.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={closeLightbox} style={{ overflow: "hidden" }}>
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-4 text-white text-4xl font-bold hover:text-gray-300">←</button>
            <img
              src={workerData.cataloge[selectedImageIndex].url}
              alt={workerData.cataloge[selectedImageIndex].alt}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-4 text-white text-4xl font-bold hover:text-gray-300">→</button>
            <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }} className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300">×</button>
          </div>
        )}

        {/* Lightbox for Profile Image */}
        {isProfileImageOpen && workerData && workerData.image && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50" onClick={() => setIsProfileImageOpen(false)} style={{ overflow: "hidden" }}>
            <img
              src={workerData.image}
              alt={workerData.name}
              className="max-h-[80vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button onClick={() => setIsProfileImageOpen(false)} className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300">×</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CraftsmanProfile;