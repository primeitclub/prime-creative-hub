'use client';

import dynamic from 'next/dynamic';

const ParticleLogo = dynamic(() => import('./ParticleLogo'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />,
});

export default function ParticleLogoWrapper() {
  return <ParticleLogo />;
}
