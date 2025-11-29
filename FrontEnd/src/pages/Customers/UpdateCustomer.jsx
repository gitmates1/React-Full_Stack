import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Customers.css";

export default function UpdateCustomer() {
  const { id } = useParams(); // get customer id from route
  const [customer, setCustomer] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/customers/${id}`, { headers: { "x-auth-token": token } })
      .then(res => setCustomer(res.data))
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) navigate("/login");
      });
  }, [id, token, navigate]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/customers/update/${id}`, customer, { headers: { "x-auth-token": token } });
      alert("Customer updated!");
      navigate("/admin/customers"); // go back to list after update
    } catch (err) {
      console.error(err);
      alert("Failed to update customer.");
    }
  };

  if (!customer) return <div className="customer-container">Loading...</div>;

  return (
    <div className="customer-container">
      <h3>Update Customer</h3>
      <div className="customer-form-card">
        <input value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
        <input value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
        <select value={customer.status} onChange={(e) => setCustomer({ ...customer, status: e.target.value })}>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
        <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  );
}