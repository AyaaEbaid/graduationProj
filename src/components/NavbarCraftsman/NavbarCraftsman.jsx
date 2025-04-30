import { BellIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const sectionNames = {
  "/orders": "Orders",
  "/profile": "Profile",
  "/schedule": "Schedule",
  "/notifications": "Notifications",
};

const NavbarCraftsman = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const title = sectionNames[location.pathname] || "Dashboard";

  return (
    <header className="bg-gray-200 shadow p-4 flex items-center justify-between border-b">
      <h1 className="text-xl font-semibold text-teal-600">{title} Craftsman</h1>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="relative cursor-pointer">
          <BellIcon className="h-6 w-6 text-teal-600" />
        </div>
      </div>
    </header>
  );
};

export default NavbarCraftsman;