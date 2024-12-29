/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/confirm-delete-account/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { connectMongoDB } from '@/app/lib/dbConnection';
import User from '../models/UserModel';

interface UserDocument {
  _id: string;
  email: string;
  password: string;
  verificationCode: string;
  verificationCodeExpiry: Date;
}

export async function POST(request: NextRequest) {
  try {

    await connectMongoDB();
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Authorization header missing or invalid' }, { status: 400 });
    }

    const token = authHeader.split(' ')[1]; 
    const decoded = jwt.verify(token,  process.env.JWT_SECRET!) as { userId: string };

   
    const userId = decoded.userId;  
    const data = await request.json();
    const { verification_code } = data;

    if (!verification_code) {
      return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
    }


    // @ts-ignore
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (user.verificationCode !== verification_code) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    if (new Date() > user.verificationCodeExpiry) {
      return NextResponse.json({ error: 'Verification code has expired' }, { status: 400 });
    }
    await user.deleteOne();

    return NextResponse.json({ message: 'Account deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in confirming account deletion:', error);
    return NextResponse.json({ error: 'An error occurred during account deletion' }, { status: 500 });
  }
}
