import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import { getProjects } from '@/lib/sanity';

export default async function ProjectShowcase() {
  const projects = await getProjects();

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px]">
      <SectionHeader title="PROJECT SHOWCASE" arrowHref="/projects" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project: any) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
}
