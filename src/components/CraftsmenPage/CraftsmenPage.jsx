import React, { useState } from "react";

const initialCraftsmen = [
  { id: 1, name: "حرفي 1", specialty: "سباكة" },
  { id: 2, name: "حرفي 2", specialty: "نجارة" },
];

const CraftsmenPage = () => {
  const [craftsmen, setCraftsmen] = useState(initialCraftsmen);
  const [form, setForm] = useState({ id: null, name: "", specialty: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addCraftsman = () => {
    setCraftsmen([...craftsmen, { id: Date.now(), ...form }]);
    setForm({ id: null, name: "", specialty: "" });
  };

  const deleteCraftsman = (id) => setCraftsmen(craftsmen.filter(c => c.id !== id));

  const editCraftsman = (craftsman) => {
    setForm(craftsman);
    setIsEditing(true);
  };

  const updateCraftsman = () => {
    setCraftsmen(craftsmen.map(c => (c.id === form.id ? form : c)));
    setForm({ id: null, name: "", specialty: "" });
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">إدارة الحرفيين</h2>
      <input type="text" name="name" value={form.name} placeholder="اسم الحرفي" onChange={handleChange} className="border p-2 mr-2"/>
      <input type="text" name="specialty" value={form.specialty} placeholder="التخصص" onChange={handleChange} className="border p-2 mr-2"/>
      <button onClick={isEditing ? updateCraftsman : addCraftsman} className="bg-teal-600 text-white p-2">{isEditing ? "تحديث" : "إضافة"}</button>
      <ul>{craftsmen.map(c => <li key={c.id}>{c.name} ({c.specialty}) <button onClick={() => deleteCraftsman(c.id)}>🗑</button></li>)}</ul>
    </div>
  );
};

export default CraftsmenPage;