const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken } = require("../middleware/authMiddleware");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 👤 GET /upi/profile/:account_number
// User apni profile dekhe
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get("/:account_number", verifyToken, async (req, res) => {
  try {
    const { account_number } = req.params;

    // ── User details fetch karo ───────────────────────
    const userResult = await pool.query(
      `SELECT 
        u.user_id,
        u.full_name,
        u.email,
        u.phone_number,
        u.account_number,
        u.dob,
        u.is_active,
        u.created_at,
        ua.upi_address,
        ua.created_at as upi_created_at
       FROM users u
       LEFT JOIN upi_accounts ua 
         ON u.account_number = ua.account_number
       WHERE u.account_number = $1`,
      [account_number]
    );

    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User nahi mila.",
      });
    }

    // ── Balance fetch karo ────────────────────────────
    const balanceResult = await pool.query(
      "SELECT balance FROM users WHERE account_number = $1",
      [account_number]
    );

    // ── Total transactions count karo ─────────────────
    const txnCountResult = await pool.query(
      `SELECT COUNT(*) as total
       FROM transactions
       WHERE sender_account_no = $1 
          OR receiver_account_no = $1`,
      [account_number]
    );

    // ── Total rewards fetch karo ──────────────────────
    const rewardsResult = await pool.query(
      `SELECT COALESCE(SUM(reward_amount), 0) as total_rewards
       FROM rewards
       WHERE user_id = $1`,
      [user.user_id]
    );

    return res.status(200).json({
      success: true,
      message: "Profile fetched!",
      data: {
        // Basic Details
        user_id:        user.user_id,
        full_name:      user.full_name,
        email:          user.email,
        phone_number:   user.phone_number,
        account_number: user.account_number,
        dob:            user.dob,
        is_active:      user.is_active,
        member_since:   user.created_at,

        // UPI Details
        upi_address:    user.upi_address || null,
        upi_since:      user.upi_created_at || null,

        // Quick Stats
        balance:            Number(balanceResult.rows[0].balance),
        total_transactions: Number(txnCountResult.rows[0].total),
        total_rewards:      Number(rewardsResult.rows[0].total_rewards),

        // Frontend ke liye links
        links: {
          check_balance:       `POST /upi/balance`,
          transaction_history: `GET /upi/transactions/${account_number}`,
        },
      },
    });

  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;

