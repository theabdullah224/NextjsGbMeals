/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Logo from "../../public/Resource/logo2.png";
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Ensure you have this package installed
import "jspdf-autotable"; // Ensure you have this package installed
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";



export default function page({ }) {
 
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const email = session?.user?.email;
  // @ts-ignore
  const userId = session?.user?.id;

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await session
        const res = await axios.post("/api/getData", {
          // @ts-ignore
          userId: session?.user?.id,
        });
      
        setData(res.data.user)
        //@ts-ignore
       
      } catch (error) {}
    };


    fetchData();
  }, [session]);

  const generateAndSendPDF = async () => {
  
    try {
      const email = session?.user?.email
      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          //@ts-ignore
          prefMeal:data.prefMeal,
          // @ts-ignore
          persons:data.persons,
          // @ts-ignore
          totalCalories:data.totalCalories,
          // @ts-ignore
          dislikes: data.dislikes,
          // @ts-ignore
          foodAllergies: data.foodAllergies,
          // @ts-ignore
          mealPerDay:data.mealPerDay,
          // @ts-ignore
                
          // @ts-ignore
          id: session?.user?.id,
          email:session?.user?.email
        }),
      });
    

      


        alert("PDF generated and sent successfully!");
        // window.location.reload();
      
    } catch (error) {
      
    }
  };

  const handleRedirect = async () => {
    if (session) {
      //  window.alert("You will receive an email with the PDFs in few mins.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push("/myAccount");
        generateAndSendPDF();
      }, 3000);
    }else{
      router.push('/')
    }
  };

  return (
    <>
      {showAlert && (
        <div className="p-4 mb-4 text-center text-sm text-white rounded-lg bg-[#F5A228] dark:bg-gray-800 dark:text-green-200" role="alert">
          <span className="font-medium">Success alert!</span> You will receive an email with the PDFs in few mins.
        </div>
      )}
      <div className=" img min-h-screen relative z-[1000] flex items-center justify-center bg-transparent text-[#313131] overflow-hidden">
        <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold mb-6 text-center text-[#738065]">Welcome!</h1>
          <p className="text-lg mb-8 text-[#606060] text-center">To gb meals, We&apos;re excited to have you here. Explore our site and discover amazing content tailored just for you.</p>
          <div className="flex justify-center">
            <button onClick={()=>{    handleRedirect();}} className="bg-[#F5A228] text-white font-bold py-2 px-6 rounded-full hover:bg-[#738065] transition duration-300 ease-in-out transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
        {/* {showCookieConsent && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 relative">
            <button onClick={() => setShowCookieConsent(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-2">Cookie Consent</h2>
            <p className="mb-4 text-sm text-gray-600">We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.</p>
            <div className="flex justify-end space-x-4">
              <button onClick={handleRejectCookies} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm">
                Reject
              </button>
              <button onClick={handleAcceptCookies} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                Accept
              </button>
            </div>
          </div>
        </div>
      )} */}
      </div>
    </>
  );
}
