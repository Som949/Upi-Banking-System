const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken } = require("../middleware/authMiddleware");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎁 GET /upi/rewards/:account_number
// Total rewards + reward history
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get("/:account_number", verifyToken, async (req, res) => {
  try {
    const { account_number } = req.params;

    // User ka user_id lo
    const userResult = await pool.query(
      "SELECT user_id, full_name FROM users WHERE account_number = $1",
      [account_number]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Account not found.",
      });
    }

    const { user_id, full_name } = userResult.rows[0];

    // Rewards fetch karo
    const rewardsResult = await pool.query(
      `SELECT 
        reward_id,
        reward_amount,
        reason,
        rewarded_at
       FROM rewards
       WHERE user_id = $1
       ORDER BY rewarded_at DESC`,
      [user_id]
    );

    // Total cashback
    const totalResult = await pool.query(
      `SELECT COALESCE(SUM(reward_amount), 0) as total
       FROM rewards WHERE user_id = $1`,
      [user_id]
    );

    const total_cashback = Number(totalResult.rows[0].total);

    return res.status(200).json({
      success: true,
      data: {
        full_name,
        account_number,
        total_cashback,
        total_rewards: rewardsResult.rows.length,
        rewards: rewardsResult.rows,
      },
    });

  } catch (err) {
    console.error("Rewards error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;