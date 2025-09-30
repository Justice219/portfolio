'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useMemo, useState } from 'react';

import type { SerializedProject } from '@/types/project';

const hexToRgba = (hex: string, alpha: number) => {
  const sanitized = hex.replace('#', '');
  if (![3, 6].includes(sanitized.length)) return `rgba(82, 141, 255, ${alpha})`;
  const normalized =
    sanitized.length === 3
      ? sanitized
          .split('')
          .map((char) => char + char)
          .join('')
      : sanitized;
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({ opacity: 1, y: 0, transition: { delay: index * 0.08, duration: 0.6 } }),
};

function ProjectCard({ project, index }: { project: SerializedProject; index: number }) {
  const tags = useMemo(() => project.tags?.split(',').filter(Boolean) ?? [], [project.tags]);
  const accent = project.themeColor || '#528dff';
  const accentSoft = hexToRgba(accent, 0.16);

  return (
    <motion.article
      className="group relative overflow-hidden rounded-3xl border bg-black/35 backdrop-blur-xl transition"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      custom={index}
      style={{
        borderColor: `${accent}33`,
        boxShadow: `0 25px 60px -24px ${hexToRgba(accent, 0.45)}`,
        backgroundImage: `linear-gradient(135deg, ${accentSoft}, transparent 70%)`,
      }}
    >
      <div className="flex flex-col gap-8 p-8 sm:p-10">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
            <span
              className="rounded-full px-4 py-1 text-[0.65rem] font-semibold text-white"
              style={{
                background: hexToRgba(accent, 0.35),
                border: `1px solid ${hexToRgba(accent, 0.6)}`,
              }}
            >
              {project.featured ? 'Flagship' : 'Project'}
            </span>
            <span>{project.slug}</span>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-semibold text-white sm:text-3xl">{project.title}</h3>
            {project.subtitle && <p className="text-white/60">{project.subtitle}</p>}
            <p className="text-base leading-relaxed text-white/70">{project.summary}</p>
          </div>
        </div>

        {project.imageUrl && (
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1200}
              height={720}
              className="h-full max-h-[320px] w-full object-cover transition duration-700 group-hover:scale-105"
              priority={index === 0}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-sm font-medium"
              style={{
                background: hexToRgba(accent, 0.2),
                color: '#fff',
                border: `1px solid ${hexToRgba(accent, 0.4)}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm font-semibold text-white/80">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition"
              style={{
                border: `1px solid ${hexToRgba(accent, 0.45)}`,
                color: '#fff',
                background: hexToRgba(accent, 0.12),
              }}
            >
              View live
              <ArrowUpRight size={16} />
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition"
              style={{
                border: `1px solid ${hexToRgba(accent, 0.35)}`,
                color: '#fff',
                background: hexToRgba(accent, 0.08),
              }}
            >
              <Github size={16} />
              Code
            </Link>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-black transition"
            style={{ background: '#fff', color: '#000' }}
          >
            Deep dive
            <ArrowUpRight size={16} className="rotate-45" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection({ projects }: { projects: SerializedProject[] }) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured'>('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'featured') {
      return projects.filter((project) => project.featured);
    }
    return projects;
  }, [projects, activeFilter]);

  return (
    <section id="projects" className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Featured Work</p>
          <h2 className="max-w-2xl text-balance text-4xl font-semibold text-white sm:text-5xl">
            Platforms and products shipping inside the Bayless Enterprises ecosystem.
          </h2>
          <p className="max-w-2xl text-base text-white/60">
            These builds combine field operations insight, automation, and thoughtful UX. They power our ventures and
            demonstrate how we scale new ideas into durable businesses.
          </p>
        </div>
        <div className="flex gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-semibold text-white/70">
          <button
            onClick={() => setActiveFilter('all')}
            className={`rounded-full px-4 py-2 transition ${
              activeFilter === 'all' ? 'bg-white text-black shadow-lg' : 'hover:text-white'
            }`}
          >
            All Work
          </button>
          <button
            onClick={() => setActiveFilter('featured')}
            className={`rounded-full px-4 py-2 transition ${
              activeFilter === 'featured' ? 'bg-white text-black shadow-lg' : 'hover:text-white'
            }`}
          >
            Flagship
          </button>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
