/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Loader from '../../../../public/Resource/spinner.svg'
import './loader.css'
import Image from 'next/image'
function Svgloader() {
  return (
    <div>
        <Image className='loader' src={Loader} alt="" />
    </div>
  )
}

export default Svgloader