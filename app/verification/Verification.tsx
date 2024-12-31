/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import axios from "axios";
import cardbgimg from "../../public/Resource/bgcardimg.png";
import Loader from "../../public/Resource/spinner.svg";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "../components/navbar/Navbar";
import Image from "next/image";

export default function page() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const handleVerifyCode = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "/api/verifyForgetPass",
        {
          verification_code: verificationCode,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

     

      if (response.status === 200) {
        const { reset_token } = response.data;
        localStorage.setItem("reset_token", reset_token);
        router.push("/updatePass");
      }
    } catch (error:any) {
      if (error.response) {
        setError(error.response.data.error || "An error occurred. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar/>
      <div
        className="w-screen h-screen flex flex-col items-center justify-center p-6"
        style={{
          backgroundImage: `url(${cardbgimg.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {loading ? (
          <Image src={Loader} alt="Loading..." className="" />
        ) : (
          <>
            <div className="flex flex-wrap mt-4 gap-2 flex-col items-start">
              <h1 className="text-2xl border-b-8 border-S-Orange leading-none font-bold text-white">Enter Verification Code</h1>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white"
                placeholder="Enter Code"
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-wrap w-full gap-2 justify-between">
                <button
                aria-label="submit"
                  onClick={handleVerifyCode}
                  className="py-2 px-12 sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


