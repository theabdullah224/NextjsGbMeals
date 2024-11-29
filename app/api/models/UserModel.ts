import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  prefMeal: string;
  persons: string;
  foodAllergies: string[];
  totalCalories: string;
  dislikes: string[];
  mealPerDay: string;
  days: string;
  verificationCode?: string;
  verificationCodeExpiry?: Date;

  stripeCustomerId: string;
  stripeSubscriptionId: string;
  planType: string;
  status: String;
  currentPeriodEnd: Date;
  hasUsedFreePlan: boolean;

  createdAt?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  prefMeal: { type: String },
  persons: { type: String },
  totalCalories: { type: String },
  foodAllergies: { type: [String] },
  dislikes: { type: [String] },
  mealPerDay: { type: String },
  days: { type: String },
  verificationCode: { type: String },
  verificationCodeExpiry: { type: Date },

  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  planType: { type: String },
  status: { type: String },
  currentPeriodEnd: { type: Date },
  hasUsedFreePlan: { type: Boolean, default: true },

  createdAt: { type: String, default: () => new Date().toISOString() },
});

const User = models.User || model<IUser>("User", userSchema);
export default User;
