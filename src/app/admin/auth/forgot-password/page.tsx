import React from 'react';
import { Metadata } from 'next';
import AdminForgetPassword from '@/components/auth/admin/forgot-password';
import DrawerPhones from '@/src/components/shared/drawer.phones.component';

export const metadata: Metadata = {
  title: 'Forget Password'
};

export default async function ForgetPassword() {
  return (
    <>
      <AdminForgetPassword />
      <DrawerPhones />
    </>
  );
}
