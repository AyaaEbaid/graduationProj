import { FiUsers, FiClipboard, FiDollarSign, FiStar } from "react-icons/fi";

export default function Dashboard() {
  // مجرد مثال لإحصائيات
  const stats = [
    {
      title: "Total Craftsmen",
      value: 120,
      icon: <FiUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Total Orders",
      value: 450,
      icon: <FiClipboard />,
      color: "bg-green-500",
    },
    {
      title: "Total Payments",
      value: "$12,300",
      icon: <FiDollarSign />,
      color: "bg-yellow-500",
    },
    {
      title: "Total Reviews",
      value: 320,
      icon: <FiStar />,
      color: "bg-red-500",
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-5 text-white shadow-md rounded-lg flex items-center ${stat.color}`}
          >
            <span className="text-3xl mr-3">{stat.icon}</span>
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}