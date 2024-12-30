import React from 'react'
import Welcome from './Welcome'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome to gbMeals',
  description: 'Welcome to gbMeals! Start your journey to healthier living with personalized meal planning.',
};

function page() {
  return (
  
    <Welcome/>
  )
}

export default page
