'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

export function ContactSection() {
  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/15 via-white/5 to-transparent px-8 py-16 text-white shadow-2xl backdrop-blur-2xl sm:px-12 sm:py-20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          aria-hidden
          className="absolute -top-32 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-white/20 blur-3xl"
          animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 10 }}
        />
        <motion.div
          aria-hidden
          className="absolute bottom-[-20%] right-[-10%] h-64 w-64 rounded-full bg-sky-400/40 blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 12, delay: 1.2 }}
        />
      </div>

      <div className="relative space-y-6">
        <p className="text-sm uppercase tracking-[0.35em] text-white/60">Collaborate</p>
        <h2 className="text-balance text-4xl font-semibold sm:text-5xl">
          Let’s design the product moment that people talk about.
        </h2>
        <p className="max-w-2xl text-base text-white/70">
          Whether you need a launch partner, creative engineering lead, or rapid prototyping sprint, James builds teams and
          experiences that move markets.
        </p>
        <div className="flex flex-wrap gap-4 pt-4 text-sm font-semibold">
          <Link
            href="mailto:hello@baylessenterprises.com"
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-white transition hover:bg-black/80"
          >
            <Mail size={18} />
            hello@baylessenterprises.com
          </Link>
          <Link
            href="https://www.baylessenterprises.com/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-white transition hover:border-white/60"
          >
            Book a strategy session
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
