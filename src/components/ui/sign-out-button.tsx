'use client';

import { signOut } from 'next-auth/react';
import { useTransition } from 'react';

type SignOutButtonProps = {
  children: React.ReactNode;
};

export function SignOutButton({ children }: SignOutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      void signOut({ callbackUrl: '/admin/login' });
    });
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isPending}
      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/70 transition hover:border-white/35 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}
