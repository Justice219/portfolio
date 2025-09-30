'use client';

import { useMemo, useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Plus, Trash2 } from 'lucide-react';

import type { SerializedGithubHighlight } from '@/types/github-highlight';

const blankHighlight: SerializedGithubHighlight = {
  id: 'new',
  title: '',
  subtitle: '',
  description: '',
  repoUrl: '',
  githubSlug: '',
  language: '',
  stars: 0,
  highlightColor: '#528dff',
  imageUrl: '',
  order: 0,
  active: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface GithubHighlightManagerProps {
  initialHighlights: SerializedGithubHighlight[];
}

export function GithubHighlightManager({ initialHighlights }: GithubHighlightManagerProps) {
  const [highlights, setHighlights] = useState<SerializedGithubHighlight[]>(() => initialHighlights);
  const [selectedId, setSelectedId] = useState<string>(initialHighlights[0]?.id ?? 'new');
  const [formState, setFormState] = useState<SerializedGithubHighlight>(initialHighlights[0] ?? blankHighlight);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const sorted = useMemo(() => [...highlights].sort((a, b) => a.order - b.order), [highlights]);

  const selectHighlight = (highlight: SerializedGithubHighlight) => {
    setSelectedId(highlight.id);
    setFormState(highlight);
    setStatus(null);
  };

  const resetToNew = () => {
    const now = new Date().toISOString();
    setSelectedId('new');
    setFormState({ ...blankHighlight, createdAt: now, updatedAt: now });
    setStatus(null);
  };

  const handleChange = (field: keyof SerializedGithubHighlight, value: string | number | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const payload = {
      title: formState.title,
      subtitle: formState.subtitle ?? '',
      description: formState.description,
      repoUrl: formState.repoUrl,
      githubSlug: formState.githubSlug ?? '',
      language: formState.language ?? '',
      stars: Number(formState.stars ?? 0),
      highlightColor: formState.highlightColor,
      imageUrl: formState.imageUrl ?? '',
      order: Number(formState.order ?? 0),
      active: formState.active,
    };

    startTransition(async () => {
      try {
        if (selectedId === 'new') {
          const response = await fetch('/api/github-highlights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Failed to create highlight');
          }

          const created = (await response.json()) as SerializedGithubHighlight;
          setHighlights((prev) => [created, ...prev]);
          setSelectedId(created.id);
          setFormState(created);
          setStatus({ type: 'success', message: 'GitHub highlight added.' });
        } else {
          const response = await fetch(`/api/github-highlights/${selectedId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Failed to update highlight');
          }

          const updated = (await response.json()) as SerializedGithubHighlight;
          setHighlights((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
          setFormState(updated);
          setStatus({ type: 'success', message: 'Highlight updated.' });
        }
      } catch (error) {
        console.error(error);
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    });
  };

  const handleDelete = () => {
    if (selectedId === 'new') {
      resetToNew();
      return;
    }

    const confirmed = window.confirm('Remove this highlight?');
    if (!confirmed) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/github-highlights/${selectedId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete highlight');
        }

        setHighlights((prev) => prev.filter((item) => item.id !== selectedId));
        resetToNew();
        setStatus({ type: 'success', message: 'Highlight deleted.' });
      } catch (error) {
        console.error(error);
        setStatus({ type: 'error', message: 'Could not delete highlight. Please retry.' });
      }
    });
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex w-full flex-col gap-5 rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl lg:w-72"
      >
        <button
          type="button"
          onClick={resetToNew}
          className={`inline-flex items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-3 text-sm font-semibold transition ${
            selectedId === 'new'
              ? 'border-white/60 bg-white/10 text-white'
              : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white'
          }`}
        >
          <Plus size={16} />
          New highlight
        </button>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.35em] text-white/40">GitHub cards</h3>
          <ul className="space-y-2 text-sm">
            {sorted.map((highlight) => (
              <li key={highlight.id}>
                <button
                  type="button"
                  onClick={() => selectHighlight(highlight)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedId === highlight.id
                      ? 'border-white/50 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{highlight.title}</span>
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ background: highlight.highlightColor || '#528dff' }}
                    />
                  </div>
                  <div className="text-xs text-white/50">{highlight.language || highlight.githubSlug || 'Custom'}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.aside>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_160px]">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Title</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.title}
                onChange={(event) => handleChange('title', event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formState.highlightColor || '#528dff'}
                  onChange={(event) => handleChange('highlightColor', event.target.value)}
                  className="h-11 w-16 cursor-pointer rounded-lg border border-white/20 bg-transparent"
                />
                <div
                  className="h-11 flex-1 rounded-lg border border-white/10"
                  style={{ background: formState.highlightColor || '#528dff' }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-white/40">Subtitle</label>
            <input
              className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
              value={formState.subtitle ?? ''}
              onChange={(event) => handleChange('subtitle', event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-white/40">Description</label>
            <textarea
              className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
              value={formState.description}
              onChange={(event) => handleChange('description', event.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Repo URL</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.repoUrl}
                onChange={(event) => handleChange('repoUrl', event.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">GitHub slug (owner/repo)</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.githubSlug ?? ''}
                onChange={(event) => handleChange('githubSlug', event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Language</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.language ?? ''}
                onChange={(event) => handleChange('language', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Stars</label>
              <input
                type="number"
                min={0}
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.stars ?? 0}
                onChange={(event) => handleChange('stars', Number(event.target.value))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Display order</label>
              <input
                type="number"
                min={0}
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.order ?? 0}
                onChange={(event) => handleChange('order', Number(event.target.value))}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Image URL</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.imageUrl ?? ''}
                onChange={(event) => handleChange('imageUrl', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Active</label>
              <label className="inline-flex items-center gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={formState.active}
                  onChange={(event) => handleChange('active', event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-black/60 text-sky-400 focus:ring-0"
                />
                Visible on site
              </label>
            </div>
          </div>

          {status && (
            <div
              className={`rounded-2xl border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200'
                  : 'border-red-400/30 bg-red-400/10 text-red-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:border-red-400/60 hover:text-red-200"
            >
              <Trash2 size={16} />
              Delete
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {selectedId === 'new' ? 'Add highlight' : 'Save changes'}
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}
