import React from 'react'
import DeleteCard from './DeleteYourCard'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Delete Your Card" description='Remove a payment card from your gbMeals account for billing purposes.'>

   <DeleteCard/>
    </RootLayout>
  )
}

export default page
