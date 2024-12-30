import React from 'react'
import DeleteCard from './DeleteYourCard'



import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Card - gbMeals',
  description: 'Remove a payment card from your gbMeals account for billing purposes.',
};

function page() {
  return (

   <DeleteCard/>
  )
}

export default page
