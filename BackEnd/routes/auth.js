//routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const SECRET = process.env.JWT_SECRET || "fallbacksecret";

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    // Prevent signup as admin
    if (email === "admin@gmail.com")
      return res.status(403).json({ message: "Admin cannot be registered!" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered!" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role: "user",
    });

    await newUser.save();
    res.json({ message: "Account created! Please login." });

  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Admin login
    if (email === "admin@gmail.com") {
      const hashedAdmin = await bcrypt.hash("admin123", 10); // ensure hash matches db
      const match = await bcrypt.compare(password, hashedAdmin);

      if (!match) return res.status(400).json({ message: "Invalid credentials!" });

      const token = jwt.sign({ id: "adminid", email, role: "admin" }, SECRET, { expiresIn: "1d" });
      return res.json({
        message: "Login successful",
        token,
        user: { id: "adminid", name: "Admin", email, role: "admin" }
      });
    }

    // Normal user login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials!" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials!" });

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, SECRET, { expiresIn: "1d" });
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;