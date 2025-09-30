import type { Project as ProjectModel } from '@/generated/prisma';

export type Project = ProjectModel;
export type SerializedProject = Omit<ProjectModel, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export function projectTags(project: Pick<Project, 'tags'>): string[] {
  if (!project.tags) return [];
  return project.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
}
