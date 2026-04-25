import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import { getTeamMembers, urlFor } from '@/lib/sanity';

export default async function TeamSection({ showHeader = true }: { showHeader?: boolean }) {
  const teamMembers = await getTeamMembers();

  return (
    <section className={`${showHeader ? 'py-20' : 'pb-20'} max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px]`}>
      {showHeader && <SectionHeader title="EXECUTIVE TEAM 26/27" arrowHref="/team" />}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-14 gap-x-6">
        {teamMembers.map((member: any) => (
          <TeamCard key={member._id} member={member} />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: any }) {
  const photoUrl = member.photo ? urlFor(member.photo).width(320).url() : '';

  return (
    <div className="flex flex-col items-center text-center gap-3">
      {/* Circular avatar with teal background */}
      <div className="relative w-[159px] h-[159px] rounded-full bg-[#0AC4D0] overflow-hidden shrink-0">
        {photoUrl && (
          <img
            src={photoUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Name, role, subrole */}
      <div className="flex flex-col gap-[2px] items-center w-full">
        <p
          className="text-[#E2FFFE] font-semibold text-[22px] leading-[1.2] w-full"
          style={{ fontFamily: 'var(--font-space-grotesk)' }}
        >
          {member.name}
        </p>
        <p
          className="text-[#E2FFFE]/60 text-[14px] font-medium w-full"
          style={{ fontFamily: 'var(--font-mona-sans)' }}
        >
          {member.role}
        </p>
        <p
          className="text-[#E2FFFE]/60 text-[11px] italic w-full"
          style={{ fontFamily: 'var(--font-mona-sans)' }}
        >
          {member.domain}
        </p>
      </div>

      {/* Social icons — only rendered when a value exists */}
      <div className="flex items-center gap-2">
        {member.instagram   && <SocialBtn href={member.instagram}   label="Instagram"    src="/icons/instagram.svg"  />}
        {member.github      && <SocialBtn href={member.github}      label="GitHub"       src="/icons/github.svg"     />}
        {member.linkedin    && <SocialBtn href={member.linkedin}    label="LinkedIn"     src="/icons/linkedin.svg"   />}
        {member.personalSite && <SocialBtn href={member.personalSite} label="Personal Site" src="/icons/site.svg"   />}
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
        width={19}
        height={19}
        className="transition-[filter] duration-150 group-hover:[filter:brightness(0)_invert(43%)_sepia(1)_hue-rotate(145deg)_saturate(500%)_brightness(87%)]"
      />
    </a>
  );
}
