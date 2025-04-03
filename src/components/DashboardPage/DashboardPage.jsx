import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [craftsmenCount, setCraftsmenCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    const craftsmen = JSON.parse(localStorage.getItem("craftsmen")) || [];
    setCraftsmenCount(craftsmen.length);

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrdersCount(orders.length);
    setCompletedOrders(orders.filter(order => order.status === "Completed").length);
    setPendingOrders(orders.filter(order => order.status === "Pending").length);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Craftsmen */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Craftsmen</h3>
          <p className="text-3xl font-bold text-teal-600">{craftsmenCount}</p>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">{ordersCount}</p>
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Completed Orders</h3>
          <p className="text-3xl font-bold text-green-600">{completedOrders}</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">{pendingOrders}</p>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;