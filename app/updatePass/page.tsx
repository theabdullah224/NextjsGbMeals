import React from 'react'
import UpdatePass from './UpdatePass'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Update Password" description='Change your password to keep your gbMeals account secure.'>

   <UpdatePass/>
    </RootLayout>
  )
}

export default page
