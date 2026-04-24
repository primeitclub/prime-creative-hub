import type { Metadata } from 'next';
import { getTeamMembers, urlFor } from '@/lib/sanity';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Team — Prime Creative Hub',
  description: 'Meet the executive team of Prime Creative Hub.',
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  return (
    <main className="pt-[74px] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] py-20">
        {/* Header */}
        <div className="flex items-end justify-between pb-6 border-b border-white/10 mb-14">
          <div>
            <p className="text-[#0AC4D0]/60 text-sm mb-2" style={{ fontFamily: 'var(--font-mona-sans)' }}>
              // The people behind the work
            </p>
            <h1
              className="text-[clamp(40px,5vw,72px)] font-black uppercase leading-none text-[#E2FFFE] tracking-tight"
              style={{ fontFamily: 'var(--font-space-grotesk)' }}
            >
              EXECUTIVE TEAM 26/27
            </h1>
          </div>
        </div>

        {/* Grid — all members */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {teamMembers.map((member: any) => {
            const photoUrl = member.photo ? urlFor(member.photo).width(280).url() : '';
            return (
              <div key={member._id} className="flex flex-col items-center text-center gap-3 group">
                {/* Avatar */}
                <div className="relative w-[140px] h-[140px] shrink-0">
                  <div className="absolute inset-0 rounded-full border-2 border-[#0AC4D0]/20 group-hover:border-[#0AC4D0]/50 transition-colors" />
                  <div className="absolute inset-2 rounded-full border border-[#0AC4D0]/10" />
                  <div className="absolute inset-1 rounded-full overflow-hidden bg-[#0d0d0d]">
                    {photoUrl && (
                      <img src={photoUrl} alt={member.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h4 className="text-[#E2FFFE] font-bold text-[17px] leading-tight" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                    {member.name}
                  </h4>
                  <p className="text-[#0AC4D0]/80 text-[13px] font-medium" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                    {member.role}
                  </p>
                  <p className="text-[#E2FFFE]/35 text-[11px]" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                    {member.domain}
                  </p>
                </div>

                {/* Social — only rendered when a value exists */}
                <div className="flex items-center gap-2">
                  {[
                    { label: 'Instagram', href: member.instagram, icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="5" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                    )},
                    { label: 'GitHub', href: member.github, icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                    )},
                    { label: 'LinkedIn', href: member.linkedin, icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    )},
                    { label: 'Personal Site', href: member.personalSite, icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                      </svg>
                    )},
                  ].filter(({ href }) => !!href).map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[#E2FFFE]/30 hover:text-[#0AC4D0] hover:border-[#0AC4D0]/30 transition-all"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </main>
  );
}
