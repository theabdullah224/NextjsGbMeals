import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '../../models/UserModel'; // Adjust path as necessary
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
            console.log('Admin authenticated successfully');
            return { id: 'admin', email, name: 'Admin', role: 'admin' };
          }

          // Find user by email
          const user = await User.findOne({ email });

          if (!user) {
            console.log('No user found with that email');
            throw new Error('No user found with that email');
          }

          // Check if password matches
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            console.log('Invalid password');
            throw new Error('Invalid password');
          }

          // Return the user object if authentication is successful
          console.log('User authenticated successfully');
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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name || '';
        token.id = user.id || '';
        token.email = user.email || '';
        token.role = user.role || '';
        token.status = user.status || '';
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
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
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
