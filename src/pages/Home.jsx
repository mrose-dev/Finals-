import React from "react";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const products = [
    {
      name: "Charging Cable",
      image: "/image/charger.jpg",
      price: 250,
    },
    {
      name: "Headphone",
      image: "/image/headphone.jpg",
      price: 499,
    },
    {
      name: "Keyboard",
      image: "/image/keyboard.jpg",
      price: 799,
    },
  ];

  return (
    <div className="home">
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((item, index) => (
          <ProductCard
            key={index}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}
