/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate input
    if (!data || !data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Invalid input: 'name', 'email', and 'message' are required." },
        { status: 400 }
      );
    }

    const { name, email, message } = data;


    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_SERVER, 
        port: 465,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,  
      },
    });
    
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: 'theabdullah224@gmail.com', 
      subject: 'User Contact Email',
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Your message has been sent successfully!' }, { status: 200 });

  } catch (error:any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: `An error occurred while sending your message. Details: ${error.message}` },
      { status: 500 }
    );
  }
}
