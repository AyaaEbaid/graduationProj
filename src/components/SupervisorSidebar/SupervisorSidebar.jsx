import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaThLarge, FaTools, FaClipboardList, FaUsers, FaChartPie, FaCog, FaSignOutAlt
} from "react-icons/fa";

const SupervisorSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sections = [
    { name: "Dashboard", icon: <FaThLarge />, path: "/supervisor/supervisor-dashboard" }, // index
    { name: "Craftsmen", icon: <FaTools />, path: "/supervisor/supervisor-craftsman" },
    { name: "Orders", icon: <FaClipboardList />, path: "/supervisor/supervisor-order" },
     { name: "Clients", icon: <FaUsers />, path: "/supervisor/supervisor-cleints" },
    // { name: "Analytics", icon: <FaChartPie />, path: "analytics" },
    // { name: "Settings", icon: <FaCog />, path: "settings" },
  ];

  return (
    <div className={`bg-white border-r h-screen p-4 duration-300 ${isOpen ? 'w-64' : 'w-20'} shadow`}>
      <div className="flex items-center justify-between mb-6">
        {isOpen && (
          <h1 className="text-lg font-bold text-teal-600">
            Dashboard Supervisor
          </h1>
        )}
        <button onClick={() => setIsOpen(!isOpen)}>
          <span className="text-gray-500">☰</span>
        </button>
      </div>

      <ul>
        {sections.map((section) => (
          <li key={section.name}>
            <NavLink
              to={section.path}
              end={section.path === ""}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 my-2 rounded transition cursor-pointer ${
                  isActive
                    ? 'bg-teal-100 text-teal-700 font-semibold'
                    : 'text-gray-700 hover:bg-teal-50'
                }`
              }
            >
              <span>{section.icon}</span>
              {isOpen && <span>{section.name}</span>}
            </NavLink>
          </li>
        ))}
        <li className="flex items-center gap-3 p-2 mt-8 rounded cursor-pointer hover:bg-gray-200 text-red-500">
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </li>
      </ul>
    </div>
  );
};

export default SupervisorSidebar;