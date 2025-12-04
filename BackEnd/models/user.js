// BackEnd/models/user.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    unique: true, 
    required: true, 
    default: function () { 
      const randomNum = Math.floor(10000 + Math.random() * 90000); 
      return "CUS-" + randomNum; 
    }, 
  },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["Active", "Blocked"], default: "Active" },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
}, { timestamps: true });

// ----------------- pre-save hook -----------------
userSchema.pre("save", function(next) {
  if (!this.userId) {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.userId = "CUS-" + randomNum;
  }
  next();
});

// ----------------- export model -----------------
module.exports = mongoose.model("User", userSchema);