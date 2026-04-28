import type { Metadata } from 'next';
import HeroSection from '@/components/hero/HeroSection';
import WhatWeDo from '@/components/sections/WhatWeDo';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import BlogsSection from '@/components/sections/BlogsSection';
import TeamSection from '@/components/sections/TeamSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Prime Creative Hub — where creativity, technology and community converge. Wing of Prime IT Club at Prime College, Kathmandu, Nepal.',
  alternates: { canonical: 'https://creativehub.primeitclub.com' },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Prime Creative Hub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prime Creative Hub is the creative-technical wing of Prime IT Club at Prime College, Kathmandu, Nepal. We build real projects, share knowledge and grow together as designers, developers and creators.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I join Prime Creative Hub?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can join Prime Creative Hub by reaching out via our website at creativehub.primeitclub.com or emailing us at creativehub@gmail.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does Prime Creative Hub do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prime Creative Hub builds real-world projects, hosts workshops and knowledge sharing sessions, mentors members in UI/UX, frontend, backend development, QA and video editing, and collaborates across teams to create meaningful digital experiences.',
      },
    },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HeroSection />
      <WhatWeDo />
      <ProjectShowcase />
      <BlogsSection />
      <TeamSection />
      <Footer />
    </main>
  );
}
