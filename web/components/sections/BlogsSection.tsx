import Image from 'next/image';
import Link from 'next/link';
import SectionHeader from '@/components/ui/SectionHeader';
import { getPosts, urlFor } from '@/lib/sanity';

export default async function BlogsSection() {
  const posts = await getPosts();

  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px]">
      <SectionHeader title="BLOGS" arrowHref="/blogs" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post: any) => (
          <article
            key={post._id}
            className="flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-[#080808] hover:border-[#0AC4D0]/20 transition-all group"
          >
            {/* Cover image */}
            <div className="relative h-[200px] overflow-hidden bg-[#0a0a0a] border-b border-white/5">
              {post.thumbnail && (
                <img
                  src={urlFor(post.thumbnail).width(600).url()}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 gap-3">
              {/* Author */}
              <div className="flex items-center gap-2">
                <Image src="/icons/author.svg" alt="" width={16} height={16} />
                <span className="text-[#E2FFFE]/50 text-xs" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                  {post.author}
                </span>
              </div>

              {/* Title */}
              <Link href={`/blogs/${post.slug?.current}`}>
                <h3
                  className="text-[#E2FFFE] text-xl font-bold uppercase leading-snug tracking-tight hover:text-[#0AC4D0]/90 transition-colors"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {post.title}
                </h3>
              </Link>

              {/* Date */}
              <p
                className="text-[#E2FFFE]/30 text-xs mt-auto pt-2"
                style={{ fontFamily: 'var(--font-mona-sans)' }}
              >
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : ''}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
