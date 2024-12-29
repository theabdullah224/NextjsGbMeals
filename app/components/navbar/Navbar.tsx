/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState } from "react";

import logo2 from "../../../public/Resource/logo2.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubscribeClick = (): void => {
    router.push("/plans#form");
  };

  const handleLogoClick = (): void => {
    router.push("/");
  };

  const toggleSidebar = (): void => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleSignOut = async () => {
    await signOut({ 
      redirect: true,  // This will redirect after sign out
      callbackUrl: '/'  // Redirect to home page
    });
  };



  return (
    <div className="relative text-Text1">
      {/* Main header */}
      <div className="sm:px-9 px-4 lg:px-9 py-4 lg:py-7 font-roboto bg-white flex justify-between items-center">
        {/* Logo */}
        <div className="logo flex gap-8" id="top">
          <Image onClick={handleLogoClick} src={logo2} alt="Logo" className="w-28 lg:w-32 hover:cursor-pointer" />
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center">
          <ul className="flex gap-8 font-roboto font-bold items-center text-md">
            {["Home", !session && "Try Free for 30-Days", session ? "My Account" : "Log In", "About Us"].filter(Boolean).map((item, index) => (
              <li key={index}>
                <Link
                  href={item === "Home" ? "/" : item === "Try Free for 30-Days" ? "/mealPlanner" : item === "My Account" ? "/myAccount" : item === "Log In" ? "/login" : item === "About Us" ? "/aboutUs" : ``}
                 
                  className={pathname === (item === "Home" ? "/" : item === "Try Free for 30-Days" ? "/mealPlanner" : item === "My Account" ? "/myAccount" : item === "Log In" ? "/login" : item === "About Us" ? "/aboutUs" : ``) ? "text-S-Orange underline" : "text-Text1 hover:text-S-Orange hover:underline"}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Try Free or Logout button */}
        <div className="ml-8 hidden lg:flex lg:gap-2">
          {!session ? (
            <button
              onClick={handleSubscribeClick}
              className="py-1 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
            >
              Try Free For 30-Days
            </button>
          ) : (
            <button className="py-1 px-7 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base" onClick={handleSignOut}>
              Logout 
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleSidebar} aria-label="menu" className="lg:hidden text-Text1 hover:text-S-Orange">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar for mobile */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden z-50`}>
        <div className="p-5">
          <button onClick={toggleSidebar} className="absolute top-4 right-4 text-Text1 hover:text-S-Orange">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <ul className="mt-8 flex flex-col gap-4 font-roboto font-bold items-start text-base">
            {["Home", !session && "Try Free for 30-Days", session ? "My Account" : "Log In", "About Us"].filter(Boolean).map((item) => (
              <li key={item as string}>
                <Link
                  href={item === "Home" ? "/" : item === "Try Free for 30-Days" ? "/mealPlanner" : item === "My Account" ? "/myAccount" : item === "Log In" ? "/login" : item === "About Us" ? "/aboutUs" : ``}
                  className={pathname === (item === "Home" ? "/" : item === "Try Free for 30-Days" ? "/mealPlanner" : item === "My Account" ? "/myAccount" : item === "Log In" ? "/login" : item === "About Us" ? "/aboutUs" : ``) ? "text-S-Orange underline" : "text-Text1 hover:text-S-Orange hover:underline"}
                  //@ts-ignore
                  // className={({ isActive }) =>
                  //   isActive
                  //     ? "text-S-Orange underline"
                  //     : "text-Text1 hover:text-S-Orange hover:underline"
                  // }
                  onClick={toggleSidebar}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            {!session ? (
              <button
                onClick={() => {
                  handleSubscribeClick();
                  toggleSidebar();
                }}
                className="w-full mt-2 py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              >
                Try Free For 30-Days
              </button>
            ) : (
              <button
                className="mt-2 w-full py-2 px-4 rounded-lg flex items-center justify-center bg-P-Green1 text-white shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
                onClick={handleSignOut}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Navbar;
