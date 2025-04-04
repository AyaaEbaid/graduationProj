import { useState, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/dashboardpage", icon: <FiHome size={20} />, label: "Dashboard" },
    { path: "/craftsmen", icon: <FiUsers size={20} />, label: "Craftsmen" },
    { path: "/orders", icon: <FiClipboard size={20} />, label: "Orders" },
    { path: "/payments", icon: <FiDollarSign size={20} />, label: "Payments" },
    { path: "/reviews", icon: <FiStar size={20} />, label: "Reviews" },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSmallScreen(true);
        setIsOpen(false);
      } else {
        setIsSmallScreen(false);
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`bg-teal-600 text-white p-4 transition-all duration-300 h-screen flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-white ${
        isSmallScreen ? "w-20" : isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* زر toggle - مخفي في الشاشات الصغيرة */}
      {!isSmallScreen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 text-2xl focus:outline-none self-start"
        >
          <FiMenu />
        </button>
      )}

      {/* قائمة الروابط */}
      <ul className="space-y-4 flex-1">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-teal-700"
                  : "hover:bg-teal-500"
              }`}
            >
              {item.icon}
              {!isSmallScreen && isOpen && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* زر تسجيل الخروج */}
      <button className="flex items-center gap-2 text-lg p-2 rounded cursor-pointer transition-all duration-200 hover:bg-red-700">
        <FiLogOut size={20} />
        {!isSmallScreen && isOpen && <span>Logout</span>}
      </button>
    </div>
  );
}