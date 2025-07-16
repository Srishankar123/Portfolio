// 📦 Dependencies
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 📍 In-memory OTP store (use Redis/db in production)
const otpStore = {};

// 🔒 Track abuse attempts for protected emails
const abuseTracker = {};

// 🔒 Blocklist of protected emails
const protectedEmails = [
  process.env.EMAIL_FROM.toLowerCase(),
  "srishankarloknath@gmail.com",
  "srishankar.12a@gmail.com",
];

// 🛡️ Contact form limiter — max 3 messages per day per IP
const contactLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: "Too many contact requests. Please try again tomorrow.",
});
app.use("/api/contact", contactLimiter);

// 🛡️ OTP limiter — max 3 OTPs per IP per day
const otpDailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: "Too many OTP requests from this IP. Try again after 24 hours.",
});
app.use("/api/send-otp", otpDailyLimiter);

// 📧 Nodemailer config
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 📤 Send OTP (with IP & email protection)
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required." });

  const lowerEmail = email.toLowerCase();

  // 🚫 Block protected emails and Rickroll on second attempt
  if (protectedEmails.includes(lowerEmail)) {
    const count = abuseTracker[lowerEmail] || 0;
    abuseTracker[lowerEmail] = count + 1;

    if (abuseTracker[lowerEmail] >= 2) {
      return res.status(403).json({
        message: "Redirecting...",
        redirect: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // 😂 Rickroll
      });
    }

    return res.status(403).json({ message: "Nice try, Diddy! 😎" });
  }

  const existing = otpStore[email];
  if (existing && Date.now() < existing.lastSent + 60 * 1000) {
    return res.status(429).json({ message: "OTP recently sent. Wait 1 minute before resending." });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { otp, expiresAt, lastSent: Date.now() };

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    });
    res.status(200).json({ message: "OTP sent successfully." });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ✅ Verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "No OTP found." });
  if (Date.now() > record.expiresAt) return res.status(400).json({ message: "OTP expired." });

  if (parseInt(otp) === record.otp) {
    delete otpStore[email]; // Clean up after success
    return res.status(200).json({ message: "OTP verified" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
});

// ✉️ Contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message, website } = req.body;

  if (website && website.trim() !== "") return res.status(400).json({ message: "Spam detected." });
  if (!name || !email || !subject || !message) return res.status(400).json({ message: "Missing required fields." });
  if (name.length > 100 || message.length > 1000) return res.status(400).json({ message: "Input too long." });

  const toOwner = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `[Portfolio] ${subject}`,
    html: `<h3>New message from ${name}</h3><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><p><strong>Message:</strong><br/>${message}</p><hr/><small>Sent at ${new Date().toLocaleString()}</small>`,
  };

  const toSender = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `Thanks for reaching out, ${name}!`,
    html: `<p>Hi ${name},</p><p>Thank you for contacting Srishankar! I’ve received your message and will reply soon.</p><p>If you don’t see a reply, please check Spam/Promotions.</p><blockquote>${message}</blockquote><p>Regards,<br/>Srishankar Lokanath</p>`,
  };

  try {
    await transporter.sendMail(toOwner);
    await transporter.sendMail(toSender);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ message: "Failed to send emails" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
