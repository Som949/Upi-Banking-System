const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");                          // ← tera pool
const { verifyToken } = require("../middleware/authMiddleware");
require("dotenv").config();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔐 POST /admin/login
// Body: { password: "BANK@1234" }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password daalna zaroori hai.",
      });
    }

    // SQL se admin row lo — single admin hai isliye LIMIT 1
    const result = await pool.query(
      "SELECT * FROM admin LIMIT 1"
    );

    const admin = result.rows[0];

    if (!admin) {
      return res.status(500).json({
        success: false,
        message: "Admin account nahi mila. Seed script chalao pehle.",
      });
    }

    // Password match karo
    const isMatch = await bcrypt.compare(password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Galat password.",
      });
    }

    // JWT token banao
    const token = jwt.sign(
      {
        role: "admin",
        is_default_password: admin.is_default_password,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      is_default_password: admin.is_default_password,
    });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔑 POST /admin/change-password
// Headers: Authorization: Bearer <token>
// Body: { current_password, new_password, confirm_password }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/change-password", verifyToken, async (req, res) => {
  try {
    const { current_password, new_password, confirm_password } = req.body;

    // ── Validations ──────────────────────────────
    if (!current_password || !new_password || !confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Teeno fields bharne zaroori hain.",
      });
    }

    if (new_password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "New password aur confirm password match nahi kar rahe.",
      });
    }

    if (current_password === new_password) {
      return res.status(400).json({
        success: false,
        message: "Naya password purane se alag hona chahiye.",
      });
    }

    // Min 8 chars, 1 uppercase, 1 number, 1 special char
    const strongPassword =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!strongPassword.test(new_password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password mein chahiye: 8+ characters, 1 uppercase, 1 number, 1 special char (!@#$%^&*)",
      });
    }

    // ── DB Operations ────────────────────────────

    // Admin row fetch karo
    const result = await pool.query("SELECT * FROM admin LIMIT 1");
    const admin = result.rows[0];

    if (!admin) {
      return res.status(500).json({
        success: false,
        message: "Admin record nahi mila.",
      });
    }

    // Current password verify karo
    const isMatch = await bcrypt.compare(current_password, admin.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password galat hai.",
      });
    }

    // Naya password hash karo
    const newHashedPassword = await bcrypt.hash(new_password, 12);

    // DB update karo
    await pool.query(
      `UPDATE admin 
       SET password_hash = $1, 
           is_default_password = false, 
           timestamp = NOW()
       WHERE is_default_password = $2 OR is_default_password = $3`,
      [newHashedPassword, true, false]   // dono cases cover — koi bhi row update ho
    );

    // Naya token do — is_default_password: false ke saath
    const newToken = jwt.sign(
      { role: "admin", is_default_password: false },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    return res.status(200).json({
      success: true,
      message: "Password successfully change ho gaya!",
      token: newToken,
    });

  } catch (err) {
    console.error("Change password error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;