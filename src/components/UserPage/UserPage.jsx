import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "محمد أحمد", email: "mohamed@example.com" },
  { id: 2, name: "سارة علي", email: "sara@example.com" },
];

const UsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ id: null, name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addUser = () => {
    setUsers([...users, { id: Date.now(), ...form }]);
    setForm({ id: null, name: "", email: "" });
  };

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  const editUser = (user) => {
    setForm(user);
    setIsEditing(true);
  };

  const updateUser = () => {
    setUsers(users.map((u) => (u.id === form.id ? form : u)));
    setForm({ id: null, name: "", email: "" });
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold">إدارة المستخدمين</h2>
      <input type="text" name="name" value={form.name} placeholder="الاسم" onChange={handleChange} className="border p-2 mr-2"/>
      <input type="email" name="email" value={form.email} placeholder="الإيميل" onChange={handleChange} className="border p-2 mr-2"/>
      <button onClick={isEditing ? updateUser : addUser} className="bg-teal-600 text-white p-2">{isEditing ? "تحديث" : "إضافة"}</button>
      <ul>{users.map(u => <li key={u.id}>{u.name} ({u.email}) <button onClick={() => deleteUser(u.id)}>🗑</button></li>)}</ul>
    </div>
  );
};

export default UsersPage;