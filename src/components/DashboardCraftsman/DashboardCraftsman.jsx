import { Routes, Route } from "react-router-dom";
import SidebarCraftsman from "../SidebarCraftsman/SidebarCraftsman";
import NavbarCraftsman from "../NavbarCraftsman/NavbarCraftsman";
// import NavbarCraftsman from "../components/NavbarCraftsman";
// import SidebarCraftsman from "../components/SidebarCraftsman";

// import OrdersCraftsman from "./OrdersCraftsman";
// import ProfileCraftsman from "./ProfileCraftsman";
// import ScheduleCraftsman from "./ScheduleCraftsman";
// import NotificationsCraftsman from "./NotificationsCraftsman";

const DashboardCraftsman = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <SidebarCraftsman />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavbarCraftsman />
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            {/* <Route path="/orders" element={<OrdersCraftsman />} />
            <Route path="/profile" element={<ProfileCraftsman />} />
            <Route path="/schedule" element={<ScheduleCraftsman />} />
            <Route path="/notifications" element={<NotificationsCraftsman />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardCraftsman;