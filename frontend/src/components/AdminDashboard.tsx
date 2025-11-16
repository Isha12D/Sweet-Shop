import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName") || "Admin";
    setAdminName(storedAdmin);
  }, []);

  const initials = adminName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex w-full min-h-screen bg-[#faeee4]">

      {/* ------------------- SIDEBAR ------------------- */}
      <aside className="w-64 bg-[#7a3c26] text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-[#a86a4e] px-3 py-2 rounded-md">
            Dashboard
          </a>
          <a href="#" className="hover:bg-[#a86a4e] px-3 py-2 rounded-md">
            Sweets
          </a>
          <a href="#" className="hover:bg-[#a86a4e] px-3 py-2 rounded-md">
            Users
          </a>
        </nav>

        <button
          className="mt-auto bg-red-500 hover:bg-red-600 py-2 px-4 rounded-lg"
          onClick={() => {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminName");
            window.location.href = "/admin-login";
          }}
        >
          Logout
        </button>
      </aside>

      {/* ------------------- MAIN CONTENT ------------------- */}
      <main className="flex-1 p-8">
        
        {/* ---------- TOP BAR ---------- */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-[#7a3c26]">
            Welcome, {adminName}
          </h1>

          <div className="w-12 h-12 rounded-full bg-[#7a3c26] text-white flex items-center justify-center text-xl font-semibold shadow-lg">
            {initials}
          </div>
        </div>

        {/* ---------- STATS CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-xl bg-white border shadow">
            <h3 className="text-lg font-semibold text-[#7a3c26]">Total Sweets</h3>
            <p className="text-3xl font-bold mt-2">42</p>
          </div>

          <div className="p-6 rounded-xl bg-white border shadow">
            <h3 className="text-lg font-semibold text-[#7a3c26]">Stock Items</h3>
            <p className="text-3xl font-bold mt-2">310</p>
          </div>

          <div className="p-6 rounded-xl bg-white border shadow">
            <h3 className="text-lg font-semibold text-[#7a3c26]">Out of Stock</h3>
            <p className="text-3xl font-bold mt-2">3</p>
          </div>
        </div>

        {/* ---------- RECENTLY ADDED SWEETS ---------- */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-[#7a3c26] mb-4">Recently Added Sweets</h2>

          <div className="overflow-x-auto">
            <table className="w-full border bg-white rounded-xl overflow-hidden">
              <thead className="bg-[#f7e5d6]">
                <tr>
                  <th className="p-3 text-left">Sweet</th>
                  <th className="p-3 text-left">Price (₹)</th>
                  <th className="p-3 text-left">Stock</th>
                  <th className="p-3 text-left">Date Added</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="p-3">Kaju Katli</td>
                  <td className="p-3">500</td>
                  <td className="p-3">40 kg</td>
                  <td className="p-3">12 Feb 2025</td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">Gulab Jamun</td>
                  <td className="p-3">280</td>
                  <td className="p-3">25 kg</td>
                  <td className="p-3">11 Feb 2025</td>
                </tr>

                <tr className="border-t">
                  <td className="p-3">Rasgulla</td>
                  <td className="p-3">300</td>
                  <td className="p-3">32 kg</td>
                  <td className="p-3">10 Feb 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------- POPULAR SWEETS ---------- */}
        <section>
          <h2 className="text-2xl font-bold text-[#7a3c26] mb-4">Popular Sweets</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white border rounded-xl shadow">
              <p className="font-semibold text-[#7a3c26]">Kaju Katli</p>
              <p className="text-sm">Sold: 120</p>
            </div>

            <div className="p-4 bg-white border rounded-xl shadow">
              <p className="font-semibold text-[#7a3c26]">Gulab Jamun</p>
              <p className="text-sm">Sold: 98</p>
            </div>

            <div className="p-4 bg-white border rounded-xl shadow">
              <p className="font-semibold text-[#7a3c26]">Rasgulla</p>
              <p className="text-sm">Sold: 150</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
