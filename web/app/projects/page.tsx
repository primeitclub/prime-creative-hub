import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjects } from '@/lib/sanity';
import ProjectCard from '@/components/ui/ProjectCard';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Projects | Prime Creative Hub',
  description: 'Explore projects built by Prime Creative Hub members.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="pt-[74px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] pt-10 pb-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#E2FFFE]/30 mb-4" style={{ fontFamily: 'var(--font-mona-sans)' }}>
          <Link href="/" className="hover:text-[#0AC4D0] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#E2FFFE]/60">Projects</span>
        </nav>

        {/* Header */}
        <div className="pb-6 border-b border-white/10 mb-12">
          <h1
            className="text-[clamp(40px,5vw,72px)] font-black uppercase leading-none text-[#E2FFFE] tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            ALL PROJECTS
          </h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
