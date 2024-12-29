"use client"
import React, { useEffect, useState } from "react";
import "./saveMoney.css";
import Favicon from "../../../../public/Resource/favicon.png";
import { useRouter } from "next/navigation";
import Image from "next/image";


// Define the props type for the component
interface CookProps {
  subtitle: string;
  bspecialtext: string;
  specialtext: string;
  aspecialtext: string;
  description: string;
  orderleft: string;
  display: string;
  leftfancy: string;
  descleft: string;
  rightfancy: string;
  righdesc: string;
  orderimg: string;
  bgimg: string;
  imgscale: string;
  left: string;
}

const SaveMoney: React.FC<CookProps> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage for the "user" object
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true); // Set logged-in state to true if a user is found
    } else {
      setIsLoggedIn(false); // Set logged-in state to false if no user is found
    }
  }, []);

  const router = useRouter();

 
  const handleSignUpClick = () => {
    router.push("/plans#form");
  };

  // Save Money Comp
  return (
    <div className="savemoney">
      <div className="left-content-2" style={{ order: `${props.orderleft}` }}>
        <div className="contentsave">
          <p className="inline-block mb-8 text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1 ">{props.subtitle}</p>
          <h3 className="txt-1savemoney text-2xl 2xl:text-5xl font-bold text-Text1">
            {props.bspecialtext}
            <span className="specialtxt text-P-Green1">{props.specialtext}</span>
            {props.aspecialtext}
          </h3>
          <p className="p-txtsavemoney text-lg text-Text2">{props.description}</p>
        </div>

        <div className="mainsave">
          <div className="leftsave" style={{ display: `${props.display}` }}>
            <h5 className="fancy1leftsavemoney mb-4 text-xl font-bold text-Text1">{props.leftfancy}</h5>
            <p className="p-txtbottom text-lg text-Text2">{props.descleft}</p>
          </div>

          <div className="border-r-2 border-P-Green2 ml-2 mr-8"></div>

          <div className="leftsave w-fit" style={{ display: `${props.display}` }}>
            <h5 className="fancy1leftsavemoney mb-4 text-xl font-bold text-Text1">{props.rightfancy}</h5>
            <p className="p-txtbottom w-fit text-lg text-Text2">{props.righdesc}</p>
          </div>
        </div>
        <div className="flex mt-8 gap-6 items-center flex-col sm:flex-row">
          {!isLoggedIn && 
          <button 
          aria-label="signup"
          className="py-2 px-12 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 border-2 border-P-Green1 hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base" onClick={handleSignUpClick}>
            Sign&nbsp;Up
          </button>}
        </div>
      </div>
      <div className="image-sidesavemoney" style={{ order: `${props.orderimg}` }}>
        <div className="image">
          <div
            className="img-2savemoney"
            style={{
              backgroundImage: `url(${props.bgimg})`,
              transform: `scaleX(${props.imgscale})`,
              left: `${props.left}`,
            }}
          >
            <Image
             loading="lazy"
              className="favicon-2"
              src={Favicon}
              alt=""
              style={{ transform: `scaleX(${props.imgscale})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveMoney;
