const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Customer = require("../models/user"); // make sure this is the correct model
const Order = require("../models/orders");

// Total Statistics
router.get("/stats", auth, admin, async (req, res) => {
  const totalCustomers = await Customer.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalSalesAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$price" } } }]);
  const totalSales = totalSalesAgg[0]?.total || 0;

  res.json({ totalCustomers, totalOrders, totalSales, totalProducts: 0 }); // totalProducts placeholder
});

module.exports = router;