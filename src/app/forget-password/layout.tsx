'use client'
import React from 'react'
import { Box } from '@mui/material'
import AuthNavigationHeader from '@/src/components/headers/auth.navigation.header'

export default function AdminLayout({
  children // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <Box>
      <AuthNavigationHeader />
      {children}
    </Box>
  )
}
