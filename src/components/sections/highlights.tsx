'use client';

import { motion } from 'framer-motion';

const metrics = [
  {
    label: 'Ventures operated',
    value: '3',
    description: 'Bayless Enterprises stewards Bayless Enterprises HQ, Canopy Land Solutions, and Koality CRM.',
  },
  {
    label: 'Workflows automated',
    value: '120+',
    description: 'Custom integrations, CRMs, and AI agents streamlining land services and client ops.',
  },
  {
    label: 'Team enablement',
    value: '5 squads',
    description: 'Cross-functional pods coached on full-stack delivery, sales enablement, and analytics governance.',
  },
  {
    label: 'MVP velocity',
    value: '6 weeks',
    description: 'Average concept-to-revenue timeline for new SaaS experiments and client platforms.',
  },
];

export function HighlightsSection() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: index * 0.05, duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-black/35 p-6 backdrop-blur-xl"
        >
          <div className="text-sm uppercase tracking-[0.35em] text-white/40">{metric.label}</div>
          <div className="mt-4 text-4xl font-semibold text-white">{metric.value}</div>
          <p className="mt-3 text-sm leading-relaxed text-white/60">{metric.description}</p>
        </motion.article>
      ))}
    </section>
  );
}
