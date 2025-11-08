import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/dashboard.css";

const ProductForm =({ onClose, onProductAdded, editingProduct })=> {
  const[formData, setFormData] = useState({
    article_no: "",
    name: "",
    in_price: "",
    price: "",
    unit: "",
    in_stock: "",
    description: "",
  });

  const API_URL= import.meta.env.VITE_API;

  // prefill form when updating the product
  useEffect(() =>{
    if (editingProduct) {
      setFormData({
        article_no: editingProduct.article_no,
        name: editingProduct.name,
        in_price: editingProduct.in_price,
        price: editingProduct.price,
        unit: editingProduct.unit,
        in_stock: editingProduct.in_stock,
        description: editingProduct.description || "",
      });
    } else{
      setFormData({
        article_no: "",
        name: "",
        in_price: "",
        price: "",
        unit: "",
        in_stock: "",
        description: "",
      });
    }
  }, [editingProduct]);

  const handleChange =(e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const token =localStorage.getItem("sow_access");
    if (!token){
      toast.error("You must be logged in to add/edit products.");
      return;
    }

    try{
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `${API_URL}/api/products/${editingProduct.id}/`
        : `${API_URL}/api/products/`;

      const res= await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if(!res.ok) throw new Error(`Failed to ${editingProduct ? "update" : "add"} product (${res.status})`);

      const data = await res.json();
      toast.success(`Product ${editingProduct ? "updated" : "added"} successfully!`);
      onProductAdded(data);
      onClose();
    } catch(err) {
      console.error(err);
      toast.error(`Failed to ${editingProduct ? "update" : "add"} product.`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
        <form onSubmit={handleSubmit}>
          <input name="article_no" placeholder="Article No." value={formData.article_no} onChange={handleChange} required />
          <input name="name" placeholder="Product/Service" value={formData.name} onChange={handleChange} required />
          <input name="in_price" placeholder="In Price" type="number" value={formData.in_price} onChange={handleChange} required />
          <input name="price" placeholder="Price" type="number" value={formData.price} onChange={handleChange} required />
          <input name="unit" placeholder="Unit" value={formData.unit} onChange={handleChange} required />
          <input name="in_stock" placeholder="In Stock" type="number" value={formData.in_stock} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

          <div className="modal-actions">
            <button type="submit" className="green">{editingProduct ? "Update" : "Add"}</button>
            <button type="button" className="gray" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
