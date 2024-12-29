/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import cardbgimg from "../../public/Resource/bgcardimg.png";
import Loader from '../../public/Resource/spinner.svg';
import Navbar from '../components/navbar/Navbar';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';


function page() {
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // @ts-ignore
  const [token, setToken] = useState(null);

  useEffect(() => {
    // This will only run on the client side
    const storedToken = localStorage.getItem('delAccToken');
    setToken(storedToken);
  }, []);
  

  const handleVerifyCode = async () => {
    setLoading(true);
    setError("");
    try {
      await axios.post('/api/confirm-delete-account', { verification_code: verificationCode }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // @ts-ignore
      localStorage.removeItem('delAccToken')
      await signOut({ 
        redirect: true,  // This will redirect after sign out
        callbackUrl: '/'  // Redirect to home page
      });
      router.push("/"); 
      
      alert("Account Deleted Successfuly");
    } catch (err:any) {
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className='overflow-x-hidden'>
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
            <div className='flex flex-wrap mt-4 gap-2 flex-col items-start w-full sm:w-fit'>
              <h1 className='text-2xl border-b-8 border-S-Orange leading-none font-bold text-white'>Delete Account</h1>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white'
                placeholder='Enter Code'
              />
              {error && <p className="text-red-500">{error}</p>}
              <div className='flex flex-wrap w-full gap-2 justify-between'>
                <button
                aria-label="delete"
                  onClick={handleVerifyCode}
                  className='py-2 px-12 sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base'
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default page
