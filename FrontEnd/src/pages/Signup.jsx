// FrontEnd/src/pages/Signup.jsx

import { useState } from "react";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    setLoading(true);   // show loading state

    try {
      // axios call to backend (Vite proxy handles /api)
      const response = await axios.post("/api/auth/signup", { name, email, password });

      console.log("Signup Success:", response.data);
      alert("Account created successfully!");

      // reset form fields
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Signup Failed!");
    }

    setLoading(false); // hide loading
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h4>Create your Account</h4>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password 8 characters (@Like_12)" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>
        <p>Already have an account? <a href="/login" style={{ fontFamily: "Calibri" }}>Login here</a></p>
      </form>
    </div>
  );
}
