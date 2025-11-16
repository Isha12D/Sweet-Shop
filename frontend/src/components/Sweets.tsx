import { useState } from "react";

interface Sweet {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

const dummySweets: Sweet[] = [
  {
    id: 1,
    name: "Kaju Katli",
    price: 500,
    quantity: 10,
    image:
      "https://i.pinimg.com/736x/d0/c7/f3/d0c7f3c83bc404c58ab75682abf04a0c.jpg",
    category: "Premium",
  },
  {
    id: 2,
    name: "Laddoo",
    price: 250,
    quantity: 20,
    image:
      "https://i.pinimg.com/736x/04/6c/e1/046ce1d5d4811b78771d5eb0295fadbe.jpg",
    category: "Classic",
  },
  {
    id: 3,
    name: "Rasgulla",
    price: 300,
    quantity: 15,
    image:
      "https://i.pinimg.com/1200x/ee/42/70/ee4270634c96dfef9b2d9d613645aaa9.jpg",
    category: "Bengali",
  },
  {
    id: 4,
    name: "Gulab Jamun",
    price: 280,
    quantity: 18,
    image:
      "https://i.pinimg.com/736x/a9/3d/77/a93d77d3e242262f2c919bf66aef5b39.jpg",
    category: "Classic",
  },
];

export default function SweetSection() {
  const [sweets, setSweets] = useState<Sweet[]>(dummySweets);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");

  // Increase cart quantity
  const increase = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Decrease cart quantity
  const decrease = (id: number) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) - 1;
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: qty };
    });
  };

  // Filtering sweets
  const filteredSweets = sweets.filter((sweet) => {
    const matchesSearch = sweet.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || sweet.category === category;
    const matchesPrice =
      price === "All" ||
      (price === "Low" && sweet.price <= 300) ||
      (price === "High" && sweet.price > 300);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="w-full px-6 md:px-10 py-16 bg-[#fdf8f3]">
      <h2 className="text-4xl font-bold text-center text-[#7a3c26] mb-10">
        Our Sweets
      </h2>

      {/* ---------------- FILTERS + SEARCH ---------------- */}
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search sweets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-[#d9c4b0] rounded-lg w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#a86a4e]"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-[#d9c4b0] rounded-lg shadow-sm bg-white"
        >
          <option>All</option>
          <option>Classic</option>
          <option>Premium</option>
          <option>Bengali</option>
        </select>

        {/* Price Filter */}
        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="px-4 py-2 border border-[#d9c4b0] rounded-lg shadow-sm bg-white"
        >
          <option value="All">Price: All</option>
          <option value="Low">Under ₹300</option>
          <option value="High">Above ₹300</option>
        </select>
      </div>

      {/* ---------------- SWEETS GRID ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSweets.map((sweet) => {
          const qty = cart[sweet.id] || 0;

          return (
            <div
              key={sweet.id}
              className="bg-white rounded-2xl shadow-md p-5 border border-[#f1e0d2] hover:shadow-xl transition-all"
            >
              <img
                src={sweet.image}
                alt={sweet.name}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />

              <h3 className="text-2xl font-semibold text-[#693320]">
                {sweet.name}
              </h3>

              <p className="text-lg text-[#8a4b32] font-medium mt-1">
                ₹{sweet.price} / kg
              </p>

              {/* CATEGORY */}
              <p className="text-sm mt-1 text-[#a86a4e] opacity-70">
                {sweet.category}
              </p>

              {/* CART BUTTONS */}
              <div className="mt-5">
                {qty === 0 ? (
                  <button
                    onClick={() => increase(sweet.id)}
                    className="w-full bg-[#a86a4e] text-white py-2 rounded-lg text-lg font-medium hover:bg-[#8b553d] transition"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => decrease(sweet.id)}
                      className="bg-[#d1a084] text-white rounded-full px-4 py-2 text-lg hover:bg-[#b78063] transition"
                    >
                      −
                    </button>

                    <span className="text-xl font-semibold text-[#5b2e1f]">
                      {qty}
                    </span>

                    <button
                      onClick={() => increase(sweet.id)}
                      className="bg-[#a86a4e] text-white rounded-full px-4 py-2 text-lg hover:bg-[#8b553d] transition"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
