import { connectMongoDB } from "@/app/lib/dbConnection";
import User from "../models/UserModel";

import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/app/lib/sendWelcomeEmail";
export const POST = async (req: Request) => {
  try {
    await connectMongoDB();

    const body = await req.json();
    const { name, email, password, prefMeal, persons, totalCalories, dislikes, foodAllergies, mealPerDay, days } = body;

    console.log("name ", name);
    console.log(email);
    console.log(password);
    console.log(prefMeal);
    console.log(persons);
    console.log(totalCalories);
    console.log(mealPerDay);
    console.log(days);
    console.log(dislikes);
    console.log("foodAllergies", foodAllergies);

    // // Validate required fields
    // if (!name || !email || !password || !prefMeal || !persons || !totalCalories || !dislikes || !foodAllergies || !mealPerDay  || !days) {

    //   return new Response(JSON.stringify({ success: false, message: "All fields are required" }), {
    //     status: 400,
    //   });
    // }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ success: false, message: "User already exists" }), {
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
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
