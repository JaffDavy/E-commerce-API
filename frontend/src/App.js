import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL + "/products";
const ITEM_URL = process.env.REACT_APP_API_URL + "/products";

function App() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [filter, setFilter] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const url = filter ? `${API_URL}?category=${filter}` : API_URL;

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
    }
  }, [filter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${ITEM_URL}/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ name: "", price: "", category: "", description: "" });
      fetchProducts();
    } catch (err) {
      alert("Error saving product: " + err.message);
    }
  };

  const handleEditClick = (p) => {
    setEditId(p.id);
    setFormData({
      name: p.name,
      price: p.price,
      category: p.category,
      description: p.description,
    });
    window.scrollTo(0, 0);
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`${ITEM_URL}/${id}`);
        fetchProducts();
      } catch (err) {
        alert("Delete failed: " + err.message);
      }
    }
  };

  return (
    <div
      style={{
        overflow: "auto",
        width: "100%",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>🛒 Products Dashboard</h1>

      <section
        style={{ marginBottom: "20px", background: "#f4f4f4", padding: "15px" }}
      >
        <h3>Filter by Category</h3>
        <input
          type="text"
          placeholder="Filter..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </section>

      <section
        style={{
          marginBottom: "30px",
          border: "1px solid #ddd",
          padding: "15px",
        }}
      >
        <h3>{editId ? "📝 Edit Product" : "➕ Add New Product"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            placeholder="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <input
            placeholder="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
          <input
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <button
            type="submit"
            style={{
              backgroundColor: editId ? "orange" : "green",
              color: "white",
            }}
          >
            {editId ? "Update Product" : "Create Product"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={() => {
                setEditId(null);
                setFormData({
                  name: "",
                  price: "",
                  category: "",
                  description: "",
                });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </section>

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#eee" }}>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.price} frs</td>
              <td>{p.description}</td>
              <td>
                <button
                  onClick={() => handleEditClick(p)}
                  style={{ marginRight: "10px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  style={{ color: "red" }}
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

export default App;
