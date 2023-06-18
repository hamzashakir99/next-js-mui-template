'use client'
import React from 'react'
import { Container } from '@mui/material'
import AuthNavigationHeader from '@/src/components/headers/auth.navigation.header'

export default function RegisterLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <Container
      maxWidth='sm'
      sx={{
        pt: '40px',
        pb: '40px'
      }}
    >
      <AuthNavigationHeader/>
      {children}
    </Container>
  )
}
