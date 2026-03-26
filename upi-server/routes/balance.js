const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../middleware/authMiddleware");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💰 POST /upi/balance
// UPI PIN verify karo phir balance dekho
// Body: { account_number, upi_pin }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/", verifyToken, async (req, res) => {
  try {
    const { account_number, upi_pin } = req.body;

    // ── Validations ──────────────────────────────────
    if (!account_number || !upi_pin) {
      return res.status(400).json({
        success: false,
        message: "account_number aur upi_pin dono zaroori hain.",
      });
    }

    // ── UPI Account fetch karo ────────────────────────
    const upiResult = await pool.query(
      "SELECT * FROM upi_accounts WHERE account_number = $1 AND is_active = true",
      [account_number]
    );

    const upiAccount = upiResult.rows[0];

    if (!upiAccount) {
      return res.status(404).json({
        success: false,
        message: "UPI account nahi mila.",
      });
    }

    // ── UPI PIN Verify ────────────────────────────────
    const isPinValid = await bcrypt.compare(upi_pin, upiAccount.upi_pin_hash);

    if (!isPinValid) {
      return res.status(401).json({
        success: false,
        message: "Galat UPI PIN.",
      });
    }

    // ── Balance fetch karo ────────────────────────────
    const userResult = await pool.query(
      "SELECT full_name, account_number, balance FROM users WHERE account_number = $1",
      [account_number]
    );

    const user = userResult.rows[0];

    return res.status(200).json({
      success: true,
      message: "Balance fetched!",
      data: {
        full_name:      user.full_name,
        account_number: user.account_number,
        upi_address:    upiAccount.upi_address,
        balance:        Number(user.balance),
      },
    });

  } catch (err) {
    console.error("Check balance error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;

