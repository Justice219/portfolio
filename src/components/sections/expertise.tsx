'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Figma, Layers3, Workflow } from 'lucide-react';

const capabilities = [
  {
    title: 'Venture architecture',
    description:
      'From corporate strategy to day-one MVPs, I map the tech, revenue, and staffing model so new businesses launch with clarity.',
    icon: BrainCircuit,
    points: ['North-star metrics, pricing, and ICP definition', 'Fractional leadership across product, GTM, ops', 'Investor-ready storytelling and data rooms'],
  },
  {
    title: 'Full stack platform delivery',
    description:
      'Designs and ships React/Next.js applications, serverless APIs, and data pipelines tuned for compliance-heavy industries.',
    icon: Layers3,
    points: ['TypeScript, Next.js, Prisma, Supabase, AWS', 'Domain-driven architecture and modular UI systems', 'Observability baked into every deploy'],
  },
  {
    title: 'AI + automation systems',
    description:
      'Brings AI copilots into CRM, prospecting, and land operations workflows, combining LLMs with deterministic checks.',
    icon: Workflow,
    points: ['Bespoke GPT agents for intake and underwriting', 'Workflow automation via Supabase, n8n, custom APIs', 'Data quality guardrails and human-in-the-loop UX'],
  },
  {
    title: 'Revenue enablement',
    description:
      'Equips teams with content, analytics, and tooling that shorten sales cycles and grow lifetime value.',
    icon: Figma,
    points: ['Sales playbooks with real-time dashboards', 'Lifecycle messaging informed by product signals', 'Training programs that align ops and delivery'],
  },
];

export function ExpertiseSection() {
  return (
    <section id="capabilities" className="space-y-12">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Capability Stack</p>
        <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">Where James delivers uncommon impact.</h2>
        <p className="max-w-2xl text-base text-white/60">
          Advanced problem spaces demand more than production code. James pairs technical craft with narrative intuition to
          guide teams through ambiguous, high-visibility launches.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {capabilities.map((capability, index) => {
          const Icon = capability.icon;
          return (
            <motion.article
              key={capability.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.06, duration: 0.6 }}
              className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-black/35 p-8 backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
                  <Icon size={20} />
                </span>
                <h3 className="text-xl font-semibold text-white">{capability.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/65">{capability.description}</p>
              <ul className="space-y-2 text-sm text-white/65">
                {capability.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full bg-white/40" aria-hidden />
                    <span className="text-white/70">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
