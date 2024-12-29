/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { NextRequest } from 'next/server';
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

        // Connect to MongoDB
        await connectMongoDB();

       
        // @ts-ignore
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
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

        if (paymentMethods.data.length === 0) {
            return NextResponse.json(
                { error: 'No card found. Please subscribe to a plan first.' },
                { status: 400 }
            );
        }

        // Create a Stripe Checkout session to update the card
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'setup',
            customer: customer.id,
            success_url: 'https://www.gbmeals.com/myaccount', 
            cancel_url: 'https://www.gbmeals.com', 
        });

        return NextResponse.json({
            url: session.url,
        });
    } catch (error:any) {
        console.error('Error updating card:', error);
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
