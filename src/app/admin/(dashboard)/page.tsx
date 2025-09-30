import { getAllProjects, serializeProject } from '@/lib/projects';
import { getGithubHighlights, serializeGithubHighlight } from '@/lib/githubHighlights';
import type { SerializedProject } from '@/types/project';
import type { SerializedGithubHighlight } from '@/types/github-highlight';
import { ProjectManager } from '@/components/admin/project-manager';
import { GithubHighlightManager } from '@/components/admin/github-highlight-manager';

export default async function AdminDashboardPage() {
  const [projects, highlights] = await Promise.all([getAllProjects(), getGithubHighlights()]);
  const serializedProjects: SerializedProject[] = projects.map(serializeProject);
  const serializedHighlights: SerializedGithubHighlight[] = highlights.map(serializeGithubHighlight);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold text-white">Projects</h2>
        <p className="text-sm text-white/60">
          Steward the stories and case studies that appear on the public portfolio. Changes are reflected instantly.
        </p>
      </div>
      <ProjectManager initialProjects={serializedProjects} />

      <div className="space-y-2 pt-12">
        <h2 className="text-3xl font-semibold text-white">GitHub Highlights</h2>
        <p className="text-sm text-white/60">
          Curate the GitHub experiments you want featured on the site. Add color, imagery, and context for each repo.
        </p>
      </div>
      <GithubHighlightManager initialHighlights={serializedHighlights} />
    </div>
  );
}
