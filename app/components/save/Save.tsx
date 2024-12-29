/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// import Favicon from '../../../public/Resource/favicon.png';
import Favicon from '../../../public/Resource/favicon.png';
import icon1 from '../../../public/Resource/garbage 1.svg';
import icon2 from '../../../public/Resource/garbage 2.svg';
import icon3 from '../../../public/Resource/garbage 3.svg';
import { useRouter } from 'next/navigation';
import './save.css';
import { useSession } from 'next-auth/react';

interface SaveProps {
  srcimg: string;
}

const Save: React.FC<SaveProps> = ({ srcimg }) => {
  const {data:session}= useSession()
  const router = useRouter();

 

  const handleLearnMoreClick = () => {
    router.push('/tryfreefor30-days#faqs'); // Navigate to Mealplans route
  };

  const handleSignUpClick = () => {
    router.push('/plans#form');
  };

  return (
    <div className="save">
      <div className="left-contentsave">
        <div className="contentsave">
          <p className="fancys text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1">Save</p>
          <h3 className="txt-s text-2xl 2xl:text-5xl font-bold text-Text1" lang="en">
            Save Money And Eat Well With <span className="text-P-Green1">Meal Planning</span>
          </h3>
          <p className="p-txts text-lg text-Text2">
            Efficient meal planning can lead to significant cost savings by reducing food waste and avoiding unnecessary
            purchases. With our 6-day meal planner, you&apos;ll have a clear plan for your meals, ensuring you only buy what
            you need and making the most of your ingredients.
          </p>
        </div>
        <div className="main">
          <div className="itemssave max-w-[35rem]">
            <div className="onesave">
              <Image src={icon1} alt="" className="icon1" />
              <p className="ponesave text-lg text-Text2">Reduce Food Waste</p>
            </div>
            <div className="onesave">
              <Image src={icon2} alt="" className="icon1" />
              <p className="ponesave text-lg text-Text2">Avoid Unnecessary Purchases</p>
            </div>

            <div className="onesave">
              <Image src={icon3} alt="" className="icon1" />
              <p className="ponesave text-lg text-Text2">Make the Most of Your Ingredients</p>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-col sm:flex-row">
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
      </div>
      <div className="image-sidesavec">
        <div className="image">
          <div className="imgd" style={{ backgroundImage: `url(${srcimg})` }}>
            <Image className="favicon11" src={Favicon} width={100} alt="" />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Save;
