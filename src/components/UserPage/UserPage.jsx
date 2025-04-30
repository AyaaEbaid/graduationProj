import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    id: "",
    fullName: "",
    email: "",
    phone: "",
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // تحميل المستخدمين من Local Storage مرة واحدة عند تحميل الصفحة
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // تحديث Local Storage فقط عند تغيير users بسبب إضافة أو حذف
  const updateLocalStorage = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleSaveUser = () => {
    if (!newUser.fullName || !newUser.email || !newUser.phone || !newUser.role) return;

    let updatedUsers;
    if (editingUser) {
      updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user
      );
    } else {
      updatedUsers = [...users, { ...newUser, id: Date.now().toString() }];
    }

    updateLocalStorage(updatedUsers);
    setNewUser({ id: "", fullName: "", email: "", phone: "", role: "" });
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    updateLocalStorage(updatedUsers);
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setEditingUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users Management</h2>
      
      <input
        type="text"
        placeholder="Search Users..."
        className="border p-2 rounded mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setNewUser({ id: "", fullName: "", email: "", phone: "", role: "" });
          setEditingUser(null);
          setIsModalOpen(true);
        }}
      >
        + Add User
      </button>
      
      {/* Table for Larger Screens */}
      <div className="hidden sm:block">
        <table className="min-w-full text-center bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">ID</th>
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((user) => (
                <tr key={user.id} className="border">
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.fullName}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.phone}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2 justify-center flex gap-2">
                    <button
                      className="bg-blue-700 text-white px-3 py-1 rounded"
                      onClick={() => handleEditUser(user)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Smaller Screens */}
      <div className="sm:hidden">
        {users
          .filter((user) =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
              {/* ID First, Bold and Black */}
              <p className="font-bold text-black">ID: {user.id}</p>
              
              {/* Adding Full Name */}
              <h3 className="font-semibold text-lg">{`Full Name: ${user.fullName}`}</h3>

              <p className="text-gray-600">Email: {user.email}</p>
              <p className="text-gray-600">Phone: {user.phone}</p>
              <p className="text-gray-600">Role: {user.role}</p>
              
              <div className="flex flex-col gap-2 mt-4">
                <button
                  className="bg-blue-700 text-white px-4 py-2 rounded w-full"
                  onClick={() => handleEditUser(user)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded w-full"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h3>
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded w-full mb-2"
              value={newUser.fullName}
              onChange={(e) =>
                setNewUser({ ...newUser, fullName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full mb-2"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-2 rounded w-full mb-2"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Role"
              className="border p-2 rounded w-full mb-2"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-teal-600 text-white px-3 py-1 rounded"
                onClick={handleSaveUser}
              >
                {editingUser ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
