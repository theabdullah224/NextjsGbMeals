import mongoose, { Schema, model, models } from "mongoose";


// Define the TypeScript interface for User
export interface IUser {
    name: string;
    email: string;
    password: string;
    prefMeal: string;
    persons: string;
    foodAllergies: string[]; // Array of strings
    totalCalories: string;
    dislikes: string[];
    mealPerDay:string;
    days:string;
    verificationCode?: string;
    verificationCodeExpiry?: Date;

    //....stripe data
    stripeCustomerId: string,
    stripeSubscriptionId: string,
    planType: string,
    status: String,
    currentPeriodEnd: Date,
    //....stripe data
    createdAt?: string; // Optional, default value as a string
  }

// Define the Mongoose schema for User
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    prefMeal: { type: String, required: true },
    persons: { type: String, required: true },
    totalCalories: { type: String, required: true },
    foodAllergies: { type: [String], required: true },
    dislikes: { type: [String], required: true },
    mealPerDay: { type: String, required: true },
    days: { type: String, required: true },
    verificationCode: { type: String },
    verificationCodeExpiry: { type: Date },


    //.....stripe
    stripeCustomerId:  { type: String },
  stripeSubscriptionId: { type: String },
  planType: { type: String },
  status:  { type: String },
  currentPeriodEnd: { type: Date },
    //.....stripe
    createdAt: { type: String, default: () => new Date().toISOString() },
  },
  
);

// Export the User model
const User = models.User || model<IUser>("User", userSchema);
export default User;
