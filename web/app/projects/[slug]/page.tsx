import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Prime Creative Hub`,
    description: project.description ?? undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="pt-[74px] min-h-screen bg-[#050301]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] pt-10 pb-20">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#E2FFFE]/30 mb-4" style={{ fontFamily: 'var(--font-mona-sans)' }}>
          <Link href="/" className="hover:text-[#0AC4D0] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-[#0AC4D0] transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-[#E2FFFE]/60 truncate max-w-[200px]">{project.title}</span>
        </nav>

        {/* Above the fold — two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-20">

          {/* Left: thumbnail */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/8">
            {project.thumbnail ? (
              <img
                src={urlFor(project.thumbnail).width(900).url()}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#E2FFFE]/20 text-sm" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                No image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050301]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right: meta */}
          <div className="flex flex-col gap-6">

            {/* Title */}
            <h1
              className="text-[clamp(28px,4vw,56px)] font-black uppercase leading-tight text-[#E2FFFE] tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {project.title}
            </h1>

            {/* Short description */}
            {project.description && (
              <p
                className="text-[#E2FFFE]/60 text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-mona-sans)' }}
              >
                {project.description}
              </p>
            )}

            {/* Tech stack tags */}
            {project.techStack?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full border border-[#0AC4D0]/20 text-[#0AC4D0]/70 text-[12px]"
                    style={{ fontFamily: 'var(--font-mona-sans)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-[#E2FFFE]/70 text-sm hover:border-[#0AC4D0]/40 hover:text-[#E2FFFE] transition-all"
                  style={{ fontFamily: 'var(--font-mona-sans)' }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0AC4D0] text-[#050301] text-sm font-semibold hover:bg-[#0AC4D0]/85 transition-colors"
                  style={{ fontFamily: 'var(--font-mona-sans)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                  </svg>
                  Live URL
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Below the fold — full description */}
        {project.description && (
          <div className="border-t border-white/8 pt-16 max-w-[800px]">
            <p
              className="text-[#0AC4D0]/60 text-sm mb-4"
              style={{ fontFamily: 'var(--font-mona-sans)' }}
            >
            </p>
            <p
              className="text-[#E2FFFE]/70 text-lg leading-relaxed"
              style={{ fontFamily: 'var(--font-mona-sans)' }}
            >
              {project.description}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
