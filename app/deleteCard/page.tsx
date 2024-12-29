/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect } from 'react';
import cardbgimg from '../../public/Resource/bgcardimg.png';
import Loader from '../../public/Resource/spinner.svg';

import axios from 'axios';
import { useSession } from 'next-auth/react';
import Navbar from '../components/navbar/Navbar';
import Image from 'next/image';

interface User {
  email: string;
}

const page: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  // const [email, setEmail] = useState<string>('');
  const {data:session} = useSession()
  const email = session?.user?.email

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user') || '{}');
  //   setEmail(user?.email || '');
  // }, []);

  const handleCancelPlan = async (): Promise<void> => {
    setLoading(true);    
    // setEmail(session?.user?.email);

    try {
      const response = await axios.post('/api/cancel-plan', { email:email });
      setMessage(response.data.message);

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'An error occurred while canceling the plan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await axios.post('/api/delete-card', { email: session?.user?.email });
      setMessage(response.data.message);

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'An error occurred while deleting the card.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCard = async (): Promise<void> => {
    setLoading(true);


    try {
      const response = await fetch('/api/update-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session?.user?.email }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        // Handle different error cases
        if (response.status === 404) {
          setMessage('User not found. Please try logging in again.');
        } else if (response.status === 400 && data.error.includes('No card found')) {
          setMessage('No card found. Please subscribe to a plan first.');
        } else {
          setMessage(data.error || 'An error occurred while updating the card.');
        }

        setTimeout(() => {
          setMessage('');
        }, 3000);
      }
    } catch (error) {
      setMessage('Failed to connect to the server. Please try again later.');
      setTimeout(() => {
        setMessage('');
      }, 3000);
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
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {loading ? (
          <Image src={Loader} alt="Loading..." />
        ) : (
          <>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <button
                aria-label="updatecard"
                  onClick={handleUpdateCard}
                  className="py-2 mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all font-roboto font-medium text-base"
                >
                  Update Card
                </button>
                <button
                aria-label="deletecard"
                  onClick={handleDeleteCard}
                  className="py-2 mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all font-roboto font-medium text-base"
                >
                  Delete Card
                </button>
                <button
                aria-label="cancelplan"
                  onClick={handleCancelPlan}
                  className="py-2 mx-auto md:mx-0 px-8 box-border rounded-lg flex items-center justify-center bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all font-roboto font-medium text-base"
                >
                  Cancel Plan 
                </button>
              </div>
              {message && <p className="text-white bg-black bg-opacity-50 p-2 rounded">{message}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
