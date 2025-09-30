'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Building } from 'lucide-react';
import Link from 'next/link';

const ventures = [
  {
    name: 'Bayless Enterprises',
    headline: 'Parent company orchestrating product, operations, and growth across the portfolio.',
    description:
      'Bayless Enterprises is the venture studio I founded to incubate and scale new businesses. We share engineering, design, and revenue operations playbooks so every launch benefits from compound learnings.',
    focus:
      'Venture architecture, shared services, executive partnerships, and capital strategy for partner companies.',
    link: 'https://www.baylessenterprises.com/',
    cta: 'Visit Bayless Enterprises',
    color: '#6366F1',
  },
  {
    name: 'Koality CRM',
    headline: 'AI-assisted CRM that keeps service businesses proactive and personal at scale.',
    description:
      'Born inside Bayless Enterprises, Koality CRM automates outreach, follow-up, and client success rituals for companies that live and die by relationships. It blends AI copilots with deterministic workflows and reporting.',
    focus:
      'Pipeline automation, AI agents, customer experience analytics, and integrations with existing back-office systems.',
    link: 'https://koalitycrm.com/',
    cta: 'Explore Koality CRM',
    color: '#22D3EE',
  },
  {
    name: 'Canopy Land Solutions',
    headline: 'Technology-forward land services for renewables, utilities, and infrastructure expansion.',
    description:
      'Canopy Land Solutions deploys integrated software and on-the-ground expertise to keep acquisition, permitting, and compliance moving. Our internal platforms eliminate the spreadsheet chaos most land teams struggle with.',
    focus:
      'Geospatial automation, digital work orders, stakeholder communications, and compliance documentation.',
    link: 'https://canopylandsolutions.com/',
    cta: 'See Canopy Land Solutions',
    color: '#34D399',
  },
];

export function VenturesSection() {
  return (
    <section id="ventures" className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Portfolio</p>
        <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
          A venture ecosystem led by James Bayless as Founder & CEO.
        </h2>
        <p className="max-w-3xl text-base text-white/65">
          Each brand answers a pain we lived through first-hand. We share technology foundations, playbooks, and leadership
          cadence—but tailor delivery and storytelling to the markets we serve.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {ventures.map((venture, index) => (
          <motion.article
            key={venture.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
            className="flex h-full flex-col gap-6 rounded-3xl border bg-black/40 p-8 backdrop-blur-xl"
            style={{
              borderColor: `${venture.color}33`,
              backgroundImage: `linear-gradient(145deg, ${venture.color}26, rgba(17, 24, 39, 0.85))`,
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{
                    background: `${venture.color}33`,
                    border: `1px solid ${venture.color}55`,
                  }}
                >
                  <Building size={16} />
                  Portfolio company
                </div>
                <h3 className="text-2xl font-semibold text-white">{venture.name}</h3>
              </div>
            </div>
            <p className="text-sm text-white/70">{venture.headline}</p>
            <p className="text-sm leading-relaxed text-white/60">{venture.description}</p>
            <div
              className="rounded-2xl border p-4 text-sm text-white"
              style={{
                borderColor: `${venture.color}44`,
                background: `${venture.color}21`,
              }}
            >
              <span className="font-semibold text-white">Focus areas: </span>
              {venture.focus}
            </div>
            <Link
              href={venture.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
              style={{
                color: '#fff',
                filter: 'drop-shadow(0 0 12px rgba(0,0,0,0.35))',
              }}
            >
              {venture.cta}
              <ArrowUpRight size={16} />
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
