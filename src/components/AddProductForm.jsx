import React, { useState } from "react";

const initial = {
  image: "",
  name: "",
  category: "",
  description: "",
  specification: "",
  rating: "",
  price: "",
  quantity: "",
};

export default function AddProductForm({ showAddProduct }) {
  const [form, setForm] = useState(initial);

  function submit(e) {
    e.preventDefault();
    // This is where you would typically send the 'form' data to an API
    console.log(form);
    setForm(initial);
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      // Read the file and update the 'image' field in the state with the Base64 result
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  }

  // --- START OF CORRECTED RETURN BLOCK ---
  return (
    // Conditional rendering of the form/modal
    showAddProduct && (
      <div className="modal-overlay">
        <form className="add-product-modal" onSubmit={submit}>
          <h3>Add New Product</h3>
          
          <label>Image:</label>
          {/* REMOVED: <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /> */}
          {/* Use only the file input for image uploads */}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFile} 
          />

          <input 
            placeholder="Name" 
            value={form.name} 
            onChange={(e) => setForm({ ...form, name: e.target.value })} 
          />
          <textarea 
            placeholder="Description" 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })} 
          />
          <input 
            placeholder="Specification" 
            value={form.specification} 
            onChange={(e) => setForm({ ...form, specification: e.target.value })} 
          />
          <input 
            placeholder="Price" 
            value={form.price} 
            onChange={(e) => setForm({ ...form, price: e.target.value })} 
          />
          <input 
            placeholder="Stock" 
            value={form.quantity} 
            onChange={(e) => setForm({ ...form, quantity: e.target.value })} 
          />
          <input 
            placeholder="Rating" 
            value={form.rating} 
            onChange={(e) => setForm({ ...form, rating: e.target.value })} 
          />
          <input 
            placeholder="Category" 
            value={form.category} 
            onChange={(e) => setForm({ ...form, category: e.target.value })} 
          />

          <div className="modal-buttons">
            <button type="submit" className="add-btn">Add Product</button>
            <button 
              type="button" 
              className="clear-btn" 
              onClick={() => setForm(initial)}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    )
  );
  
}