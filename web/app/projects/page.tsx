import type { Metadata } from 'next';
import { getProjects, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Projects — Prime Creative Hub',
  description: 'Explore projects built by Prime Creative Hub members.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="pt-[74px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] py-20">
        {/* Header */}
        <div className="flex items-end justify-between pb-6 border-b border-white/10 mb-12">
          <div>
            <p className="text-[#0AC4D0]/60 text-sm mb-2" style={{ fontFamily: 'var(--font-mona-sans)' }}>
              // What we&apos;ve shipped
            </p>
            <h1
              className="text-[clamp(40px,5vw,72px)] font-black uppercase leading-none text-[#E2FFFE] tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              ALL PROJECTS
            </h1>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project: any) => (
            <article
              key={project._id}
              className="flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#080808] hover:border-[#0AC4D0]/20 transition-all group"
            >
              <div className="relative h-[200px] overflow-hidden bg-[#0a0a0a]">
                {project.thumbnail && (
                  <img
                    src={urlFor(project.thumbnail).width(600).url()}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-6 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#0AC4D0]/10 border border-[#0AC4D0]/20 flex items-center justify-center">
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                      <circle cx="5" cy="3.5" r="2" fill="#0AC4D0" opacity="0.7" />
                      <path d="M1 9.5c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="#0AC4D0" strokeWidth="0.8" opacity="0.7" />
                    </svg>
                  </div>
                  <span className="text-[#E2FFFE]/50 text-xs" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                    {project.author}
                  </span>
                </div>

                <div className="space-y-2 flex-1">
                  <h3
                    className="text-[#E2FFFE] text-lg font-bold uppercase leading-tight tracking-tight"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[#E2FFFE]/35 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full border border-white/10 text-[#E2FFFE]/40 text-[11px]"
                      style={{ fontFamily: 'var(--font-mona-sans)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <a href={project.githubUrl} className="flex items-center gap-1.5 text-[#E2FFFE]/40 text-xs hover:text-[#E2FFFE]/70 transition-colors" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      Github
                    </a>
                    <a href={project.liveUrl} className="flex items-center gap-1.5 text-[#E2FFFE]/40 text-xs hover:text-[#E2FFFE]/70 transition-colors" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                        <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                      </svg>
                      Live URL
                    </a>
                  </div>
                  <span className="text-[#0AC4D0]/60 text-xs" style={{ fontFamily: 'var(--font-mona-sans)' }}>Read More →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
