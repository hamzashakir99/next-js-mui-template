'use client';
import React from 'react';
import { Container } from '@mui/material';

import AuthNavigationHeader from '@/src/components/auth/auth.navigation.header';
import { ChangeForgotAuthSearchParams } from '@/components/utils/common';
export default function AdminLayout({
  children 
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      maxWidth='sm'
      sx={{
        pt: '40px',
        pb: '40px'
      }}
    >

      <ChangeForgotAuthSearchParams />
      <AuthNavigationHeader />
      {children}
    </Container>
  );
}
