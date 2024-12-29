/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from "react";
import "./testimonnials.css";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Define the props type for Testimonials component
interface TestimonialsProps {
  bgimg: string;
  bgsize: string;
  testcolor: string;
  border: string;
  logo: string;
  display: string;
  description: string;
  h2: string;
  plast: string;
}

const Testimonials: React.FC<TestimonialsProps> = (props) => {

  
    const { data: session, status } = useSession();
  



   



  const router = useRouter();

  // Handler for Learn More button click
//   const handleLearnMoreClick = () => {
//     router.push('/tryfreefor30-days#faqs');
//   };

  // Handler for Sign Up button click
  const handleSignUpClick = () => {
    router.push("/plans#form");
  };

  return (
    <div className="testimonials">
      <div className="box" style={{backgroundImage: `url(${props.bgimg})`, backgroundSize: props.bgsize}}>
        <div className="testcolor border-S-Orange" style={{backgroundColor: props.testcolor, border: props.border}}>

          <img className="w-28 mb-3" src={props.logo} alt="Company Logo" />
          <h1 className="testimonial-title text-2xl 2xl:text-5xl font-bold text-Text1" style={{display: props.display}}>
            Subscribe <br /> Get your <span className="text-P-Green1">meal plan</span> now 
          </h1>
          <p className="testimonial-description text-lg text-center text-Text1">{props.description}</p>

          <div style={{display: props.display}}>
            <div className="flex w-fit flex-wrap items-center justify-center mt-8 gap-6">
              {!session  && 
                <button
                  className="py-2 px-12 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 border-2 border-P-Green1 hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base"
                  onClick={handleSignUpClick}
                >
                  Sign&nbsp;Up
                </button>
              }
            </div>
          </div>

          <h2 className="testimonial-h2 text-2xl text-P-Green1 font-bold">{props.h2}</h2>
          <p className="testimonial-last text-lg text-Text2">{props.plast}</p>

        </div>
      </div>
    </div>
  );
}

export default Testimonials;
