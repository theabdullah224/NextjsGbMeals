"use client"
import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Form from '../components/form/Form'
import  { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'
import './plans.css'

// import FrontPage from './FrontPage'
import Plansimg from './Resource/plans.jpg'
// import CardNavigator from './Card'
// import { Form } from 'react-router-dom'

// import Cta from './Cta'
// import Footer from './Footer'
// import Copyright from './Copyright'
// import { useLocation } from 'react-router-dom';


// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// plans comp


function page() {
  // const location = useLocation();
 


  const formRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();


//   useEffect(() => {
//     // Check if the URL contains the #form hash
//     if (location.hash === '#form') {
//       const element = document.getElementById('form');
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [location]);

useEffect(() => {
    // Access the hash from the URL
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#form") {
        const element = document.getElementById("form");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, []);


  return (
    <div id='plan'>
      <Navbar/>     
      
      <div id='form'>
        <Form/> {/* card component */}
      </div>      
       </div>
  )
}

export default page
