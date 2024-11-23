import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';


// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15', // Ensure this matches the current Stripe API version
});

export async function POST(req: NextRequest) {
  try {
    // Parse the request body (since we're using NextRequest)
    const { planType, email } = await req.json();

    // Check that both planType and email are provided
    if (!planType || !email) {
      return NextResponse.json({ error: 'Plan type and email are required.' }, { status: 400 });
    }

    // Determine the plan ID and pricing based on the planType
    let priceId: string;

    if (planType === 'pro') {
      // Pro plan - £6.99/month with 30 days free trial
      priceId = 'price_1QOGr3CQ4okWkRlLHa5NBODG';
    } else if (planType === 'ultra_pro') {
      // Ultra Pro plan - £59/year with 30 days free trial
      priceId = 'price_1QOGw1CQ4okWkRlLm2aS4O5A';
    } else {
      return NextResponse.json({ error: 'Invalid plan type.' }, { status: 400 });
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // This can be customized to include other payment methods
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http://localhost:3000/welcome',
      cancel_url: 'http://localhost:3000/',
      customer_email: email,
      subscription_data: {
        trial_period_days: 30, // Free trial of 30 days
      },
    });

    // Send the session ID to the frontend to complete the checkout
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
