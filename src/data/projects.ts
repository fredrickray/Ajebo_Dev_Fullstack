export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Systems' | 'Tools' | 'ML' | 'Mobile';
  tags: string[];
  featured: boolean;
  architecture: string[];
  github: string;
  highlights: string[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'openrdb-studio',
    title: 'OpenRDB Studio',
    description:
      'Open-source cross-platform desktop GUI for relational databases — Rust, Tauri, React, and TypeScript.',
    longDescription:
      'A free, open-source desktop SQL client built with Rust, Tauri, React, and TypeScript. The React/TypeScript front end delivers a native SQL client experience, with SQLx powering type-safe, async database connectivity and query execution.',
    category: 'Tools',
    tags: ['Rust', 'Tauri', 'React', 'TypeScript', 'SQLx'],
    featured: true,
    architecture: ['Desktop shell', 'React UI', 'SQLx', 'Cross-platform'],
    github: 'https://github.com/fredrickray/openrdb-studio',
    highlights: [
      'Full React/TypeScript front end for a modern SQL client UX',
      'SQLx for type-safe async database access in Rust',
      'Cross-platform via Tauri',
    ],
  },
  {
    id: 2,
    slug: 'marketlens',
    title: 'MarketLens AI',
    description:
      'AI-powered stock decision support — FastAPI, Python ML models, and PostgreSQL.',
    longDescription:
      'An AI-powered stock decision support system that analyzes market trends and real-world signals. Models (Random Forest, LightGBM) generate insights over a PostgreSQL data layer for financial and market data.',
    category: 'ML',
    tags: ['FastAPI', 'Python', 'PostgreSQL', 'LightGBM', 'Random Forest'],
    featured: true,
    architecture: ['Signal ingest', 'ML models', 'Decision API', 'Postgres'],
    github: 'https://github.com/fredrickray/marketlense',
    highlights: [
      'FastAPI backend for analysis and decisions',
      'Trained and deployed Random Forest and LightGBM models',
      'PostgreSQL for market/financial data storage and processing',
    ],
  },
  {
    id: 3,
    slug: 'propspacex',
    title: 'PropSpaceX',
    description:
      'Microservice real-estate platform spanning Web2 and Web3 — Node, MongoDB, PostgreSQL, gRPC, Ethereum.',
    longDescription:
      'A microservice-based real estate management platform combining Web2 and Web3. Decentralized ownership verification via Ethereum smart contracts, with hybrid authentication supporting email/password and wallet login.',
    category: 'Systems',
    tags: ['Node.js', 'gRPC', 'MongoDB', 'PostgreSQL', 'Ethereum'],
    featured: true,
    architecture: ['Gateway', 'Auth', 'Property', 'Media', 'Payments', 'Contracts'],
    github: 'https://github.com/fredrickray/propspacex-gateway',
    highlights: [
      'gRPC microservices across property, media, mail, and payments',
      'Ethereum smart contracts for ownership verification',
      'Hybrid email/password and blockchain wallet auth',
    ],
  },
  {
    id: 4,
    slug: 'echoloc',
    title: 'EchoLoc',
    description:
      'Privacy-first live location sharing — Expo/React Native, timed sessions, Socket.IO, custom Echo_API.',
    longDescription:
      'A privacy-first live location sharing app. Users share location with a group only for a defined time window — not always-on tracking — with group chat, invites, and a live map over Socket.IO against a custom backend.',
    category: 'Mobile',
    tags: ['Expo', 'React Native', 'Socket.IO', 'Node.js', 'Auth'],
    featured: true,
    architecture: ['Mobile app', 'Echo_API', 'Socket.IO', 'Timed sessions'],
    github: 'https://github.com/fredrickray/echoloc',
    highlights: [
      'Full Expo/React Native app with timed sharing sessions',
      'Group creation, invites, and in-group chat',
      'Live map + Socket.IO; email and Google/Apple sign-in',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const categories = ['All', 'Systems', 'Tools', 'ML', 'Mobile'] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug === 'marketlense' ? 'marketlens' : slug;
  return projects.find((p) => p.slug === normalized);
}
