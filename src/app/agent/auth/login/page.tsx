import React from 'react';
import { Metadata } from 'next';

import AgentLogin from '@/components/auth/agent/login';

export const metadata: Metadata = {
  title: 'Agent Login'
};

export default async function signIn() {
  return (
    <>
      <AgentLogin />
    </>
  );
}
