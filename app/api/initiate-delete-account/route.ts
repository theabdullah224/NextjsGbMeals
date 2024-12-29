/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { NextRequest } from 'next/server';
import { connectMongoDB } from '../../lib/dbConnection';
import User from '../models/UserModel';

export async function POST(request: NextRequest) {

  try {  
    await connectMongoDB();

    const data = await request.json();
    const { email, password } = data;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

 
    // @ts-ignore
    const user = await User.findOne({ email });   
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const verificationCode = Math.random().toString().slice(-6);

   
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);

    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = expiry;
    await user.save();
    const transporter = nodemailer.createTransport({
       host: process.env.SMTP_SERVER, 
       port:465,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: email,
      subject: "Account Deletion Verification Code",
      text: `Your verification code to delete your account is ${verificationCode}. The code will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '10m' });
    return NextResponse.json({
      message: "Verification code sent to your email",
      token,
    }, { status: 200 });

  } catch (error:any) {
    console.error("Error in initiating account deletion:", error);
    return NextResponse.json(
      { error: `An error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}


