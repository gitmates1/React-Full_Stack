// BackEnd/routes/customers.js

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customer");

router.get("/", auth, admin, getCustomers);
router.post("/add", auth, admin, addCustomer);
router.put("/update/:id", auth, admin, updateCustomer);
router.delete("/delete/:id", auth, admin, deleteCustomer);

module.exports = router;