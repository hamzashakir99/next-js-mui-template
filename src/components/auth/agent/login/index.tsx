'use client';

import React from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';

import LoginStep1 from './step1';
import LoginStep2 from './step2';

export default function AdminLogin() {
  const authSlice = useSelector((state: any) => state.authSlice);
  const { action } = authSlice;

  return (
    <Container>
      {authSlice[action].step === 1 ? <LoginStep2 /> : <LoginStep1 />}
    </Container>
  );
}
