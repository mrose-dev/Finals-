import React from "react";

export default function ProductCard({ image, name, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-img" />

      <h3>{name}</h3>
      <p className="price">₱{price}</p>

      <button className="add-btn">Add to Cart</button>
    </div>
  );
}
