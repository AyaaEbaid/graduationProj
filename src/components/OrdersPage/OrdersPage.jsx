import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newOrder, setNewOrder] = useState({
    id: "",
    customerName: "",
    service: "",
    price: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // تحميل البيانات من Local Storage عند فتح الصفحة
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders"));
    if (storedOrders) {
      setOrders(storedOrders);
    }
  }, []);

  // تحديث Local Storage عند تغيير الطلبات
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [orders]);

  const handleSaveOrder = () => {
    if (!newOrder.customerName || !newOrder.service || !newOrder.price || !newOrder.status)
      return;

    let updatedOrders;
    if (editingOrder) {
      updatedOrders = orders.map((order) =>
        order.id === editingOrder.id ? { ...newOrder, id: editingOrder.id } : order
      );
    } else {
      updatedOrders = [...orders, { ...newOrder, id: Date.now().toString() }];
    }

    setOrders(updatedOrders);
    setNewOrder({ id: "", customerName: "", service: "", price: "", status: "" });
    setEditingOrder(null);
    setIsModalOpen(false);
  };

  const handleDeleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const handleEditOrder = (order) => {
    setNewOrder(order);
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Orders Management</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Orders..."
        className="border p-2 rounded mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Order Button */}
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setNewOrder({ id: "", customerName: "", service: "", price: "", status: "" });
          setEditingOrder(null);
          setIsModalOpen(true);
        }}
      >
        + Add Order
      </button>

      {/* Responsive Table */}
      <div className="hidden sm:block">
        {/* Table for Large Screens */}
        <table className="min-w-full text-center bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders
              .filter((order) =>
                order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((order) => (
                <tr key={order.id} className="border">
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.customerName}</td>
                  <td className="border p-2">{order.service}</td>
                  <td className="border p-2">{order.price}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border justify-center p-2 flex gap-2">
                    <button
                      className=" bg-blue-700 text-white px-3 py-1 rounded"
                      onClick={() => handleEditOrder(order)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Small Screens */}
      <div className="sm:hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders
          .filter((order) =>
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
              <p className="text-lg">Customer: {order.customerName}</p>
              <p>Service: {order.service}</p>
              <p>Price: {order.price}</p>
              <p>Status: {order.status}</p>

              <div className=" flex flex-wrap gap-2  mt-4 ">
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded"
                  onClick={() => handleEditOrder(order)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Modal for Add/Edit Order */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full sm:w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editingOrder ? "Edit Order" : "Add New Order"}
            </h3>
            <input
              type="text"
              placeholder="Customer Name"
              className="border p-2 rounded w-full mb-2"
              value={newOrder.customerName}
              onChange={(e) =>
                setNewOrder({ ...newOrder, customerName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Service"
              className="border p-2 rounded w-full mb-2"
              value={newOrder.service}
              onChange={(e) =>
                setNewOrder({ ...newOrder, service: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              className="border p-2 rounded w-full mb-2"
              value={newOrder.price}
              onChange={(e) =>
                setNewOrder({ ...newOrder, price: e.target.value })
              }
            />
            <select
              className="border p-2 rounded w-full mb-2"
              value={newOrder.status}
              onChange={(e) =>
                setNewOrder({ ...newOrder, status: e.target.value })
              }
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-600 text-white px-3 py-1 rounded"
                onClick={handleSaveOrder}
              >
                {editingOrder ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;