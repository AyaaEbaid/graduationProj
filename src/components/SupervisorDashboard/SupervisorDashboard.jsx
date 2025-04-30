import { Routes, Route,Navigate } from "react-router-dom";
import { useState } from "react";
import SupervisorNavbar from "../SupervisorNavbar/SupervisorNavbar";
import SupervisorSidebar from "../SupervisorSidebar/SupervisorSidebar";
import DashboardHome from "../DashboardHome/DashboardHome";
import SupervisorCraftsman from "../SupervisorCraftsmen/SupervisorCraftsmen";
import SupervisorOrder from "../SupervisorOrder/SupervisorOrder";
import SupervisorClients from "../SupervisorClients/SupervisorClients";

const SupervisorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {sidebarOpen && <SupervisorSidebar />}
      <div className="flex-1 flex flex-col">
        <SupervisorNavbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Routes>
            <Route path="" element={<Navigate to="supervisor-dashboard" replace />} />
            <Route path="supervisor-dashboard" element={<DashboardHome/>} />
            <Route path="supervisor-craftsman" element={<SupervisorCraftsman />} />
            <Route path="supervisor-order" element={<SupervisorOrder/>} />
            <Route path="supervisor-cleints" element={<SupervisorClients/>} />
            {/* باقي السكاشن لو هتضيفيها */}
            {/* <Route path="orders" element={<Orders />} /> */}
            {/* <Route path="clients" element={<Clients />} /> */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SupervisorDashboard;