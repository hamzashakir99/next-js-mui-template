import React, { ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import CommonComponent from '@/src/components/shared/common.component';
import './globals.scss';
import { ChangeAuthReduxAction } from '@/components/utils/common';

import {
  NextAuthProvider,
  ReduxStoreProvider,
  ThemeProvider,
  DomainProvider,
  SocketProvider,
} from '@/lib/index';
import Alert from '@/components/Alert';
import BackdropLoader from '@/components/Backdrop';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayoutDep({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <ReduxStoreProvider>
        <ThemeProvider>
          <body>
            <ChangeAuthReduxAction />
            <NextAuthProvider>
              <DomainProvider />
              <SocketProvider>
              <CommonComponent />
              <BackdropLoader />
              <Alert />
              {children}
              <Analytics />
              </SocketProvider>
            </NextAuthProvider>
          </body>
        </ThemeProvider>
      </ReduxStoreProvider>
    </html>
  );
}
