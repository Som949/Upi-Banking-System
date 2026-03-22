const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token nahi mila.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid ya expired token. Dobara login karo.",
    });
  }
};

const checkDefaultPassword = (req, res, next) => {
  if (req.admin.is_default_password === true) {
    return res.status(403).json({
      success: false,
      is_default_password: true,
      message: "Pehle default password change karo.",
    });
  }
  next();
};

module.exports = { verifyToken, checkDefaultPassword };