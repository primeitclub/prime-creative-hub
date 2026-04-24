import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { teamMembers } from '@/lib/data';

export default function TeamSection() {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px]">
      <SectionHeader title="EXECUTIVE TEAM 26/27" arrowHref="/team" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-14 gap-x-6">
        {teamMembers.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: (typeof teamMembers)[number] }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      {/* Circular avatar with teal background */}
      <div className="relative w-[159px] h-[159px] rounded-full bg-[#0AC4D0] overflow-hidden shrink-0">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name, role, subrole */}
      <div className="flex flex-col gap-[5px] items-center w-full">
        <p
          className="text-[#E2FFFE] font-semibold text-[22px] leading-[1.2] w-full"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {member.name}
        </p>
        <p
          className="text-[#E2FFFE] text-[14px] font-medium w-full"
          style={{ fontFamily: 'var(--font-mona-sans)' }}
        >
          {member.role}
        </p>
        <p
          className="text-[#E2FFFE] text-[11px] italic w-full"
          style={{ fontFamily: 'var(--font-mona-sans)' }}
        >
          {member.subrole}
        </p>
      </div>

      {/* Social icons */}
      <div className="flex items-center gap-2">
        <SocialBtn href={member.social.instagram} label="Instagram" src="/icons/instagram.svg" />
        <SocialBtn href={member.social.github}    label="GitHub"    src="/icons/github.svg"    />
        <SocialBtn href={member.social.linkedin}  label="LinkedIn"  src="/icons/linkedin.svg"  />
      </div>
    </div>
  );
}

function SocialBtn({ href, label, src }: { href: string; label: string; src: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="h-8 flex items-center justify-center group"
    >
      <Image
        src={src}
        alt=""
        width={16}
        height={16}
        className="transition-[filter] duration-150 group-hover:[filter:brightness(0)_invert(43%)_sepia(1)_hue-rotate(145deg)_saturate(500%)_brightness(87%)]"
      />
    </a>
  );
}

