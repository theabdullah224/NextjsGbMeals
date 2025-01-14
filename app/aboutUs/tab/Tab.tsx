/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useRef } from 'react';
import './tab.css';
import lady from '../../../public/Resource/ladywithapple.jpg';


const Tab: React.FC = () => {
  const heading2Ref = useRef<HTMLElement | any>(null);
  const heading3Ref = useRef<HTMLElement | any>(null);
  const heading4Ref = useRef<HTMLElement | any>(null);
  const heading5Ref = useRef<HTMLElement | any>(null);
  const heading6Ref = useRef<HTMLElement | any>(null);

  const scrollToHeading = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="tabimg">
      <div className="colortab">
        <div className="tableft">
          <div className="tabheadingscontent">
            <h1 className="fancys text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1">
              Our Story
            </h1>
            <button
             aria-label="Health"
           
              className="w-full py-2 px-8 sm:px-16 mb-2 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={() => scrollToHeading(heading2Ref)}
            >
              Health&nbsp;Journey
            </button>
            <button
             aria-label="problem"
              className="w-full py-2 px-8 sm:px-16 mb-2 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={() => scrollToHeading(heading3Ref)}
            >
              The&nbsp;Problem
            </button>
            <button
             aria-label="Solution"
              className="w-full py-2 px-8 sm:px-16 mb-2 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={() => scrollToHeading(heading4Ref)}
            >
              Our&nbsp;Solution
            </button>
            <button
             aria-label="joinus"
              className="w-full py-2 px-8 sm:px-16 mb-2 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={() => scrollToHeading(heading5Ref)}
            >
              Join&nbsp;Us
            </button>
          </div>
        </div>
        <div className="tabright">
          <h2 ref={heading2Ref} className="text-2xl sm:text-3xl font-bold text-Text1">
            My Journey to Health: A Story of Transformation
          </h2>
          <p className="text-sm sm:text-lg text-Text2">
            At 27 years old, I was sedentary, overweight, and deeply unhappy. My turning point came one day when I bent down to plug in a charger and pulled a muscle. It was a wake-up call—I realized I needed to make a change.
          </p>
          <p className="text-sm sm:text-lg text-Text2">
            I began my transformation journey by focusing on my eating habits. I swapped processed foods for fresh, wholesome meals, and the impact was immediate. As I continued to refine my diet, I started incorporating regular exercise and prioritizing good sleep. These changes were challenging, but each step forward brought me closer to feeling healthier and happier.
          </p>
          <p className="text-sm sm:text-lg text-Text2">
            Now, at 31, I’m in the best shape of my life. I feel great, both physically and mentally. Nutrition has been one of the main pillars of my journey, proving to me just how powerful food can be. It’s this experience that inspired the creation of gbmeals.
          </p>

          <h3 ref={heading3Ref} className="text-xl sm:text-3xl font-bold text-Text1">
            The Problem
          </h3>
          <p className="text-sm sm:text-lg text-Text2">
            Today, many people face similar struggles. Our fast-paced society often leads to poor eating habits, lack of exercise, and inadequate sleep, contributing to widespread issues like obesity, diabetes, and heart disease. Additionally, the abundance of processed foods makes it hard for individuals to make healthy choices.
          </p>

          <h4 ref={heading4Ref} className="text-lg sm:text-2xl font-bold text-Text1">
            Our Solution
          </h4>
          <p className="text-sm sm:text-lg text-Text2">
            At gbmeals, we are dedicated to addressing these societal problems. Our meal plans are designed to make healthy eating simple and accessible, empowering you to make informed dietary choices. By using the latest technology, we provide you with personalized meal plans that cater to your nutritional needs and preferences. Our goal is to make your life healthier, happier, and easier by offering a convenient solution to balanced, nutritious eating.
          </p>

          <div className="image">
            <div
              ref={heading5Ref}
              className="img"
              id="imgtab"
              style={{
                backgroundImage: `url(${lady.src})`,
                marginBottom: '10vh',
                width: '40vw',
                height: '70vh',
              }}
            ></div>
          </div>
          <h5 className="text-lg sm:text-xl font-bold text-Text1">Join Us</h5>
          <p className="text-sm sm:text-lg text-Text2">
            Join us at gbmeals and take the first step towards transforming your life, one meal at a time. Together, we can overcome the challenges of modern living and achieve optimal health.
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Tab;
