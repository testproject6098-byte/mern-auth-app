const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

// ========== OTP بھیجنے کا فنکشن ==========
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email zaroori hai' });
    }

    // 6-digit OTP generate
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5 minute baad expire
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    let user = await User.findOne({ email });

    if (user) {
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
    } else {
      user = await User.create({ email, otp, otpExpiry });
    }

    await sendEmail(email, otp);

    res.status(200).json({
      message: 'OTP bhej diya gaya hai',
      email: email
    });
  } catch (error) {
    console.error('sendOtp error:', error.message);
    res.status(500).json({ message: 'Kuch masla ho gaya' });
  }
};

// ========== OTP verify کرنے کا فنکشن ==========
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email aur OTP dono zaroori hain' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User nahi mila' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Ghalat OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP expire ho gaya' });
    }

    // OTP clear kar do
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // JWT token banao
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful!',
      token: token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('verifyOtp error:', error.message);
    res.status(500).json({ message: 'Kuch masla ho gaya' });
  }
};

module.exports = { sendOtp, verifyOtp };