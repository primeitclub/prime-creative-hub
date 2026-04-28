import type { Metadata } from 'next';
import Link from 'next/link';
import TeamSection from '@/components/sections/TeamSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the Executive Team of Prime Creative Hub — 26/27 tenure. Builders, designers and creators from Prime College, Kathmandu.',
  alternates: { canonical: 'https://creativehub.primeitclub.com/team' },
};

export default function TeamPage() {
  return (
    <main className="pt-[74px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] pt-10">
        <nav className="flex items-center gap-2 text-xs text-[#E2FFFE]/30 mb-4" style={{ fontFamily: 'var(--font-mona-sans)' }}>
          <Link href="/" className="hover:text-[#0AC4D0] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#E2FFFE]/60">Team</span>
        </nav>
        <div className="pb-6 border-b border-white/10 mb-12">
          <h1
            className="text-[clamp(40px,5vw,72px)] font-black uppercase leading-none text-[#E2FFFE] tracking-tight"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            EXECUTIVE TEAM 26/27
          </h1>
        </div>
      </div>
      <TeamSection showHeader={false} />
      <Footer />
    </main>
  );
}
