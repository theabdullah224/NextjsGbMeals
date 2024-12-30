import React from 'react'
import DeleteAccount from './DeleteAccount'


import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Account - gbMeals',
  description: 'Permanently delete your account and all related data from gbMeals.',
};


function page() {
  return (

   <DeleteAccount/>
  )
}

export default page
