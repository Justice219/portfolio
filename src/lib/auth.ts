import type { NextAuthOptions, Session } from 'next-auth';
import { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Admin Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        if (!adminEmail) {
          throw new Error('Admin email is not configured.');
        }

        if (credentials.email.toLowerCase() !== adminEmail.toLowerCase()) {
          return null;
        }

        if (adminPasswordHash) {
          const isValid = await bcrypt.compare(credentials.password, adminPasswordHash);
          if (!isValid) {
            return null;
          }
        } else if (adminPassword) {
          if (credentials.password !== adminPassword) {
            return null;
          }
        } else {
          throw new Error('Admin password is not configured.');
        }

        return {
          id: 'admin',
          name: 'James Bayless',
          email: adminEmail,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        session.user.role = 'admin';
      }
      return session;
    },
    async jwt({ token }) {
      token.role = 'admin';
      return token;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
};

export const getAdminSession = () => getServerSession(authOptions);

export async function requireAdminSession(): Promise<Session> {
  const session = await getAdminSession();
  if (!session || session.user?.role !== 'admin') {
    throw new Error('Unauthorized');
  }
  return session;
}
