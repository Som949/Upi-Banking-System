const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📝 POST /upi/register
// Body: { account_number, bank_pin, password, confirm_password }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/register", async (req, res) => {
  try {
    const { account_number, bank_pin, password, confirm_password } = req.body;

    // ── Validations ────────────────────────────────────
    if (!account_number || !bank_pin || !password || !confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Sabhi fields zaroori hain: account_number, bank_pin, password, confirm_password",
      });
    }

    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Password aur confirm password match nahi kar rahe.",
      });
    }

    // Password strength check
    const strongPassword =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    if (!strongPassword.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password mein chahiye: 8+ chars, 1 uppercase, 1 number, 1 special char",
      });
    }

    // ── Step 1: Bank account exist karta hai? ──────────
    const userResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1",
      [account_number]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Ye account number bank mein registered nahi hai.",
      });
    }

    // ── Step 2: Bank PIN verify karo ───────────────────
    const isPinValid = await bcrypt.compare(bank_pin, user.pin);

    if (!isPinValid) {
      return res.status(401).json({
        success: false,
        message: "Bank PIN galat hai.",
      });
    }

    // ── Step 3: UPI account pehle se hai? ─────────────
    const existingUpi = await pool.query(
      "SELECT upi_id FROM upi_accounts WHERE account_number = $1",
      [account_number]
    );

    if (existingUpi.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Is account ka UPI account pehle se registered hai.",
      });
    }

    // ── Step 4: UPI account create karo ───────────────
    // UPI address: phone_number@bankupi
    const upiAddress = `${user.phone_number}@bankupi`;

    // Password hash karo
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insert karo — upi_pin_hash abhi null rahega (set-pin se baad mein set hoga)
    await pool.query(
      `INSERT INTO upi_accounts 
        (account_number, user_id, password_hash, upi_pin_hash, upi_address, created_at, is_active)
       VALUES ($1, $2, $3, null, $4, NOW(), true)`,
      [account_number, user.user_id, hashedPassword, upiAddress]
    );

    return res.status(201).json({
      success: true,
      message: "UPI account create ho gaya! Ab transaction PIN set karo.",
      data: {
        upi_address: upiAddress,
        account_number: account_number,
        full_name: user.full_name,
      },
      next_step: "POST /upi/set-pin",
    });

  } catch (err) {
    console.error("UPI Register error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔐 POST /upi/set-pin
// Registration ke baad transaction PIN set karo
// Body: { account_number, upi_pin, confirm_upi_pin }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/set-pin", async (req, res) => {
  try {
    const { account_number, upi_pin, confirm_upi_pin } = req.body;

    if (!account_number || !upi_pin || !confirm_upi_pin) {
      return res.status(400).json({
        success: false,
        message: "account_number, upi_pin, confirm_upi_pin zaroori hain.",
      });
    }

    // PIN 4-6 digit hona chahiye
    const pinRegex = /^[0-9]{4,6}$/;
    if (!pinRegex.test(upi_pin)) {
      return res.status(400).json({
        success: false,
        message: "UPI PIN 4 se 6 digits ka hona chahiye.",
      });
    }

    if (upi_pin !== confirm_upi_pin) {
      return res.status(400).json({
        success: false,
        message: "PIN aur confirm PIN match nahi kar rahe.",
      });
    }

    // UPI account exist karta hai?
    const upiResult = await pool.query(
      "SELECT * FROM upi_accounts WHERE account_number = $1",
      [account_number]
    );

    if (upiResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "UPI account nahi mila. Pehle register karo.",
      });
    }

    // PIN hash karo aur update karo
    const hashedPin = await bcrypt.hash(upi_pin, 12);

    await pool.query(
      "UPDATE upi_accounts SET upi_pin_hash = $1 WHERE account_number = $2",
      [hashedPin, account_number]
    );

    return res.status(200).json({
      success: true,
      message: "UPI PIN successfully set ho gaya! Ab login karo.",
      next_step: "POST /upi/login",
    });

  } catch (err) {
    console.error("Set PIN error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔑 POST /upi/login
// Body: { account_number, password }
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/login", async (req, res) => {
  try {
    const { account_number, password } = req.body;

    if (!account_number || !password) {
      return res.status(400).json({
        success: false,
        message: "account_number aur password chahiye.",
      });
    }

    // UPI account fetch karo with user info
    const result = await pool.query(
      `SELECT ua.*, u.full_name, u.phone_number, u.email
       FROM upi_accounts ua
       JOIN users u ON ua.account_number = u.account_number
       WHERE ua.account_number = $1`,
      [account_number]
    );

    const upiAccount = result.rows[0];

    if (!upiAccount) {
      return res.status(404).json({
        success: false,
        message: "UPI account nahi mila.",
      });
    }

    if (!upiAccount.is_active) {
      return res.status(403).json({
        success: false,
        message: "Account inactive hai.",
      });
    }

    // PIN set hua hai?
    if (!upiAccount.upi_pin_hash) {
      return res.status(403).json({
        success: false,
        message: "Pehle UPI PIN set karo.",
        next_step: "POST /upi/set-pin",
      });
    }

    // Password verify karo
    const isMatch = await bcrypt.compare(password, upiAccount.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Galat password.",
      });
    }

    // JWT token banao
    const token = jwt.sign(
      {
        upi_id: upiAccount.upi_id,
        account_number: upiAccount.account_number,
        user_id: upiAccount.user_id,
        upi_address: upiAccount.upi_address,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Session DB mein store karo
    const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000);
    const tokenHash = await bcrypt.hash(token, 10);

    await pool.query(
      `INSERT INTO upi_sessions 
        (upi_account_no, jwt_token_hash, created_at, expires_at, is_valid)
       VALUES ($1, $2, NOW(), $3, true)`,
      [account_number, tokenHash, expiresAt]
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      data: {
        full_name: upiAccount.full_name,
        upi_address: upiAccount.upi_address,
        account_number: upiAccount.account_number,
      },
    });

  } catch (err) {
    console.error("UPI Login error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;