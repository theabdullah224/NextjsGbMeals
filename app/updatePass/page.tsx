import React from 'react'
import UpdatePass from './UpdatePass'
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Update Password - gbMeals',
  description: 'Change your password to keep your gbMeals account secure.',
};



function page() {
  return (

   <UpdatePass/>
  )
}

export default page
