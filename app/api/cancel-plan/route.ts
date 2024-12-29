/* eslint-disable @typescript-eslint/ban-ts-comment */
import { connectMongoDB } from '@/app/lib/dbConnection';
import User from '../models/UserModel';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Parse the request body to get the email
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find the user by email
    // @ts-ignore
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update the user's plan details
    await user.updateOne({
      planType: 'inactive',
      status: 'inactive',
      currentPeriodEnd: null,
    });

    return NextResponse.json({ message: 'Plan canceled successfully' }, { status: 200 });
  } catch (error) {
    console.error(`Error canceling plan: ${error}`);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
