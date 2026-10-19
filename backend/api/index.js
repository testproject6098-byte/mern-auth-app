const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Backend API chal raha hai!' });
});

app.use('/api/auth', authRoutes);

module.exports = app;