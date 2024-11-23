import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io', 
  port: 587,  
  auth: {
    user: process.env.MAIL_USERNAME,  // Mailtrap username
    pass: process.env.MAIL_PASSWORD,  // Mailtrap password
  },
});

export const sendStripeEmail = async (email: string , planType:any) => {
    console.log(email , planType)
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,  // Sender address (from Mailtrap)
    to:email,
    subject: "Active subscription",
    text: `Your subscriptin is active for plan  ${planType}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Subscription  email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
