import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#050301] flex flex-col pt-[74px] overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 45%, rgba(10,196,208,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Main centered content */}
      <div className="relative flex-1 flex items-center justify-center px-6 sm:px-10 py-14">
        <div className="flex flex-col items-center text-center max-w-[900px] w-full">

          {/* Pill */}
          <div className="relative inline-flex self-center mb-6">
            <span
              className="inline-flex items-center px-5 py-2 rounded-full border border-white/10 bg-white/5 text-[15px] text-[#E2FFFE]"
              style={{ fontFamily: 'var(--font-mona-sans)' }}
            >
              Hello👋, We&apos;re Prime Creative Hub
            </span>
            <MiniCursor
              name="Saugat"
              color="#8B5CF6"
              className="absolute -bottom-8 left-20 translate-x-10"
              animName="cursor-float-1"
              animDuration="4.5s"
            />
          </div>

          {/* Headline block */}
          <div className="leading-[0.85] w-full">

            {/* IMAGINE + Technical wing annotation on same line */}
            <div className="flex items-center justify-center gap-[25px] flex-wrap">
              <h1
                className="text-[clamp(70px,9.375vw,120px)] font-bold tracking-[-0.033em] leading-[0.85]"
                style={{ fontFamily: 'var(--font-mona-sans)', color: '#0AC4D0' }}
              >
                <HeadlineWord color="#0AC4D0">IMAGINE</HeadlineWord>
              </h1>
              <div
                className="hidden md:flex flex-col items-start text-left text-[15px] leading-[1.7] text-[#E2FFFE] self-center pb-1"
                style={{ fontFamily: 'var(--font-mona-sans)' }}
              >
                <span>// Technical wing</span>
                <span>of Prime IT Club</span>
              </div>
            </div>

            {/* CREATE */}
            <HeadlineWord color="#0AC4D0">CREATE</HeadlineWord>

            {/* INSPIRE + Join The Hub */}
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <HeadlineWord color="#E2FFFE">INSPIRE</HeadlineWord>
              <div className="relative self-center">
                <Link
                  href="#"
                  className="flex items-center gap-2 px-[25px] py-3 rounded-full border border-white/20 text-[#E2FFFE] text-[17.5px] font-bold hover:border-[#0AC4D0]/50 hover:text-[#0AC4D0] transition-all whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-mona-sans)' }}
                >
                  <span className="relative flex w-2.5 h-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-400" />
                  </span>
                  Join The Hub
                </Link>
                <MiniCursor
                  name="Saurav"
                  color="#10B981"
                  className="absolute -bottom-2 right-10 translate-x-20"
                  animName="cursor-float-3"
                  animDuration="3.8s"
                />
              </div>
            </div>

            {/* Projects → + & REPEAT */}
            <div className="flex items-center justify-center gap-5 flex-wrap">
              <div className="relative self-center">
                <Link
                  href="/projects"
                  className="flex items-center gap-1 px-5 py-2.5 rounded-full border border-white/15 text-[#E2FFFE] text-[17.5px] font-medium hover:border-[#0AC4D0]/50 hover:text-[#0AC4D0] transition-all whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-mona-sans)' }}
                >
                  Projects →
                </Link>
                <MiniCursor
                  name="Sameer"
                  color="#EC4899"
                  className="absolute -bottom-5 right-0 translate-x-3"
                  animName="cursor-float-2"
                  animDuration="5.2s"
                />
              </div>
              <h1
                className="text-[clamp(70px,9.375vw,120px)] font-bold tracking-[-0.033em] leading-[0.85]"
                style={{ fontFamily: 'var(--font-mona-sans)' }}
              >
                <HeadlineWord color="#E2FFFE">
                  <span style={{ color: '#E2FFFE' }}>&amp; </span>
                  <span style={{ color: '#0AC4D0' }}>REPEAT</span>
                </HeadlineWord>
              </h1>
            </div>
          </div>

          {/* Tagline */}
          <p
            className="text-[#E2FFFE] max-w-[560px] leading-relaxed mt-10 font-bold text-[20px]"
            style={{ fontFamily: 'var(--font-mona-sans)' }}
          >
            We create real-world impact through
            <br />
            <span className="text-[#0AC4D0]">creativity</span>,{' '}
            <span className="text-[#0AC4D0]">technology</span> and
            <span className="text-[#0AC4D0]"> community</span>.
          </p>
        </div>
      </div>

      {/* Hero footer bar */}
      <div className="w-full border-t border-white/8" />
      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px] py-3">
          <div className="relative flex items-center">

            {/* Left: tagline */}
            <p className="absolute left-0 text-[#E2FFFE] text-[15px] font-medium" style={{ fontFamily: 'var(--font-mona-sans)' }}>
              // Where Creativity Meets Innovation
            </p>

            {/* Social icons — truly centered */}
            <div className="flex items-center gap-4 mx-auto">
              <SocialIcon label="Instagram" src="/icons/instagram.svg" />
              <SocialIcon label="GitHub"    src="/icons/github.svg"    />
              <SocialIcon label="LinkedIn"  src="/icons/linkedin.svg"  />
            </div>

            {/* Right: email */}
            <div className="absolute right-0 flex items-center gap-2">
              <SocialIcon label="Mail" src="/icons/mail.svg" />
              <span className="text-[#E2FFFE] text-[15px]" style={{ fontFamily: 'var(--font-mona-sans)' }}>
                creativehub@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeadlineWord({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span
      className="text-[clamp(70px,9.375vw,120px)] font-bold tracking-[-0.033em] leading-[0.85] block"
      style={{ fontFamily: 'var(--font-space-grotesk)', color }}
    >
      {children}
    </span>
  );
}

function SocialIcon({ label, src }: { label: string; src: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all group"
    >
      <Image
        src={src}
        alt=""
        width={35}
        height={35}
        className="opacity-100 group-hover:opacity-80 transition-opacity"
      />
    </a>
  );
}

function MiniCursor({
  name, color, className, animName, animDuration,
}: {
  name: string; color: string; className?: string; animName: string; animDuration: string;
}) {
  return (
    <div
      className={`hidden lg:flex flex-col items-start pointer-events-none z-10 ${className ?? ''}`}
      style={{ animation: `${animName} ${animDuration} ease-in-out infinite` }}
    >
      <svg width="15" height="20" viewBox="0 0 12 16" fill="none">
        <path d="M1.5 1.5L10.5 7.5L6 9L3.5 14.5L1.5 1.5Z" fill={color} />
        <path d="M1.5 1.5L10.5 7.5L6 9L3.5 14.5L1.5 1.5Z" stroke="rgba(0,0,0,0.25)" strokeWidth="0.5" />
      </svg>
      <div
        className="m-[3px] px-2.5 py-1.5 rounded-2xl text-[#E2FFFE] text-[15px] font-semibold whitespace-nowrap"
        style={{ backgroundColor: color, fontFamily: 'var(--font-mona-sans)' }}
      >
        {name}
      </div>
    </div>
  );
}
