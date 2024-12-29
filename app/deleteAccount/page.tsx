/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useState } from 'react';
import cardbgimg from "../../public/Resource/bgcardimg.png";
import Loader from '../../public/Resource/spinner.svg';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../components/navbar/Navbar';
import Image from 'next/image';

export default function page() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e:any) => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    
      setLoading(true);
      setError("");
      try {
          const response = await axios.post('/api/initiate-delete-account', loginData);
    

          // Store token in local storage
          localStorage.setItem('delAccToken', response.data.token);
          router.push('/DeleteConfirmation');
      } catch (err:any) {
          console.error(err); // Log the entire error
          setError(err.response?.data?.error || "An error occurred");
      } finally {
          setLoading(false);
      }
  };


  return (
    <div>
      <Navbar />
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
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white'
                placeholder='Email Address'
              />
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className='border-2 border-white py-2 px-2 bg-transparent rounded-lg p-2 w-full sm:w-[32rem] placeholder-white text-white'
                placeholder='Password'
              />
              {error && <p className="text-red-500 mt-2">{error}</p>} 
              <div className='flex flex-wrap w-full gap-2 justify-between '>
                <button
                  onClick={handleDelete}
                  className=' py-2 px-12 sm:w-[200px] box-border select-none rounded-lg flex items-center justify-center bg-transparent text-P-white border-2 border-white hover:cursor-pointer text-white font-roboto font-medium text-base'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

