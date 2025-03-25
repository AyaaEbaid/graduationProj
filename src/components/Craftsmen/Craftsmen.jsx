import { useState } from "react";

export default function Craftsmen() {
  const [craftsmen, setCraftsmen] = useState([
    { id: 1, name: "Ahmed", skill: "Electrician", phone: "01012345678" },
    { id: 2, name: "Omar", skill: "Plumber", phone: "01123456789" },
    { id: 3, name: "Hassan", skill: "Carpenter", phone: "01234567890" },
  ]);

  // دالة لإضافة حرفي جديد
  const handleAdd = () => {
    const newName = prompt("Enter Craftsman Name:");
    const newSkill = prompt("Enter Craftsman Skill:");
    const newPhone = prompt("Enter Craftsman Phone:");

    if (newName && newSkill && newPhone) {
      const newCraftsman = {
        id: Date.now(),
        name: newName,
        skill: newSkill,
        phone: newPhone,
      };
      setCraftsmen([...craftsmen, newCraftsman]);
    }
  };

  // دالة لتحديث بيانات حرفي
  const handleUpdate = (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedSkill = prompt("Enter new skill:");
    const updatedPhone = prompt("Enter new phone:");

    setCraftsmen((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              name: updatedName || c.name,
              skill: updatedSkill || c.skill,
              phone: updatedPhone || c.phone,
            }
          : c
      )
    );
  };

  // دالة لحذف حرفي
  const handleDelete = (id) => {
    setCraftsmen(craftsmen.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Craftsmen</h2>

      {/* زر Add */}
      <button
        onClick={handleAdd}
        className="bg-teal-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Craftsman
      </button>

      {/* جدول الحرفيين */}
      <table className="w-full border-collapse border border-gray-300 bg-white">
        <thead>
          <tr className="bg-teal-600 text-white">
            <th className="p-3 border border-gray-300">Name</th>
            <th className="p-3 border border-gray-300">Skill</th>
            <th className="p-3 border border-gray-300">Phone</th>
            <th className="p-3 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {craftsmen.map((c) => (
            <tr key={c.id} className="text-center">
              <td className="p-3 border border-gray-300">{c.name}</td>
              <td className="p-3 border border-gray-300">{c.skill}</td>
              <td className="p-3 border border-gray-300">{c.phone}</td>
              <td className="p-3 border border-gray-300">
                <button
                  onClick={() => handleUpdate(c.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}