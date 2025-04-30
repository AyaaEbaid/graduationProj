import { useEffect, useState, useRef } from "react";

const SupervisorCraftsmen = () => {
  const [craftsmen, setCraftsmen] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const isInitialLoad = useRef(true);
  const [form, setForm] = useState({
    id: "",
    name: "",
    job: "",
    phone: "",
    city: "",
    rating: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("supervisor_craftsmen");
    if (savedData) {
      setCraftsmen(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    localStorage.setItem("supervisor_craftsmen", JSON.stringify(craftsmen));
  }, [craftsmen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.job || !form.phone || !form.city || !form.rating) return;
    const newCraftsman = { ...form, id: Date.now() };
    setCraftsmen([...craftsmen, newCraftsman]);
    setForm({ id: "", name: "", job: "", phone: "", city: "", rating: "" });
    setShowPopup(false);
  };

  const handleDelete = (index) => {
    const updated = craftsmen.filter((_, i) => i !== index);
    setCraftsmen(updated);
  };

  const handleEdit = (index) => {
    setForm(craftsmen[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  const handleUpdate = () => {
    const updated = [...craftsmen];
    updated[editIndex] = form;
    setCraftsmen(updated);
    setForm({ id: "", name: "", job: "", phone: "", city: "", rating: "" });
    setEditIndex(null);
    setShowPopup(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-teal-700 mb-2">Supervisor Craftsman</h2>

      <div className="mb-4">
        <button
          onClick={() => {
            setShowPopup(true);
            setForm({ id: "", name: "", job: "", phone: "", city: "", rating: "" });
            setEditIndex(null);
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded shadow-md transition"
        >
          + Add Craftsman
        </button>
      </div>

      {/* Table View */}
      <div className="hidden  sm:block overflow-x-auto">
        <table className="w-full  table-auto border">
          <thead>
            <tr className="bg-teal-100 text-center ">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Job</th>
              <th className="p-2">Phone</th>
              <th className="p-2">City</th>
              <th className="p-2">Rating</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {craftsmen.map((craft, index) => (
              <tr key={craft.id} className="border-t text-center">
                <td className="p-2">{craft.id}</td>
                <td className="p-2">{craft.name}</td>
                <td className="p-2">{craft.job}</td>
                <td className="p-2">{craft.phone}</td>
                <td className="p-2">{craft.city}</td>
                <td className="p-2">{craft.rating}</td>
                <td className="p-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <button onClick={() => handleEdit(index)} className="bg-blue-700 text-white px-3 py-1 rounded">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(index)} className="bg-red-600 text-white px-3 py-1 rounded">
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
        {craftsmen.map((craft, index) => (
          <div key={craft.id} className="border rounded p-4 shadow bg-white">
            <p><strong>ID:</strong> {craft.id}</p>
            <p><strong>Name:</strong> {craft.name}</p>
            <p><strong>Job:</strong> {craft.job}</p>
            <p><strong>Phone:</strong> {craft.phone}</p>
            <p><strong>City:</strong> {craft.city}</p>
            <p><strong>Rating:</strong> {craft.rating}</p>
            <div className="mt-2 flex gap-4">
              <button onClick={() => handleEdit(index)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(index)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96 max-w-full">
            <h3 className="text-lg font-bold mb-4">
              {editIndex !== null ? "Edit Craftsman" : "Add Craftsman"}
            </h3>
            <div className="flex flex-col gap-2">
              <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="text" name="job" placeholder="Job" value={form.job} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="text" name="city" placeholder="City" value={form.city} onChange={handleChange} className="border px-3 py-2 rounded" />
              <input type="number" name="rating" placeholder="Rating (0-5)" value={form.rating} onChange={handleChange} min={0} max={5} className="border px-3 py-2 rounded" />
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

export default SupervisorCraftsmen;