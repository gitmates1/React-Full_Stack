// BackEnd/controllers/orders.js

const Order = require("../models/orders");

// Get All Orders
exports.getOrders = async (req, res) => {
  const { search } = req.query;

  let query = {};
  if (search) {
    query = {
      $or: [
        { orderId: new RegExp(search, "i") },
        { customerId: new RegExp(search, "i") }
      ]
    };
  }

  const orders = await Order.find(query);
  res.json(orders);
};

// Add New Order
exports.addOrder = async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json({ message: "Order created", order });
};

// Update Order
exports.updateOrder = async (req, res) => {
  const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete Order
exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Order deleted" });
};