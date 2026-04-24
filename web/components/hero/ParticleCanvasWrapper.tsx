'use client';

import dynamic from 'next/dynamic';

const ParticleCanvas = dynamic(() => import('./ParticleCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
});

export default function ParticleCanvasWrapper() {
  return <ParticleCanvas />;
}
