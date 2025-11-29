const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/admin");
const Customer = require("../models/user"); // make sure this is the correct model
const Order = require("../models/orders");

// Total Statistics
router.get("/stats", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalSalesAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);
    const totalSales = totalSalesAgg[0]?.total || 0;

    res.json({ totalCustomers, totalOrders, totalSales });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});

module.exports = router;