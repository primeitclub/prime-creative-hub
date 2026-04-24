import type { Metadata } from 'next';
import Link from 'next/link';
import { blogs } from '@/lib/data';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Blogs — Prime Creative Hub',
  description: 'Read articles and insights from Prime Creative Hub members.',
};

export default function BlogsPage() {
  return (
    <main className="pt-[74px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] py-20">
        {/* Header */}
        <div className="flex items-end justify-between pb-6 border-b border-white/10 mb-12">
          <div>
            <p className="text-[#0AC4D0]/60 text-sm mb-2" style={{ fontFamily: 'var(--font-mona-sans)' }}>
              // Insights &amp; learnings
            </p>
            <h1
              className="text-[clamp(40px,5vw,72px)] font-black uppercase leading-none text-[#E2FFFE] tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              ALL BLOGS
            </h1>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((post) => (
            <article
              key={post.id}
              className="flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#080808] hover:border-[#0AC4D0]/20 transition-all group"
            >
              <div className="relative h-[200px] overflow-hidden bg-[#0a0a0a] border-b border-white/5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-6 gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-[#0AC4D0]/10 border border-[#0AC4D0]/20 flex items-center justify-center">
                    <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                      <circle cx="5" cy="3.5" r="2" fill="#0AC4D0" opacity="0.7" />
                      <path d="M1 9.5c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="#0AC4D0" strokeWidth="0.8" opacity="0.7" />
                    </svg>
                  </div>
                  <span className="text-[#E2FFFE]/50 text-xs" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                    {post.author}
                  </span>
                </div>

                <Link href={`/blogs/${post.slug}`}>
                  <h3
                    className="text-[#E2FFFE] text-xl font-bold uppercase leading-snug tracking-tight hover:text-[#0AC4D0]/90 transition-colors"
                    style={{ fontFamily: 'var(--font-space-grotesk)' }}
                  >
                    {post.title}
                  </h3>
                </Link>

                <p className="text-[#E2FFFE]/30 text-xs mt-auto pt-2" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                  {post.date}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
