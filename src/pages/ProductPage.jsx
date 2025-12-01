import React from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductPage({ products }) {
  const { id } = useParams();

  const product = products.find((p) => String(p.id) === String(id));

  if (!product)
    return (
      <div className="p-6">
        <p className="text-xl font-semibold">Product not found.</p>
        <Link
          to="/"
          className="mt-3 inline-block px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ← Back to Products
        </Link>
      </div>
    );

  return (
    <div className="p-6">

      {/* PAGE CONTAINER */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col md:flex-row gap-8">

        {/* IMAGE SECTION */}
        <div className="flex-shrink-0">
          <img
            src={`/images/${product.image}`}
            className="w-80 h-80 object-cover rounded-xl shadow"
            alt={product.name}
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex-1">
          {/* TITLE */}
          <h2 className="text-3xl font-bold leading-tight mb-2">
            {product.name}
          </h2>

          {/* CATEGORY + RATING */}
          <p className="text-gray-500 mb-3">
            {product.category} • ⭐ {product.rating}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* SPECS */}
          <p className="mt-4 text-gray-800">
            <span className="font-semibold">Specifications:</span>{" "}
            {product.specification}
          </p>

          {/* PRICE */}
          <p className="mt-4 text-3xl font-bold text-red-600">
            ₱{product.price.toLocaleString()}
          </p>

          {/* STOCK */}
          <p className="mt-1 text-gray-600">
            Available Stock: {product.quantity}
          </p>

          {/* BACK BUTTON */}
          <Link
            to="/"
            className="mt-6 inline-block px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
