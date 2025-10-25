// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "fallbacksecret";

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // { id, email, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalid" });
  }
};
