"use client";
import React  from "react";
import "./SaveMoney.css";
import Favicon from "../../../public/Resource/favicon.png";
// import { useNavigate } from "react-router-dom";
// import useStore from './Store';
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

function SaveMoney(props) {
  const { data: session } = useSession();
  

  const router = useRouter();


  const handleSignUpClick = () => {
    router.push("/plans");
  };

  // Save Money Comp
  return (
    <div className="savemoney">
      <div className="left-content-2" style={{ order: `${props.orderleft}` }}>
        <div className="contentsave">
          <p className="inline-block mb-8 text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1">{props.subtitle}</p>
          <h3 className="txt-1savemoney text-2xl 2xl:text-5xl font-bold text-Text1">
            {props.bspecialtext}
            <span className="specialtxt text-P-Green1">{props.specialtext}</span>
            {props.aspecialtext}
          </h3>
          <p className="p-txtsavemoney text-lg text-Text2">{props.description}</p>
        </div>

        <div className="mainsave  w-full ">
          <div className="leftsave  w-1/2" style={{ display: `${props.display}` }}>
            <h5 className="fancy1leftsavemoney mb-4 text-xl font-bold text-Text1">{props.leftfancy}</h5>
            <p className="p-txtbottom text-lg text-Text2 ">{props.descleft}</p>
          </div>

          <div className="border-r-2 border-P-Green2 ml-2 mr-8"></div>

          <div className="leftsave w-1/2" style={{ display: `${props.display}` }}>
            <h5 className="fancy1leftsavemoney mb-4 text-xl font-bold text-Text1">{props.rightfancy}</h5>
            <p className="p-txtbottom w-fit text-lg text-Text2">{props.righdesc}</p>
          </div>
        </div>
        <div className="flex  mt-8 gap-6 items-center flex-col sm:flex-row  ">
          {/* <button className=" py-2 px-10 box-border rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" onClick={handleLearnMoreClick}>
            Learn&nbsp;More
          </button> */}
          {!session && (
            <button
            
             aria-label="signup"
            className=" py-2 px-12 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 border-2 border-P-Green1  hover:bg-P-Green1 hover:text-white font-roboto font-medium text-base" onClick={handleSignUpClick}>
              Sign&nbsp;Up
            </button>
          )}
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
            priority
            
            className="favicon-2" src={Favicon} alt="Favicon" style={{ transform: `scaleX(${props.imgscale})` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveMoney;
