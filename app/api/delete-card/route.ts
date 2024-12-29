/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// app/api/delete-card/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { connectMongoDB } from '@/app/lib/dbConnection';
import User from '../models/UserModel';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //@ts-ignore
    apiVersion: '2022-11-15', 
  });


export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }
        await connectMongoDB();
        // @ts-ignore
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }
        if (['pro', 'ultra pro'].includes(user.planType)) {
            return NextResponse.json(
                { error: 'Please cancel your plan before deleting the card' },
                { status: 400 }
            );
        }

        
        const customers = await stripe.customers.list({ email });

        if (customers.data.length === 0) {
            return NextResponse.json(
                { error: 'No customer found in Stripe with this email' },
                { status: 404 }
            );
        }

        const customer = customers.data[0];
        const paymentMethods = await stripe.paymentMethods.list({
            customer: customer.id,
            type: 'card',
        });

        let cardLast4 = null;
        if (paymentMethods.data.length > 0) {
            //@ts-ignore
            cardLast4 = paymentMethods.data[0].card.last4;
        }
        for (const paymentMethod of paymentMethods.data) {
            await stripe.paymentMethods.detach(paymentMethod.id);
        }

        if (user.status === "trialing") {
            user.currentPeriodEnd = "";
            user.planType = "inactive";
            user.status = "";
            user.stripeCustomerId = "";
            user.stripeSubscriptionId = "";
            await user.save();
        }

        let message = 'Card deleted successfully.';
        if (cardLast4) {
            message += ` Card ending in ${cardLast4} has been removed.`;
        }

        return NextResponse.json({
            status: 'success',
            message: message,
        });
    } catch (error:any) {
        console.error('Error deleting card:', error);
//@ts-ignore
        if (error instanceof Stripe.StripeError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
