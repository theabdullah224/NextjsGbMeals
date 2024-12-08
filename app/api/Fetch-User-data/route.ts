
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import User from '../models/UserModel'; // Import your User model

// Define the route to fetch user data by userId using POST request
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the JSON body of the request
    const { userId } = body; // Extract userId from the request body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Fetch the user data from the database based on the userId
    // @ts-ignore
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json({ user }, { status: 200 });

  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
