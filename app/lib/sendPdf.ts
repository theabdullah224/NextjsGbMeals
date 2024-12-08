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


export const sendPdf = async (mealPlanPDF: any, shoppingListPDF: any) => {
  const mailOptions = {
    from: process.env.MAIL_FROM_ADDRESS,  
    to: "abc@gmail.com", 
    subject: "Your Meal Plan and Shopping List",
    text: "Please find the attached meal plan and shopping list PDFs.",  
    attachments: [
      {
        content: mealPlanPDF,         
      },
      {
        content: shoppingListPDF,        
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Emails with PDFs sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
