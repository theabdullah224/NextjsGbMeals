
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import User from '../models/UserModel';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/auth/auth'; 
import { connectMongoDB } from '@/app/lib/dbConnection';
export async function PUT(request) {
    try {
      await connectMongoDB();
  
      const session = await getServerSession(authOptions);
    
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const { email } = await request.json();
  
      
      if (!email || email.trim() === '') {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }
  
      // @ts-ignore
      const updatedUser = await User.findByIdAndUpdate(
        // @ts-ignore
        session.user.id,
        { email: email.trim() },
        { 
          new: true, 
          runValidators: true  
        }
      );
  
      if (!updatedUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json(updatedUser.email, { status: 200 });
  
    } catch (error:any) {
      console.error('Update user error:', error);
  
      return NextResponse.json(
        { error: 'Failed to update user', details: error.message }, 
        { status: 500 }
      );
    }
  }