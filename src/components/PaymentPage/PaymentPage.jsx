import React, { useEffect, useState } from "react";

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newPayment, setNewPayment] = useState({
    id: "",
    clientName: "",
    craftsmanName: "",
    paymentDate: "",
    amount: "",
    method: "",
    status: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);

  // تحميل بيانات الدفع من Local Storage عند بدء التشغيل
  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("payments"));
    if (storedPayments && storedPayments.length) {
      setPayments(storedPayments);
    }
  }, []);

  // حفظ بيانات الدفع عند كل تحديث
  useEffect(() => {
    if (payments.length > 0) {
      localStorage.setItem("payments", JSON.stringify(payments));
    }
  }, [payments]);

  // إضافة أو تعديل سجل الدفع
  const handleSavePayment = () => {
    if (
      !newPayment.clientName ||
      !newPayment.craftsmanName ||
      !newPayment.paymentDate ||
      !newPayment.amount ||
      !newPayment.method ||
      !newPayment.status
    )
      return;

    let updatedPayments;
    if (editingPayment) {
      updatedPayments = payments.map((payment) =>
        payment.id === editingPayment.id ? { ...newPayment, id: editingPayment.id } : payment
      );
    } else {
      updatedPayments = [...payments, { ...newPayment, id: Date.now().toString() }];
    }

    setPayments(updatedPayments);
    setNewPayment({
      id: "",
      clientName: "",
      craftsmanName: "",
      paymentDate: "",
      amount: "",
      method: "",
      status: "",
    });
    setEditingPayment(null);
    setIsModalOpen(false);
  };

  // حذف سجل دفع
  const handleDeletePayment = (id) => {
    const updatedPayments = payments.filter((payment) => payment.id !== id);
    setPayments(updatedPayments);
  };

  // فتح المودال مع بيانات السجل للتعديل
  const handleEditPayment = (payment) => {
    setNewPayment(payment);
    setEditingPayment(payment);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {/* زر إضافة سجل دفع جديد */}
      <button className="bg-teal-600 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(true)}>
        Add Payment
      </button>

      {/* مربع البحث */}
      <input
        type="text"
        placeholder="Search by client name..."
        className="border p-2 ml-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* جدول عرض بيانات الدفع */}
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Client Name</th>
            <th className="border p-2">Craftsman Name</th>
            <th className="border p-2">Payment Date</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Method</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments
            .filter((payment) => payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((payment) => (
              <tr key={payment.id} className="border">
                <td className="border p-2">{payment.id}</td>
                <td className="border p-2">{payment.clientName}</td>
                <td className="border p-2">{payment.craftsmanName}</td>
                <td className="border p-2">{payment.paymentDate}</td>
                <td className="border p-2">${payment.amount}</td>
                <td className="border p-2">{payment.method}</td>
                <td className="border p-2">{payment.status}</td>
                <td className="border p-2">
                  <button className="text-blue-500 mr-2" onClick={() => handleEditPayment(payment)}>Edit</button>
                  <button className="text-red-500" onClick={() => handleDeletePayment(payment.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal لإضافة / تعديل سجل الدفع */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">{editingPayment ? "Edit Payment" : "Add Payment"}</h2>

            <input type="text" placeholder="Client Name" className="border p-2 w-full mb-2" 
              value={newPayment.clientName} onChange={(e) => setNewPayment({ ...newPayment, clientName: e.target.value })} />

            <input type="text" placeholder="Craftsman Name" className="border p-2 w-full mb-2" 
              value={newPayment.craftsmanName} onChange={(e) => setNewPayment({ ...newPayment, craftsmanName: e.target.value })} />

            <input type="date" className="border p-2 w-full mb-2" 
              value={newPayment.paymentDate} onChange={(e) => setNewPayment({ ...newPayment, paymentDate: e.target.value })} />

            <input type="number" placeholder="Amount ($)" className="border p-2 w-full mb-2" 
              value={newPayment.amount} onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} />

            <select className="border p-2 w-full mb-2" value={newPayment.method} 
              onChange={(e) => setNewPayment({ ...newPayment, method: e.target.value })}>
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="PayPal">PayPal</option>
            </select>

            <select className="border p-2 w-full mb-2" value={newPayment.status} 
              onChange={(e) => setNewPayment({ ...newPayment, status: e.target.value })}>
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>

            <div className="flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-2 mr-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="bg-teal-600 text-white px-4 py-2 rounded" onClick={handleSavePayment}>
                {editingPayment ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;