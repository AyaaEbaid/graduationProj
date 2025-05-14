import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import profile from "../../assets/profile.png";

export default function AccountSettings() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [governorate, setGovernorate] = useState(""); // هنسيبه فاضي عشان يظهر "Select Government"
  const [district, setDistrict] = useState(""); // هنسيبه فاضي عشان يظهر "Select Centers"
  const [governorates, setGovernorates] = useState([]);
  const [governorateDetails, setGovernorateDetails] = useState(null); // هنسيبه لكن مش هنعرضه
  const [centers, setCenters] = useState([]);
  const [centerDetails, setCenterDetails] = useState(null); // هنسيبه لكن مش هنعرضه
  const language = "en"; // اللغة محددة إنجليزي

  // جلب المحافظات لما الصفحة تفتح
  useEffect(() => {
    const fetchGovernorates = async () => {
      try {
        const response = await axios.get(
            `https://hanshatabhalak.runasp.net/api/Governorate?language=${language}`
        );
        console.log("Governorate API Response:", response.data);
        const governorateData = response.data.data?.$values || [];
        setGovernorates(governorateData);
        // مش هنختار أي محافظة تلقائيًا، هنسيب الـ dropdown فاضي
      } catch (error) {
        console.error("Error fetching governorates:", error);
        if (error.response) {
          console.log("Error Response:", error.response.data);
        }
      }
    };
    fetchGovernorates();
  }, [language]);

  // دالة جلب تفاصيل المحافظة (هنسيبها لو عايزة تستخدميها بعدين)
  const fetchGovernorateDetails = async (govId) => {
    if (govId) {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Governorate/${govId}?language=${language}`
        );
        console.log("Governorate Details Response:", response.data);
        setGovernorateDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching governorate details:", error);
        setGovernorateDetails(null);
      }
    } else {
      setGovernorateDetails(null);
    }
  };

  // دالة جلب المراكز بناءً على المحافظة
  const fetchCenters = async (govId) => {
    if (govId) {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Center?govGovernoratId=${govId}&language=${language}`
        );
        console.log("Centers API Response:", response.data);
        const centerData = response?.data?.data?.$values || [];
        console.log("Parsed Centers Data:", centerData);
        setCenters(centerData);
        // مش هنختار أي مركز تلقائيًا، هنسيب الـ dropdown فاضي
        setDistrict(""); // نضمن إن الـ district فاضي في البداية
      } catch (error) {
        console.error("Error fetching centers:", error);
        if (error.response) {
          console.log("Error Response:", error.response.data);
        }
        setCenters([]);
        setDistrict("");
      }
    } else {
      setCenters([]);
      setDistrict("");
    }
  };

  // دالة جلب تفاصيل المركز (هنسيبها لو عايزة تستخدميها بعدين)
  const fetchCenterDetails = async (centerId) => {
    if (centerId) {
      try {
        const response = await axios.get(
          `https://hanshatabhalak.runasp.net/api/Center/${centerId}?language=${language}`
        );
        console.log("Center Details Response:", response.data);
        setCenterDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching center details:", error);
        setCenterDetails(null);
      }
    } else {
      setCenterDetails(null);
    }
  };

  // التعامل مع تغيير المحافظة
  const handleGovernorateChange = (e) => {
    if (!e || !e.target) {
      console.error("Event or event.target is undefined in handleGovernorateChange");
      return;
    }
    const govId = e.target.value;
    console.log("handleGovernorateChange called with ID:", govId);
    setGovernorate(govId);
    fetchGovernorateDetails(govId); // هنسيب الدالة لكن مش هنعرض الـ details
    fetchCenters(govId);
    setDistrict(""); // نضمن إن الـ district يترست لما المحافظة تتغير
  };

  // التعامل مع تغيير المركز
  const handleDistrictChange = (e) => {
    if (!e || !e.target) {
      console.error("Event or event.target is undefined in handleDistrictChange");
      return;
    }
    const centerId = e.target.value;
    console.log("handleDistrictChange called with ID:", centerId);
    setDistrict(centerId);
    fetchCenterDetails(centerId); // هنسيب الدالة لكن مش هنعرض الـ details
  };

  const handleSave = () => {
    console.log("Saving...", {
      name,
      phone,
      governorate,
      district,
    });
  };

  // لوج للتأكد من تحديث المراكز
  useEffect(() => {
    console.log("Centers State Updated:", centers);
  }, [centers]);

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-teal-600 mb-8 text-center">
          Account Settings
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* صورة الملف الشخصي */}
          <div className="flex flex-col items-center min-w-[180px]">
            <img
              src={profile}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md"
            />
            <button className="mt-4 text-sm font-medium text-teal-600 border border-teal-600 px-6 py-1.5 rounded hover:bg-teal-600 hover:text-white transition">
              Change
            </button>
          </div>

          {/* النموذج */}
          <div className="flex-1 space-y-6">
            {/* حقل الاسم */}
            <InputField label="Name" value={name} onChange={setName} />

            {/* حقل الهاتف */}
            <InputField label="Phone" value={phone} onChange={setPhone} />

            {/* dropdown للمحافظات */}
            <Dropdown
              label="Governorate"
              value={governorate || ""}
              setValue={handleGovernorateChange}
              options={governorates.map((gov) => ({
                id: gov.id.toString(),
                name: gov.name,
              }))}
              disabled={governorates.length === 0}
            />

            {/* dropdown للمراكز */}
            <Dropdown
              label="District"
              value={district || ""}
              setValue={handleDistrictChange}
              options={centers.map((center) => ({
                id: center.id.toString(),
                name: center.name,
              }))}
              disabled={governorate === "" || centers.length === 0} // معطل لحد ما تختاري محافظة
            />

            {/* زر الحفظ */}
            <div className="text-right pt-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-md transition font-medium text-sm"
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InputField({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <label className="min-w-[100px] text-gray-700 font-medium text-sm shrink-0">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
      />
    </div>
  );
}

function Dropdown({ label, value, setValue, options, disabled = false }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <label className="min-w-[100px] text-gray-700 font-medium text-sm shrink-0">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => {
          console.log(`Dropdown ${label} onChange triggered with value:`, e.target.value);
          setValue(e);
        }}
        disabled={disabled}
        className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition disabled:bg-gray-200 disabled:cursor-not-allowed"
      >
        {/* نغير النص عشان يظهر "Select Government" أو "Select Centers" حسب الـ label */}
        <option value="">{`Select ${label === "Governorate" ? "Government" : "Centers"}`}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
}