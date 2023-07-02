'use client';
import React from 'react';
import { Container } from '@mui/material';

import { useSelector } from 'react-redux';

import ForgetPasswordStep2 from './Step2';
import ForgetPasswordStep1 from './Step1';
export default function AdminForgetPassword() {
  const authSlice = useSelector((state: any) => state.authSlice);

  const { action } = authSlice;

  return (
    <Container>
      {authSlice[action].step === 1 ? (
        <ForgetPasswordStep2 />
      ) : (
        <ForgetPasswordStep1 />
      )}
    </Container>
  );
}
