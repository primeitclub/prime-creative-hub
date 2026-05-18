import Image from 'next/image';
import Link from 'next/link';
import { getSiteSettings } from '@/lib/sanity';

const quickLinks = [
  { label: 'Home',     href: '/'         },
  { label: 'Projects', href: '/projects' },
  { label: 'Blogs',    href: '/blogs'    },
  { label: 'Team',     href: '/team'     },
  { label: 'History',  href: '/history'  },
];

// Icon components for platforms without a file in /public/icons/
function TwitterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

const SOCIAL_CONFIG = [
  {
    key: 'instagram' as const,
    label: 'Instagram',
    icon: <Image src="/icons/instagram.svg" alt="" width={20} height={20} />,
  },
  {
    key: 'github' as const,
    label: 'GitHub',
    icon: <Image src="/icons/github.svg" alt="" width={20} height={20} />,
  },
  {
    key: 'linkedin' as const,
    label: 'LinkedIn',
    icon: <Image src="/icons/linkedin.svg" alt="" width={20} height={20} />,
  },
  {
    key: 'twitter' as const,
    label: 'Twitter / X',
    icon: <TwitterIcon />,
  },
  {
    key: 'facebook' as const,
    label: 'Facebook',
    icon: <FacebookIcon />,
  },
];

export default async function Footer() {
  const settings = await getSiteSettings() as {
    tagline?: string;
    contactEmail?: string;
    social?: Record<string, string | undefined>;
  } | null;

  const social = settings?.social ?? {};
  const email = settings?.contactEmail ?? null;

  const activeSocials = SOCIAL_CONFIG.filter(({ key }) => Boolean(social[key]));

  return (
    <footer className="bg-[#050301]">

      {/* ── Top 3-column section ─────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] pt-16 pb-12 border-t border-white/8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">

          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4 items-center sm:items-start">
            <Image
              src="/prime-creative-hub-logo.svg"
              alt="Prime Creative Hub"
              width={140}
              height={48}
            />
            <p className="text-[#E2FFFE]/40 text-xs text-center sm:text-left" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              // Where Creativity Meets Innovation
            </p>
            <p className="text-[#E2FFFE]/25 text-xs leading-relaxed text-center sm:text-left" style={{ fontFamily: 'var(--font-mona-sans)' }}>
              The technical wing of Prime IT Club building real-world impact through creativity, technology and community.
            </p>
          </div>

          {/* Col 2: Quick links */}
          <div className="flex flex-col gap-4 items-center">
            <p className="text-[#E2FFFE]/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              // Quick Links
            </p>
            <nav className="flex flex-col gap-2.5 items-center">
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-[#E2FFFE]/50 text-sm hover:text-[#0AC4D0] transition-colors"
                  style={{ fontFamily: 'var(--font-mona-sans)' }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3: Social + email */}
          <div className="flex flex-col gap-4 items-center sm:items-end">
            <p className="text-[#E2FFFE]/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              // Connect
            </p>

            {activeSocials.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end">
                {activeSocials.map(({ key, label, icon }) => (
                  <a
                    key={key}
                    href={social[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#E2FFFE]/60 hover:text-[#0AC4D0] hover:opacity-100 transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            )}

            {email && (
              <div className="flex items-center gap-2">
                <Image src="/icons/mail.svg" alt="" width={16} height={16} />
                <span className="text-[#E2FFFE]/40 text-xs" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                  {email}
                </span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── CREATIVE HUB watermark + copyright ───────────────────────── */}
      <div className="relative overflow-hidden pb-10">
        <p
          className="text-[clamp(60px,11vw,169px)] font-black uppercase leading-none text-transparent select-none text-center"
          style={{
            fontFamily: 'var(--font-mona-sans)',
            backgroundImage: 'linear-gradient(92.7deg, rgb(41,93,96) 1.43%, rgb(35,198,198) 50.61%, rgb(41,93,96) 99.78%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          CREATIVE HUB
        </p>

        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '75%',
            background: 'linear-gradient(to bottom, transparent 0%, #050301 60%)',
          }}
        />

        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5">
          <span className="text-[#f8f8ff]/60 text-[11px]">©</span>
          <p
            className="text-[#f8f8ff]/60 text-[11px] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mona-sans)' }}
          >
            Prime Creative Hub. All rights reserved
          </p>
        </div>
      </div>

    </footer>
  );
}
