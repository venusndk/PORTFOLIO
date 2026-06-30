// utils/sendEmail.js
//
// Primary:  Resend API (HTTPS — works on any cloud, no SMTP port issues)
// Fallback: Gmail SMTP via nodemailer (for local dev without Resend key)
//
import nodemailer from "nodemailer";
import { Resend } from "resend";

// ─── Resend (primary) ────────────────────────────────────────────────────────

let _resend = null;

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

async function sendViaResend({ to, subject, text, html }) {
  const resend = getResend();
  if (!resend) throw new Error("RESEND_API_KEY not set");

  // Resend requires a verified sender domain.
  // Use the FROM_EMAIL env var (must match a verified domain in your Resend dashboard).
  // During development you can use onboarding@resend.dev to send to your own email only.
  const from = process.env.FROM_EMAIL || "onboarding@resend.dev";

  const { data, error } = await resend.emails.send({ from, to, subject, text, html });

  if (error) throw new Error(`Resend error: ${error.message}`);
  console.log(`✅ Email delivered via Resend to ${to} — id: ${data.id}`);
}

// ─── Nodemailer / Gmail SMTP (fallback) ──────────────────────────────────────

let _smtpTransporter = null;

function getSmtpTransporter() {
  if (_smtpTransporter) return _smtpTransporter;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP credentials missing — set SMTP_USER and SMTP_PASS");
  }

  _smtpTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465", 10),
    secure: true,
    auth: { user, pass },
    connectionTimeout: 10000,
    greetingTimeout:   8000,
    socketTimeout:     15000,
  });

  return _smtpTransporter;
}

async function sendViaSmtp({ to, subject, text, html }) {
  const transporter = getSmtpTransporter();
  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to, subject, text, html,
  });
  console.log(`✅ Email delivered via SMTP to ${to} — messageId: ${info.messageId}`);
}

// ─── Unified send (tries Resend first, then SMTP) ────────────────────────────

export const sendEmail = async ({ to, subject, text, html }) => {
  if (process.env.RESEND_API_KEY) {
    await sendViaResend({ to, subject, text, html });
  } else {
    await sendViaSmtp({ to, subject, text, html });
  }
};

// ─── Startup check — surfaces config problems immediately in logs ─────────────

export async function verifyEmailConfig() {
  if (process.env.RESEND_API_KEY) {
    // Resend doesn't expose a ping endpoint; just confirm the key is present.
    console.log("✅ Email provider: Resend (API key present)");
    return;
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.error(
      "❌ Email not configured — set RESEND_API_KEY (recommended) " +
      "or SMTP_USER + SMTP_PASS in your environment variables"
    );
    return;
  }

  try {
    const t = getSmtpTransporter();
    await t.verify();
    console.log("✅ Email provider: Gmail SMTP — connection verified");
  } catch (err) {
    console.error("❌ Gmail SMTP verification failed:", err.message);
    console.error(
      "   → Your Gmail App Password may be expired. " +
      "Go to myaccount.google.com → Security → App passwords to generate a new one, " +
      "then update SMTP_PASS in your environment."
    );
  }
}
