import Link from 'next/link';
import { redirect } from 'next/navigation';
import { LogOut, PanelLeft } from 'lucide-react';

import { requireAdminSession } from '@/lib/auth';
import { SignOutButton } from '@/components/ui/sign-out-button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdminSession();
  } catch (error) {
    const message = (error as Error).message;
    if (message === 'Unauthorized') {
      redirect('/admin/login');
    }
    throw error;
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 text-sm font-semibold text-white/80">
            <PanelLeft size={20} />
            <div>
              <h1 className="text-lg font-semibold text-white">Portfolio Control Room</h1>
              <p className="text-xs text-white/50">Manage James’ public work and storytelling.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-white/60 transition hover:text-white">
              View site
            </Link>
            <SignOutButton>
              <span className="inline-flex items-center gap-2">
                <LogOut size={16} />
                Sign out
              </span>
            </SignOutButton>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
    </div>
  );
}
