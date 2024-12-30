import React from 'react'
import Login from './Login'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - gbMeals',
  description: 'Log into your gbMeals account to access personalized meal plans and health insights.',
};



function page() {
  return (

    <Login/>
  )
}

export default page
