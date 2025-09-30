import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      slug: 'koality-crm',
      title: 'Koality CRM',
      subtitle: 'AI copilots and automations for relationship-first businesses',
      summary:
        'A vertical SaaS CRM that blends deterministic workflows with AI agents to keep outreach, fulfillment, and finance in sync.',
      description:
        'Koality CRM was born from our need to orchestrate land services deals without drowning in spreadsheets. The platform handles intake, automated follow-up, reactive risk alerts, and revenue reporting. It integrates with telephony, email, and GIS systems while giving teams a single pane of glass for next best actions. Every workflow includes human-in-the-loop guardrails so operators trust the automation.',
      tags: 'React,Node.js,AI,Automation,Design Systems',
      githubUrl: null,
      liveUrl: 'https://koalitycrm.com/',
      imageUrl:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
      themeColor: '#22D3EE',
      featured: true,
      order: 2,
    }
  ];

  await prisma.project.deleteMany();
  await prisma.project.createMany({ data: projects });

  const githubHighlights = [
    {
      title: 'GameMaster 3 Revamped',
      subtitle: 'Campaign toolkit for tabletop storytellers',
      description:
        'Lua-powered automation that helps game masters orchestrate encounters, NPCs, and inventory with modern UX.',
      repoUrl: 'https://github.com/Justice219/gamemaster3-revamped',
      githubSlug: 'Justice219/gamemaster3-revamped',
      language: 'Lua',
      stars: 12,
      highlightColor: '#6366F1',
      imageUrl: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80',
      order: 2,
      active: true,
    }
  ];

  await prisma.githubHighlight.deleteMany();
  await prisma.githubHighlight.createMany({ data: githubHighlights });

  console.log('Database seeded with starter projects');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
