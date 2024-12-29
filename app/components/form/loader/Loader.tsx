/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Loader from '../../../../public/Resource/spinner.svg'
import './loader.css'
function Svgloader() {
  return (
    <div>
        <img className='loader' src={Loader} alt="" />
    </div>
  )
}

export default Svgloader