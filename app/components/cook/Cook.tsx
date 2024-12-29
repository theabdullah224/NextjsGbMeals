/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'; // Importing React
import "./cook.css"; // Importing the stylesheet for this component
import Favicon from "../../../public/Resource/favicon.png"; // Importing the favicon image

import Image from 'next/image';

function Cook(props:any) {
  return (
    <div className='cook xl:pt-[10rem] xl:pb-[0rem] py-10'>
        
        {/* Left side content */}
        <div className="left-contentcook">
            <div className="contentcook">
                {/* Subtitle with custom styles */}
                <p className='fancycook text-2xl border-b-8 border-S-Orange leading-none font-bold text-Text1 '>{props.subtitle}</p>
                {/* Title with special text highlighting */}
                <h3 className='txt-1cook text-2xl 2xl:text-5xl font-bold text-Text1' lang="en">
                  Simplify <span className='specialtxt text-P-Green1'> Your Life </span>  With Our Convenient And 
                  <span className='specialtxt text-P-Green1'> Healthy Meal Planning </span>Service
                </h3>
                {/* Description text */}
                <p className='p-txtcook text-lg text-Text2'>{props.description}</p>
            </div>
        </div>

        {/* Right side image */}
        
        <div className="image-sidecook">
            <div className="image">
                <div className="imgcook" style={{backgroundImage:`url(${props.srcimg})`}}>
                    {/* Favicon image */}
                    <Image className='faviconcook' src={Favicon} alt="" />
                </div>
            </div>
        </div>
        
        
    </div>
  )
}

export default Cook; // Exporting the Cook component as the default export
