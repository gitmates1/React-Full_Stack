import { useEffect, useState } from "react";
import axios from "axios";
import "./Customers.css";
import { FiEdit } from "react-icons/fi";

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
      const res = await axios.get(`/api/admin/customers?search=${search}&filter=${filter}`, {
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
      await axios.put(`/api/admin/customers/update/${editCustomer._id}`, editCustomer, {
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
      await axios.delete(`/api/admin/customers/delete/${id}`, { headers: { "x-auth-token": token } });
      setDeleteCustomerId(null);
      await loadCustomers();
      refreshStats(); // Update stats in AdminDashboard
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="customer-container">
      <h3 style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", color: "#dc3545"}}>Customers List</h3>

      <div className="customer-search-filter" style={{fontFamily: "Arial Narrow"}}>
        <input style={{fontFamily: "Arial Narrow"}} placeholder="Search by Name or ID" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select style={{fontFamily: "Arial Narrow"}} onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option style={{fontFamily: "Arial Narrow"}} value="">All</option>
          <option style={{fontFamily: "Arial Narrow"}} value="active">Active</option>
          <option style={{fontFamily: "Arial Narrow"}} value="blocked">Blocked</option>
        </select>
      </div>

      <div className="customer-table-container">
        <table className="customer-table">
          <thead>
            <tr>
              <th style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", textAlign: "center"}}>Customer ID</th>
              <th style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", textAlign: "center"}}>Name</th>
              <th style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", textAlign: "center"}}>Email</th>
              <th style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", textAlign: "center"}}>Status</th>
              <th style={{fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", textAlign: "center"}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id}>
                <td style={{fontFamily: "Arial Narrow", textAlign: "center"}}>{c.userId}</td>
                <td style={{fontFamily: "Arial Narrow", textAlign: "center"}}>{c.name}</td>
                <td style={{fontFamily: "Arial Narrow", textAlign: "center"}}>{c.email}</td>
                <td style={{fontFamily: "Arial Narrow", textAlign: "center"}}>{c.status}</td>
                <td style={{fontFamily: "Arial Narrow", textAlign: "center"}}>
                  <button style={{fontFamily: "Arial Narrow", textAlign: "center"}} className="btn btn-warning" onClick={() => setEditCustomer({ ...c })}>Edit</button>
                  <button style={{fontFamily: "Arial Narrow"}} className="btn btn-danger" onClick={() => setDeleteCustomerId(c._id)}>Delete</button>
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
            <input value={editCustomer.userId} disabled />
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