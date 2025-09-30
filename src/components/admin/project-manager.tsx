'use client';

import { useMemo, useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Plus, Trash2 } from 'lucide-react';

import type { SerializedProject } from '@/types/project';

const blankProject: SerializedProject = {
  id: 'new',
  slug: '',
  title: '',
  subtitle: '',
  summary: '',
  description: '',
  tags: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  themeColor: '#528dff',
  featured: false,
  order: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const slugify = (input: string) =>
  input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');

const withDefaultColor = (project: SerializedProject): SerializedProject => ({
  ...project,
  themeColor: project.themeColor ?? '#528dff',
});

function normalizePayload(project: SerializedProject) {
  const slugCandidate = slugify(project.slug);
  const slug = slugCandidate || slugify(project.title) || 'untitled';
  return {
    slug,
    title: project.title,
    subtitle: project.subtitle ?? '',
    summary: project.summary,
    description: project.description,
    tags: project.tags ?? '',
    githubUrl: project.githubUrl ?? '',
    liveUrl: project.liveUrl ?? '',
    imageUrl: project.imageUrl ?? '',
    themeColor: project.themeColor ?? '',
    featured: project.featured,
    order: Number(project.order ?? 0),
  };
}

interface ProjectManagerProps {
  initialProjects: SerializedProject[];
}

export function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [projects, setProjects] = useState<SerializedProject[]>(() => initialProjects);
  const [selectedId, setSelectedId] = useState<string>(initialProjects[0]?.id ?? 'new');
  const [formState, setFormState] = useState<SerializedProject>(
    initialProjects[0]
      ? withDefaultColor(initialProjects[0])
      : { ...blankProject, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  );
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  const sortedProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.order - b.order;
      }),
    [projects],
  );

  const selectProject = (project: SerializedProject) => {
    setSelectedId(project.id);
    setFormState(withDefaultColor(project));
    setStatus(null);
  };

  const resetToNew = () => {
    setSelectedId('new');
    const now = new Date().toISOString();
    setFormState({ ...blankProject, createdAt: now, updatedAt: now });
    setStatus(null);
  };

  const handleChange = (field: keyof SerializedProject, value: string | boolean | number) => {
    setFormState((prev) => {
      if (field === 'title' && typeof value === 'string') {
        const nextSlug =
          selectedId === 'new' && (!prev.slug || prev.slug === slugify(prev.title))
            ? slugify(value)
            : prev.slug;
        return {
          ...prev,
          title: value,
          slug: nextSlug,
        };
      }

      if (field === 'slug' && typeof value === 'string') {
        return { ...prev, slug: value };
      }

      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    const payload = normalizePayload(formState);

    startTransition(async () => {
      try {
        if (selectedId === 'new') {
          const response = await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Failed to create project');
          }

          const created = (await response.json()) as SerializedProject;
          const createdWithColor = withDefaultColor(created);
          setProjects((prev) => [createdWithColor, ...prev]);
          setFormState(createdWithColor);
          setSelectedId(createdWithColor.id);
          setStatus({ type: 'success', message: 'Project published to the site.' });
        } else {
          const response = await fetch(`/api/projects/${selectedId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error('Failed to update project');
          }

          const updated = (await response.json()) as SerializedProject;
          const updatedWithColor = withDefaultColor(updated);
          setProjects((prev) => prev.map((project) => (project.id === updatedWithColor.id ? updatedWithColor : project)));
          setFormState(updatedWithColor);
          setStatus({ type: 'success', message: 'Project updated successfully.' });
        }
      } catch (error) {
        console.error(error);
        setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
      }
    });
  };

  const handleDelete = async () => {
    if (selectedId === 'new') {
      resetToNew();
      return;
    }

    const shouldDelete = window.confirm('Delete this project? This action cannot be undone.');
    if (!shouldDelete) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/projects/${selectedId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        setProjects((prev) => prev.filter((project) => project.id !== selectedId));
        resetToNew();
        setStatus({ type: 'success', message: 'Project removed.' });
      } catch (error) {
        console.error(error);
        setStatus({ type: 'error', message: 'Could not delete project. Please retry.' });
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
          New project
        </button>

        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-[0.35em] text-white/40">Existing</h3>
          <ul className="space-y-2 text-sm">
            {sortedProjects.map((project) => (
              <li key={project.id}>
                <button
                  type="button"
                  onClick={() => selectProject(project)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                    selectedId === project.id
                      ? 'border-white/50 bg-white/10 text-white'
                      : 'border-white/10 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{project.title}</span>
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ background: project.themeColor || '#528dff' }}
                    />
                  </div>
                  <div className="text-xs text-white/50">/{project.slug}</div>
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
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1 space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Title</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.title}
                onChange={(event) => handleChange('title', event.target.value)}
                required
              />
            </div>
            <div className="sm:w-72">
              <label className="space-y-2 text-xs uppercase tracking-[0.35em] text-white/40">
                <span>Slug</span>
                <input
                  className="mt-2 w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                  value={formState.slug}
                  onChange={(event) => handleChange('slug', event.target.value)}
                  required
                />
              </label>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_160px]">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Subtitle</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.subtitle ?? ''}
                onChange={(event) => handleChange('subtitle', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Accent color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={formState.themeColor || '#528dff'}
                  onChange={(event) => handleChange('themeColor', event.target.value)}
                  className="h-11 w-16 cursor-pointer rounded-lg border border-white/20 bg-transparent"
                />
                <div
                  className="h-11 flex-1 rounded-lg border border-white/10"
                  style={{ background: formState.themeColor || '#528dff' }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-white/40">Summary</label>
            <textarea
              className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
              value={formState.summary}
              onChange={(event) => handleChange('summary', event.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.35em] text-white/40">Narrative</label>
            <textarea
              className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
              value={formState.description}
              onChange={(event) => handleChange('description', event.target.value)}
              required
              rows={6}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Tags (comma separated)</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.tags ?? ''}
                onChange={(event) => handleChange('tags', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Hero image URL</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.imageUrl ?? ''}
                onChange={(event) => handleChange('imageUrl', event.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">Live URL</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.liveUrl ?? ''}
                onChange={(event) => handleChange('liveUrl', event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.35em] text-white/40">GitHub URL</label>
              <input
                className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3 text-sm text-white/90 outline-none transition focus:border-white/40"
                value={formState.githubUrl ?? ''}
                onChange={(event) => handleChange('githubUrl', event.target.value)}
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={formState.featured}
                onChange={(event) => handleChange('featured', event.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-black/60 text-sky-400 focus:ring-0"
              />
              Featured project
            </label>

            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-2 rounded-full border border-red-400/20 px-4 py-2 text-sm text-red-300 transition hover:border-red-400/60 hover:text-red-200"
            >
              <Trash2 size={16} />
              Delete
            </button>
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

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {selectedId === 'new' ? 'Publish project' : 'Save changes'}
          </button>
        </form>
      </motion.section>
    </div>
  );
}
