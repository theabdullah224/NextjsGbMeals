/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { signIn, useSession } from "next-auth/react"; // Import signIn from NextAuth
import cardbgimg from "../../public/Resource/bgcardimg.png";
import Loader from "../../public/Resource/spinner.svg";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface LoginData {
  email: string;
  password: string;
}

export default function page() {
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  // const [isAdmin, setIsAdmin] = useState<boolean | string>("");
  const router = useRouter();
  const { data: session } = useSession();
  
  const navi = () => {
    router.push("/forgetPass");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call the NextAuth signIn function
      const result = await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: false, // Prevent automatic redirection
      });

      if (result?.error) {
        setError(result.error);
      }
       else {
        // Redirect to dashboard or desired page
        
        router.push("/myAccount");
      }
      // if (session?.user?.role === "admin") {
      //   router.push("/AdminDashboard");
        
      // } else if(session?.user?.role === "user") {
      //   router.push("/myAccount");
      // }
    } catch (error: any) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();
  //   handleLogin(); // Calls your login function
  // };

  return (
    <div>
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
            <div className="flex flex-wrap mt-4 gap-2 flex-col items-center sm:items-start">
              <h1 className="text-2xl border-b-8 border-S-Orange leading-none font-bold text-white">Log In</h1>
              <form action="" onSubmit={handleSubmit} className="flex flex-wrap mt-4 gap-2 flex-col items-center sm:items-start">
                <input type="email" name="email" value={loginData.email} onChange={handleChange} className="border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white" placeholder="Email Address" />
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white"
                  placeholder="Password"
                />
                {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error message display */}
                <div className="flex flex-wrap w-full gap-2 justify-between ">
                  <span onClick={navi} className="text-white hover:cursor-pointer">
                    Forgot password?
                  </span>
                  <button
                  aria-label="login"
                    type="submit"
                    className="py-2 px-12 sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
