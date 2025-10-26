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
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Login Success:", response.data);
      alert("Login Successful!");

      // future purpose token store
      localStorage.setItem("token", response.data.token);

      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Invalid credentials!");
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h4>Welcome To Login</h4>

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
        <a href="/http://localhost:5173/home">
         <button type="submit" disabled={loading}>
          {loading ? "Verify..." : "Login"}
         </button>
        </a>

        <p>Don't have an account <a style={{ fontFamily: "Calibri" }} href="http://localhost:5173/signup">SignUp</a>
        </p>
      </form>
    </div>
  );
}
