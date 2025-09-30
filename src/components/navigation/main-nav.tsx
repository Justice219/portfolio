'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const links = [
  { href: '#overview', label: 'Overview' },
  { href: '#projects', label: 'Projects' },
  { href: '#ventures', label: 'Ventures' },
  { href: '#experience', label: 'Experience' },
  { href: '#capabilities', label: 'Capabilities' },
  { href: '#github', label: 'GitHub' },
  { href: '#contact', label: 'Contact' },
];

export function MainNav() {
  const [activeHref, setActiveHref] = useState<string>(links[0]!.href);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = links
      .map((link) => document.getElementById(link.href.replace('#', '')))
      .filter((section): section is HTMLElement => Boolean(section));

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-6 z-50 mx-auto flex max-w-4xl items-center justify-between rounded-full border border-white/10 bg-black/35 px-6 py-3 text-sm font-medium text-white/70 shadow-lg backdrop-blur-xl"
    >
      <Link href="#overview" className="font-semibold text-white">
        James Bayless
      </Link>
      <div className="flex items-center gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative transition hover:text-white ${activeHref === link.href ? 'text-white' : ''}`}
          >
            {activeHref === link.href && (
              <motion.span
                layoutId="nav-active"
                className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-white"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.label}</span>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}
