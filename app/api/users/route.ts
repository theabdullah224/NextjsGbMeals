import { NextResponse } from "next/server";
import User from "../models/UserModel";
import { connectMongoDB } from "@/app/lib/dbConnection";


export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find();

    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch users", message: error.message },
      { status: 500 }
    );
  }
}
