import { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

export default function ViewOrders({ refreshStats }) {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch orders from backend
  const loadOrders = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`/api/orders?search=${search}&filter=${filter}`, {
        headers: { "x-auth-token": token },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err.response || err);
    }
  };

  useEffect(() => {
    loadOrders();
    const interval = setInterval(loadOrders, 5000); // optional auto-refresh
    return () => clearInterval(interval);
  }, [search, filter, token]);

  const updateOrder = async () => {
    if (!editOrder) return;
    try {
      await axios.put(`/api/orders/update/${editOrder._id}`, editOrder, {
        headers: { "x-auth-token": token },
      });
      setEditOrder(null);
      await loadOrders();
      refreshStats(); // Update totalOrders and totalSales in AdminDashboard
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`/api/orders/delete/${id}`, { headers: { "x-auth-token": token } });
      setDeleteOrderId(null);
      await loadOrders();
      refreshStats(); // Update totalOrders and totalSales in AdminDashboard
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="order-container">
      <h3>Orders</h3>

      <div className="order-search-filter">
        <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="order-table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.orderId}</td>
                <td>{o.customerId}</td>
                <td>{o.productName}</td>
                <td>{o.quantity}</td>
                <td>{o.price}</td>
                <td>{o.status}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => setEditOrder({ ...o })}>Edit</button>
                  <button className="btn btn-danger" onClick={() => setDeleteOrderId(o._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editOrder && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal order-form-card">
            <h5>Edit Order</h5>
            <input value={editOrder.orderId} disabled />
            <input type="text" value={editOrder.productName} onChange={(e) => setEditOrder({ ...editOrder, productName: e.target.value })} />
            <input type="number" value={editOrder.quantity} onChange={(e) => setEditOrder({ ...editOrder, quantity: e.target.value })} />
            <input type="number" value={editOrder.price} onChange={(e) => setEditOrder({ ...editOrder, price: e.target.value })} />
            <select value={editOrder.status} onChange={(e) => setEditOrder({ ...editOrder, status: e.target.value })}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="modal-buttons">
              <button className="btn btn-primary" onClick={updateOrder}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditOrder(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOrderId && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h5>Confirm Delete</h5>
            <p>Are you sure you want to delete this order?</p>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={() => deleteOrder(deleteOrderId)}>Delete</button>
              <button className="btn btn-secondary" onClick={() => setDeleteOrderId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}