import React from "react";

export default function ProductDetailsModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl relative animate-fadeIn">

        {/* CLOSE BUTTON */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

        <div className="flex gap-6">

          {/* PRODUCT IMAGE */}
          <img
            src={`/images/${product.image}`}
            className="w-60 h-60 object-cover rounded-lg shadow-md"
            alt={product.name}
          />

          {/* PRODUCT DETAILS */}
          <div className="flex-1">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-4">
              <p className="mb-1">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Rating:</span> ⭐ {product.rating}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Specs:</span> {product.specification}
              </p>
              <p className="text-red-600 text-xl font-bold mt-2">
                ₱{product.price.toLocaleString()}
              </p>
              <p className="mt-1 text-gray-600">
                Available Stock: {product.quantity}
              </p>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end">
          <button
            className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
