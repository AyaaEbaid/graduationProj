import { useEffect, useRef, useState } from "react";

const SupervisorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [form, setForm] = useState({
    clientName: "",
    type: "",
    location: "",
    status: "",
    date: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const isInitialLoad = useRef(true);

  // Load data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("supervisor_orders");
    if (saved) setOrders(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem("supervisor_orders", JSON.stringify(orders));
  }, [orders]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.clientName || !form.type || !form.location || !form.status || !form.date) return;

    const newOrder = {
      ...form,
      id: Date.now().toString(), // Unique ID
    };

    setOrders([...orders, newOrder]);
    setForm({ clientName: "", type: "", location: "", status: "", date: "" });
    setShowPopup(false);
  };

  const handleEdit = (index) => {
    setForm(orders[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleUpdate = () => {
    const updated = [...orders];
    updated[editIndex] = { ...form, id: updated[editIndex].id };
    setOrders(updated);
    setForm({ clientName: "", type: "", location: "", status: "", date: "" });
    setEditIndex(null);
    setShowPopup(false);
  };

  const handleDelete = (index) => {
    const updated = orders.filter((_, i) => i !== index);
    setOrders(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-2">Supervisor Orders</h2>

      <div className="mb-4">
        <button
          onClick={() => {
            setShowPopup(true);
            setForm({ clientName: "", type: "", location: "", status: "", date: "" });
            setEditIndex(null);
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded shadow-md transition"
        >
          + Add Order
        </button>
      </div>

      {/* Table for large screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-teal-100 text-center">
              <th className="p-2">ID</th>
              <th className="p-2">Client</th>
              <th className="p-2">Type</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="text-center border-t">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.clientName}</td>
                <td className="p-2">{order.type}</td>
                <td className="p-2">{order.location}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">{order.date}</td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="sm:hidden flex flex-col gap-4">
        {orders.map((order, index) => (
          <div key={order.id} className="border rounded p-4 shadow bg-white">
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Client:</strong> {order.clientName}</p>
            <p><strong>Type:</strong> {order.type}</p>
            <p><strong>Location:</strong> {order.location}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <div className="mt-2 flex gap-4">
              <button onClick={() => handleEdit(index)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(index)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 max-w-full">
            <h3 className="text-lg font-bold mb-4">
              {editIndex !== null ? "Edit Order" : "Add Order"}
            </h3>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                name="clientName"
                placeholder="Client Name"
                value={form.clientName}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={form.type}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={form.location}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="text"
                name="status"
                placeholder="Status"
                value={form.status}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowPopup(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={editIndex !== null ? handleUpdate : handleAdd}
                className="px-4 py-2 bg-teal-600 text-white rounded"
              >
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorOrders;