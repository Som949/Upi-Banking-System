require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db');

const app = express();
app.use(cors());
app.use(express.json());



// ✅ ROUTES — ye missing tha
const adminAuthRoutes = require('./routes/adminAuth');
app.use('/admin', adminAuthRoutes);

const accountRoutes = require('./routes/accounts');
app.use('/account', accountRoutes);

app.get('/', (req, res) => {
  res.json({ message: '✅ Bank Server running!' });
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Bank server on port ${process.env.PORT || 5000}`);
});