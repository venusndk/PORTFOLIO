// utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);

  // Log config (never log the password)
  console.log(`📧 Sending email via ${host}:${port} | user=${user} | to=${to}`);

  if (!user || !pass) {
    throw new Error(`SMTP credentials missing — SMTP_USER=${user ? "set" : "MISSING"}, SMTP_PASS=${pass ? "set" : "MISSING"}`);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: true,
    auth: { user, pass },
  });

  // Verify connection before sending
  await transporter.verify().catch((err) => {
    throw new Error(`SMTP verify failed: ${err.message}`);
  });

  const info = await transporter.sendMail({
    from: `"Portfolio Contact" <${user}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("✅ Email sent:", info.messageId);
};
