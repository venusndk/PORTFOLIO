// utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log(`📧 Attempting email | user=${user ?? "MISSING"} | to=${to}`);

  if (!user || !pass) {
    throw new Error(
      `SMTP credentials missing — SMTP_USER=${user ? "set" : "MISSING"}, SMTP_PASS=${pass ? "set" : "MISSING"}`
    );
  }

  // Use Gmail service shorthand — handles host/port/SSL automatically
  // Works reliably with nodemailer v7 and avoids port-blocking issues on cloud hosts
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
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
