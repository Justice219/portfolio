import { NextResponse } from 'next/server';
import { z } from 'zod';

import { createProject, getAllProjects, serializeProject } from '@/lib/projects';
import { requireAdminSession } from '@/lib/auth';
import { createProjectSchema } from '@/lib/validation/projectSchemas';

const normalizeProjectInput = (data: z.infer<typeof createProjectSchema>) => ({
  ...data,
  subtitle: data.subtitle || null,
  tags: data.tags || null,
  githubUrl: data.githubUrl || null,
  liveUrl: data.liveUrl || null,
  imageUrl: data.imageUrl || null,
  themeColor: data.themeColor || null,
});

export async function GET() {
  const projects = await getAllProjects();
  return NextResponse.json(projects.map(serializeProject));
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const raw = await request.json();
    const data = createProjectSchema.parse(raw);
    const project = await createProject(normalizeProjectInput(data));
    return NextResponse.json(serializeProject(project), { status: 201 });
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

    console.error('Failed to create project', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
