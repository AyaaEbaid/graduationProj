import React, { useEffect, useState } from "react";

const DashboardPage = () => {
  const [craftsmenCount, setCraftsmenCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);

  useEffect(() => {
    const craftsmen = JSON.parse(localStorage.getItem("craftsmen")) || [];
    setCraftsmenCount(craftsmen.length);

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrdersCount(orders.length);
    setCompletedOrders(orders.filter(order => order.status === "Completed").length);
    setPendingOrders(orders.filter(order => order.status === "Pending").length);

    const users = JSON.parse(localStorage.getItem("users")) || [];
    setUsersCount(users.length);

    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviewsCount(reviews.length);

    const payments = JSON.parse(localStorage.getItem("payments")) || [];
    setPaymentsCount(payments.length);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Card title="Total Craftsmen" value={craftsmenCount} gradient="from-teal-500 to-teal-700" />
        <Card title="Total Orders" value={ordersCount} gradient="from-blue-500 to-blue-700" />
        <Card title="Completed Orders" value={completedOrders} gradient="from-cyan-500 to-cyan-700" />
        <Card title="Pending Orders" value={pendingOrders} gradient="from-sky-500 to-sky-700" />
        <Card title="Total Users" value={usersCount} gradient="from-teal-400 to-teal-600" />
        <Card title="Total Reviews" value={reviewsCount} gradient="from-blue-400 to-blue-600" />
        <Card title="Total Payments" value={paymentsCount} gradient="from-cyan-400 to-cyan-600" />
      </div>
    </div>
  );
};

const Card = ({ title, value, gradient }) => (
  <div
    className={`bg-gradient-to-br ${gradient} text-white p-8 h-44 rounded-2xl shadow-xl flex flex-col justify-center items-center transform hover:scale-105 transition duration-300 ease-in-out`}
  >
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-5xl font-bold ">{value}</p>
  </div>
);

export default DashboardPage;