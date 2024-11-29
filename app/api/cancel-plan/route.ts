import { NextResponse } from "next/server";
import Stripe from "stripe";
import { NextRequest } from "next/server";
import { connectMongoDB } from "@/app/lib/dbConnection";
import User from "../models/UserModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //@ts-ignore
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!["pro", "Ultra pro"].includes(user.planType)) {
      return NextResponse.json({ error: "No active paid subscription found for this user" }, { status: 400 });
    }
    const customers = await stripe.customers.list({ email });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: "No customer found in Stripe with this email" }, { status: 404 });
    }

    const customer = customers.data[0];
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
    });

    for (const subscription of subscriptions.data) {
      //@ts-ignore
      await stripe.subscriptions.del(subscription.id);
      console.log(`Subscription canceled: ${subscription.id}`);
    }
    user.currentPeriodEnd = "";
    user.planType = "inactive";
    user.status = "";
    user.stripeCustomerId = "";
    user.stripeSubscriptionId = "";

    await user.save();

    return NextResponse.json({
      status: "success",
      message: "Subscription canceled successfully. You can now delete your card if desired.",
    });
  } catch (error: any) {
    console.error("Error canceling subscription:", error);
    //@ts-ignore
    if (error instanceof Stripe.StripeError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
