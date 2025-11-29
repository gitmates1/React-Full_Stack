import { useEffect, useState } from "react";
import axios from "axios";
import "./Customers.css";

export default function ViewCustomers({ refreshStats }) {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [editCustomer, setEditCustomer] = useState(null);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch customers from backend
  const loadCustomers = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`/api/customers?search=${search}&filter=${filter}`, {
        headers: { "x-auth-token": token },
      });
      setCustomers(res.data);
    } catch (err) {
      console.error("Error fetching customers:", err.response || err);
    }
  };

  useEffect(() => {
    loadCustomers();
    const interval = setInterval(loadCustomers, 5000); // optional auto-refresh
    return () => clearInterval(interval);
  }, [search, filter, token]);

  const updateCustomer = async () => {
    if (!editCustomer) return;
    try {
      await axios.put(`/api/customers/update/${editCustomer._id}`, editCustomer, {
        headers: { "x-auth-token": token },
      });
      setEditCustomer(null);
      await loadCustomers();
      refreshStats(); // Update stats in AdminDashboard
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`/api/customers/delete/${id}`, { headers: { "x-auth-token": token } });
      setDeleteCustomerId(null);
      await loadCustomers();
      refreshStats(); // Update stats in AdminDashboard
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="customer-container">
      <h3>Customers</h3>

      <div className="customer-search-filter">
        <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="customer-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td>{c.customerId}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.status}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => setEditCustomer({ ...c })}>Edit</button>
                  <button className="btn btn-danger" onClick={() => setDeleteCustomerId(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editCustomer && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal customer-form-card">
            <h5>Edit Customer</h5>
            <input value={editCustomer.name} onChange={(e) => setEditCustomer({ ...editCustomer, name: e.target.value })} />
            <input value={editCustomer.email} onChange={(e) => setEditCustomer({ ...editCustomer, email: e.target.value })} />
            <select value={editCustomer.status} onChange={(e) => setEditCustomer({ ...editCustomer, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
            </select>
            <div className="modal-buttons">
              <button className="btn btn-primary" onClick={updateCustomer}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditCustomer(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCustomerId && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <h5>Confirm Delete</h5>
            <p>Are you sure you want to delete this customer?</p>
            <div className="modal-buttons">
              <button className="btn btn-danger" onClick={() => deleteCustomer(deleteCustomerId)}>Delete</button>
              <button className="btn btn-secondary" onClick={() => setDeleteCustomerId(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}