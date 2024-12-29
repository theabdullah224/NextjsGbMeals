/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER, 
  port: 465, 
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,  
  },
});

export const sendVerifyEmail = async (email: string , verificationCode:any) => {
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS, 
    to:email,
    subject: "Your Password Reset Verification Code",
    text: `Your verification code to reset your password is ${verificationCode}. The code will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
