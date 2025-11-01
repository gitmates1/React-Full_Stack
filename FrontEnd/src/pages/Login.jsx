import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const navigate = useNavigate();
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  fetch("/api/verify-token", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => {
      if (!res.ok) throw new Error();
      navigate("/dashboard");
    })
    .catch(() => localStorage.removeItem("token"));
}, []);


  const handleToggle = () => setIsSignUp(!isSignUp);

  // ------------------ LOGIN ------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginEmail || !loginPassword) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      alert("Login Successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setLoginEmail("");
      setLoginPassword("");

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Invalid Credentials!");
    }
    setLoading(false);
  };

  // ------------------ SIGNUP ------------------
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !signUpEmail || !signUpPassword) {
      alert("Please Fill This Fields!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email: signUpEmail,
        password: signUpPassword,
      });

      alert("Congrats Accounted Created! Please Login In");

      setName("");
      setSignUpEmail("");
      setSignUpPassword("");

      setIsSignUp(false);
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Ops! Signup Failed!");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className={`container ${isSignUp ? "active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h3>Create Your Account</h3>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Register"}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h3>Enter Your Details</h3>
            <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Toggle Section */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>To stay connected with us please login with your info</p>
              <button className="hidden" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Greetings</h1>
              <p>Get Started by Register yourself and start your journey with us</p>
              <button className="hidden" onClick={handleToggle}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
