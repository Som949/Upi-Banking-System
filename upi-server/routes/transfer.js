const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../middleware/authMiddleware");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔄 POST /upi/transfer/by-account
// Transfer by Account Number
// Body: { sender_account_number, receiver_account_number, amount, upi_pin }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/by-account", verifyToken, async (req, res) => {
  try {
    const { sender_account_number, receiver_account_number, amount, upi_pin } = req.body;

    // ── Validations ──────────────────────────────────
    if (!sender_account_number || !receiver_account_number || !amount || !upi_pin) {
      return res.status(400).json({
        success: false,
        message: "Sab fields zaroori hain.",
      });
    }

    if (sender_account_number === receiver_account_number) {
      return res.status(400).json({
        success: false,
        message: "Sender aur receiver same nahi ho sakta.",
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount valid aur 0 se zyada hona chahiye.",
      });
    }

    // ── UPI PIN Verify ────────────────────────────────
    const upiResult = await pool.query(
      "SELECT * FROM upi_accounts WHERE account_number = $1 AND is_active = true",
      [sender_account_number]
    );

    const upiAccount = upiResult.rows[0];

    if (!upiAccount) {
      return res.status(404).json({
        success: false,
        message: "Sender ka UPI account nahi mila.",
      });
    }

    const isPinValid = await bcrypt.compare(upi_pin, upiAccount.upi_pin_hash);
    if (!isPinValid) {
      return res.status(401).json({
        success: false,
        message: "Galat UPI PIN.",
      });
    }

    // ── Sender fetch ──────────────────────────────────
    const senderResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1 AND is_active = true",
      [sender_account_number]
    );
    const sender = senderResult.rows[0];

    if (!sender) {
      return res.status(404).json({
        success: false,
        message: "Sender account nahi mila.",
      });
    }

    // ── Receiver fetch ────────────────────────────────
    const receiverResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1 AND is_active = true",
      [receiver_account_number]
    );
    const receiver = receiverResult.rows[0];

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "Receiver account nahi mila.",
      });
    }

    // ── Balance Check ─────────────────────────────────
    if (Number(sender.balance) < Number(amount)) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Current balance: ₹${sender.balance}`,
      });
    }

    // ── Daily Limit Check ─────────────────────────────
    const today = new Date().toISOString().split("T")[0];

    const limitResult = await pool.query(
      `SELECT total_transferred FROM daily_transfer_limits
       WHERE account_no = $1 AND transfer_date = $2`,
      [sender_account_number, today]
    );

    const alreadyTransferred = limitResult.rows[0]
      ? Number(limitResult.rows[0].total_transferred)
      : 0;

    const DAILY_LIMIT = Number(process.env.DAILY_TRANSFER_LIMIT) || 50000;

    if (alreadyTransferred + Number(amount) > DAILY_LIMIT) {
      return res.status(400).json({
        success: false,
        message: `Daily limit ₹${DAILY_LIMIT} exceed ho jaayegi. Aaj already ₹${alreadyTransferred} transfer ho chuka hai.`,
      });
    }

    // ── Balance Update ────────────────────────────────
    const senderNewBalance   = Number(sender.balance)   - Number(amount);
    const receiverNewBalance = Number(receiver.balance) + Number(amount);

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [senderNewBalance, sender_account_number]
    );

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [receiverNewBalance, receiver_account_number]
    );

    // ── Transaction Record ────────────────────────────
    await pool.query(
      `INSERT INTO transactions
        (sender_account_no, receiver_account_no, amount, txn_type, txn_source, status, txn_timestamp)
       VALUES ($1, $2, $3, 'upi_transfer', 'upi', 'success', NOW())`,
      [sender_account_number, receiver_account_number, amount]
    );

    // ── Daily Limit Update ────────────────────────────
    if (limitResult.rows.length > 0) {
      await pool.query(
        `UPDATE daily_transfer_limits 
         SET total_transferred = total_transferred + $1
         WHERE account_no = $2 AND transfer_date = $3`,
        [amount, sender_account_number, today]
      );
    } else {
      await pool.query(
        `INSERT INTO daily_transfer_limits (account_no, transfer_date, total_transferred)
         VALUES ($1, $2, $3)`,
        [sender_account_number, today, amount]
      );
    }

    return res.status(200).json({
      success: true,
      message: `₹${amount} successfully transfer ho gaya!`,
      data: {
        sender: {
          account_number: sender_account_number,
          full_name:      sender.full_name,
          new_balance:    senderNewBalance,
        },
        receiver: {
          account_number: receiver_account_number,
          full_name:      receiver.full_name,
        },
        amount: Number(amount),
      },
    });

  } catch (err) {
    console.error("UPI Transfer by account error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔄 POST /upi/transfer/by-upi
// Transfer by UPI Address
// Body: { sender_account_number, receiver_upi_address, amount, upi_pin }
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.post("/by-upi", verifyToken, async (req, res) => {
  try {
    const { sender_account_number, receiver_upi_address, amount, upi_pin } = req.body;

    // ── Validations ──────────────────────────────────
    if (!sender_account_number || !receiver_upi_address || !amount || !upi_pin) {
      return res.status(400).json({
        success: false,
        message: "Sab fields zaroori hain.",
      });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount valid aur 0 se zyada hona chahiye.",
      });
    }

    // ── Sender UPI PIN Verify ─────────────────────────
    const senderUpiResult = await pool.query(
      "SELECT * FROM upi_accounts WHERE account_number = $1 AND is_active = true",
      [sender_account_number]
    );

    const senderUpi = senderUpiResult.rows[0];

    if (!senderUpi) {
      return res.status(404).json({
        success: false,
        message: "Sender ka UPI account nahi mila.",
      });
    }

    const isPinValid = await bcrypt.compare(upi_pin, senderUpi.upi_pin_hash);
    if (!isPinValid) {
      return res.status(401).json({
        success: false,
        message: "Galat UPI PIN.",
      });
    }

    // ── Receiver UPI address se account dhundo ────────
    const receiverUpiResult = await pool.query(
      "SELECT * FROM upi_accounts WHERE upi_address = $1 AND is_active = true",
      [receiver_upi_address]
    );

    const receiverUpi = receiverUpiResult.rows[0];

    if (!receiverUpi) {
      return res.status(404).json({
        success: false,
        message: "Receiver ka UPI address nahi mila.",
      });
    }

    // Same account check
    if (sender_account_number === receiverUpi.account_number) {
      return res.status(400).json({
        success: false,
        message: "Apne aap ko transfer nahi kar sakte.",
      });
    }

    // ── Sender aur Receiver users fetch ──────────────
    const senderResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1 AND is_active = true",
      [sender_account_number]
    );
    const sender = senderResult.rows[0];

    const receiverResult = await pool.query(
      "SELECT * FROM users WHERE account_number = $1 AND is_active = true",
      [receiverUpi.account_number]
    );
    const receiver = receiverResult.rows[0];

    if (!sender || !receiver) {
      return res.status(404).json({
        success: false,
        message: "Sender ya receiver account nahi mila.",
      });
    }

    // ── Balance Check ─────────────────────────────────
    if (Number(sender.balance) < Number(amount)) {
      return res.status(400).json({
        success: false,
        message: `Insufficient balance. Current balance: ₹${sender.balance}`,
      });
    }

    // ── Daily Limit Check ─────────────────────────────
    const today = new Date().toISOString().split("T")[0];

    const limitResult = await pool.query(
      `SELECT total_transferred FROM daily_transfer_limits
       WHERE account_no = $1 AND transfer_date = $2`,
      [sender_account_number, today]
    );

    const alreadyTransferred = limitResult.rows[0]
      ? Number(limitResult.rows[0].total_transferred)
      : 0;

    const DAILY_LIMIT = Number(process.env.DAILY_TRANSFER_LIMIT) || 50000;

    if (alreadyTransferred + Number(amount) > DAILY_LIMIT) {
      return res.status(400).json({
        success: false,
        message: `Daily limit ₹${DAILY_LIMIT} exceed ho jaayegi. Aaj already ₹${alreadyTransferred} transfer ho chuka hai.`,
      });
    }

    // ── Balance Update ────────────────────────────────
    const senderNewBalance   = Number(sender.balance)   - Number(amount);
    const receiverNewBalance = Number(receiver.balance) + Number(amount);

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [senderNewBalance, sender_account_number]
    );

    await pool.query(
      "UPDATE users SET balance = $1 WHERE account_number = $2",
      [receiverNewBalance, receiverUpi.account_number]
    );

    // ── Transaction Record ────────────────────────────
    await pool.query(
      `INSERT INTO transactions
        (sender_account_no, receiver_account_no, amount, txn_type, txn_source, status, txn_timestamp)
       VALUES ($1, $2, $3, 'upi_transfer', 'upi', 'success', NOW())`,
      [sender_account_number, receiverUpi.account_number, amount]
    );

    // ── Daily Limit Update ────────────────────────────
    if (limitResult.rows.length > 0) {
      await pool.query(
        `UPDATE daily_transfer_limits
         SET total_transferred = total_transferred + $1
         WHERE account_no = $2 AND transfer_date = $3`,
        [amount, sender_account_number, today]
      );
    } else {
      await pool.query(
        `INSERT INTO daily_transfer_limits (account_no, transfer_date, total_transferred)
         VALUES ($1, $2, $3)`,
        [sender_account_number, today, amount]
      );
    }

    return res.status(200).json({
      success: true,
      message: `₹${amount} successfully transfer ho gaya!`,
      data: {
        sender: {
          account_number: sender_account_number,
          full_name:      sender.full_name,
          new_balance:    senderNewBalance,
        },
        receiver: {
          upi_address: receiver_upi_address,
          full_name:   receiver.full_name,
        },
        amount: Number(amount),
      },
    });

  } catch (err) {
    console.error("UPI Transfer by UPI error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;

