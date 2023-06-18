import React, {
  ReactNode /*, Children, ReactElement, cloneElement*/
} from 'react'
import { Inter } from 'next/font/google'

import './globals.scss'

import {
  NextAuthProvider,
  ReduxStoreProvider,
  ThemeProvider,
  ReactQueryProvider
} from '@/lib/index'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayoutDep({ children }: { children: ReactNode }) {
  return (
    <ReduxStoreProvider>
      <html lang='en'>
        <ThemeProvider>
          <body className={inter.className}>
            <NextAuthProvider>
              <ReactQueryProvider>
                {children}
              </ReactQueryProvider>
            </NextAuthProvider>
          </body>
        </ThemeProvider>
      </html>
    </ReduxStoreProvider>
  )
}