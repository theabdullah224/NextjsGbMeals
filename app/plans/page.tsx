import React from 'react'
import Plans from './Plans'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Join gbMeals" description='Sign up for gbMeals to begin your journey to better health with personalized meal plans.'>

    <Plans/>
    </RootLayout>
  )
}

export default page
