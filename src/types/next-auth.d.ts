import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & {
      role?: 'admin';
    };
  }

  interface User extends DefaultUser {
    role?: 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'admin';
  }
}

export {};
