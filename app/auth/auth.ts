/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '@/app/api/models/UserModel'; // Adjust path as necessary
import { connectMongoDB } from '@/app/lib/dbConnection'; // Ensure path is correct

// Reuse the database connection (connectMongoDB) across multiple requests
let isConnected = false;

async function connectDatabase() {
  if (isConnected) return;
  await connectMongoDB();
  isConnected = true;
}

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Connect to MongoDB
        await connectDatabase();

        const { email, password } = credentials!;

        try {
          // Check for hardcoded admin credentials (for testing purposes)
          if (email === 'admin@gmail.com' && password === '12345678') {
           
            return { id: 'admin', email, name: 'Admin', role: 'admin' };
          }

          // Find user by email
          // @ts-ignore
          const user = await User.findOne({ email });

          if (!user) {
          
            throw new Error('No user found with that email');
          }

          // Check if password matches
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
         
            throw new Error('Invalid password');
          }

          // Return the user object if authentication is successful
       
          return { id: user._id, email: user.email, name: user.name, status: user.status, role: 'user' };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error(error instanceof Error ? error.message : 'Unknown error');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
   
   
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name || '';
        token.id = user.id || '';
        token.email = user.email || '';
        // @ts-ignore
        token.role = user.role || '';
        // @ts-ignore
        token.status = user.status || '';
      }
      return token;
    },

    async session({ session, token }:any) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
   cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};