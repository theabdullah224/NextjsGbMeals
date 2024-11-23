"use client"
import React, { useEffect, useState } from "react"; 
// import Tab from "../components/Tab"; // Importing Tab component
import Cta from "../components/cta/Cta"; 
import { useRouter } from "next/navigation"; 
import planimg from "../public/Resource/plansbg.jpg";
import lastimg from "../../public/Resource/lastimg.jpg";
import Favicon from "../../public/Resource/favicon.png"; 
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import CopyRight from "../components/copyRight/copyRight";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Tab from "./tab/Tab";


const page: React.FC = () => {
  const router = useRouter(); 

  const { data: session } = useSession();


  // Function to handle "Learn More" button click, navigates to the "Learn More" section
  const handleLearnMoreClick = () => {
    router.push("/tryfreefor30-days#faqs");
  };

  // Function to handle "Sign Up" button click, navigates to the "Sign Up" page
  const handleSignUpClick = () => {
    router.push("/plans#form");
  };

  return (
    <div>
      <Navbar />
      {/* Optionally, add Frontpage component here */}
      {/* <div className="savemoney">
        <div className="left-content-2 mt-8 sm:mt-0" id="aboutleft">
          <div className="contentsave">
            <p className="fancys text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1">
              Healthy
            </p>
            <h3 className="txt-1savemoney text-Text1 text-2xl 2xl:text-5xl font-bold">
              How Our Meal Planner Supports These Diets
            </h3>
            <p className="p-txtsavemoney text-lg text-Text2">
              Our meal planner is designed using the latest technology and
              scientific principles to adhere to the guidelines of the
              Mediterranean and Centenarian diets. By embracing these diets, you
              can enjoy a variety of healthy meals that promote longevity and
              overall health.
            </p>
          </div>
          <div className="mainsave">
            <div className="leftsave">
              <h5 className="fancy1leftsavemoney text-xl font-bold text-Text1">
                Benefits
              </h5>
              <p className="p-txtbottom text-lg text-Text2">
                Promotes heart health, weight management, and a balanced intake
                of nutrients.
              </p>
            </div>
            <div className="leftsave">
              <h5 className="fancy1leftsavemoney text-xl font-bold text-Text1">
                Sustainability
              </h5>
              <p className="p-txtbottom text-lg text-Text2">
                Emphasizes seasonal, plant-based ingredients and reduces
                reliance on processed foods.
              </p>
            </div>
          </div>
          <div className="mt-4 flex-wrap flex gap-2 w-fit h-fit sm:gap-4">
            <button
              className="py-2 px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={handleLearnMoreClick}
            >
              Learn&nbsp;More
            </button>
            {!session && (
              <button
                className="py-2 px-12 box-border rounded-lg flex items-center justify-center bg-transparent text-P-Green1 border-2 border-P-Green1 hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base"
                onClick={handleSignUpClick}
              >
                Sign&nbsp;Up
              </button>
            )}
          </div>
        </div>
        <div className="image-sidesavemoney" id="imageabout">
          <div className="image">
            <div
              className="img-2savemoney"
              style={{
                backgroundImage: `url(${lastimg})`,
                transform: `scaleX(1)`,
              }}
            >
              <Image
                className="favicon-2"
                src={Favicon.src}
                alt=""
                style={{ transform: `scaleX(1)` }}
              />
            </div>
          </div>
        </div>
      </div> */}
      <Tab />
      <Cta
        title="Still have Questions?"
        description="Feel free to reach out to us."
      />
      <Footer />
      <CopyRight />
    </div>
  );
};

export default page;
