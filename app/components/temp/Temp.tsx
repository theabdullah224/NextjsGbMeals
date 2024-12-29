/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
import axios from "axios";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useSession } from "next-auth/react";

const Button = ({ children, onClick, variant = "primary" }) => {
  const baseClasses =
    "px-4 py-2 rounded-md font-semibold transition-colors duration-200";
  const variantClasses = {
    primary:
      "py-1 px-6 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs  sm:text-base",
    secondary:
      "py-1 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-xs  sm:text-base",
    danger:
      "py-1 px-7 rounded-lg flex items-center justify-center bg-transparent text-Text1 border-2 border-Text1 hover:bg-gray-100 font-roboto font-medium text-xs sm:text-base box-border",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6 border">
    <h2 className="text-base sm:text-xl font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const ManageSubscriptionPage = () => {
  const [message, setMessage] = useState("");
  //   const [email, setemail] = useState('')
  const [userData, setUserData] = useState(null);
  const { data: session } = useSession();
  const email = session?.user?.email;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCancelPlan = async () => {
    if(userData?.status === "inactive"){
      alert("No Plan to Cancel!")
    }else{
      try {
        const response = await axios.post("/api/cancel-plan", { email: email });
        setUserData("")
        await fetchUserData()
        setMessage(response.data.message);
  
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } catch (error: any) {
        setMessage(
          error.response?.data?.error ||
            "An error occurred while canceling the plan."
        );
      } finally {
      }
      
    }
  };

  const handleDeleteCard = async () => {

    try {
      const response = await axios.post("/api/delete-card", { email: email });
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error: any) {
      setMessage(
        error.response?.data?.error ||
          "An error occurred while deleting the card."
      );
    } finally {
    }
  };

  const handleUpdateCard = async () => {

    
    try {
      const response = await fetch("/api/update-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        // Handle different error cases
        if (response.status === 404) {
          setMessage("User not found. Please try logging in again.");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else if (
          response.status === 400 &&
          data.error.includes("No card found")
        ) {
          setMessage("No card found. Please subscribe to a plan first.");
          setTimeout(() => {
            setMessage("");
          }, 3000);
        } else {
          setMessage(
            data.error || "An error occurred while updating the card."
          );
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
      }
    } catch (error) {
      // console.error('Error updating card:', error);
      setMessage("Failed to connect to the server. Please try again later.");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } finally {
    }
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
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [session]);

  return (
    <div className="container mx-auto p-6 max-w-3xl text-Text1">
      <h1 className="text-lg sm:text-3xl font-bold mb-6 text-Text1">
        Manage Your Subscription
      </h1>
      {message && (
        <p className="text-white bg-black bg-opacity-50 p-2 rounded">
          {message}
        </p>
      )}
      <Card title="Current Subscription">
        <p className="mb-2">
          <strong>Plan: </strong>
          {
            // @ts-ignore
            !session
              ? " Not available"
              : userData?.planType === "inactive"
              ? " No plan, please subscribe!"
              : userData?.planType === "pro"
              ? " Starter"
              : userData?.planType === "ultra_pro"
              ? " Premium"
              : "No plan, please subscribe!"
          }
        </p>
        <p className="mb-4">
          <strong>Next billing date: </strong>
          {userData?.currentPeriodEnd
            ? new Date(userData.currentPeriodEnd).toLocaleDateString("en-GB")
            : "Not available"}
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-0  sm:space-x-4">
          <Link href="/payment">
            <Button
              // @ts-ignore
              variant="primary"
              children={undefined}
              onClick={undefined}
            >
              Upgrade&nbsp;Plan
            </Button>
          </Link>

          <Button onClick={handleCancelPlan} variant="danger">
            Cancel&nbsp;Plan
          </Button>
        </div>
      </Card>

      <Card title="Payment Method">
        <div className="mb-4"></div>
        <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-0  sm:space-x-4">
          <Button onClick={handleUpdateCard} variant="secondary">
            Update&nbsp;Card
          </Button>

          <Button onClick={handleDeleteCard} variant="danger">
            Delete&nbsp;Card
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ManageSubscriptionPage;
