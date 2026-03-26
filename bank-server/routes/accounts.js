const express = require("express");
const router = express.Router();
const pool = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs"); 
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

    // PIN hash karo pehle — plain text DB mein nahi jayega
    const hashedPin = await bcrypt.hash(pin, 12);

    // Naya OTP DB mein store karo with all form data
    await pool.query(
      `INSERT INTO otp_verifications 
        (email, otp, expires_at, is_used, full_name, dob, phone_number, pin) 
       VALUES ($1, $2, $3, false, $4, $5, $6, $7)`,
      [email, otp, expiresAt, full_name, dob, phone_number, hashedPin]
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


//.............................................................................................................................

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💰 POST /account/deposit
// Body: { account_number, amount }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/deposit", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { account_number, amount } = req.body;

    // ── Validations ──────────────────────────────────
    if (!account_number || !amount) {
      return res.status(400).json({
        success: false,
        message: "account_number aur amount dono chahiye.",
      });
    }

   if (isNaN(amount) || Number(amount) <= 0) {
  return res.status(400).json({
    success: false,
    message: "Amount valid aur 0 se zyada hona chahiye.",
  });
}

// ── Daily Deposit Limit Check ─────────────────────
const today = new Date().toISOString().split("T")[0];

const depositTodayResult = await pool.query(
  `SELECT COALESCE(SUM(amount), 0) as total
   FROM transactions
   WHERE receiver_account_no = $1
   AND txn_type = 'deposit'
   AND DATE(txn_timestamp) = $2
   AND status = 'success'`,
  [account_number, today]
);

const depositedToday = Number(depositTodayResult.rows[0].total);
const DAILY_DEPOSIT_LIMIT = Number(process.env.DAILY_DEPOSIT_LIMIT) || 100000;

if (depositedToday + Number(amount) > DAILY_DEPOSIT_LIMIT) {
  return res.status(400).json({
    success: false,
    message: `Daily deposit limit ₹${DAILY_DEPOSIT_LIMIT} exceed ho jaayegi. Aaj already ₹${depositedToday} deposit ho chuka hai. Aur sirf ₹${DAILY_DEPOSIT_LIMIT - depositedToday} deposit kar sakte ho.`,
  });
}

    // ── Account exist karta hai? ──────────────────────
    const userResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1",
      [account_number]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account number nahi mila.",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Account inactive hai.",
      });
    }

    // ── Balance Update ────────────────────────────────
    const newBalance = Number(user.balance) + Number(amount);

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [newBalance, account_number]
    );

    // ── Transaction Record ────────────────────────────
    await pool.query(
      `INSERT INTO transactions
        (receiver_account_no, sender_account_no, amount, txn_type, txn_source, status, txn_timestamp)
       VALUES ($1, null, $2, 'deposit', 'bank', 'success', NOW())`,
      [account_number, amount]
    );

    return res.status(200).json({
      success: true,
      message: `₹${amount} successfully deposit ho gaya!`,
      data: {
        account_number,
        full_name: user.full_name,
        deposited_amount: Number(amount),
        new_balance: newBalance,
      },
    });

  } catch (err) {
    console.error("Deposit error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💸 POST /account/withdraw
// Body: { account_number, amount }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/withdraw", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { account_number, amount } = req.body;

    // ── Validations ──────────────────────────────────
    if (!account_number || !amount) {
      return res.status(400).json({
        success: false,
        message: "account_number aur amount dono chahiye.",
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount valid aur 0 se zyada hona chahiye.",
      });
    }

    // ── Account fetch ─────────────────────────────────
    const userResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1",
      [account_number]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account number nahi mila.",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Account inactive hai.",
      });
    }

    // ── Sufficient Balance Check ──────────────────────
    if (Number(user.balance) < Number(amount)) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Current balance: ₹${user.balance}`,
      });
    }

// ── Daily Withdraw Limit Check ────────────────────
const today = new Date().toISOString().split("T")[0];

const withdrawTodayResult = await pool.query(
  `SELECT COALESCE(SUM(amount), 0) as total
   FROM transactions
   WHERE sender_account_no = $1
   AND txn_type = 'withdrawal'
   AND DATE(txn_timestamp) = $2
   AND status = 'success'`,
  [account_number, today]
);

const withdrawnToday = Number(withdrawTodayResult.rows[0].total);
const DAILY_WITHDRAW_LIMIT = Number(process.env.DAILY_WITHDRAW_LIMIT) || 100000;

if (withdrawnToday + Number(amount) > DAILY_WITHDRAW_LIMIT) {
  return res.status(400).json({
    success: false,
    message: `Daily withdrawal limit ₹${DAILY_WITHDRAW_LIMIT} exceed ho jaayegi. Aaj already ₹${withdrawnToday} withdraw ho chuka hai. Aur sirf ₹${DAILY_WITHDRAW_LIMIT - withdrawnToday} withdraw kar sakte ho.`,
  });
}

// ── Balance Update ────────────────────────────────
const newBalance = Number(user.balance) - Number(amount);

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [newBalance, account_number]
    );

    // ── Transaction Record ────────────────────────────
    await pool.query(
      `INSERT INTO transactions
        (sender_account_no, receiver_account_no, amount, txn_type, txn_source, status, txn_timestamp)
       VALUES ($1, null, $2, 'withdrawal', 'bank', 'success', NOW())`,
      [account_number, amount]
    );

    return res.status(200).json({
      success: true,
      message: `₹${amount} successfully withdraw ho gaya!`,
      data: {
        account_number,
        full_name: user.full_name,
        withdrawn_amount: Number(amount),
        new_balance: newBalance,
      },
    });

  } catch (err) {
    console.error("Withdraw error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔄 POST /account/transfer
// Body: { sender_account_no, receiver_account_no, amount }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/transfer", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { sender_account_no, receiver_account_no, amount } = req.body;

    // ── Validations ──────────────────────────────────
    if (!sender_account_no || !receiver_account_no || !amount) {
      return res.status(400).json({
        success: false,
        message: "sender_account_no, receiver_account_no aur amount chahiye.",
      });
    }

    if (sender_account_no === receiver_account_no) {
      return res.status(400).json({
        success: false,
        message: "Sender aur receiver account same nahi ho sakta.",
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount valid aur 0 se zyada hona chahiye.",
      });
    }

    // ── Sender fetch ──────────────────────────────────
    const senderResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1",
      [sender_account_no]
    );
    const sender = senderResult.rows[0];

    if (!sender) {
      return res.status(404).json({
        success: false,
        message: "Sender account nahi mila.",
      });
    }

    if (!sender.is_active) {
      return res.status(403).json({
        success: false,
        message: "Sender account inactive hai.",
      });
    }

    // ── Receiver fetch ────────────────────────────────
    const receiverResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1",
      [receiver_account_no]
    );
    const receiver = receiverResult.rows[0];

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver account nahi mila.",
      });
    }

    if (!receiver.is_active) {
      return res.status(403).json({
        success: false,
        message: "Receiver account inactive hai.",
      });
    }

    // ── Sufficient Balance Check ──────────────────────
    if (Number(sender.balance) < Number(amount)) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Current balance: ₹${sender.balance}`,
      });
    }

    // ── Daily Transfer Limit Check ────────────────────
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const limitResult = await pool.query(
      `SELECT total_transferred FROM daily_transfer_limits
       WHERE account_no = $1 AND transfer_date = $2`,
      [sender_account_no, today]
    );

    const alreadyTransferred = limitResult.rows[0]
      ? Number(limitResult.rows[0].total_transferred)
      : 0;

    const DAILY_LIMIT = Number(process.env.DAILY_TRANSFER_LIMIT) || 50000;

    if (alreadyTransferred + Number(amount) > DAILY_LIMIT) {
      return res.status(400).json({
        success: false,
        message: `Daily transfer limit ₹${DAILY_LIMIT} exceed ho jaayegi. Aaj already ₹${alreadyTransferred} transfer ho chuka hai.`,
      });
    }

    // ── Balance Update — Dono Accounts ───────────────
    const senderNewBalance   = Number(sender.balance)   - Number(amount);
    const receiverNewBalance = Number(receiver.balance) + Number(amount);

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [senderNewBalance, sender_account_no]
    );

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [receiverNewBalance, receiver_account_no]
    );

    // ── Transaction Record ────────────────────────────
    await pool.query(
      `INSERT INTO transactions
        (sender_account_no, receiver_account_no, amount, txn_type, txn_source, status, txn_timestamp)
       VALUES ($1, $2, $3, 'bank_transfer', 'bank', 'success', NOW())`,
      [sender_account_no, receiver_account_no, amount]
    );

    // ── Daily Limit Update ────────────────────────────
    if (limitResult.rows.length > 0) {
      // Row exist karti hai — update karo
      await pool.query(
        `UPDATE daily_transfer_limits 
         SET total_transferred = total_transferred + $1
         WHERE account_no = $2 AND transfer_date = $3`,
        [amount, sender_account_no, today]
      );
    } else {
      // Nahi hai — insert karo
      await pool.query(
        `INSERT INTO daily_transfer_limits (account_no, transfer_date, total_transferred)
         VALUES ($1, $2, $3)`,
        [sender_account_no, today, amount]
      );
    }

    return res.status(200).json({
      success: true,
      message: `₹${amount} successfully transfer ho gaya!`,
      data: {
        sender: {
          account_number: sender_account_no,
          full_name: sender.full_name,
          new_balance: senderNewBalance,
        },
        receiver: {
          account_number: receiver_account_no,
          full_name: receiver.full_name,
          new_balance: receiverNewBalance,
        },
        transferred_amount: Number(amount),
      },
    });

  } catch (err) {
    console.error("Transfer error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

