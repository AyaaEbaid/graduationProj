import { useEffect, useState, useRef } from "react";


const SupervisorClients = () => {
  const [clients, setClients] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const isInitialLoad = useRef(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    ordersCount: "",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("supervisor_clients");
    if (savedData) {
      setClients(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem("supervisor_clients", JSON.stringify(clients));
  }, [clients]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.email || !form.phone || !form.city || !form.ordersCount) return;
  
    const maxId = clients.length > 0 ? Math.max(...clients.map((c) => c.id)) : 0;
    const newClient = { id: maxId + 1, ...form };
  
    setClients([...clients, newClient]);
    setForm({ name: "", email: "", phone: "", city: "", ordersCount: "" });
    setShowPopup(false);
  };

  const handleDelete = (index) => {
    const updated = clients.filter((_, i) => i !== index);
    setClients(updated);
  };

  const handleEdit = (index) => {
    setForm(clients[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleUpdate = () => {
    const updated = [...clients];
    updated[editIndex] = form;
    setClients(updated);
    setForm({ name: "", email: "", phone: "", city: "", ordersCount: "" });
    setEditIndex(null);
    setShowPopup(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-2">Supervisor Clients</h2>

      <div className="mb-4">
        <button
          onClick={() => {
            setShowPopup(true);
            setForm({ name: "", email: "", phone: "", city: "", ordersCount: "" });
            setEditIndex(null);
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded shadow-md transition"
        >
          + Add Client
        </button>
      </div>

      {/* Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-teal-100 text-left">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">City</th>
              <th className="p-2">Orders</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => (
              <tr key={client.id} className="border-t text-center">
                <td className="p-2">{client.name}</td>
                <td className="p-2">{client.email}</td>
                <td className="p-2">{client.phone}</td>
                <td className="p-2">{client.city}</td>
                <td className="p-2">{client.ordersCount}</td>
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

      {/* Card View */}
      <div className="sm:hidden flex flex-col gap-4">
        {clients.map((client, index) => (
          <div key={client.id} className="border rounded p-4 shadow bg-white">
            <p><strong>Name:</strong> {client.name}</p>
            <p><strong>Email:</strong> {client.email}</p>
            <p><strong>Phone:</strong> {client.phone}</p>
            <p><strong>City:</strong> {client.city}</p>
            <p><strong>Orders:</strong> {client.ordersCount}</p>
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
              {editIndex !== null ? "Edit Client" : "Add Client"}
            </h3>
            <div className="flex flex-col gap-2">
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="number" name="ordersCount" placeholder="Orders Count" value={form.ordersCount} onChange={handleChange} className="border px-3 py-2 rounded" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowPopup(false)} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={editIndex !== null ? handleUpdate : handleAdd} className="px-4 py-2 bg-teal-600 text-white rounded">
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupervisorClients;