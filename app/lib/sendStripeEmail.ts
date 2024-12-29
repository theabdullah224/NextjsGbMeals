/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER, 
  port: 465,  
  auth: {
    user: process.env.MAIL_USERNAME,  
    pass: process.env.MAIL_PASSWORD,  
  },
});

export const sendStripeEmail = async (email: string, name, subscriptionStatus: string) => {

  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,  
    to:email,
    subject: "Active subscription",
    text: `  Hello ${name}!,

        Welcome to GBMeals, and thank you for subscribing to our ${subscriptionStatus} Plan!
        With your ${subscriptionStatus} Plan, you'll have access to personalized meal plans tailored to your preferences. 
        Start planning your meals today and enjoy delicious, healthy meals made just for you.
        If you have any questions, feel free to contact our support team.

        Best regards,
        Team GbMeals `,
  };

  try {
    await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
