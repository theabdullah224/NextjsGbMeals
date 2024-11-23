import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io', 
  port: 587,  
  auth: {
    user: process.env.MAIL_USERNAME,  // Mailtrap username
    pass: process.env.MAIL_PASSWORD,  // Mailtrap password
  },
});

export const sendVerifyEmail = async (email: string , verificationCode:any) => {
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,  // Sender address (from Mailtrap)
    to:email,
    subject: "forget password code",
    text: `Verify code  ${verificationCode},\n\n that expire in 10 minit`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("verify email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
