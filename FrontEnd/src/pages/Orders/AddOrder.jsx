import { useState } from "react";
import axios from "axios";
import "./Orders.css";

export default function AddOrder() {
  const [order, setOrder] = useState({ customerId: "", productName: "", quantity: "", price: "" });
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!order.customerId || !order.productName || !order.quantity || !order.price)
      return setError("All fields are required");

    try {
      await axios.post("/api/orders/add", order, { headers: { "x-auth-token": token } });
      setOrder({ customerId: "", productName: "", quantity: "", price: "" });
      setError("");
      alert("Order added!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding order");
    }
  };

  return (
    <div className="order-container">
      <h3>Add Order</h3>
      <div className="order-form-card">
        <form onSubmit={handleSubmit}>
          <input placeholder="Customer ID" value={order.customerId} onChange={(e) => setOrder({ ...order, customerId: e.target.value })} />
          <input placeholder="Product Name" value={order.productName} onChange={(e) => setOrder({ ...order, productName: e.target.value })} />
          <input type="number" placeholder="Quantity" value={order.quantity} onChange={(e) => setOrder({ ...order, quantity: e.target.value })} />
          <input type="number" placeholder="Price" value={order.price} onChange={(e) => setOrder({ ...order, price: e.target.value })} />
          <select value={order.status} onChange={(e) => setOrder({ ...order, status: e.target.value })}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
          <button type="submit" className="btn btn-primary">Add Order</button>
        </form>
      </div>
    </div>
  );
}