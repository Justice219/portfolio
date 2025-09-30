export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 py-10 text-sm text-white/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} James Bayless. Crafted with care in San Antonio, Texas.</p>
        <div className="flex flex-wrap gap-4 text-white/60">
          <a
            href="mailto:hello@baylessenterprises.com"
            className="transition hover:text-white"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/james-bayless-05421423a/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://www.baylessenterprises.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Bayless Enterprises
          </a>
          <a
            href="/admin/login"
            className="transition hover:text-white"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
