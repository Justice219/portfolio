import { z } from 'zod';

export const projectBaseSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase and hyphenated'),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().max(120, 'Subtitle should be concise').optional().nullable(),
  summary: z.string().min(1, 'Summary is required').max(280, 'Summary is too long'),
  description: z.string().min(1, 'Description is required'),
  tags: z
    .string()
    .max(200)
    .optional()
    .transform((value) => {
      if (!value) return undefined;
      return value
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
        .join(',');
    }),
  githubUrl: z.string().url('GitHub URL must be valid').optional().nullable().or(z.literal('')),
  liveUrl: z.string().url('Live URL must be valid').optional().nullable().or(z.literal('')),
  imageUrl: z.string().url('Image URL must be valid').optional().nullable().or(z.literal('')),
  themeColor: z
    .string()
    .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, 'Use a valid hex color (e.g. #4F46E5)')
    .optional()
    .nullable()
    .or(z.literal('')),
  featured: z.boolean().optional().default(false),
  order: z.number().int().min(0).optional().default(0),
});

export const createProjectSchema = projectBaseSchema;

export const updateProjectSchema = projectBaseSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
