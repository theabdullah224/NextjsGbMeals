import React from 'react'
import Plans from './Plans'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup - gbMeals',
  description: 'Sign up for gbMeals to begin your journey to better health with personalized meal plans.',
};

function page() {
  return (

    <Plans/>
  )
}

export default page
