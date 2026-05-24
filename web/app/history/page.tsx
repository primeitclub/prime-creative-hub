import type { Metadata } from 'next';
import Link from 'next/link';
import HistorySection from '@/components/sections/HistorySection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'History',
  description:
    'The story of Prime Creative Hub — from our founding moments to where we are today. A timeline of milestones, projects, and community growth.',
  alternates: { canonical: 'https://creativehub.primeitclub.com/history' },
};

export default function HistoryPage() {
  return (
    <main className="pt-[74px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] pt-10">
        <nav
          className="flex items-center gap-2 mb-4"
          style={{ fontFamily: 'var(--font-mona-sans)', fontSize: '12px', color: 'rgba(226,255,254,0.3)' }}
        >
          <Link href="/" className="hover:text-[#0AC4D0] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span style={{ color: 'rgba(226,255,254,0.6)' }}>History</span>
        </nav>

        <div className="pb-6 border-b border-white/10 mb-0">
          <h1
            className="uppercase leading-none tracking-tight"
            style={{
              fontFamily: 'var(--font-space-grotesk)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 900,
              color: '#E2FFFE',
            }}
          >
            OUR HISTORY
          </h1>
          <p
            className="mt-3 max-w-xl"
            style={{
              fontFamily: 'var(--font-mona-sans)',
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(226,255,254,0.35)',
            }}
          >
            Every version of Prime Creative Hub has left a mark. Here&apos;s how we got here.
          </p>
        </div>
      </div>

      <HistorySection />
      <Footer />
    </main>
  );
}
