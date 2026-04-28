import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

// Body font — Space Grotesk for body text
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

// Heading font — DM Sans as stand-in for Mona Sans (not on Google Fonts).
// To use real Mona Sans: download woff2 from github.com/mona-sans and
// swap to next/font/local with variable: '--font-mona-sans'.
const monaSansSubstitute = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mona-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Prime Creative Hub',
    template: '%s | Prime Creative Hub',
  },
  description:
    'Prime Creative Hub is the creative-technical wing of Prime IT Club at Prime College, Kathmandu. We create real-world impact where creativity, technology and community converge.',
  keywords: [
    'Prime Creative Hub',
    'Prime IT Club',
    'Nepal',
    'Tech Club',
    'Kathmandu',
    'Prime College',
    'Saugat KC',
    'Nepal tech community',
    'college tech club Nepal',
    'IT club Nepal',
    'Prime College Kathmandu',
    'tech students Nepal',
    'web development Nepal',
  ],
  metadataBase: new URL('https://creativehub.primeitclub.com'),
  alternates: { canonical: 'https://creativehub.primeitclub.com' },
  openGraph: {
    siteName: 'Prime Creative Hub',
    locale: 'en_NP',
    type: 'website',
    url: 'https://creativehub.primeitclub.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Prime Creative Hub' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@primeitclub',
    images: ['/og-image.png'],
  },
  other: {
    'geo.region': 'NP-BA',
    'geo.placename': 'Kathmandu',
    'geo.position': '27.7172;85.3240',
    ICBM: '27.7172, 85.3240',
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Prime Creative Hub',
  url: 'https://creativehub.primeitclub.com',
  logo: 'https://creativehub.primeitclub.com/prime-creative-hub-logo.svg',
  description: 'Creative-technical wing of Prime IT Club at Prime College, Kathmandu, Nepal',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  sameAs: [
    'https://www.instagram.com/primecreativehub',
    'https://github.com/primeitclub',
    'https://www.linkedin.com/company/prime-it-club',
    'https://www.facebook.com/primeitclub',
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Prime IT Club',
    url: 'https://primeitclub.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${monaSansSubstitute.variable}`}
    >
      <body className="bg-[#050301] text-[#E2FFFE] min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navbar />
        {children}
        <p className="sr-only">
          Prime Creative Hub is a student-run creative and technical organization based in Kathmandu,
          Nepal, operating as the creative wing of Prime IT Club at Prime College. Founded in 2019,
          the organization focuses on building real-world digital products, sharing technical
          knowledge, and developing the next generation of designers and developers in Nepal.
        </p>
      </body>
    </html>
  );
}
