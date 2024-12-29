import React from 'react'
import AdminPage from './components/adminpage'
import RootLayout from '../layout'
function page() {
  return (
    <RootLayout title="gbMeals-Admin" description="Access the administrative panel for managing users, content, and services at gbMeals.">

        <AdminPage/>
    </RootLayout>
 
  )
}

export default page
