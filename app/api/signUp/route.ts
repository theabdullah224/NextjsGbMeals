/* eslint-disable @typescript-eslint/ban-ts-comment */
import { connectMongoDB } from "@/app/lib/dbConnection";
import User from "../models/UserModel";

import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/app/lib/sendWelcomeEmail";


export const POST = async (req: Request) => {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { name, email, password, prefMeal, persons, totalCalories, dislikes, foodAllergies, mealPerDay, days } = body;
  
    
  
    // @ts-ignore
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, message: "User already exists" }), {
        status: 400,
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      prefMeal,
      persons,
      totalCalories,
      dislikes,
      foodAllergies,
      mealPerDay,
      days,
    });

    await newUser.save();

    await sendWelcomeEmail(email, name);

    return new Response(JSON.stringify({ success: true, message: "User registered successfully", user: newUser }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    return new Response(JSON.stringify({ success: false, message: "Server error" }), {
      status: 500,
    });
  }
};

export const GET = async () => {
  return new Response("This endpoint only supports POST requests", { status: 405 });
};
