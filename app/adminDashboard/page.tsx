import React from 'react'
import AdminPage from './components/adminpage'
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'gbMeals Admin',
  description: 'Access the administrative panel for managing users, content, and services at gbMeals.',
};

function page() {
  return (

        <AdminPage/>
 
  )
}

export default page
