// src/pages/AdminDashboard.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAdmin } from "../context/AdminContext";

export default function AdminDashboard() {
  const { admin } = useAdmin();
  const [sweets, setSweets] = useState<any[]>([]);
  const [newSweet, setNewSweet] = useState({ name: "", price: "", quantity: "" });

  // fetch sweets
  const fetchSweets = async () => {
    const res = await axios.get("http://localhost:5001/api/sweets");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const addSweet = async () => {
    await axios.post(
      "http://localhost:5001/api/admin/sweets",
      newSweet,
      { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
    );
    fetchSweets();
  };

  const deleteSweet = async (id: string) => {
    await axios.delete(
      `http://localhost:5001/api/admin/sweets/${id}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
    );
    fetchSweets();
  };

  const restockSweet = async (id: string) => {
    await axios.post(
      `http://localhost:5001/api/admin/sweets/${id}/restock`,
      { amount: 5 },
      { headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` } }
    );
    fetchSweets();
  };

  const purchaseSweet = async (id: string) => {
    await axios.post(`http://localhost:5001/api/sweets/${id}/purchase`);
    fetchSweets();
  };

  if (!admin) return <h1 className="text-center mt-20 text-3xl font-bold text-red-600">Access Denied</h1>;

  return (
    <div className="p-10 bg-amber-50 min-h-screen">
      <h1 className="text-4xl font-bold text-pink-600 mb-10">Admin Dashboard</h1>

      {/* Add Sweet Form */}
      <div className="bg-white p-6 rounded-xl shadow-md w-96 mb-10">
        <h2 className="text-xl font-bold mb-4">Add New Sweet</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Sweet Name"
          onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Price"
          type="number"
          onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Quantity"
          type="number"
          onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
        />

        <button
          onClick={addSweet}
          className="bg-pink-500 text-white w-full py-2 rounded-lg hover:bg-pink-600"
        >
          Add Sweet
        </button>
      </div>

      {/* Sweet Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="bg-pink-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((s) => (
            <tr key={s._id} className="border-b">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.price}</td>
              <td className="p-3">{s.quantity}</td>
              <td className="p-3 flex gap-3">
                <button
                  onClick={() => purchaseSweet(s._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Buy
                </button>

                <button
                  onClick={() => restockSweet(s._id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Restock
                </button>

                <button
                  onClick={() => deleteSweet(s._id)}
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
