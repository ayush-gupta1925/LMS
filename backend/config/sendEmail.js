import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL, // Gmail ID
    pass: process.env.USER_PASSWORD // App Password
  }
});

const sendMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.USER_EMAIL, // ✅ "from" not "form"
    to: to,
    subject: "Reset Your Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
  });
};

export default sendMail;
