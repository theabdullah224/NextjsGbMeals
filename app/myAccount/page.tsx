import React from 'react'
import MyAccount from './MyAccount'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account - gbMeals',
  description: 'Manage your gbMeals account settings, preferences, and subscriptions.',
};



function page() {
  return (

    <MyAccount/>
  )
}

export default page
