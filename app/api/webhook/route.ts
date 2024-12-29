/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */



import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import User from '../models/UserModel';
import { connectMongoDB } from '@/app/lib/dbConnection';
import { sendStripeEmail } from '@/app/lib/sendStripeEmail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: '2022-11-15',
});

const WEBHOOKENDPOINTSECRET = process.env.WEBHOOKENDPOINTSECRET!;

export async function POST(request: Request) {

  // Ensure MongoDB is connected
  await connectMongoDB();

  const payload = await request.text();
  const sigHeader = request.headers.get('stripe-signature');

  if (!sigHeader || !WEBHOOKENDPOINTSECRET) {
    return NextResponse.json({ error: 'Missing required headers or environment variable' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, sigHeader, WEBHOOKENDPOINTSECRET);
  } catch (err: any) {
    const errorMessage = err instanceof Stripe.errors.StripeError ? err.message : 'Unknown error';
    console.error(`Webhook Error: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }


  if (event.type === 'invoice.payment_succeeded') {
    const customerId = event.data.object.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    const email = (customer as Stripe.Customer).email;



    if (email) {
      // @ts-ignore
      const user = await User.findOne({ email });

      if (user) {
        try {
          const planType = event.data.object.lines.data[0].price.product;
        

          let subscriptionStatus = 'inactive';
          if (planType === 'prod_RJ3d45EsFz2L5b') {
            subscriptionStatus = 'pro';
          } else if (planType === 'prod_RJ3cO4YrpGmTXD') {
            subscriptionStatus = 'ultra_pro';
          }

          
          const subscriptionEndDate = new Date();
          if(subscriptionStatus == "pro"){

            subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30);
          }else{
            
            subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 365);
          }

          // Update the user's subscription status in the 'status' field
          try {
            const result = await user.updateOne({
              status:"active",
              planType: subscriptionStatus,
              currentPeriodEnd: subscriptionEndDate,
              hasUsedFreePlan:true
            });
          
          
          } catch (err) {
            console.error(`Error updating subscription: ${err}`);
          }


          if (['pro', 'ultra_pro'].includes(subscriptionStatus)) {
            if(subscriptionStatus == "pro"){
              subscriptionStatus = "Starter"
            } else if(subscriptionStatus == "ultra_pro"){
              subscriptionStatus = "Premium"
            }
            await sendStripeEmail(user.email, user.name, subscriptionStatus);
          }
        } catch (err) {
          console.error(`Error updating subscription: ${err}`);
        }
      } else {
        console.warn(`User not found for email: ${email}`);
      }
    }
  }

  return NextResponse.json({ status: 'success' }, { status: 200 });
}
