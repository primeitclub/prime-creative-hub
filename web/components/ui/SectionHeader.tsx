import Image from 'next/image';

interface SectionHeaderProps {
  title: string;
  showArrow?: boolean;
  arrowHref?: string;
}

export default function SectionHeader({ title, showArrow = true, arrowHref = '#' }: SectionHeaderProps) {
  return (
    <div className="relative flex items-end pb-6 border-b border-white/10 mb-16">
      <h2
        className="text-[clamp(32px,4vw,58px)] font-black uppercase leading-none text-[#E2FFFE] tracking-tight pl-2"
        style={{ fontFamily: 'var(--font-space-grotesk)' }}
      >
        {title}
      </h2>
      {showArrow && (
        <a
          href={arrowHref}
          className="absolute bottom-0 right-0 translate-y-1/2 w-9 h-9 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all group shrink-0 overflow-hidden z-10"
          aria-label={`View all ${title.toLowerCase()}`}
        >
          <Image
            src="/icons/creative-bird.svg"
            alt=""
            width={56}
            height={56}
            className="w-full h-full"
          />
        </a>
      )}
    </div>
  );
}
