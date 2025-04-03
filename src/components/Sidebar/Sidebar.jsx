import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiUsers,
  FiClipboard,
  FiDollarSign,
  FiStar,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // يبدأ مغلقًا في الشاشات الصغيرة
  const location = useLocation();

  // بيانات الروابط
  const navItems = [
    { path: "/dashboardpage", icon: <FiHome size={20} />, label: "Dashboard" },
    { path: "/craftsmen", icon: <FiUsers size={20} />, label: "Craftsmen" },
    { path: "/orders", icon: <FiClipboard size={20} />, label: "Orders" },
    { path: "/payments", icon: <FiDollarSign size={20} />, label: "Payments" },
    { path: "/reviews", icon: <FiStar size={20} />, label: "Reviews" },
  ];

  return (
    <div
      className={`bg-teal-600 text-white p-4 transition-all duration-300 h-screen flex flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* زر إخفاء/إظهار الـ Sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 text-2xl focus:outline-none self-start"
      >
        <FiMenu />
      </button>

      {/* الروابط */}
      <ul className="space-y-4 flex-1">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all duration-200 
                ${
                  location.pathname === item.path
                    ? "bg-teal-700"
                    : "hover:bg-teal-500"
                }`}
            >
              {item.icon}
              {/* عرض النصوص فقط في الشاشات الأكبر من 768px */}
              <span
                className={`${
                  isOpen ? "block" : "hidden"
                } sm:block`} // النصوص تظهر فقط في الشاشات الكبيرة
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* زر تسجيل الخروج */}
      <button className="flex items-center gap-2 text-lg p-2 rounded cursor-pointer transition-all duration-200 hover:bg-red-700">
        <FiLogOut size={20} />
        {/* عرض النص فقط في الشاشات الكبيرة */}
        <span
          className={`${
            isOpen ? "block" : "hidden"
          } sm:block`} // النصوص تظهر فقط في الشاشات الكبيرة
        >
          Logout
        </span>
      </button>
    </div>
  );
}
