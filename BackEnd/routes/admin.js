// backend/routes/admin.js
const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Customer = require("../models/user");
const Order = require("../models/orders");
const router = express.Router();

// Get User Search + Filter
router.get("/users", auth, admin, async (req, res) => {
  const { search, filter } = req.query;
  let query = {};
  if (search) { query = { $or: [ { name: new RegExp(search, "i") }, { email: new RegExp(search, "i") }, { userId: new RegExp(search, "i") }] }; }
  if (filter === "Admin") query.role = "Admin";
  if (filter === "User") query.role = "User";
  if (filter === "Blocked") query.status = "Blocked";
  if (filter === "Active") query.status = "Active";
  const users = await User.find(query).select("-password");
  res.json(users);
});

// Update User
router.put("/users/update/:id", auth, admin, async (req, res) => { const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password"); res.json(updated); });

// Delete User
router.delete("/users/delete/:id", auth, admin, async (req, res) => { await User.findByIdAndDelete(req.params.id); res.json({ message: "User deleted successfully" }); });

// Block / Unblock User
router.put("/users/status/:id", auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  user.status = user.status === "Active" ? "Blocked" : "Active";
  await user.save();
  res.json({ message: `User is now ${user.status}` });
});

const bcrypt = require("bcryptjs");

// ADD USER by Admin
router.post("/users/add", auth, admin, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Default password
    const defaultPassword = "123";

    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "User",
      status: "Active"
    });

    await newUser.save();

    res.json({ message: "User created successfully! Default password = 123" });

  } catch (err) {
    console.log("Add User Error:", err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

module.exports = router;