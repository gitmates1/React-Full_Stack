import { useState } from "react";
import axios from "axios";
import "./Customers.css";

export default function AddCustomer() {
  const [customer, setCustomer] = useState({ name: "", email: "", password: ""});
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email) return setError("All fields required");

    try {
      await axios.post("/api/admin/customers/add", customer, { headers: { "x-auth-token": token } });
      setCustomer({ name: "", email: "", password: ""});
      setError("");
      alert("Customer added!");
    } catch (err) {
      setError(err.response?.data?.message || "Error adding customer");
    }
  };

  return (
    <div className="customer-container">
      <h3 style={{fontFamily: "Arial Narrow"}}>Add Customer</h3>
      <div className="customer-form-card">
        <form onSubmit={handleSubmit}>
          <input style={{fontFamily: "Arial Narrow"}} placeholder="Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
          <input style={{fontFamily: "Arial Narrow"}} placeholder="Email" type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
          {error && <div className="invalid-feedback">{error}</div>}
          <button style={{fontFamily: "Arial Narrow"}} type="submit" className="btn btn-primary">Add Customer</button>
        </form>
      </div>
    </div>
  );
}