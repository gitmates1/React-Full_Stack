import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup fields
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

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
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email: signUpEmail,
        password: signUpPassword,
      });

      alert("Account created successfully! You can now sign in.");

      setName("");
      setSignUpEmail("");
      setSignUpPassword("");

      setIsSignUp(false);
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.response?.data?.message || "Signup failed!");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className={`container ${isSignUp ? "active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} required />
            <button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
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
              <p>To keep connected with us please login with your info</p>
              <button className="hidden" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
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
