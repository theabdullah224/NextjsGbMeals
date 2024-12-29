import React from 'react'
import DeleteAccount from './DeleteAccount'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Delete Your Account" description='Permanently delete your account and all related data from gbMeals.'>

   <DeleteAccount/>
    </RootLayout>
  )
}

export default page
