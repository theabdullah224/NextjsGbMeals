import React from 'react'
import ForgetPass from './ForgetPass'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forget Password - gbMeals',
  description: 'Reset your password to regain access to your gbMeals account securely.',
};



function page() {
  return (


    <ForgetPass/>
  )
}

export default page
