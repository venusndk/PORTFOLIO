import { saveContact } from "../model/contactModel.js";
import { sendEmail } from "../utils/sendEmail.js";

// ─────────────────────────────────────────────
// Admin notification email template
// ─────────────────────────────────────────────
const adminEmailHtml = ({ name, email, subject, message }) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

  <!-- Preheader (hidden preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f0f4f8;">
    New message from ${name} via your portfolio contact form.
  </div>

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f8;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Email card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 50%,#2563eb 100%);border-radius:12px 12px 0 0;padding:40px 40px 36px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">New Message Received</h1>
                    <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.8);font-weight:400;">Someone reached out via your portfolio</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <!-- Sender details -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8faff;border:1px solid #dbeafe;border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">

                    <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.8px;">Sender Details</p>

                    <!-- Name row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:16px;">
                      <tr>
                        <td valign="top">
                          <p style="margin:0;font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Full Name</p>
                          <p style="margin:2px 0 0;font-size:16px;color:#0f172a;font-weight:700;">${name}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:14px 0;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" /></td></tr></table>

                    <!-- Email row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="top">
                          <p style="margin:0;font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Email Address</p>
                          <p style="margin:2px 0 0;font-size:15px;font-weight:600;">
                            <a href="mailto:${email}" style="color:#1d4ed8;text-decoration:none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                    </table>

                    ${subject ? `
                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:14px 0;"><hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" /></td></tr></table>

                    <!-- Subject row -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="top">
                          <p style="margin:0;font-size:11px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Subject</p>
                          <p style="margin:2px 0 0;font-size:15px;color:#0f172a;font-weight:600;">${subject}</p>
                        </td>
                      </tr>
                    </table>
                    ` : ""}

                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.6px;">Message</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #1d4ed8;border-radius:8px;padding:24px;">
                    <p style="margin:0;font-size:15px;line-height:1.8;color:#334155;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>

              <!-- Reply button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: ${subject || "Your message"}" style="display:inline-block;background:#1d4ed8;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;letter-spacing:0.2px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#64748b;font-weight:500;">Sent from your portfolio contact form</p>
              <p style="margin:6px 0 0;font-size:12px;color:#94a3b8;">${new Date().toLocaleString("en-US", { dateStyle: "full", timeStyle: "short" })}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

// ─────────────────────────────────────────────
// User confirmation email template
// ─────────────────────────────────────────────
const userEmailHtml = ({ name, subject, message }) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Message Received</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;color:#f0f4f8;">
    Hi ${name}, your message has been received. I'll get back to you within 1 hour.
  </div>

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f4f8;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Email card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">

          <!-- ── Header ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#9333ea 100%);border-radius:12px 12px 0 0;padding:40px 40px 36px;text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">Message Received!</h1>
                    <p style="margin:10px 0 0;font-size:14px;color:rgba(255,255,255,0.85);font-weight:400;">Thank you for getting in touch</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <!-- Greeting -->
              <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0f172a;">Hi ${name},</p>
              <p style="margin:0 0 28px;font-size:15px;line-height:1.7;color:#475569;">
                Thank you for reaching out through my portfolio. I have received your message and will review it shortly. You can expect a personal response within <strong style="color:#4f46e5;">1 hour</strong>.
              </p>

              <!-- Message summary -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.8px;">Your Submission</p>

                    ${subject ? `
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="80" valign="top">
                          <p style="margin:0;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">Subject</p>
                        </td>
                        <td valign="top">
                          <p style="margin:0;font-size:14px;color:#0f172a;font-weight:600;">${subject}</p>
                        </td>
                      </tr>
                    </table>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-bottom:14px;"><hr style="border:none;border-top:1px solid #e9d5ff;margin:0;" /></td></tr></table>
                    ` : ""}

                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="80" valign="top">
                          <p style="margin:0;font-size:12px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">Message</p>
                        </td>
                        <td valign="top">
                          <p style="margin:0;font-size:14px;line-height:1.7;color:#334155;white-space:pre-wrap;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- What's next -->
              <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:0.6px;">What Happens Next</p>

              <!-- Step 1 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #4f46e5;border-radius:8px;padding:14px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="middle" style="padding-right:12px;">
                          <div style="width:24px;height:24px;background:#4f46e5;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;">1</div>
                        </td>
                        <td valign="middle">
                          <p style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">Message Review</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#64748b;">I will carefully read through your message</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Step 2 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #7c3aed;border-radius:8px;padding:14px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="middle" style="padding-right:12px;">
                          <div style="width:24px;height:24px;background:#7c3aed;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;">2</div>
                        </td>
                        <td valign="middle">
                          <p style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">Quick Response</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#64748b;">You will hear back within 1 hour</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Step 3 -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #9333ea;border-radius:8px;padding:14px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="middle" style="padding-right:12px;">
                          <div style="width:24px;height:24px;background:#9333ea;border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#fff;">3</div>
                        </td>
                        <td valign="middle">
                          <p style="margin:0;font-size:14px;font-weight:600;color:#0f172a;">Personalized Reply</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#64748b;">A detailed, tailored response to your enquiry</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e2e8f0;padding-top:28px;">
                <tr>
                  <td style="padding-top:28px;">
                    <p style="margin:0;font-size:14px;color:#475569;">Warm regards,</p>
                    <p style="margin:6px 0 0;font-size:17px;font-weight:700;color:#0f172a;">Venuste NDIKUMANA</p>
                    <p style="margin:3px 0 0;font-size:13px;color:#4f46e5;font-weight:500;">Full Stack Developer</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#64748b;">This is an automated confirmation from <strong style="color:#4f46e5;">VenNDIK Portfolio</strong></p>
              <p style="margin:6px 0 0;font-size:12px;color:#94a3b8;">&copy; ${new Date().getFullYear()} Venuste NDIKUMANA. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

// ─────────────────────────────────────────────
// Controller
// ─────────────────────────────────────────────
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    // 1️⃣ Save contact (DB with local fallback)
    let newContact = null;
    try {
      newContact = await saveContact(name, email, subject || "", message);
    } catch (storageError) {
      console.error("❌ Error saving contact:", storageError);
    }

    // 2️⃣ Send emails — failures are logged but never shown to the user
    try {
      await sendEmail({
        to: process.env.MY_EMAIL,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\nMessage:\n${message}`,
        html: adminEmailHtml({ name, email, subject, message }),
      });
    } catch (emailErr) {
      console.error("❌ Admin email failed:", emailErr.message);
    }

    try {
      await sendEmail({
        to: email,
        subject: `Message Received — Venuste NDIKUMANA`,
        text: `Hi ${name},\n\nThank you for reaching out. I have received your message and will get back to you within 1 hour.\n\nWarm regards,\nVenuste NDIKUMANA`,
        html: userEmailHtml({ name, subject, message }),
      });
    } catch (emailErr) {
      console.error("❌ User confirmation email failed:", emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: newContact?.storage === "local-file"
        ? "Message received (stored locally — DB unavailable)"
        : "Message received successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Error in submitContact:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
