import { prisma } from './prisma';
import type { GithubHighlight } from '@/types/github-highlight';

export async function getGithubHighlights() {
  return prisma.githubHighlight.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getActiveGithubHighlights() {
  return prisma.githubHighlight.findMany({
    where: { active: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function createGithubHighlight(data: {
  title: string;
  subtitle?: string | null;
  description: string;
  repoUrl: string;
  githubSlug?: string | null;
  language?: string | null;
  stars?: number;
  highlightColor: string;
  imageUrl?: string | null;
  order?: number;
  active?: boolean;
}) {
  return prisma.githubHighlight.create({
    data,
  });
}

export async function updateGithubHighlight(
  id: string,
  data: Partial<{
    title: string;
    subtitle?: string | null;
    description: string;
    repoUrl: string;
    githubSlug?: string | null;
    language?: string | null;
    stars?: number;
    highlightColor: string;
    imageUrl?: string | null;
    order?: number;
    active?: boolean;
  }>,
) {
  return prisma.githubHighlight.update({
    where: { id },
    data,
  });
}

export async function deleteGithubHighlight(id: string) {
  return prisma.githubHighlight.delete({
    where: { id },
  });
}

export function serializeGithubHighlight(item: GithubHighlight) {
  return {
    ...item,
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  };
}
