const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory IP rate limiting store
const otpRateLimitMap = new Map(); // IP -> { count, firstRequestTime }
const MAX_OTP_PER_HOUR = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Rate limiter middleware
function customOtpLimiter(req, res, next) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  const now = Date.now();

  const record = otpRateLimitMap.get(ip);

  if (!record) {
    otpRateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return next();
  }

  const timePassed = now - record.firstRequestTime;

  if (timePassed > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    otpRateLimitMap.set(ip, { count: 1, firstRequestTime: now });
    return next();
  }

  if (record.count >= MAX_OTP_PER_HOUR) {
    return res.status(429).json({
      error: `Too many OTP requests from this IP. Please try again after ${Math.ceil(
        (RATE_LIMIT_WINDOW_MS - timePassed) / 60000
      )} minutes.`,
    });
  }

  record.count++;
  otpRateLimitMap.set(ip, record);
  next();
}

// Generate random 6-digit OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// OTP route
app.post('/api/send-otp', customOtpLimiter, async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required' });

  const otp = generateOtp();

  // You should store OTP in DB/session/cache to verify later

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your email
        pass: process.env.EMAIL_PASS,     // your app password
      },
    });

    await transporter.sendMail({
      from: `"OTP Service" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    return res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('OTP Service is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
