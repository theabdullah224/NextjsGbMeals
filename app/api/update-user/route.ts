/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { connectMongoDB } from '@/app/lib/dbConnection';
import { NextResponse,NextRequest } from 'next/server';
import User from '../models/UserModel'; // Your User model

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Get the user data from the request body
    const body = await req.json();
    const { userId, name, email, prefMeal, persons, totalCalories, foodAllergies, dislikes, mealPerDay, days } = body;

  // Ensure we have the userId for the update
  if (!userId) {

    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }


    // Find the user by their ID
    // @ts-ignore
    const user = await User.findById(userId);

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      
    }

    // Only update the fields that are provided in the request
    if (name) user.name = name;
    if (email) user.email = email;
    if (prefMeal) user.prefMeal = prefMeal;
    if (persons) user.persons = persons;
    if (totalCalories) user.totalCalories = totalCalories;
    if (foodAllergies) user.foodAllergies = foodAllergies;
    if (dislikes) user.dislikes = dislikes;
    if (mealPerDay) user.mealPerDay = mealPerDay;
    if (days) user.days = days;

    // Save the updated user
    await user.save();

    // Respond with a success message
    return NextResponse.json({ error: 'User data updated successfully' }, { status: 200 });
   
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    
  }
}
