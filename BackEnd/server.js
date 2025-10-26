// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));

// Protected example route
const authMiddleware = require("./middleware/auth");
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Protected data", user: req.user });
});

// Root
app.get("/", (req, res) => res.send("Backend running"));

// Start server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
