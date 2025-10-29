// FrontEnd/src/pages/Login.jsx

import { useState } from "react";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      console.log("Login Success:", response.data);
      alert("Login Successful!");

      // Store token in localStorage for future use
      localStorage.setItem("token", response.data.token);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Invalid Credentials!");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h4>Welcome To Login</h4>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>{loading ? "Verify..." : "Login"}</button>
        <p>Don't have an account? <a href="/signup" style={{ fontFamily: "Calibri" }}>SignUp</a></p>
      </form>
    </div>
  );
}
