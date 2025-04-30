import { motion } from "framer-motion";
import { useState } from "react";
import profile from "../../assets/profile.png";

export default function AccountSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [district, setDistrict] = useState("");

  const handleSave = () => {
    console.log("Saving...", {
      name,
      email,
      phone,
      address,
      governorate,
      district,
      password,
      rePassword,
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-10">
        <h2 className="text-3xl font-bold text-teal-600 mb-10 text-center">
          Account Settings
        </h2>

        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Profile image */}
          <div className="flex flex-col items-center min-w-[220px]">
            <img
              src={profile}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover"
            />
            <button className="mt-6 text-base font-medium text-teal-600 border border-teal-600 px-8 py-2 rounded hover:bg-teal-600 hover:text-white transition">
              Change
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 space-y-5">
            {/* Name */}
            <InputField label="Name" value={name} onChange={setName} />

            {/* Email */}
            <InputField label="Email" type="email" value={email} onChange={setEmail} />

            {/* Phone */}
            <InputField label="Phone" value={phone} onChange={setPhone} />

            {/* Address */}
            <InputField label="Address" value={address} onChange={setAddress} />

            {/* Governorate - مستقلة */}
            <Dropdown
              label="Governorate"
              value={governorate}
              setValue={setGovernorate}
              options={["Cairo", "Giza", "Alexandria"]}
            />

            {/* District - مستقلة */}
            <Dropdown
              label="District"
              value={district}
              setValue={setDistrict}
              options={[
                "Nasr City",
                "Heliopolis",
                "Maadi",
                "Dokki",
                "Mohandessin",
                "6th October",
                "Smouha",
                "Stanley",
                "Gleem",
              ]}
            />

            {/* Password */}
            <InputField label="Password" type="password" value={password} onChange={setPassword} />

            {/* Re-password */}
            <InputField
              label="Re-password"
              type="password"
              value={rePassword}
              onChange={setRePassword}
            />

            {/* Save Button */}
            <div className="text-right pt-4">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
                className="bg-teal-600 hover:bg-teal-700 text-white px-10 py-3 rounded-md transition font-medium"
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
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="w-32 text-gray-700 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
      />
    </div>
  );
}

function Dropdown({ label, value, setValue, options }) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <label className="w-32 text-gray-700 font-medium">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-gray-50 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}