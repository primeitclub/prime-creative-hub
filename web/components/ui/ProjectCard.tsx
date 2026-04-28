import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';

export default function ProjectCard({ project }: { project: any }) {
  const slug = project.slug?.current;
  const techTags: string[] = Array.isArray(project.techStack)
    ? project.techStack
    : project.techStack?.split(',').map((tag: string) => tag.trim()).filter(Boolean) ?? [];

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#080808] hover:border-[#0AC4D0]/20 transition-all group">
      {/* Cover image */}
      <div className="relative h-[260px] overflow-hidden bg-[#0a0a0a]">
        {project.thumbnail && (
          <img
            src={urlFor(project.thumbnail).width(600).url()}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Author */}
        <div className="flex items-center gap-2">
          <Image src="/icons/author.svg" alt="" width={16} height={16} />
          <span className="text-[#E2FFFE]/50 text-xs" style={{ fontFamily: 'var(--font-mona-sans)' }}>
            {project.author}
          </span>
        </div>

        {/* Title & description */}
        <div className="space-y-2 flex-1">
          <Link href={`/projects/${slug}`}>
            <h3
              className="text-[#E2FFFE] text-lg font-bold uppercase leading-tight tracking-tight hover:text-[#0AC4D0]/90 transition-colors"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              {project.title}
            </h3>
          </Link>
          <p
            className="text-[#E2FFFE]/35 text-sm leading-relaxed line-clamp-3"
            style={{ fontFamily: 'var(--font-mona-sans)' }}
          >
            {project.shortDescription}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {techTags.slice(0, 6).map((tag: string) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full border border-white/10 text-[#E2FFFE]/40 text-[11px]"
              style={{ fontFamily: 'var(--font-mona-sans)' }}
            >
              {tag}
            </span>
          ))}
          {techTags.length > 6 && (
            <span className="px-2.5 py-0.5 rounded-full border border-white/10 text-[#E2FFFE]/30 text-[11px]">
              +{techTags.length - 6}
            </span>
          )}
        </div>

        {/* Links row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#E2FFFE]/40 text-xs hover:text-[#E2FFFE]/70 transition-colors"
                style={{ fontFamily: 'var(--font-mona-sans)' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Github
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[#E2FFFE]/40 text-xs hover:text-[#E2FFFE]/70 transition-colors"
                style={{ fontFamily: 'var(--font-mona-sans)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                </svg>
                Live URL
              </a>
            )}
          </div>
          {slug && (
            <Link
              href={`/projects/${slug}`}
              className="text-[#0AC4D0]/70 text-xs hover:text-[#0AC4D0] transition-colors"
              style={{ fontFamily: 'var(--font-mona-sans)' }}
            >
              Read More →
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
