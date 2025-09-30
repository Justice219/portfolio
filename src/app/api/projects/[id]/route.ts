import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';
import { z } from 'zod';

import { deleteProject, updateProject, serializeProject } from '@/lib/projects';
import { requireAdminSession } from '@/lib/auth';
import { updateProjectSchema } from '@/lib/validation/projectSchemas';

const normalizeUpdateInput = (
  data: z.infer<typeof updateProjectSchema>,
): Record<string, unknown> => {
  const normalized: Record<string, unknown> = {};

  if (data.slug !== undefined) normalized.slug = data.slug;
  if (data.title !== undefined) normalized.title = data.title;
  if (data.subtitle !== undefined) normalized.subtitle = data.subtitle || null;
  if (data.summary !== undefined) normalized.summary = data.summary;
  if (data.description !== undefined) normalized.description = data.description;
  if (data.tags !== undefined) normalized.tags = data.tags || null;
  if (data.githubUrl !== undefined) normalized.githubUrl = data.githubUrl || null;
  if (data.liveUrl !== undefined) normalized.liveUrl = data.liveUrl || null;
  if (data.imageUrl !== undefined) normalized.imageUrl = data.imageUrl || null;
  if (data.themeColor !== undefined) normalized.themeColor = data.themeColor || null;
  if (data.featured !== undefined) normalized.featured = data.featured;
  if (data.order !== undefined) normalized.order = data.order;

  return normalized;
};

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdminSession();
    const { id } = await context.params;
    const raw = await request.json();
    const data = updateProjectSchema.parse(raw);
    const project = await updateProject(id, normalizeUpdateInput(data));
    return NextResponse.json(serializeProject(project));
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
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    console.error('Failed to update project', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireAdminSession();
    const { id } = await context.params;
    await deleteProject(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if ((error as Error).message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    console.error('Failed to delete project', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
