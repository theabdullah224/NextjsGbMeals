import React from 'react'
import CookiesSetting from './Cookies&Settings'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookies Management - gbMeals',
  description: 'Control your cookie preferences and ensure privacy while browsing gbMeals.',
};

function page() {
  return (

      <CookiesSetting/>
    
  )
}

export default page
