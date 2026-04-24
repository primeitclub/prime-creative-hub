'use client';

import { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Nav links — desktop */}
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

        {/* CTA — desktop */}
        <Link
          href="#"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-[#0AC4D0] text-[#050301] rounded-full hover:bg-[#0AC4D0]/85 transition-all"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          Join The Hub →
        </Link>

        {/* Hamburger — mobile */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 p-2"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="#E2FFFE" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <>
              <span className="w-5 h-0.5 bg-[#E2FFFE] block" />
              <span className="w-5 h-0.5 bg-[#E2FFFE] block" />
              <span className="w-5 h-0.5 bg-[#E2FFFE] block" />
            </>
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <nav className="md:hidden border-t border-white/10 bg-[#050301] px-6 py-5 flex flex-col items-end gap-5">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive ? 'text-[#0AC4D0]' : 'text-[#E2FFFE]/70 hover:text-[#E2FFFE]'
                }`}
                style={{ fontFamily: 'var(--font-space-grotesk)' }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            className="self-end mt-1 px-4 py-2 text-sm font-medium bg-[#0AC4D0] text-[#050301] rounded-full hover:bg-[#0AC4D0]/85 transition-all"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Join The Hub →
          </Link>
        </nav>
      )}
    </header>
  );
}
