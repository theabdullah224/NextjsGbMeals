import { connectMongoDB } from "@/app/lib/dbConnection";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import User from "../models/UserModel";

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const session = getServerSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email } = params;

  try {
    await connectMongoDB();
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
