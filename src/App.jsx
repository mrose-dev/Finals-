import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import AddProductForm from "./components/AddProductForm";
import ProductDetailsModal from "./components/ProductDetailsModal";
import { load, save } from "./lib/storage";

const PLACEHOLDER =
  "https://via.placeholder.com/300x200.png?text=Product+Image";

const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    image: "headphone.jpg",
    name: "Wireless Headphones",
    category: "Audio",
    description:
      "lorem ipum dolor.",
    specification: "Bluetooth 5.3, ANC, 30h battery",
    rating: 4.5,
    price: 1299,
    quantity: 3,
  },
  {
    id: "p2",
    image: "keyboard.jpg",
    name: "Mechanical Keyboard",
    category: "Peripherals",
    description: "lorem ipum dolor sit amet.",
    specification: "RGB Lighting, Blue Switches",
    rating: 4.7,
    price: 2599,
    quantity: 7,
  },
  {
    id: "p3",
    image: "charger.jpg",
    name: "USB-C Charger 65W",
    category: "Accessories",
    description: "lorem ipi kekfker.",
    specification: "65W PD Charging",
    rating: 4.3,
    price: 899,
    quantity: 5,
  },
];

export default function App() {
  const [products, setProducts] = useState(() =>
    load("alama_products_v1", DEFAULT_PRODUCTS)
  );
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => save("alama_products_v1", products), [products]);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const visibleProducts = products.filter(
    (p) =>
      (filter === "All" || p.category === filter) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  function addProduct(p) {
    setProducts((prev) => [p, ...prev]);
  }

  function changeQty(id, d) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + d) } : p
      )
    );
  }

  function addToCart(id) {
    changeQty(id, 1);
  }

  const total = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            Product Management App
          </h1>

          <div className="flex gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border px-2 py-1 rounded flex-1"
              placeholder="Search product..."
            />
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-4">
            {visibleProducts.length === 0 && (
              <div className="p-4 bg-white border rounded">
                No matching products.
              </div>
            )}

            {visibleProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 bg-white rounded shadow flex gap-4"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-40 h-28 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <p className="text-sm text-gray-600">
                    {p.category} • Rating: {p.rating}
                  </p>
                  <p className="mt-2 text-sm">{p.description}</p>

                  <div className="mt-3 flex gap-2 items-center">
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() => changeQty(p.id, -1)}
                    >
                      –
                    </button>
                    <div className="px-3 py-1 border rounded">
                      {p.quantity}
                    </div>
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() => changeQty(p.id, 1)}
                    >
                      +
                    </button>

                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                      onClick={() => addToCart(p.id)}
                    >
                      Add to Cart
                    </button>

                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() => setSelected(p)}
                    >
                      Details
                    </button>

                    <div className="ml-auto text-sm font-medium">
                      Subtotal: ₱{(p.price * p.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>

          <aside>
            <AddProductForm onAdd={addProduct} />

            <div className="mt-6 p-4 border rounded bg-white">
              <h4 className="font-semibold">Total Value</h4>
              <p className="text-lg font-bold mt-1">
                ₱{total.toLocaleString()}
              </p>
            </div>
          </aside>
        </main>

        <ProductDetailsModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      </div>
    </div>
  );
}
