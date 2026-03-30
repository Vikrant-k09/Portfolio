const express = require('express');
const nodemailer = require('nodemailer');
const contactRateLimiter = require('../middleware/rateLimiter');

const router = express.Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const replacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return replacements[character];
  });
}

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

async function sendWithResend({ name, email, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;

  if (!apiKey || !from || !to) {
    return null;
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'vikrant-portfolio/1.0'
    },
    body: JSON.stringify({
      from: `"Portfolio Contact" <${from}>`,
      to: [to],
      subject: `Portfolio inquiry from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:DM Sans,Arial,sans-serif;color:#1C2226;line-height:1.6;">
          <h2 style="margin-bottom:16px;">New portfolio message</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin-top:24px;"><strong>Message:</strong></p>
          <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
        </div>
      `
    })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const details =
      payload?.message || payload?.error || payload?.name || `Resend request failed with status ${response.status}`;
    throw new Error(details);
  }

  return payload;
}

router.post('/', contactRateLimiter, async (req, res) => {
  const name = req.body?.name?.trim() || '';
  const email = req.body?.email?.trim() || '';
  const message = req.body?.message?.trim() || '';

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  if (!emailPattern.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  if (message.length > 2000) {
    return res.status(400).json({ success: false, message: 'Message must be 2000 characters or fewer.' });
  }

  const resendConfigured = Boolean(process.env.RESEND_API_KEY || process.env.RESEND_FROM_EMAIL);
  const transporter = createTransporter();

  if (resendConfigured && (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL)) {
    return res.status(500).json({
      success: false,
      message: 'Resend is partially configured. Set both RESEND_API_KEY and RESEND_FROM_EMAIL.'
    });
  }

  if (!resendConfigured && !transporter) {
    return res.status(500).json({
      success: false,
      message:
        'Email service is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL, or set SMTP credentials for local use.'
    });
  }

  try {
    if (resendConfigured) {
      await sendWithResend({ name, email, message });
    } else {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER || process.env.SMTP_USER,
        replyTo: email,
        subject: `Portfolio inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `
          <div style="font-family:DM Sans,Arial,sans-serif;color:#1C2226;line-height:1.6;">
            <h2 style="margin-bottom:16px;">New portfolio message</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p style="margin-top:24px;"><strong>Message:</strong></p>
            <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
          </div>
        `
      });
    }

    return res.json({ success: true, message: 'Message received!' });
  } catch (error) {
    console.error('Failed to send contact email:', error);

    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again in a bit.'
    });
  }
});

module.exports = router;
