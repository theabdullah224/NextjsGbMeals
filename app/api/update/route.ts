import { NextResponse } from 'next/server';
import User from '../models/UserModel';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; 
import { connectMongoDB } from '@/app/lib/dbConnection';

export async function PUT(request) {
  try {
    
    await connectMongoDB();

    const session = await getServerSession(authOptions);


    console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nv",session,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nv")
  
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { name } = await request.json();

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const updatedUser = await User.findByIdAndUpdate(
      session.user.id,
      { name: name.trim() },
      { 
        new: true,  
        runValidators: true  
      }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });

  } catch (error) {
    console.error('Update user error:', error);

    return NextResponse.json(
      { error: 'Failed to update user', details: error.message }, 
      { status: 500 }
    );
  }
}