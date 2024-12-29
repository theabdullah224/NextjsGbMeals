/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
// import mongoose from 'mongoose';
import { connectMongoDB } from '@/app/lib/dbConnection';
import User from '../../models/UserModel';


export async function DELETE(req: Request) {
  const url = new URL(req.url); // Parse the request URL
  const email = url.pathname.split('/').pop(); // Extract "email" from the path

  if (!email) {
    return new Response('Email not provided', { status: 400 });
  }

  try {
    await connectMongoDB(); 

    // @ts-ignore
     const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    await User.deleteOne({ email });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Error during user deletion:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
