'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home',     href: '/'         },
  { label: 'Projects', href: '/projects' },
  { label: 'Blogs',    href: '/blogs'    },
  { label: 'Team',     href: '/team'     },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050301]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] h-[74px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/prime-creative-hub-logo.svg"
            alt="Prime Creative Hub"
            width={150}
            height={52}
            priority
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  isActive
                    ? 'text-[#0AC4D0]'
                    : 'text-[#E2FFFE]/60 hover:text-[#E2FFFE]'
                }`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0AC4D0] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <Link
          href="#"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[#0AC4D0] text-[#050301] rounded-full hover:bg-[#0AC4D0]/85 transition-all"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Join The Hub →
        </Link>

        {/* Mobile hamburger */}
        <button className="md:hidden flex flex-col gap-1.5 p-2" aria-label="Open menu">
          <span className="w-5 h-0.5 bg-[#E2FFFE] block" />
          <span className="w-5 h-0.5 bg-[#E2FFFE] block" />
          <span className="w-5 h-0.5 bg-[#E2FFFE] block" />
        </button>
      </div>
    </header>
  );
}
