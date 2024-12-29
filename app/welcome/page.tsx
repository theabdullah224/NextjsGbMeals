import React from 'react'
import Welcome from './Welcome'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Welcome to gbMeals" description='Welcome to gbMeals! Start your journey to healthier living with personalized meal planning.'>

    <Welcome/>
    </RootLayout>
  )
}

export default page
