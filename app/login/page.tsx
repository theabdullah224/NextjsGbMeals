import React from 'react'
import Login from './Login'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Login to gbMeals" description='Log into your gbMeals account to access personalized meal plans and health insights.'>

    <Login/>
    </RootLayout>
  )
}

export default page
