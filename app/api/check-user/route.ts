/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { connectMongoDB } from "@/app/lib/dbConnection";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "../models/UserModel";

export async function GET(req: Request) {
  const url = new URL(req.url); // Parse the request URL
  const email = url.searchParams.get('email'); // Get "email" from query params
  if (!email) {
    return new Response('Email not provided', { status: 400 });
  }
  const session = getServerSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }



  try {
    await connectMongoDB();
    // @ts-ignore
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          email: user.email,
          subscriptionStatus: user.status,
          subscriptionEndDate: user.currentPeriodEnd ? user.subscriptionEndDate.toISOString() : null,
          freePlanUsed: user.isUseFreePlan,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "An internal server error occurred. Please try again later." }, { status: 500 });
  }
}
