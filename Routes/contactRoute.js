const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { name, email, phone, message } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ADMIN, // Your email
                pass: process.env.EMAIL_PASS  // Your App Password
            }
        });

        // HTML Email Template
        let mailOptions = {
            from: process.env.EMAIL_ADMIN,
            to: process.env.EMAIL_ADMIN, // Receive emails at your email
            subject: `New Contact Request from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; border:1px solid #ddd; padding: 20px; max-width: 600px; margin: auto;">
                    <h2 style="color: #007bff;">New Contact Request</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong> ${message}</p>
                    <hr>
                    <p style="font-size: 14px; color: #777;">This message was sent from the Sarkar CSC website.</p>
                </div>
            `
        };

        let info = await transporter.sendMail(mailOptions);
        console.log("Email Sent: ", info.response);  
        res.status(200).json({ success: true, message: "Email sent successfully!" });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ success: false, message: "Failed to send email", error });
    }
});

module.exports = router;
