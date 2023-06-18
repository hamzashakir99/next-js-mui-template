import React from 'react'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'

import LoginScreen from '@/screens/auth/login'
import { authOptions } from '@/api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'Login'
}

export default async function signIn() {
  const session = await getServerSession(authOptions)
  console.log('session')
  console.log(session)
  /*if (session) {
    redirect('/profile')
  }*/
  return <LoginScreen />
}
