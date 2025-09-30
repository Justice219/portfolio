'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

const highlights = [
  'Full Stack Founder',
  'Bayless Enterprises CEO',
  'Product & Growth Strategist',
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/5 bg-black/40 px-6 py-16 shadow-2xl ring-1 ring-white/10 sm:px-10 sm:py-20">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute -left-32 top-10 h-60 w-60 rounded-full bg-gradient-to-br from-sky-400/35 via-blue-500/25 to-purple-500/25 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gradient-to-br from-purple-500/30 via-fuchsia-400/35 to-rose-500/20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 15, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col gap-12">
        <motion.div
          className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
            <Sparkles size={16} className="text-sky-200" />
            Available for visionary collaborations
          </span>
          <span className="rounded-full border border-white/5 bg-white/5 px-3 py-1 backdrop-blur-md">
            Based in Austin, TX
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            James Bayless builds ventures and software that turn ambitious visions into market momentum.
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
            Full stack founder of Bayless Enterprises and the product studios within it. I partner with operations
            leaders, land services teams, and SaaS founders to architect resilient platforms that scale revenue,
            automate workflows, and feel exceptional to use.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Link
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-sky-100"
          >
            View signature projects
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/james-bayless-05421423a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
          >
            Connect on LinkedIn
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3 text-sm text-white/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1 font-medium backdrop-blur-md"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
