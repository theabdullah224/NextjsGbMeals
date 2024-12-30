import React from 'react'
import DeleteConfirmation from './DeleteConfirmation'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Delete Confirmation - gbMeals',
  description: 'Confirm your action to permanently delete your account or data from gbMeals.',
};



function page() {
  return (

    <DeleteConfirmation/>
  )
}

export default page
