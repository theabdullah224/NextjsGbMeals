import React from 'react'
import Verfication from './Verification'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verification Code - gbMeals',
  description: 'Enter the verification code sent to your email to verify your gbMeals account.',
};

function page() {
  return (

    <Verfication/>
  )
}

export default page
