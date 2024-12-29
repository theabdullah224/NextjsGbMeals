/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectMongoDB } from "@/app/lib/dbConnection";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/UserModel";
import {sendVerifyEmail}  from "@/app/lib/sendVerifyEmail"


const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRY = "10m";

function generateVerificationCode(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectMongoDB();
    // @ts-ignore
    const user = await User.findOne({ email });


    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const verificationCode = generateVerificationCode();
    const verificationCodeExpiry = new Date();
    verificationCodeExpiry.setMinutes(
      verificationCodeExpiry.getMinutes() + 10 
    );
    user.verificationCode = verificationCode;
    user.verificationCodeExpiry = verificationCodeExpiry;
    await user.save();

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    

    await sendVerifyEmail(email,verificationCode );

    return NextResponse.json({
      message: "Verification code sent to your email",
      token,
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
