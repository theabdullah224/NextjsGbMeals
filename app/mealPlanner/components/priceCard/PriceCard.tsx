/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../../public/Resource/spinner.svg";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getStripe } from '../../../lib/stripe';

const cardData = [
  {
    price: 6.99,
    currency: "£",
    duration: "per Month",
    startNotice: "Starts After 30 Days",
    planType: "pro", // Add planType here
    features: ["Starts After 30 Days", "Weekly Meal Plan", "PDF Delivered via Email", "Allergy-Friendly Options", "Shopping List Included"],
  },
  {
    price: 59,
    currency: "£",
    duration: "per Year",
    planType: "ultra_pro", // Add planType here
    startNotice: "Starts After 30 Days",
    features: ["Starts After 30 Days", "Weekly Meal Plan", "PDF Delivered via Email", "Allergy-Friendly Options", "Shopping List Included"],
  },
];

interface User {
  userId: string;
  email: string;
}

interface UserData {
  subscription_status: string;
}

const PriceCard: React.FC = () => {
  // const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  //@ts-ignore
  const userId = session?.user?.id;
  const email = session?.user?.email;
  const router = useRouter();
  const [userData, setUserData] = useState("")
  const [loadingCard, setLoadingCard] = useState(null); // Track the card being loaded

  const handleButtonClick = (planType) => {
    setLoadingCard(planType); // Set the loading state for the clicked card
    buyFunction(planType); 
    
    
    // Call the buy function
  };


  const fetchUserData = async () => {
    // @ts-ignore
    const userId = session?.user.id;
    try {
      const response = await fetch("/api/Fetch-User-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(data.user);

       
      } else {
        setError(data.error || "Error fetching user data");
      }
    } catch (error) {
      setError("Failed to fetch user data");
    }finally{
      setLoadingCard(null)
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [session]);



  // Handle the subscription purchase
  const buyFunction = async (planType: string): Promise<void> => {

    
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planType, email }),
      });
     
      const data = await res.json();
    

   
      window.location.href = data.url
     
      if (data.sessionId) {
        const stripe = await getStripe();
        stripe?.redirectToCheckout({ sessionId: data.sessionId });
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };
   
  

  return (
    <div className="flex items-center justify-center">
      {loader && (
        <div>
          <img src={Loader} alt="Loading..." className="" />
        </div>
      )}

      {!loader && (
        <section className="container pt-[2rem] pb-[5rem] mx-auto flex flex-col items-center justify-center gap-4">
          <h1 className="text-2xl mb-4 border-b-8 border-S-Orange leading-none font-bold mx-auto inline-block text-Text1">Pricing</h1>
          <div className="flex gap-6 items-center flex-col sm:flex-row justify-center sm:flex-wrap">
            {/* Map over cardData */}
            {cardData.map((card, index) => (
              <div key={index} className="w-64">
                <div className="rounded-2xl bg-white px-5 py-10 shadow-lg border">
                  <div className="mt-5 flex justify-center text-black">
                    <div className="text-6xl font-medium">{card.price}</div>
                    <div className="ml-2 flex flex-col">
                      <p className="text-lg font-bold">{card.currency}</p>
                      <p>{card.duration}</p>
                    </div>
                  </div>

                  <div className="ml-3 mt-8">
                    <ul className="grid gap-4">
                      {card.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-black">
                          <svg className="mr-3 h-4 w-4 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.34-2.719-19.81-8.188l-64-64c-10.91-10.94-10.91-28.69 0-39.63c10.94-10.94 28.69-10.94 39.63 0L224 280.4l108.2-108.2c10.94-10.94 28.69-10.94 39.63 0C382.7 183.1 382.7 200.9 371.8 211.8z"></path>
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    {session && (
                      <>

<button
                    onClick={() => handleButtonClick(card.planType)}
                    className={`w-full py-2 px-4 rounded-lg flex items-center justify-center text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base ${
                      userData?.
                      // @ts-ignore
                      planType === card.planType
                        ? "bg-P-Green1"
                        : "bg-P-Green1"
                    }`}
                    disabled={userData?.
                      // @ts-ignore
                      planType === card.planType}
                  >
                    {loadingCard === card.planType
                      ? "Loading..."
                      : userData?.
                      // @ts-ignore
                      planType === card.planType
                      ? "Subscribed"
                      : "Upgrade"}
                  </button>

                        

                      </>
                    )}
                    {!session && (
                     ""
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PriceCard;
