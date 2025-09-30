'use client';

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(searchParams.get('error'));
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (!result) {
        setError('Unexpected error. Please try again.');
        return;
      }

      if (result.error) {
        setError('Invalid credentials. Try again.');
        return;
      }

      router.replace('/admin');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs uppercase tracking-[0.35em] text-white/40">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-xs uppercase tracking-[0.35em] text-white/40">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
        />
      </div>

      {error && (
        <div className="rounded-2xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending && <Loader2 size={16} className="animate-spin" />}
        Access dashboard
      </button>
    </form>
  );
}
