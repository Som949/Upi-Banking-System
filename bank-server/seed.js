// node seed.js — sirf ek baar chalao
const bcrypt = require("bcryptjs");
const pool = require("./db");

const seedAdmin = async () => {
  const DEFAULT_PASSWORD = "BANK@1234";

  // Pehle check karo
  const existing = await pool.query("SELECT * FROM admin LIMIT 1");

  if (existing.rows.length > 0) {
    console.log("⚠️  Admin pehle se exist karta hai. Seed skip.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  await pool.query(
    `INSERT INTO admin (password_hash, is_default_password, timestamp)
     VALUES ($1, $2, NOW())`,
    [hashedPassword, true]
  );

  console.log("✅ Admin seeded! Default password: BANK@1234");
  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});