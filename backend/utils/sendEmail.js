// utils/sendEmail.js
import { Resend } from "resend";

export const sendEmail = async ({ to, subject, text, html }) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set in environment variables");
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  console.log("✅ Email sent:", data.id);
};
