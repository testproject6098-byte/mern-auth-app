const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const connectDB = require('../config/db');
const authRoutes = require('../routes/authRoutes');

const app = express();

// YAHAN CORS KI SETTING THEEK KI GAYI HAI
app.use(cors({
  origin: [
    "https://mern-auth-frontend-live.vercel.app",
    "https://mern-auth-app-henna.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.json({ message: 'Backend API chal raha hai!' });
});

app.use('/api/auth', authRoutes);

module.exports = app;