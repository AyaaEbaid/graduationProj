import React, { useState } from "react";
import { FaTachometerAlt, FaUser, FaHammer, FaClipboardList, FaMoneyBill, FaStar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import DashboardPage from "../DashboardPage/DashboardPage";
import CraftsmenPage from "../CraftsmenPage/CraftsmenPage";
import UsersPage from "../UserPage/UserPage";
import OrdersPage from "../OrdersPage/OrdersPage";
import PaymentPage from "../PaymentPage/PaymentPage";
import ReviewPage from "../ReviewPage/ReviewPage";
import SettingsPage from "../SettingsPage/SettingsPage";

const menuItems = [
  { name: "Dashboard", path: "/dashboardpage", icon: <FaTachometerAlt /> },
  { name: "Craftsmen", path: "/craftsmen", icon: <FaHammer /> },
  { name: "Users", path: "/users", icon: <FaUser /> },
  { name: "Orders", path: "/orders", icon: <FaClipboardList /> },
  { name: "Payment", path: "/payment", icon: <FaMoneyBill /> },
  { name: "Review", path: "/review", icon: <FaStar /> },
  { name: "Settings", path: "/settings", icon: <FaCog /> },
  { name: "Logout", path: "/", icon: <FaSignOutAlt /> },
];

const AdminDashboard = () => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // لتحديد الصفحة الحالية

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-teal-600 ${toggle ? "w-20" : "w-64"}transition-all`}>
        <button onClick={() => setToggle(!toggle)} className="p-4 text-xl text-white">☰</button>
        <nav>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={index}
                onClick={() => navigate(item.path)}
                className={`p-4 flex items-center cursor-pointer transition 
                  ${isActive
                    ? "bg-white text-teal-600"
                    : "text-white hover:bg-white hover:text-teal-600"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!toggle && <span className="ml-4">{item.name}</span>}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/*" element={<DashboardPage />} />
          <Route path="/dashboardpage" element={<DashboardPage />} />
          <Route path="/craftsmen" element={<CraftsmenPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;