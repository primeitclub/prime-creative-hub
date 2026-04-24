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
  title: 'Prime Creative Hub',
  description:
    'Where Creativity Meets Innovation — The technical wing of Prime IT Club. Building, collaborating, and growing together.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${monaSansSubstitute.variable}`}
    >
      <body className="bg-[#050301] text-[#E2FFFE] min-h-screen">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
