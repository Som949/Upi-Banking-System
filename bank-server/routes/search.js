const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken, checkDefaultPassword } = require("../middleware/authMiddleware");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔍 GET /search/profile/:account_number
// Admin account_number se user profile dekhe
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get("/profile/:account_number", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { account_number } = req.params;

    // User fetch karo
    const result = await pool.query(
      `SELECT 
        user_id,
        full_name,
        email,
        phone_number,
        account_number,
        balance,
        is_active,
        created_at,
        dob
       FROM users 
       WHERE account_number = $1`,
      [account_number]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Koi user nahi mila is account number se.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile mila!",
      data: {
        user_id:        user.user_id,
        full_name:      user.full_name,
        email:          user.email,
        phone_number:   user.phone_number,
        account_number: user.account_number,
        balance:        Number(user.balance),
        is_active:      user.is_active,
        member_since:   user.created_at,
        dob:            user.dob,
      },
    });

  } catch (err) {
    console.error("Search profile error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💰 GET /search/balance/:account_number
// Admin directly balance check kare — bina PIN ke
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get("/balance/:account_number", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { account_number } = req.params;

    const result = await pool.query(
      `SELECT full_name, account_number, balance, is_active 
       FROM users 
       WHERE account_number = $1`,
      [account_number]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account number nahi mila.",
      });
    }

    if (!user.is_active) {
      return res.status(403).json({
        success: false,
        message: "Ye account inactive hai.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Balance fetched!",
      data: {
        full_name:      user.full_name,
        account_number: user.account_number,
        balance:        Number(user.balance),
      },
    });

  } catch (err) {
    console.error("Check balance error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📋 GET /search/transactions/:account_number
// Admin us account ki puri transaction history dekhe
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get("/transactions/:account_number", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { account_number } = req.params;

    // Pehle check karo user exist karta hai
    const userCheck = await pool.query(
      "SELECT full_name, account_number FROM users WHERE account_number = $1",
      [account_number]
    );

    if (userCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Account number nahi mila.",
      });
    }

    // Sari transactions fetch karo — sender ya receiver dono cases
    const txnResult = await pool.query(
      `SELECT 
        txn_id,
        sender_account_no,
        receiver_account_no,
        amount,
        txn_type,
        txn_source,
        status,
        txn_timestamp
       FROM transactions
       WHERE sender_account_no = $1 
          OR receiver_account_no = $1
       ORDER BY txn_timestamp DESC`,
      [account_number]
    );

    const transactions = txnResult.rows.map((txn) => {
      let direction = "";

      if (txn.txn_type === "deposit") {
        direction = "credit";
      } else if (txn.txn_type === "withdrawal") {
        direction = "debit";
      } else if (txn.txn_type === "bank_transfer" || txn.txn_type === "upi_transfer") {
        direction = txn.sender_account_no === account_number ? "debit" : "credit";
      }

      return {
        txn_id:              txn.txn_id,
        txn_type:            txn.txn_type,
        txn_source:          txn.txn_source,
        direction:           direction,       // credit ya debit
        amount:              Number(txn.amount),
        sender_account_no:   txn.sender_account_no,
        receiver_account_no: txn.receiver_account_no,
        status:              txn.status,
        date:                txn.txn_timestamp,
      };
    });

    return res.status(200).json({
      success: true,
      message: `${transactions.length} transactions mile.`,
      data: {
        account_number,
        full_name:    userCheck.rows[0].full_name,
        transactions,
      },
    });

  } catch (err) {
    console.error("Transaction history error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🗑️ DELETE /search/delete/:account_number
// Admin account delete kare
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.delete("/delete/:account_number", verifyToken, checkDefaultPassword, async (req, res) => {
  try {
    const { account_number } = req.params;

    // User exist karta hai?
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE account_number = $1",
      [account_number]
    );

    const user = userCheck.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Account number nahi mila.",
      });
    }

    // Balance check — agar balance hai toh delete mat karo
    if (Number(user.balance) > 0) {
      return res.status(400).json({
        success: false,
        message: `Account mein ₹${user.balance} balance hai. Pehle withdraw karo phir delete karo.`,
      });
    }

    // UPI account bhi delete karo agar linked hai
    await pool.query(
      "DELETE FROM upi_accounts WHERE account_number = $1",
      [account_number]
    );

    // UPI sessions delete karo
    await pool.query(
      "DELETE FROM upi_sessions WHERE upi_account_no = $1",
      [account_number]
    );

    // Daily transfer limits delete karo
    await pool.query(
      "DELETE FROM daily_transfer_limits WHERE account_no = $1",
      [account_number]
    );

    // OTP verifications delete karo
    await pool.query(
      "DELETE FROM otp_verifications WHERE email = $1",
      [user.email]
    );

    // Rewards delete karo
    await pool.query(
      "DELETE FROM rewards WHERE user_id = $1",
      [user.user_id]
    );

    // Transactions delete karo
    await pool.query(
      `DELETE FROM transactions 
       WHERE sender_account_no = $1 
          OR receiver_account_no = $1`,
      [account_number]
    );

    // Finally — user delete karo
    await pool.query(
      "DELETE FROM users WHERE account_number = $1",
      [account_number]
    );

    return res.status(200).json({
      success: true,
      message: `Account ${account_number} (${user.full_name}) successfully delete ho gaya!`,
    });

  } catch (err) {
    console.error("Delete account error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
