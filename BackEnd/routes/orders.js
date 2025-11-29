// BackEnd/routes/orders.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/orders");

router.get("/", auth, admin, getOrders);
router.post("/add", auth, admin, addOrder);
router.put("/update/:id", auth, admin, updateOrder);
router.delete("/delete/:id", auth, admin, deleteOrder);

module.exports = router;