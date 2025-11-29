// BackEnd/controllers/customer.js

const Customer = require("../models/user");

// Get All Customers + Search + Filter
exports.getCustomers = async (req, res) => {
  const { search } = req.query;

  let query = {};
  if (search) {
    query = {
      $or: [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { customerId: new RegExp(search, "i") },
      ]
    };
  }

  const customers = await Customer.find(query);
  res.json(customers);
};

// Add Customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, email, status } = req.body;

    const newCustomer = new Customer({ name, email, status });
    await newCustomer.save();

    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add customer" });
  }
};

// Update Customer
exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete Customer
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
};