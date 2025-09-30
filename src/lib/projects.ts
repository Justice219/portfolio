import { prisma } from './prisma';
import type { Project } from '@/types/project';

export async function getAllProjects() {
  return prisma.project.findMany({
    orderBy: [{ featured: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
  });
}

export async function createProject(data: {
  slug: string;
  title: string;
  subtitle?: string | null;
  summary: string;
  description: string;
  tags?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  imageUrl?: string | null;
  themeColor?: string | null;
  featured?: boolean;
  order?: number;
}) {
  return prisma.project.create({
    data,
  });
}

export async function updateProject(
  id: string,
  data: Partial<{
    slug: string;
    title: string;
    subtitle?: string | null;
    summary: string;
    description: string;
    tags?: string | null;
    githubUrl?: string | null;
    liveUrl?: string | null;
    imageUrl?: string | null;
    themeColor?: string | null;
    featured?: boolean;
    order?: number;
  }>,
) {
  return prisma.project.update({
    where: { id },
    data,
  });
}

export async function deleteProject(id: string) {
  return prisma.project.delete({
    where: { id },
  });
}

export function serializeProject(project: Project) {
  return {
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  };
}
