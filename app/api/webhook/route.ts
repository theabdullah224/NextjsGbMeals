/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import User from "../models/UserModel";
// import { connectMongoDB } from "@/app/lib/dbConnection";
// import { sendStripeEmail } from "@/app/lib/sendStripeEmail";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   //@ts-ignore
//   apiVersion: "2023-08-16",
// });

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// export async function POST(req: NextRequest) {
//   const sig = req.headers.get("stripe-signature");
//   let event;

//   try {
//     const body = await req.text();

//     if (!sig) {
//       return NextResponse.json({ error: "Missing Stripe signature header" }, { status: 400 });
//     }

//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
//   } catch (err) {
//     console.error("Error verifying webhook signature:", err);
//     return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
//   }

//   try {
//     switch (event.type) {
//       case "checkout.session.completed": {
//         const session = event.data.object as Stripe.Checkout.Session;
//         const subscriptionId = session.subscription as string;
//         const customerId = session.customer as string;
//         const email = session.customer_details?.email;
//         const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
//           expand: ["items.data.price.product"],
//         });

//         const planType = (subscription.items.data[0].price.product as Stripe.Product).name;
//         await connectMongoDB();

//         const user = await User.findOneAndUpdate(
//           { email },
//           {
//             stripeCustomerId: customerId,
//             stripeSubscriptionId: subscriptionId,
//             planType,
//             status: subscription.status,
//             currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//             hasUsedFreePlan: true,
//           },
//           { new: true }
//         );
//         await sendStripeEmail(planType, email, user.name);

//         break;
//       }

//       case "invoice.payment_succeeded": {
//         const invoice = event.data.object as Stripe.Invoice;

//         if (invoice.subscription) {
//           const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);

//           await User.findOneAndUpdate(
//             { stripeCustomerId: invoice.customer },
//             {
//               status: subscription.status,
//               currentPeriodEnd: new Date(subscription.current_period_end * 1000),
//             }
//           );
//         }
//         break;
//       }

//       default:
//         console.log(`Unhandled event type: ${event.type}`);
//     }

//     return NextResponse.json({ received: true }, { status: 200 });
//   } catch (error: any) {
//     console.error("Error processing webhook:", error);
//     return NextResponse.json({ error: `Webhook processing failed: ${error.message}` }, { status: 400 });
//   }
// }


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
  console.log("webhook-------------------------")
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
          console.log(`Received plan type: ${planType}`);

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
