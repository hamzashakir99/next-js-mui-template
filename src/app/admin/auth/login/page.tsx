import React from 'react';
import { Metadata } from 'next';

import AdminLogin from '@/components/auth/admin/login';
import DrawerPhones from '@/src/components/shared/drawer.phones.component';

export const metadata: Metadata = {
  title: 'Admin Login'
};

export default async function signIn() {
  return (
    <>
      <AdminLogin />
      <DrawerPhones />
    </>
  );
}
