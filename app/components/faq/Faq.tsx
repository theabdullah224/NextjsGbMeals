/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import React from 'react'; // Importing React library
import './faq.css'; // Importing the stylesheet for this component
import Faqcomp from '../faqComp/faqComp'; // Importing the Faqcomp component

// Define the prop types for the Faq component
interface FaqProps {
  description: string;
  question1: string;
  ans1: string;
}

const Faq: React.FC<FaqProps> = ({ description, question1, ans1 }) => {
  return (
    <div className="faqs">
      <div className="inside  2xl:px-[10vw]">
        {/* Background image div */}
        <div className="bgimg"></div>

        {/* FAQ title with a border and text styling */}
        <h3 className='text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1 !mb-[3vh]'>FAQ&apos;s</h3>
        
        {/* Main title with dynamic coloring */}
        <h3 className='text-center text-2xl 2xl:text-5xl  font-bold text-Text1 !mb-[3vh]' lang="en">
          Frequently <span className='text-P-Green1'> Asked</span> Questions
        </h3>
        
        {/* Description paragraph */}
        <p className='text-lg max-w-[40rem] text-center mb-2 text-Text2'>{description}</p>

        {/* Rendering FAQ components with questions and answers passed as props */}
        <div className="ques ">
          
          <Faqcomp 
          // @ts-ignore
          question={question1} ans={ans1} />
        </div>
      </div>
    </div>
  );
};

export default Faq; 
