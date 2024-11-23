"use client"
import React from 'react'
import Image from 'next/image' // Optional: Use Next.js Image optimization
import './reciptComp.css'

// Define a type for the props
interface ReciptcompProps {
  ricon: string;
  title: string;
  description: string;
}

const Reciptcomp: React.FC<ReciptcompProps> = ({ ricon, title, description }) => {
  return (
    <div className="Reciptcomp">
      <div className="lefticonrec">
        {/* If you want to use Next.js's Image optimization */}
        <Image className="mt-6 w-16 sm:w-36" src={ricon} alt={title} width={100} height={100} />
      </div>
      <div className="righttext">
        <h3 className="rh3recipt text-xl font-bold">{title}</h3>
        <p className="rprecipt text-lg">{description}</p>
      </div>
    </div>
  )
}

export default Reciptcomp;
