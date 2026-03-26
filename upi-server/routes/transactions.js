const express = require("express");
const router = express.Router();
const pool = require("../db");
const { verifyToken } = require("../middleware/authMiddleware");

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📋 GET /upi/transactions/:account_number
// Bank + UPI dono transactions dikhao
// Headers: Authorization: Bearer <token>
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get("/:account_number", verifyToken, async (req, res) => {
  try {
    const { account_number } = req.params;

    // ── User exist karta hai? ─────────────────────────
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

    // ── Saari transactions fetch karo ─────────────────
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

    // ── Har transaction mein direction add karo ───────
    const transactions = txnResult.rows.map((txn) => {
      let direction = "";

      if (txn.txn_type === "deposit") {
        direction = "credit";
      } else if (txn.txn_type === "withdrawal") {
        direction = "debit";
      } else if (
        txn.txn_type === "bank_transfer" ||
        txn.txn_type === "upi_transfer"
      ) {
        direction =
          txn.sender_account_no === account_number ? "debit" : "credit";
      }

      return {
        txn_id:              txn.txn_id,
        txn_type:            txn.txn_type,
        txn_source:          txn.txn_source,   // 'bank' ya 'upi'
        direction:           direction,         // 'credit' ya 'debit'
        amount:              Number(txn.amount),
        sender_account_no:   txn.sender_account_no,
        receiver_account_no: txn.receiver_account_no,
        status:              txn.status,
        date:                txn.txn_timestamp,
      };
    });

    // ── Bank aur UPI alag alag count karo ─────────────
    const bankTxns = transactions.filter((t) => t.txn_source === "bank");
    const upiTxns  = transactions.filter((t) => t.txn_source === "upi");

    return res.status(200).json({
      success: true,
      message: `${transactions.length} transactions mile.`,
      data: {
        account_number,
        full_name:          userCheck.rows[0].full_name,
        total_transactions: transactions.length,
        bank_transactions:  bankTxns.length,
        upi_transactions:   upiTxns.length,
        transactions,
      },
    });

  } catch (err) {
    console.error("UPI Transactions error:", err);
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;

