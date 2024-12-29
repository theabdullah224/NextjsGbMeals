/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import "./cta.css";
import { useSession } from "next-auth/react";

interface CtaProps {
  title: string;
  description: string;
}

const Cta: React.FC<CtaProps> = ({ title, description }) => {
  const router = useRouter();
  const { data: session } = useSession();
  // Function to handle the "Contact Us" button click, navigates to the contact us page
  const handleContactUsClick = () => {
    if (session) {
      router.push("/myAccount");
    } else {
      router.push("/plans");
    }
  };


 

  return (
    <div className="ctac">
      <div className="cta1c">
        <div className="citemc">
          <div className="flex gap-8 justify-start flex-col xl:flex-row">
            <div>
              <h3 className="inline-block text-xl border-b-8 border-S-Orange leading-none font-bold mb-[3vh]">Get in Touch</h3>
              <h2 className="ctah2c text-2xl 2xl:text-5xl font-bold">{title}</h2>
              <p className="ctapc text-lg">{description}</p>
              <button
                className="py-2 px-10 rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto !font-medium text-base"
                onClick={handleContactUsClick}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
