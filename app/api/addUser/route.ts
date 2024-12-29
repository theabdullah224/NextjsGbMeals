/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectMongoDB } from '../../lib/dbConnection';
import User from '../models/UserModel';
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
  await connectMongoDB();

  try {
    // Get data from the request body
    const data = await request.json();
    const { name, email, password, planType } = data;

    // Input validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Invalid input: Name, email, and password are required." },
        { status: 400 }
      );
    }

    // Check if the user already exists
    // @ts-ignore
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password:hashedPassword,
      planType: planType || 'inactive'
    });    
    await newUser.save();

    return NextResponse.json(
      { 
        message: "User registered successfully", 
        id: newUser._id 
      }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during add user:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors }, 
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}