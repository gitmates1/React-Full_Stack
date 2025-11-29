// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const Port = process.env.PORT || 5000;

// Mount Middleware
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const custRoute = require("./routes/customers");
const orderRoute = require("./routes/orders");
const adminStats = require("./routes/adminstats");
const authMiddleware = require("./middleware/auth");
const adminMiddleware = require("./middleware/admin");

// Parse req.body
app.use(cors());
app.use(express.json());

// Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminMiddleware, adminRoutes);
app.use("/api/admin", adminMiddleware, adminStats);
app.use("/api/customers", custRoute);
app.use("/api/orders", orderRoute);

// User Protected Route
app.get("/api/user/profile", authMiddleware, (req, res) => { res.json({ message: "User Profile Access", user: req.user }); });

// Admin Protected Route
app.get("/api/admin/dashboard", authMiddleware, adminMiddleware, (req, res) => { res.json({ message: "Admin Dashboard Access", user: req.user }); });

// Root
app.get("/", (req, res) => res.send("Server is Listening"));

// Start server
app.listen(Port, () => console.log(`Server running on port ${Port}`));