import { MainNav } from '@/components/navigation/main-nav';
import { SiteFooter } from '@/components/layout/footer';
import { ContactSection } from '@/components/sections/contact';
import { ExperienceSection } from '@/components/sections/experience';
import { ExpertiseSection } from '@/components/sections/expertise';
import { HeroSection } from '@/components/sections/hero';
import { HighlightsSection } from '@/components/sections/highlights';
import { ProjectsSection } from '@/components/sections/projects';
import { VenturesSection } from '@/components/sections/ventures';
import { GithubShowcase } from '@/components/sections/github-showcase';
import { getAllProjects, serializeProject } from '@/lib/projects';
import { getActiveGithubHighlights, serializeGithubHighlight } from '@/lib/githubHighlights';
import type { SerializedProject } from '@/types/project';
import type { SerializedGithubHighlight } from '@/types/github-highlight';

export default async function HomePage() {
  const [projects, githubHighlights] = await Promise.all([getAllProjects(), getActiveGithubHighlights()]);
  const serializedProjects: SerializedProject[] = projects.map(serializeProject);
  const serializedHighlights: SerializedGithubHighlight[] = githubHighlights.map(serializeGithubHighlight);

  return (
    <div className="relative pb-24">
      <MainNav />
      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-20 px-6 pt-32 sm:gap-24 sm:pt-40">
        <div id="overview" className="space-y-12">
          <HeroSection />
          <HighlightsSection />
        </div>
        <ProjectsSection projects={serializedProjects} />
        <VenturesSection />
        <ExperienceSection />
        <ExpertiseSection />
        <GithubShowcase highlights={serializedHighlights} />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
