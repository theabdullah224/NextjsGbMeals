import React from 'react'
import ForgetPass from './ForgetPass'
import RootLayout from '../layout'
function page() {
  return (

    <RootLayout title="Reset Your Password" description='Reset your password to regain access to your gbMeals account securely.'>

    <ForgetPass/>
    </RootLayout>
  )
}

export default page
