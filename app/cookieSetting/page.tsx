import React from 'react'
import CookiesSetting from './Cookies&Settings'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="Manage Cookies Settings" description='Control your cookie preferences and ensure privacy while browsing gbMeals.'>

      <CookiesSetting/>
    </RootLayout>
    
  )
}

export default page
