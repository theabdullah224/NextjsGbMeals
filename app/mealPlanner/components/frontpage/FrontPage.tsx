/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React from 'react'; 
import './frontPage.css'; 
import favicon from '../../../../public/Resource/sbscribefreefavicon.png'; 
import { useRouter } from 'next/navigation';
import useStore from '../../../components/store/Store';
import Image from 'next/image';


interface FrontPageProps {
  bgimg: string;
  title: string;
  description: string;
  display: string;
  btndisplay: string;
}

const FrontPage: React.FC<FrontPageProps> = (props) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  // Next.js's router hook for navigation
  const router = useRouter();

  // Function to navigate to the "Learn More" page
  const handleLearnMoreClick = () => {
    router.push('/tryfreefor30-days#faqs');
  };

  // Function to navigate to the "Sign Up" page
  const handleSignUpClick = () => {
    router.push('/plans#form');
  };

  return (
    <div
      className="frontpage"
      style={{ backgroundImage: `url('${props.bgimg}')` }} 
    >
      <div className="colorpage">
        <div className="fitems">
          {/* Display the title passed via props */}
          <h1 className="mb-4 sm:w-[42vw] text-5xl 2xl:text-6xl font-bold">{props.title}</h1>
          {/* Display the description passed via props */}
          <p className="sm:w-[42vw] text-lg">{props.description}</p>
          {/* Display the favicon image if the display style is not 'none' */}
          <Image className="faviconfitem" src={favicon} alt="favicon" style={{ display: `${props.display}` }} />
          <div
            className="flex w-fit gap-2 sm:gap-4 flex-wrap mt-4 h-fit"
            style={{ display: `${props.btndisplay}` }}
          >
            {/* Button to navigate to the "Learn More" page */}
            {/* <button
              className="mt-5 m-auto xl:m-0 py-2 px-10 box-border rounded-lg flex items-center justify-center bg-white text-P-Green1 shadow-[inset_4px_4px_8px_#2a322179] hover:shadow-[inset_0px_0px_0px_#2A3221] font-roboto font-medium text-base"
              onClick={handleLearnMoreClick} // Attach the click handler
            >
              Learn&nbsp;More
            </button> */}
            {/* Button to navigate to the "Sign Up" page */}
            {!isLoggedIn && (
              <button
                className="mt-5 m-auto xl:m-0 py-2 px-10 box-border rounded-lg flex items-center justify-center bg-transparent border-2 text-white font-roboto font-medium text-base"
                onClick={handleSignUpClick} // Attach the click handler
              >
                Sign&nbsp;Up
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage; // Exporting the FrontPage component to be used in other parts of the application
