import React from 'react'
import Verfication from './Verification'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Verify Your Account" description='Enter the verification code sent to your email to verify your gbMeals account.'>

    <Verfication/>
    </RootLayout>
  )
}

export default page
