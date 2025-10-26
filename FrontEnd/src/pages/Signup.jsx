import { useState } from "react";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Signup Success:", response.data);
      alert("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Signup failed!");
    }

    setLoading(false);
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h4>Create your Account</h4>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
       <a href="http://localhost:5173/login">
         <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
         </button>
       </a>

        <p>Already have an account <a style={{ fontFamily: "Calibri" }} href="http://localhost:5173/login">Login</a>
        </p>
      </form>
    </div>
  );
}
