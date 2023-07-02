import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';

import { serverInstance, CustomError } from '@/lib/index';

export const authOptions = {
  pages: {
    signIn: '/admin/auth/login'
    // signOut: '/auth/sign-out',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "admin-login",
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: { label: 'Phone', type: 'phone' },
        password: { label: 'Password', type: 'password' },
        domain: { label: 'Domain', type: 'text' },
      },
      async authorize(credentials) {
        try {
          // Add logic here to look up the user from the credentials supplied
          const res: any = await serverInstance.post(
            `/api/v1/admin/company/auth/login?domain=${credentials?.domain}`,
            {
              login_by: 'phone',
              identity: credentials?.phone,
              password: credentials?.password,
              domain: credentials?.domain
            }
          );
          if (res.status == 200 && res.data.is_success) {
            cookies().set('token', res.data.data.token, { secure: true });
            // Any object returned will be saved in `user` property of the JWT
            return res.data.data;
          } else {
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            throw new CustomError(res.data.message, res.status);
          }
        } catch (error) {
          console.error(error);
          if (error instanceof CustomError) {
            throw new Error(JSON.stringify(error));
          } else {
            throw new Error(
              JSON.stringify({
                errors: 'Failed to authenticate. Please try again.',
                status: 500
              })
            );
          }
        }
      }
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      id: "agent-login",
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: { label: 'Phone', type: 'phone' },
        password: { label: 'Password', type: 'password' },
        domain: { label: 'Domain', type: 'text' },
        user_name: { label: 'Username', type: 'text' }
      },
      async authorize(credentials) {
        try {
          // Add logic here to look up the user from the credentials supplied
          const res: any = await serverInstance.post(
            `/agent/company/auth/login?domain=${credentials?.domain}`,
            {
              user_name: credentials?.user_name,
              password: credentials?.password,
              domain: credentials?.domain
            }
          );
          if (res.status == 200 && res.data.is_success) {
            cookies().set('token', res.data.data.token, { secure: true });
            // Any object returned will be saved in `user` property of the JWT
            return res.data.data;
          } else {
            // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            throw new CustomError(res.data.message, res.status);
          }
        } catch (error) {
          console.error(error);
          if (error instanceof CustomError) {
            throw new Error(JSON.stringify(error));
          } else {
            throw new Error(
              JSON.stringify({
                errors: 'Failed to authenticate. Please try again.',
                status: 500
              })
            );
          }
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },

    async session({ session, token }: any) {
      session.user = token;
      return session;
    }
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
