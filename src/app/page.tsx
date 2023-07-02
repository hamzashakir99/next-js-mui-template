'use client';
import React from 'react';
import {  Container } from '@mui/material';

import ContactChatWidget from '@/src/components/widget/chat/contact';
export default function Home() {
  return (
    <>
      <Container component='main' maxWidth='xl'></Container>
      <ContactChatWidget />
    </>
  );
}
