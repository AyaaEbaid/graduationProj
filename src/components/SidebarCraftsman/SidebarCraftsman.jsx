import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiFileText, FiLogOut } from "react-icons/fi";
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const SidebarCraftsman = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboardcraftsman", icon: <FiHome /> },
    { name: "Craftsmen", path: "/dashboardcraftsman/craftsmen", icon: <FiUsers /> },
    { name: "Orders", path: "/dashboardcraftsman/orders", icon: <FiFileText /> },
  ];

  return (
    <div
      className={`h-screen bg-gray-200 text-gray-600 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center text-teal-600 justify-between p-4">
        {!isCollapsed && <h1 className="text-xl  font-bold">Dashboard</h1>}
        <button onClick={toggleSidebar} className=" text-xl">
          {isCollapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-teal-700 rounded-md ${
                location.pathname === item.path ? "bg-teal-700" : ""
              }`}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-4 w-full">
        <button className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-gray-700 ">
          <FiLogOut />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SidebarCraftsman;