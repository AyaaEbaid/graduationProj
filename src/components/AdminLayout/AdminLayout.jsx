import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";


export default function AdminLayout() {
    
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}