// backend/server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/auth");
const adminMiddleware = require("./middleware/admin");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

// User-only route
app.get("/api/user/profile", authMiddleware, (req, res) => {
  res.json({ message: "User Profile Access", user: req.user });
});

// Admin-only route
app.get("/api/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Admin Dashboard Access", user: req.user });
});

// Root
app.get("/", (req, res) => res.send("Server is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
