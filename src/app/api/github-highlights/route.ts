import { NextResponse } from 'next/server';
import { z } from 'zod';

import {
  createGithubHighlight,
  getGithubHighlights,
  serializeGithubHighlight,
} from '@/lib/githubHighlights';
import { requireAdminSession } from '@/lib/auth';
import { createGithubHighlightSchema } from '@/lib/validation/githubHighlightSchemas';

const normalizeInput = (data: z.infer<typeof createGithubHighlightSchema>) => ({
  ...data,
  subtitle: data.subtitle || null,
  githubSlug: data.githubSlug || null,
  language: data.language || null,
  imageUrl: data.imageUrl || null,
});

export async function GET() {
  const highlights = await getGithubHighlights();
  return NextResponse.json(highlights.map(serializeGithubHighlight));
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const raw = await request.json();
    const data = createGithubHighlightSchema.parse(raw);
    const highlight = await createGithubHighlight(normalizeInput(data));
    return NextResponse.json(serializeGithubHighlight(highlight), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Validation failed', issues: error.flatten() },
        { status: 422 },
      );
    }

    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.error('Failed to create GitHub highlight', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
