import { saveContact } from "../model/contactModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    let newContact = null;

    try {
      newContact = await saveContact(name, email, subject || "", message);
    } catch (storageError) {
      console.error("❌ Error saving contact:", storageError);
    }

    // 1️⃣ Send notification email to you (admin) - ENHANCED DESIGN
    if (process.env.MY_EMAIL) {
      console.log("Sending notification to:", process.env.MY_EMAIL);
      await sendEmail({
        to: process.env.MY_EMAIL,
        subject: `Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Message</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: url(https://cdn.pixabay.com/photo/2012/01/09/09/59/earth-11595_1280.jpg); min-height: 100vh;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Main Card -->
              <div style="background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); overflow: hidden; border: 1px solid rgba(255,255,255,0.3);">
                
                <!-- Header with Gradient -->
                <div style="background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); padding: 50px 40px 40px; text-align: center; position: relative;">
                  <!-- Icon Container -->
                  <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.3);">
                    <span style="font-size: 48px; color: white;">📩</span>
                  </div>
                  
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">New Message Alert</h1>
                  <p style="margin: 12px 0 0; font-size: 16px; color: rgba(255,255,255,0.9); font-weight: 400;">From your portfolio contact form</p>
                </div>

                <!-- Content Section -->
                <div style="padding: 50px 40px 40px;">
                  
                  <!-- Sender Info Card -->
                  <div style="background: linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%); border-radius: 20px; padding: 30px; margin-bottom: 30px; border: 1px solid rgba(30, 64, 175, 0.1); box-shadow: 0 8px 25px rgba(30, 64, 175, 0.08);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                      
                      <!-- Name -->
                      <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #1e40af, #3730a3); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                          <span style="font-size: 20px; color: white;">👤</span>
                        </div>
                        <div>
                          <div style="font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Name</div>
                          <div style="font-size: 18px; color: #1e293b; font-weight: 700;">${name}</div>
                        </div>
                      </div>

                      <!-- Email -->
                      <div style="display: flex; align-items: center; gap: 15px;">
                        <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #1e40af, #3730a3); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                          <span style="font-size: 20px; color: white;">✉️</span>
                        </div>
                        <div>
                          <div style="font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email</div>
                          <div style="font-size: 16px; color: #1e40af; font-weight: 600;">
                            <a href="mailto:${email}" style="color: #1e40af; text-decoration: none; font-weight: 600;">${email}</a>
                          </div>
                        </div>
                      </div>

                    </div>

                    ${subject ? `
                    <!-- Subject -->
                    <div style="display: flex; align-items: center; gap: 15px; margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(30, 64, 175, 0.1);">
                      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #1e40af, #3730a3); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 20px; color: white;">📋</span>
                      </div>
                      <div>
                        <div style="font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Subject</div>
                        <div style="font-size: 16px; color: #1e293b; font-weight: 600;">${subject}</div>
                      </div>
                    </div>
                    ` : ''}

                  </div>

                  <!-- Message Section -->
                  <div>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                      <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #1e40af, #3730a3); border-radius: 10px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 18px; color: white;">💬</span>
                      </div>
                      <div style="font-size: 18px; color: #1e293b; font-weight: 700;">Message</div>
                    </div>
                    
                    <div style="background: #f8fafc; border-radius: 16px; padding: 30px; border: 1px solid #e2e8f0; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);">
                      <div style="font-size: 16px; line-height: 1.7; color: #374151; white-space: pre-wrap; font-family: 'Inter', sans-serif; font-weight: 400;">${message}</div>
                    </div>
                  </div>

                  <!-- Action Button -->
                  <div style="text-align: center; margin-top: 40px;">
                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #1e40af 0%, #3730a3 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 8px 25px rgba(30, 64, 175, 0.3); transition: all 0.3s ease; border: none; cursor: pointer;">
                      <span style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                        <span>Reply to ${name}</span>
                        <span style="font-size: 18px;">↗️</span>
                      </span>
                    </a>
                  </div>

                </div>

                <!-- Footer -->
                <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                  <div style="text-align: center;">
                    <div style="font-size: 14px; color: #475569; margin-bottom: 8px; font-weight: 500;">
                      📧 Sent from your portfolio contact form
                    </div>
                    <div style="font-size: 12px; color: #6b7280;">
                      ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </body>
          </html>
        `
      });
    } else {
      console.warn("❌ MY_EMAIL is not defined in .env");
    }

    // 2️⃣ Send confirmation email to user - ENHANCED DESIGN
    if (email) {
      console.log("Sending confirmation email to user:", email);
      await sendEmail({
        to: email,
        subject: "Venuste NDIKUMANA",
        text: `Hi ${name},\n\nThank you for contacting us! We have received your message and will get back to you shortly.\n\nBest regards,`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Message Received</title>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: url(https://cdn.pixabay.com/photo/2012/01/09/09/59/earth-11595_1280.jpg); min-height: 100vh;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              
              <!-- Main Card -->
              <div style="background: rgba(255, 255, 255, 0.98); backdrop-filter: blur(20px); border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.15); overflow: hidden; border: 1px solid rgba(255,255,255,0.3);">
                
                <!-- Success Header -->
                <div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 50px 40px 40px; text-align: center; position: relative;">
                  <!-- Success Icon -->
                  <div style="width: 100px; height: 100px; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); border-radius: 50%; margin: 0 auto 25px; display: flex; align-items: center; justify-content: center; border: 2px solid rgba(255,255,255,0.3);">
                    <span style="font-size: 48px; color: white;">✅</span>
                  </div>
                  
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Message Received!</h1>
                  <p style="margin: 12px 0 0; font-size: 16px; color: rgba(255,255,255,0.9); font-weight: 400;">We're excited to connect with you</p>
                </div>

                <!-- Content -->
                <div style="padding: 50px 40px 40px;">
                  
                  <!-- Greeting -->
                  <div style="text-align: center; margin-bottom: 40px;">
                    <p style="margin: 0 0 20px; font-size: 20px; color: #1e293b; line-height: 1.6; font-weight: 500;">
                      Hi <strong style="color: #059669; font-weight: 700;">${name}</strong>,
                    </p>
                    
                    <p style="margin: 0; font-size: 16px; color: #475569; line-height: 1.7; max-width: 400px; margin: 0 auto; font-weight: 400;">
                      Thank you for reaching out! We've successfully received your message and appreciate you taking the time to contact us.
                    </p>
                  </div>

                  <!-- Message Summary Card -->
                  <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 20px; padding: 30px; margin: 30px 0; border: 1px solid rgba(5, 150, 105, 0.1); box-shadow: 0 8px 25px rgba(5, 150, 105, 0.08);">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #059669, #047857); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 20px; color: white;">📝</span>
                      </div>
                      <div style="font-size: 18px; color: #1e293b; font-weight: 700;">Your Message Summary</div>
                    </div>

                    ${subject ? `
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 15px; padding: 15px; background: rgba(255,255,255,0.8); border-radius: 12px;">
                      <span style="font-size: 16px;">📋</span>
                      <div>
                        <div style="font-size: 12px; color: #475569; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Subject</div>
                        <div style="font-size: 14px; color: #1e293b; font-weight: 600;">${subject}</div>
                      </div>
                    </div>
                    ` : ''}

                    <div style="background: rgba(255,255,255,0.8); border-radius: 12px; padding: 20px; margin-top: 15px;">
                      <div style="font-size: 14px; line-height: 1.7; color: #374151; white-space: pre-wrap; font-family: 'Inter', sans-serif; font-weight: 400;">${message}</div>
                    </div>
                  </div>

                  <!-- Next Steps -->
                  <div style="background: #f8fafc; border-radius: 16px; padding: 30px; margin: 30px 0; border: 1px solid #e2e8f0;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                      <div style="width: 50px; height: 50px; background: linear-gradient(135deg, #1d4ed8, #1e40af); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 20px; color: white;">⏱️</span>
                      </div>
                      <div style="font-size: 18px; color: #1e293b; font-weight: 700;">What Happens Next?</div>
                    </div>
                    
                    <div style="display: grid; gap: 15px;">
                      <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 10px; border-left: 4px solid #059669;">
                        <span style="font-size: 18px; color: #059669;">✓</span>
                        <div>
                          <div style="font-size: 14px; color: #1e293b; font-weight: 600;">Review Process</div>
                          <div style="font-size: 13px; color: #475569;">Our team will carefully review your message</div>
                        </div>
                      </div>
                      
                      <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 10px; border-left: 4px solid #1d4ed8;">
                        <span style="font-size: 18px; color: #1d4ed8;">⏰</span>
                        <div>
                          <div style="font-size: 14px; color: #1e293b; font-weight: 600;">Quick Response</div>
                          <div style="font-size: 13px; color: #475569;">You'll hear back from us within 1 hour</div>
                        </div>
                      </div>
                      
                      <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 10px; border-left: 4px solid #7c3aed;">
                        <span style="font-size: 18px; color: #7c3aed;">💬</span>
                        <div>
                          <div style="font-size: 14px; color: #1e293b; font-weight: 600;">Personalized Reply</div>
                          <div style="font-size: 13px; color: #475569;">We'll provide detailed answers to all your questions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Closing -->
                  <div style="text-align: center; padding-top: 20px;">
                    <p style="margin: 0; font-size: 16px; color: #475569; line-height: 1.7; font-weight: 400;">
                      Best regards,<br/>
                      <strong style="color: #059669; font-size: 18px; font-weight: 700;">VenNDIK Team</strong>
                    </p>
                  </div>

                </div>

                <!-- Footer -->
                <div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 30px 40px; border-top: 1px solid #e2e8f0;">
                  <div style="text-align: center;">
                    <div style="font-size: 14px; color: #475569; margin-bottom: 8px; font-weight: 500;">
                      Confirmation from VenNDIK Portfolio<br/>
                      &copy; 2025 Venuste NDIKUMANA. All rights reserved.
                    </div>
                    <div style="font-size: 12px; color: #6b7280;">
                      ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </body>
          </html>
        `
      });
    } else {
      console.warn("❌ User email is empty, skipping confirmation email");
    }

    res.status(201).json({
      success: true,
      message:
        newContact?.storage === "local-file"
          ? "Message received. PostgreSQL was unavailable, so the submission was stored locally and the emails were still processed."
          : "Message received successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Error saving contact or sending emails:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};