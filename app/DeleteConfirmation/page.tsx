import React from 'react'
import DeleteConfirmation from './DeleteConfirmation'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Confirm Account Deletion" description='Confirm your action to permanently delete your account or data from gbMeals.Confirm your action to permanently delete your account or data from gbMeals.'>

    <DeleteConfirmation/>
    </RootLayout>
  )
}

export default page
