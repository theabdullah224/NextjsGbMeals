import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import User from '../../models/UserModel'; // Adjust path as necessary
import { connectMongoDB } from '@/app/lib/dbConnection';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        // Connect to MongoDB
        await connectMongoDB();

        const { email, password } = credentials!;
        
        try {
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
          return { id: user._id, email: user.email, name: user.name};
        } catch (error: any) {
          console.error('Authentication error:', error);
          throw new Error(error.message);
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
   
    async jwt({ token, user }:any) {
      if (user) {
        token.name = user.name;
        token.id = user.id; 
        token.email = user.email; // Store access token in JWT token
      }
      return token; 
    },

    async session({ session, token }:any) {
      if (session.user){
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      }
      return session;
    
    },    
    
  },
 
  secret: process.env.NEXTAUTH_SECRET,
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

