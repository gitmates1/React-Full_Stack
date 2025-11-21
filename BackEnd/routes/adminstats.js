// backend/routes/adminstats.js
const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");

const router = express.Router();

router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  const totalAdmins = await User.countDocuments({ role: "admin" });
  const totalUsers = await User.countDocuments({ role: "user" });
  const blockedUsers = await User.countDocuments({ status: "blocked" });
  const activeUsers = await User.countDocuments({ status: "active" });

  res.json({ totalAdmins, totalUsers, blockedUsers, activeUsers });
});

module.exports = router;
