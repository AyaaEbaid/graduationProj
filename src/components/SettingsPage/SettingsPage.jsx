import React, { useEffect, useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    siteName: "",
    currency: "",
    contactEmail: "",
    maintenanceMode: false,
  });

  // Load settings from localStorage
  useEffect(() => {
    const storedSettings = JSON.parse(localStorage.getItem("settings"));
    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    // Prevent saving empty settings
    if (
      settings.siteName ||
      settings.currency ||
      settings.contactEmail ||
      settings.maintenanceMode
    ) {
      localStorage.setItem("settings", JSON.stringify(settings));
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label className="block font-medium">Site Name</label>
          <input
            type="text"
            name="siteName"
            className="border p-2 rounded w-full"
            value={settings.siteName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Currency</label>
          <input
            type="text"
            name="currency"
            className="border p-2 rounded w-full"
            value={settings.currency}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            className="border p-2 rounded w-full"
            value={settings.contactEmail}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="maintenanceMode"
            className="mr-2"
            checked={settings.maintenanceMode}
            onChange={handleChange}
          />
          <label className="font-medium">Enable Maintenance Mode</label>
        </div>

        <button className="bg-teal-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;