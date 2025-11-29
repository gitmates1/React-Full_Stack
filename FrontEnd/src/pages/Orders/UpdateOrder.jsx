import { useState, useEffect } from "react";
import axios from "axios";
import "./Orders.css";

export default function UpdateOrder({ orderId }) {
  const [order, setOrder] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(`/api/orders/${orderId}`, { headers: { "x-auth-token": token } })
      .then(res => setOrder(res.data))
      .catch(console.error);
  }, [orderId]);

  const handleUpdate = async () => {
    await axios.put(`/api/orders/update/${orderId}`, order, { headers: { "x-auth-token": token } });
    alert("Order updated!");
  };

  if (!order) return <div className="order-container">Loading...</div>;

  return (
    <div className="order-container">
      <h3>Update Order</h3>
      <div className="order-form-card">
        <input value={order.customerId} onChange={(e) => setOrder({ ...order, customerId: e.target.value })} />
        <input value={order.productName} onChange={(e) => setOrder({ ...order, productName: e.target.value })} />
        <input type="number" value={order.quantity} onChange={(e) => setOrder({ ...order, quantity: e.target.value })} />
        <input type="number" value={order.price} onChange={(e) => setOrder({ ...order, price: e.target.value })} />
        <select value={order.status} onChange={(e) => setOrder({ ...order, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}