import HeroSection from '@/components/hero/HeroSection';
import WhatWeDo from '@/components/sections/WhatWeDo';
import ProjectShowcase from '@/components/sections/ProjectShowcase';
import BlogsSection from '@/components/sections/BlogsSection';
import TeamSection from '@/components/sections/TeamSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WhatWeDo />
      <ProjectShowcase />
      <BlogsSection />
      <TeamSection />
      <Footer />
    </main>
  );
}
