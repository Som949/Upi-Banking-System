require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// ── Routes ─────────────────────────────────────────
const upiAuthRoutes = require('./routes/upiAuth');
app.use('/upi', upiAuthRoutes);

const transferRoutes = require('./routes/transfer');
app.use('/upi/transfer', transferRoutes);

// balance 
const balanceRoutes = require('./routes/balance');
app.use('/upi/balance', balanceRoutes);

// transaction history
const transactionRoutes = require('./routes/transactions');
app.use('/upi/transactions', transactionRoutes);

// profile
const profileRoutes = require('./routes/profile');
app.use('/upi/profile', profileRoutes);




// Baaki routes baad mein:
// const transferRoutes = require('./routes/transfer');
// app.use('/upi', transferRoutes);

app.get('/', (req, res) => {
  res.json({ message: '✅ UPI Server running!' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route nahi mili." });
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`💳 UPI Server → http://localhost:${PORT}`);
});