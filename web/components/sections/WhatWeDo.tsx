import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import ParticleLogoWrapper from '@/components/ParticleLogoWrapper';
import { services } from '@/lib/data';

const serviceIconSrc: Record<number, string> = {
  1: '/icons/what-we-do/build.svg',
  2: '/icons/what-we-do/collaborate.svg',
  3: '/icons/what-we-do/grow.svg',
  4: '/icons/what-we-do/mentor.svg',
  5: '/icons/what-we-do/host.svg',
  6: '/icons/what-we-do/expertise.svg',
};

export default function WhatWeDo() {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-[150px]">
      <SectionHeader title="WHAT WE DO" arrowHref="/team" />

      <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-start">

        {/* Left: particle logo animation */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="w-[340px] h-[340px] rounded-2xl overflow-hidden ">
            <ParticleLogoWrapper />
          </div>
        </div>

        {/* Right: 3×2 service card grid with visible gaps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="rounded-xl bg-[#0E0E0E] px-6 pt-8 pb-7 flex flex-col gap-5 hover:bg-[#001011] "
            >
              <div className="shrink-0">
                <Image
                  src={serviceIconSrc[service.id]}
                  alt=""
                  width={32}
                  height={32}
                />
              </div>
              <div className="space-y-2">
                <h3
                  className="text-[#E2FFFE] text-[15px] font-bold uppercase"
                  style={{ fontFamily: 'var(--font-space-grotesk)' }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-[#E2FFFE]/38 text-[13px] leading-relaxed"
                  style={{ fontFamily: 'var(--font-mona-sans)' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
