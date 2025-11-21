// backend/middleware/admin.js

module.exports = function admin(req, res, next) {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Access denied: Admins only" });
}
