import React from 'react'
import MyAccount from './MyAccount'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Your Account | gbMeals" description='Manage your gbMeals account settings, preferences, and subscriptions.'>

    <MyAccount/>
    </RootLayout>
  )
}

export default page
