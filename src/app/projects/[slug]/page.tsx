import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';

import { projectTags } from '@/types/project';
import { getProjectBySlug } from '@/lib/projects';

interface ProjectPageProps {
  params: { slug: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const tags = projectTags(project);
  const accent = project.themeColor ?? '#528dff';
  const accentBorder = `${accent}33`;

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-12 px-6 pb-24 pt-32">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to all work
      </Link>

      <header className="space-y-6">
        <p
          className="inline-flex rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-white"
          style={{
            background: `${accent}22`,
            border: `1px solid ${accentBorder}`,
          }}
        >
          Project
        </p>
        <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl">{project.title}</h1>
        {project.subtitle && <p className="text-lg text-white/65">{project.subtitle}</p>}
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-white"
              style={{
                background: `${accent}1f`,
                border: `1px solid ${accentBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {project.imageUrl && (
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1600}
            height={900}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      <section className="space-y-6 text-white/70">
        <h2 className="text-2xl font-semibold text-white">Project Overview</h2>
        <p className="leading-relaxed">{project.description}</p>
      </section>

      <div className="flex flex-wrap gap-4 text-sm font-semibold text-white/80">
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition"
            style={{
              border: `1px solid ${accentBorder}`,
              background: `${accent}22`,
              color: '#fff',
            }}
          >
            Explore live experience
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
              border: `1px solid ${accentBorder}`,
              background: `${accent}18`,
              color: '#fff',
            }}
          >
            <Github size={16} />
            View repository
          </Link>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project not found • James Bayless',
    };
  }

  const description = project.summary || project.subtitle || 'Immersive project crafted by James Bayless.';

  return {
    title: `${project.title} • James Bayless`,
    description,
    openGraph: {
      title: project.title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description,
    },
  };
}
