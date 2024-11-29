import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  //@ts-ignore
  apiVersion: '2022-11-15', 
});

export async function POST(req: NextRequest) {
  try {
    const { planType, email } = await req.json();

    if (!planType || !email) {
      return NextResponse.json({ error: 'Plan type and email are required.' }, { status: 400 });
    }

    let priceId: string;

    if (planType === 'pro') {
      priceId = 'price_1QOGr3CQ4okWkRlLHa5NBODG';
    } else if (planType === 'ultra_pro') {

      priceId = 'price_1QOGw1CQ4okWkRlLm2aS4O5A';
    } else {
      return NextResponse.json({ error: 'Invalid plan type.' }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'http:http://localhost:3000/welcome',
      cancel_url: 'http://http://localhost:3000/',
      customer_email: email,
      subscription_data: {
        trial_period_days: 30,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
