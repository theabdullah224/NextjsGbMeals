/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
 
//   apiVersion: '2022-11-15', 
// });

// export async function POST(req: NextRequest) {
//   try {
//     const { planType, email } = await req.json();

//     if (!planType || !email) {
//       return NextResponse.json({ error: 'Plan type and email are required.' }, { status: 400 });
//     }

//     let priceId: string;

//     if (planType === 'pro') {
//       priceId = 'price_1PuTKXJIHZe9tvecdtUCk4B3';
//     } else if (planType === 'ultra_pro') {

//       priceId = 'price_1PuTMLJIHZe9tvecikAUEJ6W';
//     } else {
//       return NextResponse.json({ error: 'Invalid plan type.' }, { status: 400 });
//     }
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'], 
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: 'http:http://localhost:3000/welcome',
//       cancel_url: 'http://http://localhost:3000/',
//       customer_email: email,
//       subscription_data: {
//         trial_period_days: 30,
//       },
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (error) {
//     console.error('Error creating Stripe checkout session:', error);
//     return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
//   }
// }


import { sendStripeEmail } from '@/app/lib/sendStripeEmail';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import User from '../models/UserModel';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  //@ts-ignore
  apiVersion: '2022-11-15',
});


export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planType, email } = body;

   

    const planMapping: Record<string, { price_id: string; amount: number }> = {
      pro: {
        price_id: 'price_1QQRWRJXiI2auGiyE1zY7Yzg',
        amount: 699,
      },
      ultra_pro: {
        price_id: 'price_1QQRUuJXiI2auGiyRWSKwkhy',
        amount: 5900,
      },
    };

    if (!planType || !(planType in planMapping)) {
      return NextResponse.json({ error: 'Invalid plan type' }, { status: 400 });
    }

    const priceId = planMapping[planType].price_id;

    // @ts-ignore
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const hasUsedFreePlan = user.hasUsedFreePlan ?? false; 
    const subscriptionData: Record<string, any> = {};
    if (!hasUsedFreePlan) {
      subscriptionData.trial_period_days = 30;
    }
    // Create a Checkout Session with a 30-day trial
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: 'https://www.gbmeals.com/welcome',
      cancel_url: 'https://www.gbmeals.com/',
      
      subscription_data:subscriptionData,
      customer_email: email,
    });

   

    // sendStripeEmail(email,planType)
   
    return NextResponse.json({ message: 'successful', url:session.url  }, { status: 200 });
  
  } catch (error) {
    console.error(
      error instanceof Stripe.errors.StripeError
        ? `Stripe error: ${error.message}`
        // @ts-ignore
        : `Error creating payment session: ${error.message}`
    );
    const errorMessage =
      error instanceof Stripe.errors.StripeError
        ? error.message
        : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
