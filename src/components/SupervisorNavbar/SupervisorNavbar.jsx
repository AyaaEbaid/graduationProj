import { useState } from "react";
import { FaBell, FaChevronLeft } from "react-icons/fa"; // أيقونة السهم أو القائمة

const SupervisorNavbar = ({
  userName = "Supervisor Name",
  userEmail = "supervisor@email",
  userAvatar = "https://i.pravatar.cc/40?img=3",
  notifications = [],
  onToggleSidebar,   // callback لتفعيل أو إغلاق الـ Sidebar
  onSearch           // callback لالتقاط الحدث من خانة البحث
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  // عدد الإشعارات الجديدة
  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // نستدعي الفانكشن اللي جايه من برا لو فيه
    }
  };

  return (
    <nav className="w-full bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between">
      {/* الجزء الأيسر - أيقونة القائمة أو السهم */}
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-gray-100 transition"
          onClick={onToggleSidebar}
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        {/* اسم الصفحة أو عنوانها */}
        <h1 className="hidden md:block text-lg font-semibold text-gray-700">
          Dashboard
        </h1>
      </div>

      {/* الجزء الأوسط - خانة البحث */}
      <div className="flex-1 mx-4">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            className="w-full pl-4 pr-8 py-2 border rounded focus:outline-none focus:border-teal-500 text-sm"
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* أيقونة البحث لو تحب تضيفها */}
          {/* <span className="absolute right-2 top-2 text-gray-400">🔍</span> */}
        </div>
      </div>

      {/* الجزء الأيمن - الإشعارات وصورة المستخدم */}
      <div className="flex items-center gap-6">
        {/* زر الإشعارات */}
        <div className="relative">
          <button
            className="relative p-2 rounded hover:bg-gray-100 transition"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <FaBell className="text-gray-600 text-xl" />
            {/* عرض عدد الإشعارات غير المقروءة إذا وُجد */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* قائمة الإشعارات المنسدلة - إن وجدت */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg overflow-hidden z-50">
              {notifications.length === 0 ? (
                <div className="p-4 text-gray-500 text-sm">
                  لا توجد إشعارات جديدة
                </div>
              ) : (
                notifications.map((notif, index) => (
                  <div
                    key={index}
                    className={`p-3 text-sm border-b last:border-b-0 ${
                      notif.read ? "bg-gray-50" : "bg-teal-50"
                    }`}
                  >
                    {notif.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* صورة واسم المستخدم */}
        <div className="flex items-center gap-2">
          <img
            src={userAvatar}
            alt="Supervisor"
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="hidden sm:block text-sm">
            <div className="font-semibold text-gray-800">{userName}</div>
            <div className="text-gray-500 text-xs">{userEmail}</div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SupervisorNavbar;