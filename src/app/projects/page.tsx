import ProjectsExplorer from '@/components/ProjectsExplorer';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return <ProjectsExplorer projects={projects} />;
}

