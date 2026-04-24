import Image from 'next/image';
import Link from 'next/link';

const quickLinks = [
  { label: 'Home',     href: '/'         },
  { label: 'Projects', href: '/projects' },
  { label: 'Blogs',    href: '/blogs'    },
  { label: 'Team',     href: '/team'     },
];

export default function Footer() {
  return (
    <footer className="bg-[#050301]">

      {/* ── Top 3-column section ─────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] pt-16 pb-12 border-t border-white/8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">

          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Image
              src="/prime-creative-hub-logo.svg"
              alt="Prime Creative Hub"
              width={140}
              height={48}
            />
            <p className="text-[#E2FFFE]/40 text-xs" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              // Where Creativity Meets Innovation
            </p>
            <p className="text-[#E2FFFE]/25 text-xs leading-relaxed" style={{ fontFamily: 'var(--font-mona-sans)' }}>
              The technical wing of Prime IT Club building real-world impact through creativity, technology and community.
            </p>
          </div>

          {/* Col 2: Quick links — center aligned */}
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

          {/* Col 3: Social + email — right aligned */}
          <div className="flex flex-col gap-4 items-end">
            <p className="text-[#E2FFFE]/40 text-[10px] uppercase tracking-widest" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              // Connect
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', src: '/icons/instagram.svg' },
                { label: 'GitHub',    src: '/icons/github.svg'    },
                { label: 'LinkedIn',  src: '/icons/linkedin.svg'  },
              ].map(({ label, src }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:opacity-70 transition-opacity"
                >
                  <Image src={src} alt="" width={24} height={24} />
                </a>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Image src="/icons/mail.svg" alt="" width={16} height={16} />
              <span className="text-[#E2FFFE]/40 text-xs" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                creativehub@gmail.com
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── CREATIVE HUB watermark + copyright ───────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Oversized gradient wordmark */}
        <p
          className="text-[clamp(100px,10vw,169px)] font-black uppercase leading-none text-transparent select-none text-center"
          style={{
            fontFamily: 'var(--font-mona-sans)',
            backgroundImage: 'linear-gradient(92.7deg, rgb(41,93,96) 1.43%, rgb(35,198,198) 50.61%, rgb(41,93,96) 99.78%)',  
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
          }}
        >
          CREATIVE HUB
        </p>

        {/* Dark overlay covering bottom ~65% — replicates Figma's blurred rect */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '75%',
            background: 'linear-gradient(to bottom, transparent 0%, #050301 60%)',
          }}
        />

        {/* Copyright strip */}
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
