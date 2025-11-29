import { useState } from "react";
import axios from "axios";
import "./Customers.css";

export default function AddCustomer() {
  const [customer, setCustomer] = useState({ name: "", email: "", password: ""});
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email || !customer.password) return setError("All fields required");

    try {
      await axios.post("/api/customers/add", customer, { headers: { "x-auth-token": token } });
      setCustomer({ name: "", email: "", password: ""});
      setError("");
      alert("Customer added!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding customer");
    }
  };

  return (
    <div className="customer-container">
      <h3>Add Customer</h3>
      <div className="customer-form-card">
        <form onSubmit={handleSubmit}>
          <input placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input placeholder="Email" type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          <input placeholder="Password" type="password" value={customer.password} onChange={(e) => setCustomer({ ...customer, password: e.target.value })} />
          {error && <div className="invalid-feedback">{error}</div>}
          <button type="submit" className="btn btn-primary">Add Customer</button>
        </form>
      </div>
    </div>
  );
}