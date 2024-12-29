/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectMongoDB } from "@/app/lib/dbConnection";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { verification_code } = body; 
   
    if (!verification_code) {
      return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
    }


    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Authorization token is required" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1]; 
    let decodedToken;

    try {
    
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 403 }
      );
    }


    const { userId } = decodedToken as { userId: string };

 
    await connectMongoDB();
    // @ts-ignore
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }


    if (user.verificationCode !== verification_code) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    if (new Date() > new Date(user.verificationCodeExpiry)) {
      return NextResponse.json(
        { error: "Verification code has expired" },
        { status: 400 }
      );
    }

    
    user.verificationCode = undefined;
    user.verificationCodeExpiry = undefined;
    await user.save();

   
    return NextResponse.json({
      message: "Verification code verified successfully",
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
