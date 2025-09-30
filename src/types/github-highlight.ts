import type { GithubHighlight as GithubHighlightModel } from '@/generated/prisma';

export type GithubHighlight = GithubHighlightModel;

export type SerializedGithubHighlight = Omit<GithubHighlightModel, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};
