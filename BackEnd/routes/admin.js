// backend/routes/admin.js
const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// GET ALL USERS + SEARCH + FILTER
router.get("/users", auth, admin, async (req, res) => {
  const { search, filter } = req.query;

  let query = {};

  if (search) {
    query = {
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { userId: new RegExp(search, "i") }
      ]
    };
  }

  if (filter === "admin") query.role = "admin";
  if (filter === "user") query.role = "user";
  if (filter === "blocked") query.status = "blocked";
  if (filter === "active") query.status = "active";

  const users = await User.find(query).select("-password");
  res.json(users);
});

// UPDATE USER
router.put("/users/update/:id", auth, admin, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }).select("-password");

  res.json(updated);
});

// DELETE USER
router.delete("/users/delete/:id", auth, admin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted successfully" });
});

// BLOCK / UNBLOCK USER
router.put("/users/status/:id", auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id);

  user.status = user.status === "active" ? "blocked" : "active";
  await user.save();

  res.json({ message: `User is now ${user.status}` });
});

module.exports = router;
