import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from 'next/headers'

import { /*serverInstance,*/ CustomError } from "@/lib/index";

export const authOptions = {
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        phone: { label: "Phone", type: "phone" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Add logic here to look up the user from the credentials supplied
          /*const res = await serverInstance.post("/api/v1/login", {
            email: credentials?.email,
            password: credentials?.password,
          });*/
          const res: any = {
            status: 200,
            data: {
              is_success: true,
              message: 'verify your phone number',
              data: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
                _id: 'dwdwd'
              }
            },
          }
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
            throw new Error(JSON.stringify({ errors: "Failed to authenticate. Please try again.", status: 500 }));
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },

    async session({ session, token }: any) {
      session.user = token as any;
      return session;
    },
  },
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
