'use client';

import { motion } from 'framer-motion';
import { Building2, Crown, Rocket } from 'lucide-react';

const experiences = [
  {
    company: 'Bayless Enterprises',
    role: 'Founder & CEO',
    period: '2021 — Present',
    icon: Crown,
    color: '#6366F1',
    summary:
      'Directing a portfolio of technology companies delivering land services, CRM automation, and AI-enabled client tooling across North America.',
    highlights: [
      'Scaled Bayless Enterprises into a multi-venture studio with shared engineering, go-to-market, and operations playbooks.',
      'Built a modular product architecture that lets each brand launch new digital services in weeks, not months.',
      'Mentors founders and client partners on revenue-focused product strategy, integrating analytics loops into every release.',
    ],
  },
  {
    company: 'Koality CRM',
    role: 'Head of Product & Engineering',
    period: '2022 — Present',
    icon: Rocket,
    color: '#0EA5E9',
    summary:
      'Leading the AI-powered CRM born inside Bayless Enterprises. Focused on automating outreach, pipeline tracking, and client success for service organizations.',
    highlights: [
      'Designed a domain-driven architecture that unifies intake forms, automations, and reporting into a single interface.',
      'Implemented action-driven analytics that surface churn risks and upsell opportunities in real time.',
      'Guided GTM experiments that doubled adoption among land services teams and independent brokers.',
    ],
  },
  {
    company: 'Canopy Land Solutions',
    role: 'Managing Partner & Full Stack Lead',
    period: '2020 — Present',
    icon: Building2,
    color: '#34D399',
    summary:
      'Delivering technology-backed land services for renewables, utilities, and infrastructure clients under the Bayless Enterprises umbrella.',
    highlights: [
      'Built dashboards that align survey teams, legal, and finance on acquisition timelines and compliance checkpoints.',
      'Automated document pipelines and GIS workflows, cutting project handoff friction across distributed teams.',
      'Embedded field-friendly mobile tools that sync with internal systems, keeping crews synchronized without admin overhead.',
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="space-y-12">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Trajectory</p>
        <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">Guiding teams from vision to velocity.</h2>
        <p className="max-w-2xl text-base text-white/60">
          James thrives at the intersection of creative direction and deep engineering. Each chapter sharpens his ability to
          align ambitious ideas with pragmatic delivery, building experiences that feel inevitable.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {experiences.map((experience, index) => {
          const Icon = experience.icon;
          return (
            <motion.article
              key={experience.company}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
              className="flex h-full flex-col gap-6 rounded-3xl border bg-black/35 p-8 backdrop-blur-xl"
              style={{
                borderColor: `${experience.color}33`,
                backgroundImage: `linear-gradient(140deg, ${experience.color}22, rgba(17,25,40,0.9))`,
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-3 text-sm font-semibold text-white/70">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
                    <Icon size={20} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{experience.role}</h3>
                    <p className="text-sm text-white/60">{experience.company}</p>
                  </div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                  {experience.period}
                </span>
              </div>
              <p className="text-sm text-white/60">{experience.summary}</p>
              <ul className="space-y-3 text-sm text-white/65">
                {experience.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span
                      className="mt-1 inline-block h-2 w-2 rounded-full"
                      style={{ background: experience.color }}
                      aria-hidden
                    />
                    <span className="leading-relaxed text-white/70">{highlight}</span>
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
