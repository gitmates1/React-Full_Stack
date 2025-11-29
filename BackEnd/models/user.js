// BackEnd/models/Customer.js
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // npm install uuid

const customerSchema = new mongoose.Schema({
  customerId: { type: String, unique: true, default: () => uuidv4() }, // auto-generated unique ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active", "blocked"], default: "active" },
  role: { type: String, enum: ["user", "admin"], default: "user" },
}, { timestamps: true });

module.exports = mongoose.model("Customer", customerSchema);
