import React, { useEffect, useState } from "react";

const CraftsmenPage = () => {
  const [craftsmen, setCraftsmen] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCraftsman, setNewCraftsman] = useState({ id: "", name: "", category: "", phone: "", location: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCraftsman, setEditingCraftsman] = useState(null);

  useEffect(() => {
    const storedCraftsmen = JSON.parse(localStorage.getItem("craftsmen")) || [];
    setCraftsmen(storedCraftsmen);
  }, []);

  const handleSaveCraftsman = () => {
    if (!newCraftsman.name || !newCraftsman.category || !newCraftsman.phone || !newCraftsman.location) return;

    let updatedCraftsmen;
    if (editingCraftsman) {
      updatedCraftsmen = craftsmen.map(craft =>
        craft.id === editingCraftsman.id ? { ...newCraftsman } : craft
      );
    } else {
      updatedCraftsmen = [...craftsmen, { ...newCraftsman, id: Date.now().toString() }];
    }

    setCraftsmen(updatedCraftsmen);
    localStorage.setItem("craftsmen", JSON.stringify(updatedCraftsmen));

    setNewCraftsman({ id: "", name: "", category: "", phone: "", location: "" });
    setEditingCraftsman(null);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const updatedCraftsmen = craftsmen.filter(craft => craft.id !== id);
    setCraftsmen(updatedCraftsmen);
    localStorage.setItem("craftsmen", JSON.stringify(updatedCraftsmen));
  };

  const handleEdit = (craft) => {
    setNewCraftsman(craft);
    setEditingCraftsman(craft);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Craftsmen List</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Craftsmen..."
        className="border p-2 rounded mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Button */}
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setNewCraftsman({ id: "", name: "", category: "", phone: "", location: "" });
          setEditingCraftsman(null);
          setIsModalOpen(true);
        }}
      >
        + Add Craftsman
      </button>

      {/* Table for large screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {craftsmen
              .filter(craft => craft.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((craft) => (
                <tr key={craft.id} className="border">
                  <td className="border p-2">{craft.id}</td>
                  <td className="border p-2">{craft.name}</td>
                  <td className="border p-2">{craft.category}</td>
                  <td className="border p-2">{craft.phone}</td>
                  <td className="border p-2">{craft.location}</td>
                  <td className="border p-2 flex flex-col sm:flex-row gap-2">
                    <button className="bg-blue-700 text-white px-3 py-1 rounded" onClick={() => handleEdit(craft)}>Update</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(craft.id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="sm:hidden grid grid-cols-1 gap-6">
        {craftsmen
          .filter(craft => craft.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((craft) => (
            <div key={craft.id} className="bg-white border border-gray-300 rounded-lg p-4 shadow-md overflow-hidden max-w-full">
              <div className="text-xl font-bold text-black mb-2 break-words">ID: {craft.id}</div>
              <div className="text-xl font-semibold text-black mb-2 break-words">Name: {craft.name}</div>
              <div className="mb-2 break-words"><strong>Category:</strong> {craft.category}</div>
              <div className="mb-2 break-words"><strong>Phone:</strong> {craft.phone}</div>
              <div className="mb-2 break-words"><strong>Location:</strong> {craft.location}</div>
              <div className="flex flex-wrap gap-2">
                <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={() => handleEdit(craft)}>Update</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(craft.id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              {editingCraftsman ? "Edit Craftsman" : "Add New Craftsman"}
            </h3>
            <input type="text" placeholder="Name" className="border p-2 rounded w-full mb-2" value={newCraftsman.name} onChange={(e) => setNewCraftsman({ ...newCraftsman, name: e.target.value })} />
            <input type="text" placeholder="Category" className="border p-2 rounded w-full mb-2" value={newCraftsman.category} onChange={(e) => setNewCraftsman({ ...newCraftsman, category: e.target.value })} />
            <input type="text" placeholder="Phone" className="border p-2 rounded w-full mb-2" value={newCraftsman.phone} onChange={(e) => setNewCraftsman({ ...newCraftsman, phone: e.target.value })} />
            <input type="text" placeholder="Location" className="border p-2 rounded w-full mb-2" value={newCraftsman.location} onChange={(e) => setNewCraftsman({ ...newCraftsman, location: e.target.value })} />
            <div className="flex justify-end gap-2">
              <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="bg-teal-600 text-white px-3 py-1 rounded" onClick={handleSaveCraftsman}>{editingCraftsman ? "Update" : "Add"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CraftsmenPage;