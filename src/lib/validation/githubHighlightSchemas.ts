import { z } from 'zod';

const hexColor = z
  .string()
  .min(1, 'Color is required')
  .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Use a valid hex color (e.g. #22D3EE)');

export const githubHighlightBaseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional().nullable(),
  description: z.string().min(1, 'Description is required'),
  repoUrl: z.string().url('Repository URL must be valid'),
  githubSlug: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  stars: z.coerce.number().min(0).optional().default(0),
  highlightColor: hexColor,
  imageUrl: z.string().url('Image URL must be valid').optional().nullable(),
  order: z.coerce.number().int().min(0).optional().default(0),
  active: z.boolean().optional().default(true),
});

export const createGithubHighlightSchema = githubHighlightBaseSchema;

export const updateGithubHighlightSchema = githubHighlightBaseSchema.partial();

export type CreateGithubHighlightInput = z.infer<typeof createGithubHighlightSchema>;
export type UpdateGithubHighlightInput = z.infer<typeof updateGithubHighlightSchema>;
