import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';
import { z } from 'zod';

import { deleteGithubHighlight, updateGithubHighlight, serializeGithubHighlight } from '@/lib/githubHighlights';
import { requireAdminSession } from '@/lib/auth';
import { updateGithubHighlightSchema } from '@/lib/validation/githubHighlightSchemas';

const normalizeUpdateInput = (
  data: z.infer<typeof updateGithubHighlightSchema>,
): Record<string, unknown> => {
  const normalized: Record<string, unknown> = {};

  if (data.title !== undefined) normalized.title = data.title;
  if (data.subtitle !== undefined) normalized.subtitle = data.subtitle || null;
  if (data.description !== undefined) normalized.description = data.description;
  if (data.repoUrl !== undefined) normalized.repoUrl = data.repoUrl;
  if (data.githubSlug !== undefined) normalized.githubSlug = data.githubSlug || null;
  if (data.language !== undefined) normalized.language = data.language || null;
  if (data.stars !== undefined) normalized.stars = data.stars;
  if (data.highlightColor !== undefined) normalized.highlightColor = data.highlightColor;
  if (data.imageUrl !== undefined) normalized.imageUrl = data.imageUrl || null;
  if (data.order !== undefined) normalized.order = data.order;
  if (data.active !== undefined) normalized.active = data.active;

  return normalized;
};

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await context.params;
    const raw = await request.json();
    const data = updateGithubHighlightSchema.parse(raw);
    const highlight = await updateGithubHighlight(id, normalizeUpdateInput(data));
    return NextResponse.json(serializeGithubHighlight(highlight));
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

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Highlight not found' }, { status: 404 });
    }

    console.error('Failed to update GitHub highlight', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await requireAdminSession();
    const { id } = await context.params;
    await deleteGithubHighlight(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Highlight not found' }, { status: 404 });
    }

    console.error('Failed to delete GitHub highlight', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
