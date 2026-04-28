import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ slug: string }> };

function bodyToPlainText(body: any[]): string {
  if (!Array.isArray(body)) return '';
  return body
    .filter((block: any) => block._type === 'block')
    .map((block: any) => block.children?.map((c: any) => c.text ?? '').join('') ?? '')
    .join(' ')
    .trim()
    .slice(0, 160);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const description = bodyToPlainText(post.body) || undefined;
  return {
    title: post.title,
    description,
    alternates: { canonical: `https://creativehub.primeitclub.com/blogs/${slug}` },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      images: post.thumbnail
        ? [{ url: urlFor(post.thumbnail).width(1200).url() }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="pt-[74px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] pt-10 pb-20">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#E2FFFE]/30 mb-8" style={{ fontFamily: 'var(--font-mona-sans)' }}>
          <Link href="/" className="hover:text-[#0AC4D0] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-[#0AC4D0] transition-colors">Blogs</Link>
          <span>/</span>
          <span className="text-[#E2FFFE]/60 truncate max-w-[200px]">{post.title}</span>
        </nav>

        {/* Cover image */}
        {post.thumbnail && (
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-[#0a0a0a] mb-12">
            <img
              src={urlFor(post.thumbnail).width(1200).url()}
              alt={post.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050301] via-transparent to-transparent" />
          </div>
        )}

        {/* Header */}
        <div className="max-w-[800px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-4 h-4 rounded-full bg-[#0AC4D0]/10 border border-[#0AC4D0]/20 flex items-center justify-center">
              <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5">
                <circle cx="5" cy="3.5" r="2" fill="#0AC4D0" opacity="0.7" />
                <path d="M1 9.5c0-2.2 1.8-3.5 4-3.5s4 1.3 4 3.5" stroke="#0AC4D0" strokeWidth="0.8" opacity="0.7" />
              </svg>
            </div>
            <span className="text-[#E2FFFE]/50 text-sm" style={{ fontFamily: 'var(--font-mona-sans)' }}>
              {post.author}
            </span>
            {post.publishedAt && (
              <>
                <span className="text-[#E2FFFE]/20 text-sm">·</span>
                <span className="text-[#E2FFFE]/30 text-sm" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </>
            )}
          </div>

          <h1
            className="text-[clamp(32px,4.5vw,60px)] font-black uppercase leading-tight text-[#E2FFFE] tracking-tight mb-12"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            {post.title}
          </h1>

          {/* Body */}
          <div className="border-t border-white/10 pt-10 space-y-5">
            {post.body?.map((block: any, i: number) => (
              <Block key={block._key ?? i} block={block} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

function Block({ block }: { block: any }) {
  if (block._type !== 'block') return null;

  const text = block.children
    ?.map((child: any) => child.text ?? '')
    .join('');

  const baseClass = { fontFamily: 'var(--font-mona-sans)' };

  switch (block.style) {
    case 'h1':
      return <h1 className="text-[#E2FFFE] text-4xl font-black uppercase mt-10 mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{text}</h1>;
    case 'h2':
      return <h2 className="text-[#E2FFFE] text-3xl font-bold uppercase mt-8 mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{text}</h2>;
    case 'h3':
      return <h3 className="text-[#E2FFFE] text-2xl font-bold mt-6 mb-2" style={{ fontFamily: 'var(--font-space-grotesk)' }}>{text}</h3>;
    case 'h4':
      return <h4 className="text-[#E2FFFE] text-xl font-semibold mt-4 mb-2" style={baseClass}>{text}</h4>;
    case 'blockquote':
      return (
        <blockquote className="border-l-2 border-[#0AC4D0]/50 pl-5 text-[#E2FFFE]/60 text-lg italic" style={baseClass}>
          {text}
        </blockquote>
      );
    default:
      return <p className="text-[#E2FFFE]/70 text-[17px] leading-relaxed" style={baseClass}>{text}</p>;
  }
}
