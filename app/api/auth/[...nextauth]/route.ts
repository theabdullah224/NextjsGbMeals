/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth, { NextAuthOptions } from 'next-auth';
import { authOptions } from '@/app/auth/auth';

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
export { authOptions };

