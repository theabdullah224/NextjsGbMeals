/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import "./weeklyOverlap.css";
import Favicon from '../../../public/Resource/favicon.png';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

interface WeeklyOverlapProps {
  bgimg: string;
  subtitle: string;
  title: string;
  titlefont: string;
  description: string;
  inputdisplay: string;
  downbtndescription: string;
  btndisplay: string;
  bgfront: string;
  displayfvicon: string;
}

const WeeklyOverlap: React.FC<WeeklyOverlapProps> = ({
  bgimg,
  subtitle,
  title,
  titlefont,
  description,
  inputdisplay,
  downbtndescription,
  btndisplay,
  bgfront,
  displayfvicon,
}) => {
  const {data:session} = useSession()
  const router = useRouter(); // Use Next.js router



  const handleSignUpClick = () => {
    router.push('/plans#form'); // Using Next.js router for navigation
  };

  return (
    <div className="weeklyoverlap">
      <div className="weekly" style={{ backgroundImage: `url(${bgimg})` }}>
        <div className="colorweekly">
          <div className="itemweekly">
            <h4 className=" text-2xl border-b-8 border-S-Orange leading-none font-bold ">
              {subtitle}
            </h4>
            <h2
              className="txt-h2weekly  text-2xl 2xl:text-5xl font-bold"
         
            >
              {title}
            </h2>
            <p className="mdtweekly text-lg font-normal">{description}</p>

            <div
              className="flex flex-col items-center justify-center"
              style={{ display: inputdisplay }}
            >
              <div className="flex flex-col mx-auto w-fit">
                <input
                  className="bg-transparent border-2 border-white py-3 text-xl px-8 sm:w-[50vw] placeholder-white rounded-lg"
                  type="email"
                  placeholder="Enter Your Email Address"
                />

                <button
                  className="mt-4 sm:w-[50vw] py-3 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] font-roboto font-medium text-base"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
              </div>

              <p className="mdtweekly text-lg">{downbtndescription}</p>
            </div>

            <div
              className="flex mt-8 gap-6 items-center flex-col sm:flex-row"
              style={{ display: btndisplay }}
            >
              {!session && (
                <button
                  className="py-2 px-12 box-border rounded-lg flex items-center justify-center text-white border-2 border-white hover:text-P-Green1 hover:bg-white font-roboto font-medium text-base"
                  onClick={handleSignUpClick}
                >
                  Sign&nbsp;Up
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-img"
        style={{ backgroundImage: `url(${bgfront})` }}
      >
        <Image
          className="wfv"
          src={Favicon}
          alt="Favicon"
          style={{ display: displayfvicon }}
        />
      </div>
    </div>
  );
};

export default WeeklyOverlap;
