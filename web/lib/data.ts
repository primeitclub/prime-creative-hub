export interface TeamMember {
  id: number;
  name: string;
  role: string;
  subrole: string;
  image: string;
  social: { instagram: string; github: string; linkedin: string };
}

export interface Project {
  id: number;
  title: string;
  description: string;
  author: string;
  tags: string[];
  image: string;
  github: string;
  liveUrl: string;
}

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Nirjala Shakya',
    role: 'Creative Lead',
    subrole: 'Backend / Product Manager',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Nirjala',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 2,
    name: 'Saugat Kc',
    role: 'Creative Director',
    subrole: 'PM / QA / Consultant',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Saugat',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 3,
    name: 'Rikesh Sherpa',
    role: 'Creative Director',
    subrole: 'Full Stack Lead',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Rikesh',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 4,
    name: 'Sameer Acharya',
    role: 'Creative Director',
    subrole: 'UI/UX Lead',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Sameer',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 5,
    name: 'Sujal Chitrakar',
    role: 'Creative Director',
    subrole: 'Frontend Co-Lead',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Sujal',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 6,
    name: 'Saurav Manandhar',
    role: 'Creative Director',
    subrole: 'UI/UX Co-Lead',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Saurav',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 7,
    name: 'Mandip Shrestha',
    role: 'Creative Director',
    subrole: 'Full Stack Co-Lead',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Mandip',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 8,
    name: 'Manjil Aryal',
    role: 'Creative Director',
    subrole: 'Frontend Co-Lead',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Manjil',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
  {
    id: 9,
    name: 'Sagan Tamrakar',
    role: 'Creative Director',
    subrole: 'Video Lead',
    image: 'https://api.dicebear.com/7.x/personas/svg?seed=Sagan',
    social: { instagram: '#', github: '#', linkedin: '#' },
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: 'ICT MEETUP CMS — A VERSION BASED EVENT MANAGEMENT SYSTEM',
    description:
      'A comprehensive event management system built for the ICT community with version control and seamless collaboration tools for organizers and participants.',
    author: 'Prime Creative Hub',
    tags: ['Figma', 'React.js', 'Node.js', 'MySQL', 'Vercel', 'Kubernetes', 'Docker', 'GSAP'],
    image: 'https://placehold.co/400x240/0d0d0d/0AC4D0?text=ICT+Meetup+CMS',
    github: '#',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'APPLE CORPORATION — A LEADING TECH GIANT',
    description:
      'A detailed case study and collaborative project analyzing and rebuilding key UI components inspired by world-class tech product interfaces.',
    author: 'Nirjala Shakya',
    tags: ['Swift', 'iOS'],
    image: 'https://placehold.co/400x240/0d0d0d/0AC4D0?text=Apple+Corp',
    github: '#',
    liveUrl: '#',
  },
  {
    id: 3,
    title: 'GEFORCE RTC — ONLINE GAME ENGINE FOR 4GB RAM PC',
    description:
      'A lightweight real-time communication game engine optimised to run on low-spec machines, enabling multiplayer gaming for budget hardware users.',
    author: 'Rikesh Sherpa',
    tags: ['IOT', 'RAM', 'Unity'],
    image: 'https://placehold.co/400x240/0d0d0d/0AC4D0?text=GeForce+RTC',
    github: '#',
    liveUrl: '#',
  },
];

export const blogs: BlogPost[] = [
  {
    id: 1,
    title: 'UNDERSTANDING LOADING STATES IN TANSTACK QUERY V5',
    author: 'Sujal Chitrakar',
    date: '06.04.2024',
    image: 'https://placehold.co/400x240/0d0d0d/0AC4D0?text=TanStack+Query',
    slug: 'loading-states-tanstack-query-v5',
  },
  {
    id: 2,
    title: 'OPTIMIZING FONT LOADING FOR BETTER PERFORMANCE',
    author: 'Manjil Aryal',
    date: '06.04.2024',
    image: 'https://placehold.co/400x240/0d0d0d/0AC4D0?text=Font+Optimization',
    slug: 'optimizing-font-loading-performance',
  },
  {
    id: 3,
    title: 'HOW UNOPTIMIZED IMAGES HURT E-COM CONVERSION RATES',
    author: 'Mandip Shrestha',
    date: '06.04.2024',
    image: 'https://placehold.co/400x240/0d0d0d/0AC4D0?text=Image+Optimization',
    slug: 'unoptimized-images-ecom-conversion',
  },
];

export const services: Service[] = [
  {
    id: 1,
    title: 'WE BUILD',
    description:
      'Real projects. Real purpose. We build internal tools and production-level platforms that turn ideas into things people actually use.',
  },
  {
    id: 2,
    title: 'WE COLLABORATE',
    description:
      'Designers, developers, and creators working on the same goal. Different teams, one direction.',
  },
  {
    id: 3,
    title: 'WE GROW',
    description:
      'Every member leaves more capable. We invest in skills, portfolios, and the confidence to ship real work.',
  },
  {
    id: 4,
    title: 'WE MENTOR',
    description:
      'Directors are accessible. Reach out, ask questions, get guidance on anything technical or project-related.',
  },
  {
    id: 5,
    title: 'WE HOST',
    description:
      'Members get real hosting under .primeitclub.com. Build something worth deploying.',
  },
  {
    id: 6,
    title: 'OUR EXPERTISE',
    description:
      'UI/UX · Project Management · Frontend Development · Backend Development · Quality Assurance · Graphic Design · Video Editing',
  },
];
