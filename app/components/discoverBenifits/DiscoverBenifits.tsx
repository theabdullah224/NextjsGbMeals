/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react'; // Importing React
import Image from 'next/image'; // Use next/image for optimized images in Next.js
import './discoverBenifits.css'; // Importing the stylesheet for this component
import icon1 from '../../../public/Resource/cutlery 1.svg'; // Importing an SVG icon
import icon2 from "../../../public/Resource/tip1.svg"; // Importing another SVG icon
import favicon from "../../../public/Resource/favicon.png"; // Importing a favicon image
import { useRouter } from 'next/navigation'; // Use Next.js router for navigation
import { useSession } from 'next-auth/react';

// Define the types for props
interface DiscoverBenefitsProps {
  subtitle: string;
}

const DiscoverBenefits: React.FC<DiscoverBenefitsProps> = ({ subtitle }) => {
  const {data:session} = useSession()

  const router = useRouter(); // Next.js router hook for navigation

 

  // Function to handle the "Learn More" button click, navigates to the learn more page

  // Function to handle the "Sign Up" button click, navigates to the signup page
  const handleSignUpClick = () => {
    router.push("/plans#form");
  };

  return (
    <div className='DiscoverBenifits py-8 md:py-[10rem]'>
      {/* Subtitle section with a border and text styling */}
      <h3 className='text-2xl border-b-8 text-Text1 border-S-Orange leading-none font-bold mb-[3vh]'>
        {subtitle} Sustainable
      </h3>
      {/* Main title with dynamic coloring */}
      <h2 className='text-2xl text-center 2xl:text-5xl font-bold sm:text-center text-Text1'>
        Reduce <span style={{ color: '#738065' }}>Food Waste</span> With Meal Planning
      </h2>
      {/* Description paragraph */}
      <p className='max-w-[42rem] text-lg text-Text2 text-center'>
        Discover how meal planning can help you reduce food waste and make a positive impact on the environment.
      </p>
      {/* Favicon image */}
      <Image className='favicondiscover hidden sm:block' src={favicon} alt="Favicon" />
      {/* Buttons for navigation */}
      <div className="flex mt-8 gap-6 items-center flex-col sm:flex-row">
        {!session && 
        <button
          className="py-2 px-12 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 border-2 border-P-Green1 hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base"
          onClick={handleSignUpClick}
        >
          Sign&nbsp;Up
        </button>}
      </div>
      {/* Two-column layout showcasing benefits and tips */}
      <div className="cols">
        <div className="col1 bg-Text2">
          {/* Icon and title for the first column */}
          <Image src={icon1} alt="Cutlery Icon" />
          <h4 className='insidecol1 text-Text1 text-xl font-bold'>Benefits</h4>
          <p className='pcol1 text-lg text-Text2 font-bold'>
            Save money, reduce food waste, and eat healthier with our meal planning service.
          </p>
        </div>
        <div className="col1">
          {/* Icon and title for the second column */}
          <Image src={icon2} alt="Tip Icon" />
          <h4 className='insidecol1 text-xl font-bold text-Text1'>Tips</h4>
          <p className='pcol1 text-lg text-Text2 font-bold'>
            Learn how to plan meals effectively and minimize food waste in your kitchen.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscoverBenefits; // Exporting the DiscoverBenefits component as the default export
