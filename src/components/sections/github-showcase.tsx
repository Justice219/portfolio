import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Star } from 'lucide-react';

import type { SerializedGithubHighlight } from '@/types/github-highlight';

interface GithubShowcaseProps {
  highlights: SerializedGithubHighlight[];
}

const fallbackColor = '#528dff';

export function GithubShowcase({ highlights }: GithubShowcaseProps) {
  if (!highlights.length) {
    return null;
  }

  return (
    <section id="github" className="space-y-10">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Open Source</p>
        <h2 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
          Recent GitHub experiments and community drops.
        </h2>
        <p className="max-w-3xl text-base text-white/65">
          I share tools, prototypes, and learning resources as I build. Here are the repos that have been in active
          rotation this season.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {highlights.map((item) => {
          const accent = item.highlightColor || fallbackColor;
          let repoLabel = item.githubSlug || 'GitHub';
          try {
            const url = new URL(item.repoUrl);
            repoLabel = url.pathname.replace(/^\//, '') || url.hostname;
          } catch {
            repoLabel = item.githubSlug || item.repoUrl;
          }
          return (
          <article
            key={item.id}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-black/40 p-6 backdrop-blur-xl"
            style={{
              borderColor: `${accent}44`,
              backgroundImage: `linear-gradient(135deg, ${accent}29, rgba(15,23,42,0.92))`,
            }}
          >
            {item.imageUrl && (
              <div className="absolute inset-x-6 top-6 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={640}
                  height={320}
                  className="h-40 w-full object-cover opacity-80"
                />
              </div>
            )}
            <div className={`flex flex-col gap-4 ${item.imageUrl ? 'pt-44' : ''}`}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <span
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white"
                  style={{ background: `${accent}33`, border: `1px solid ${accent}55` }}
                >
                  <Star size={14} />
                  {item.stars}
                </span>
              </div>
              {item.subtitle && <p className="text-sm text-white/65">{item.subtitle}</p>}
              <p className="text-sm text-white/65">{item.description}</p>
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{item.language || 'Multi-language'}</span>
                <span>{repoLabel}</span>
              </div>
              <Link
                href={item.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white"
              >
                View on GitHub
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        );
        })}
      </div>
    </section>
  );
}
