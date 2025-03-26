import { useState } from "react";
import { Link } from "react-router-dom";
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

  return (
    <div
      className={`bg-teal-600 text-white p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* زر إخفاء/إظهار الـ Sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 text-2xl focus:outline-none"
      >
        <FiMenu />
      </button>

      {/* الروابط */}
      <ul className="space-y-4">
        <li>
          <Link to="/dashboardpage" className="flex items-center gap-2">
            <FiHome />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/craftsmen" className="flex items-center gap-2">
            <FiUsers />
            {isOpen && <span>Craftsmen</span>}
          </Link>
        </li>
        <li>
          <Link to="/orders" className="flex items-center gap-2">
            <FiClipboard />
            {isOpen && <span>Orders</span>}
          </Link>
        </li>
        <li>
          <Link to="/payments" className="flex items-center gap-2">
            <FiDollarSign />
            {isOpen && <span>Payments</span>}
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="flex items-center gap-2">
            <FiStar />
            {isOpen && <span>Reviews</span>}
          </Link>
        </li>
        <li className="mt-8">
          <button className="flex items-center gap-2 text-2xl">
            <FiLogOut />
            {isOpen && <span >Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
}