import type { Metadata } from 'next';
import Link from 'next/link';
import TeamSection from '@/components/sections/TeamSection';
import Footer from '@/components/Footer';
import { getCurrentCohort, formatCohort } from '@/lib/sanity';

export async function generateMetadata(): Promise<Metadata> {
  const cohort = await getCurrentCohort();
  const label = formatCohort(cohort);
  const tenure = label ? `${label} tenure` : 'current tenure';
  return {
    title: 'Team',
    description: `Meet the Executive Team of Prime Creative Hub — ${tenure}. Builders, designers and creators from Prime College, Kathmandu.`,
    alternates: { canonical: 'https://creativehub.primeitclub.com/team' },
  };
}

export default async function TeamPage() {
  const cohort = await getCurrentCohort();
  const cohortLabel = formatCohort(cohort);
  const heading = `EXECUTIVE TEAM${cohortLabel ? ` ${cohortLabel}` : ''}`;

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
            {heading}
          </h1>
        </div>
      </div>
      <TeamSection showHeader={false} />
      <Footer />
    </main>
  );
}
