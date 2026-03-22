const express = require("express");
const router = express.Router();
const pool = require("../db");
const nodemailer = require("nodemailer");
const { verifyToken, checkDefaultPassword } = require("../middleware/authMiddleware");
require("dotenv").config();

// ── Email Transporter Setup ───────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Helper Functions ──────────────────────────────────────

// 6 digit OTP generate
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Unique user_id generate: USR + 6 digits
const generateUserId = async () => {
  while (true) {
    const userId = "USR" + Math.floor(100000 + Math.random() * 900000);
    const result = await pool.query(
      "SELECT user_id FROM users WHERE user_id = $1",
      [userId]
    );
    if (result.rows.length === 0) return userId; // unique mila
  }
};

// Unique 10 digit account number generate
const generateAccountNo = async () => {
  while (true) {
    const accNo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const result = await pool.query(
      "SELECT account_number FROM users WHERE account_number = $1",
      [accNo]
    );
    if (result.rows.length === 0) return accNo; // unique mila
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📧 STEP 1 — POST /account/send-otp
// Admin form fill kare, OTP email pe jayega
// Body: { full_name, dob, phone_number, email, pin }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/send-otp", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { full_name, dob, phone_number, email, pin } = req.body;

    // ── Validations ──────────────────────────────────
    if (!full_name || !dob || !phone_number || !email || !pin) {
      return res.status(400).json({
        success: false,
        message: "Sabhi fields bharne zaroori hain: full_name, dob, phone_number, email, pin",
      });
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Valid email daalo.",
      });
    }

    // Phone 10 digit check
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone_number)) {
      return res.status(400).json({
        success: false,
        message: "Phone number 10 digit ka hona chahiye.",
      });
    }

    // PIN 4-6 digit check
    const pinRegex = /^[0-9]{4,6}$/;
    if (!pinRegex.test(pin)) {
      return res.status(400).json({
        success: false,
        message: "PIN 4 se 6 digits ka hona chahiye.",
      });
    }

    // Email already exist check
    const emailCheck = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ye email pehle se registered hai.",
      });
    }

    // Phone already exist check
    const phoneCheck = await pool.query(
      "SELECT phone_number FROM users WHERE phone_number = $1",
      [phone_number]
    );
    if (phoneCheck.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Ye phone number pehle se registered hai.",
      });
    }

    // ── OTP Generate ─────────────────────────────────
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minute expiry

    // Pehle se koi pending OTP hai toh delete karo
    await pool.query(
      "DELETE FROM otp_verifications WHERE email = $1",
      [email]
    );

    // Naya OTP DB mein store karo with all form data
    await pool.query(
      `INSERT INTO otp_verifications 
        (email, otp, expires_at, is_used, full_name, dob, phone_number, pin) 
       VALUES ($1, $2, $3, false, $4, $5, $6, $7)`,
      [email, otp, expiresAt, full_name, dob, phone_number, pin]
    );

    // ── OTP Email Bhejo ───────────────────────────────
    await transporter.sendMail({
      from: `"Bank System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Account Verification OTP",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto;">
          <h2 style="color: #2c3e50;">🏦 Bank Account Verification</h2>
          <p>Hello <strong>${full_name}</strong>,</p>
          <p>Your OTP for account verification is:</p>
          <h1 style="background: #f4f4f4; padding: 15px; text-align: center; 
                     letter-spacing: 10px; color: #e74c3c;">
            ${otp}
          </h1>
          <p>⏳ Ye OTP <strong>5 minutes</strong> mein expire ho jaayega.</p>
          <p style="color: #888; font-size: 12px;">
            Agar aapne ye request nahi ki toh ignore karein.
          </p>
        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: `OTP ${email} pe bhej diya gaya. 5 minutes mein enter karo.`,
      email, // frontend ko email yaad rakhni hai verify ke liye
    });

  } catch (err) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✅ STEP 2 — POST /account/create
// OTP verify karo → account create karo
// Body: { email, otp }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/create", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email aur OTP dono chahiye.",
      });
    }

    // ── OTP Verify ────────────────────────────────────

    // DB se OTP record lo
    const otpResult = await pool.query(
      `SELECT * FROM otp_verifications 
       WHERE email = $1 AND is_used = false 
       ORDER BY created_at DESC LIMIT 1`,
      [email]
    );

    const otpRecord = otpResult.rows[0];

    // OTP exist karta hai?
    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Koi valid OTP nahi mila. Pehle send-otp karo.",
      });
    }

    // OTP expire hua?
    if (new Date() > new Date(otpRecord.expires_at)) {
      return res.status(400).json({
        success: false,
        message: "OTP expire ho gaya. Dobara send-otp karo.",
      });
    }

    // OTP match karta hai?
    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Galat OTP.",
      });
    }

    // ── Account Create ────────────────────────────────

    // Unique IDs generate karo
    const userId    = await generateUserId();
    const accountNo = await generateAccountNo();

    // Users table mein insert karo
    await pool.query(
      `INSERT INTO users 
        (user_id, full_name, dob, phone_number, email, pin, account_number, balance, is_active, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 0, true, NOW())`,
      [
        userId,
        otpRecord.full_name,
        otpRecord.dob,
        otpRecord.phone_number,
        email,
        otpRecord.pin,
        accountNo,
      ]
    );

    // OTP ko used mark karo
    await pool.query(
      "UPDATE otp_verifications SET is_used = true WHERE email = $1",
      [email]
    );

    return res.status(201).json({
      success: true,
      message: "Account successfully create ho gaya!",
      data: {
        user_id: userId,
        account_number: accountNo,
        full_name: otpRecord.full_name,
        email: email,
        phone_number: otpRecord.phone_number,
      },
    });

  } catch (err) {
    console.error("Create account error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;