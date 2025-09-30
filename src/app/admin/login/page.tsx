import type { Metadata } from 'next';
import Link from 'next/link';

import { AdminLoginForm } from '@/components/admin/login-form';
import { getAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Login • James Bayless Portfolio',
};

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect('/admin');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 py-16 text-white">
      <div className="w-full max-w-md space-y-10 rounded-3xl border border-white/10 bg-black/50 p-10 backdrop-blur-xl">
        <div className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/40">James Bayless</p>
          <h1 className="text-3xl font-semibold">Portfolio Control Room</h1>
          <p className="text-sm text-white/60">
            Enter the credentials to manage projects, reorder highlights, and evolve the narrative.
          </p>
        </div>
        <AdminLoginForm />
        <div className="text-center text-xs text-white/40">
          <Link href="/" className="transition hover:text-white">
            Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
