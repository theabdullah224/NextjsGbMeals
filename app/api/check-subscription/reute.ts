/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";
import { connectMongoDB } from "@/app/lib/dbConnection";
import User from "../models/UserModel";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    //@ts-ignore
    const userId = session.user.id; 
    await connectMongoDB() 

    const data = await req.json();
    const email = data.email;



    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    // @ts-ignore
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    
    const isSubscribed = user.planType(); 
    const isStatus =  user.status
   const isUseFreePlan = user.hasUsedFreePlan 

    return NextResponse.json({
      isSubscribed,
      isStatus,
      isUseFreePlan
    });
  } catch (error:any) {
    
    return NextResponse.json({ error: "An internal server error occurred. Please try again later." }, { status: 500 });
  }
}
