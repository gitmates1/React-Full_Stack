import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sign In fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({});

  // Sign Up fields
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpErrors, setSignUpErrors] = useState({});

  const navigate = useNavigate();

  // Verify token if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/verify-token", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        navigate("/dashboard");
      })
      .catch(() => localStorage.removeItem("token"));
  }, [navigate]);

  const handleToggle = () => {
    setIsSignUp(!isSignUp);

    // Clear all error messages
    setSignUpErrors({});
    setLoginErrors({});

    if (isSignUp) {
      // We are switching to Sign In → clear Sign Up fields
      setName("");
      setSignUpEmail("");
      setSignUpPassword("");
    } else {
      // We are switching to Sign Up → clear Sign In fields
      setLoginEmail("");
      setLoginPassword("");
    }
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!loginEmail) errors.loginEmail = "Email is required!";
    if (!loginPassword) errors.loginPassword = "Password is required!";

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    setLoginErrors({});
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      // REDIRECT BASED ON ROLE
      if (data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/dashboard");
      }

      setTimeout(() => {
        alert("Login Successful.");
      }, 300);
    }

    catch (error) {
      setLoginErrors({
        loginPassword: error.response?.data?.message || "Invalid credentials!",
      });
      alert("Invalid Credentials!");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SIGNUP ----------------
  const handleSignUp = async (e) => {
    e.preventDefault();
    const errors = {};

    if (!name) errors.name = "Name is required!";
    else if (!/^[A-Za-z ]+$/.test(name))
      errors.name = "Name must contain only alphabets!";

    if (!signUpEmail) errors.signUpEmail = "Email is required!";
    if (!signUpPassword) errors.signUpPassword = "Strong password required!";

    if (Object.keys(errors).length > 0) {
      setSignUpErrors(errors);
      return;
    }

    setSignUpErrors({});
    setLoading(true);

    try {
      await axios.post("/api/auth/signup", {
        name,
        email: signUpEmail,
        password: signUpPassword,
      });

      alert("Account Created! Please Login.");

      setName("");
      setSignUpEmail("");
      setSignUpPassword("");
      setIsSignUp(false);
    } catch (error) {
      setSignUpErrors({
        signUpPassword: error.response?.data?.message || "Signup failed!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className={`container ${isSignUp ? "active" : ""}`}>
        {/* Sign Up Form */}
        <div className="form-container sign-up">
          <form onSubmit={handleSignUp}>
            <h3>Create Your Account</h3>
            <br></br>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={signUpErrors.name ? "invalid" : ""}
            />
            {signUpErrors.name && (
              <span className="error-msg">{signUpErrors.name}</span>
            )}

            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className={signUpErrors.signUpEmail ? "invalid" : ""}
            />
            {signUpErrors.signUpEmail && (
              <span className="error-msg">{signUpErrors.signUpEmail}</span>
            )}

            <input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className={signUpErrors.signUpPassword ? "invalid" : ""}
            />
            {signUpErrors.signUpPassword && (
              <span className="error-msg">{signUpErrors.signUpPassword}</span>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Creating" : "Register"}
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h3>Welcome! Please Login</h3>
            <br></br>
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              className={loginErrors.loginEmail ? "invalid" : ""}
            />
            {loginErrors.loginEmail && (
              <span className="error-msg">{loginErrors.loginEmail}</span>
            )}

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              className={loginErrors.loginPassword ? "invalid" : ""}
            />
            {loginErrors.loginPassword && (
              <span className="error-msg">{loginErrors.loginPassword}</span>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Verifying" : "Sign In"}
            </button>
            {/* <p onClick={() => navigate("/forgot-password")} className="forgot-link"> Forgot Password? </p> */}

          </form>
        </div>

        {/* Toggle Section */}
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h2>Register Here!</h2>
              <p>Please Login, To stay connected.</p>
              <button className="hidden" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h2>Hello, Greetings</h2>
              <p>Get Started Your Journey With Outfitly.</p>
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
