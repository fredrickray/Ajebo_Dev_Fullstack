export type ProjectService = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
};

/** One short demo video + two screenshots (paths under /public). */
export type ProjectMedia = {
  video?: string;
  screenshots: [string, string];
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'Systems' | 'Tools' | 'ML' | 'Mobile';
  tags: string[];
  featured: boolean;
  github: string;
  live?: string;
  logo?: string;
  repos?: { label: string; url: string }[];
  media?: ProjectMedia;
  layers: { label: string; items: string[] }[];
  architecture: string[];
  challenges: { title: string; description: string }[];
  tradeoffs: { tech: string; alternative: string; reason: string }[];
  highlights: string[];
  services?: ProjectService[];
};

export const projects: Project[] = [
  {
    id: 1,
    slug: 'openrdb-studio',
    title: 'OpenRDB Studio',
    description:
      'Open-source cross-platform desktop GUI for relational databases — Rust, Tauri, React, and TypeScript.',
    longDescription:
      'A free, open-source desktop SQL client built with Rust, Tauri, React, and TypeScript. The React front end delivers a modern SQL client experience; SQLx powers type-safe, async connectivity and query execution across relational databases.',
    category: 'Tools',
    tags: ['Rust', 'Tauri', 'React', 'TypeScript', 'SQLx'],
    featured: true,
    github: 'https://github.com/fredrickray/OpenRDB-Studio',
    live: 'https://open-rdb-atlas.vercel.app',
    logo: '/projects/openrdb-studio/logo.png',
    media: {
      video: '/projects/openrdb-studio/demo.mp4',
      screenshots: [
        '/projects/openrdb-studio/shot-1.png',
        '/projects/openrdb-studio/shot-2.png',
      ],
    },
    layers: [
      { label: 'Interface', items: ['React', 'TypeScript', 'SQL editor UX'] },
      { label: 'Native core', items: ['Rust', 'Tauri', 'Tokio'] },
      { label: 'Data access', items: ['SQLx', 'PostgreSQL', 'MySQL', 'SQLite'] },
    ],
    architecture: ['Desktop shell', 'React UI', 'SQLx core', 'OS keychain'],
    challenges: [
      {
        title: 'Native feel, web UI',
        description:
          'Tauri keeps the binary small and the backend in Rust while the interface stays a modern React app.',
      },
      {
        title: 'Type-safe SQL core',
        description:
          'SQLx over Tokio gives async, compile-checked database access across PostgreSQL, MySQL, and SQLite.',
      },
      {
        title: 'Credential safety',
        description:
          'Connection credentials live in the OS keychain — never in app-managed storage or config files.',
      },
      {
        title: 'Real connections',
        description:
          'Moved from dummy UI data to live database connections for table previews, structure views, and ERDs.',
      },
    ],
    tradeoffs: [
      {
        tech: 'Tauri',
        alternative: 'Electron',
        reason: 'A fraction of the memory and binary size, plus a Rust-native backend for the SQL core.',
      },
      {
        tech: 'SQLx',
        alternative: 'Heavy ORM',
        reason: 'Type-safe raw SQL fits a database tool better than an abstraction that hides the SQL.',
      },
      {
        tech: 'Desktop app',
        alternative: 'Web app only',
        reason: 'Local connectivity to databases behind firewalls, without proxying credentials through a server.',
      },
    ],
    highlights: [
      'Full React/TypeScript front end for a modern SQL client UX',
      'SQLx for type-safe async database access in Rust',
      'Cross-platform via Tauri with OS keychain credentials',
    ],
  },
  {
    id: 2,
    slug: 'marketlens',
    title: 'MarketLens AI',
    description:
      'AI-powered stock decision support — FastAPI, Python ML models, React UI, and PostgreSQL.',
    longDescription:
      'An AI-powered stock decision support system that analyzes market trends and real-world signals. Models (Random Forest, LightGBM) generate insights over a PostgreSQL data layer, with a React front end for exploring decisions.',
    category: 'ML',
    tags: ['FastAPI', 'Python', 'React', 'PostgreSQL', 'LightGBM'],
    featured: true,
    github: 'https://github.com/fredrickray/MarketLens_UI',
    live: 'https://market-lens-five.vercel.app',
    logo: '/projects/marketlens/logo.svg',
    repos: [
      { label: 'UI', url: 'https://github.com/fredrickray/MarketLens_UI' },
      { label: 'API', url: 'https://github.com/fredrickray/MarketLens_API' },
      { label: 'ML', url: 'https://github.com/fredrickray/MarketLens_ML' },
    ],
    media: {
      video: '/projects/marketlens/demo.mp4',
      screenshots: ['/projects/marketlens/shot-1.png', '/projects/marketlens/shot-2.png'],
    },
    layers: [
      { label: 'Interface', items: ['React', 'Decision dashboards'] },
      { label: 'API', items: ['FastAPI', 'Typed contracts', 'OpenAPI'] },
      { label: 'ML & data', items: ['Random Forest', 'LightGBM', 'PostgreSQL'] },
    ],
    architecture: ['Signal ingest', 'ML models', 'Decision API', 'React UI', 'Postgres'],
    challenges: [
      {
        title: 'Signal fusion',
        description:
          'Market prices and unstructured real-world signals are normalized into one comparable feature space.',
      },
      {
        title: 'Training pipeline',
        description:
          'Windowed feature generation and scheduled retraining keep the ensemble current as market regimes shift.',
      },
      {
        title: 'Fast inference',
        description:
          'Model loading, caching, and lean feature queries keep decision endpoints responsive.',
      },
      {
        title: 'Explainability',
        description:
          'Tree-based models expose feature importance, so a decision can always be traced to its drivers.',
      },
    ],
    tradeoffs: [
      {
        tech: 'PostgreSQL',
        alternative: 'MongoDB',
        reason: 'Time-series joins across instruments, signals, and predictions are fundamentally relational.',
      },
      {
        tech: 'FastAPI',
        alternative: 'Flask',
        reason: 'Async IO and typed contracts fit ML serving; OpenAPI docs come free.',
      },
      {
        tech: 'RF + LightGBM',
        alternative: 'Deep learning',
        reason:
          'On tabular financial data, gradient boosting wins on accuracy per unit of training cost — and stays explainable.',
      },
    ],
    highlights: [
      'React UI for exploring market decisions',
      'FastAPI + ML ensemble (Random Forest, LightGBM)',
      'PostgreSQL for market/financial data',
    ],
  },
  {
    id: 3,
    slug: 'propspacex',
    title: 'PropSpaceX',
    description:
      'Microservice real-estate platform spanning Web2 and Web3 — Node, MongoDB, PostgreSQL, gRPC, Ethereum.',
    longDescription:
      'A microservice-based real estate management platform combining Web2 and Web3. Decentralized ownership verification via Ethereum smart contracts, hybrid email/password and wallet auth, plus web and mobile clients over a gRPC service cluster.',
    category: 'Systems',
    tags: ['Node.js', 'gRPC', 'React', 'MongoDB', 'PostgreSQL', 'Ethereum'],
    featured: false,
    github: 'https://github.com/fredrickray/propspacex-api-gateway',
    logo: '/projects/propspacex/logo.svg',
    repos: [
      { label: 'Web', url: 'https://github.com/fredrickray/propspacex-web' },
      { label: 'Mobile', url: 'https://github.com/fredrickray/propspacex-mobile' },
      { label: 'Gateway', url: 'https://github.com/fredrickray/propspacex-api-gateway' },
    ],
    media: {
      video: '/projects/propspacex/demo.mp4',
      screenshots: ['/projects/propspacex/shot-1.png', '/projects/propspacex/shot-2.png'],
    },
    layers: [
      { label: 'Clients', items: ['React web', 'React Native mobile'] },
      { label: 'Services', items: ['Gateway', 'User', 'Property', 'Media', 'Mail', 'Payments'] },
      { label: 'Data & chain', items: ['MongoDB', 'PostgreSQL', 'Ethereum', 'RabbitMQ'] },
    ],
    architecture: ['Gateway', 'Auth', 'Property', 'Media', 'Mail', 'Payments', 'Contracts'],
    challenges: [
      {
        title: 'Hybrid authentication',
        description:
          'One identity model backing email/password and Ethereum wallet signature verification.',
      },
      {
        title: 'Service mesh complexity',
        description:
          'gRPC routing, rate limiting, and correlation IDs across a multi-service real-estate cluster.',
      },
      {
        title: 'On-chain ownership',
        description:
          'Smart-contract integration proves ownership on Ethereum and records tokenized transfers.',
      },
      {
        title: 'Multi-provider payments',
        description:
          'Stripe, Paystack, and Flutterwave behind one API with idempotent webhooks and reconciliation.',
      },
    ],
    tradeoffs: [
      {
        tech: 'gRPC',
        alternative: 'REST everywhere',
        reason: 'Binary protocol and streaming make inter-service calls cheaper than JSON over HTTP.',
      },
      {
        tech: 'Microservices',
        alternative: 'Monolith',
        reason: 'Independent deploy and scaling for media, payments, and property under different load profiles.',
      },
      {
        tech: 'Ethereum',
        alternative: 'DB-only records',
        reason: 'Tokenized real estate needs an ownership record no single operator can rewrite.',
      },
    ],
    highlights: [
      'Web + mobile clients over a gRPC microservice backend',
      'Hybrid email/password and wallet authentication',
      'Ethereum ownership verification and multi-provider payments',
    ],
    services: [
      {
        slug: 'propspacex-api-gateway',
        title: 'API Gateway',
        description: 'Auth, authorization, rate limiting, and request routing across the cluster.',
        tags: ['Node.js', 'TypeScript', 'Express', 'gRPC'],
        github: 'https://github.com/fredrickray/propspacex-api-gateway',
      },
      {
        slug: 'propspacex-user-service',
        title: 'User Service',
        description: 'Hybrid email/password and wallet login, device trust, and audit logging.',
        tags: ['JWT', 'PostgreSQL', 'Wallet Auth', 'gRPC'],
        github: 'https://github.com/fredrickray/propspacex-user-service',
      },
      {
        slug: 'propspacex-property-service',
        title: 'Property Service',
        description: 'Property lifecycle with geospatial search and Ethereum ownership verification.',
        tags: ['MongoDB', 'Ethereum', 'gRPC', 'Web3'],
        github: 'https://github.com/fredrickray/propspacex-property-service',
      },
      {
        slug: 'propspacex-media-service',
        title: 'Media Service',
        description: 'Chunked uploads, Sharp optimization, S3/Cloudinary abstraction.',
        tags: ['AWS S3', 'Cloudinary', 'Sharp', 'gRPC'],
        github: 'https://github.com/fredrickray/propspacex-media-service',
      },
      {
        slug: 'propspacex-mail-service',
        title: 'Mail Service',
        description: 'RabbitMQ jobs with retries, DLQ, and Nodemailer SMTP delivery.',
        tags: ['RabbitMQ', 'Nodemailer', 'gRPC'],
        github: 'https://github.com/fredrickray/propspacex-mail-service',
      },
      {
        slug: 'propspacex-payment-service',
        title: 'Payment Service',
        description: 'Stripe, Paystack, and Flutterwave with webhooks and reconciliation.',
        tags: ['NestJS', 'Stripe', 'Paystack', 'Flutterwave'],
        github: 'https://github.com/fredrickray/propspacex-payment-service',
      },
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
    featured: false,
    github: 'https://github.com/fredrickray/EchoLoc',
    logo: '/projects/echoloc/logo.svg',
    repos: [
      { label: 'App', url: 'https://github.com/fredrickray/EchoLoc' },
      { label: 'API', url: 'https://github.com/fredrickray/EchoLoc_Api' },
    ],
    media: {
      video: '/projects/echoloc/demo.mp4',
      screenshots: ['/projects/echoloc/shot-1.png', '/projects/echoloc/shot-2.png'],
    },
    layers: [
      { label: 'Mobile', items: ['Expo', 'React Native', 'Maps', 'Chat'] },
      { label: 'Realtime', items: ['Socket.IO', 'Timed sessions'] },
      { label: 'Backend', items: ['Echo_API', 'Auth', 'Groups'] },
    ],
    architecture: ['Mobile app', 'Echo_API', 'Socket.IO', 'TTL sessions'],
    challenges: [
      {
        title: 'Timed privacy model',
        description:
          'Sharing is scoped to a user-defined window — sessions auto-expire server-side, so no client bug can leave tracking on.',
      },
      {
        title: 'Live group map',
        description:
          'Location pings fan out over Socket.IO rooms to group members in real time while a session is active.',
      },
      {
        title: 'Event-based groups',
        description:
          'Invite codes, membership roles, and in-group chat support temporary sharing circles around real events.',
      },
      {
        title: 'Multi-provider auth',
        description: 'Email plus Google and Apple sign-in for low-friction mobile onboarding.',
      },
    ],
    tradeoffs: [
      {
        tech: 'Socket.IO',
        alternative: 'Polling',
        reason: 'Sub-second location updates with connection fallbacks that survive flaky mobile networks.',
      },
      {
        tech: 'Expo',
        alternative: 'Bare React Native',
        reason: 'Managed workflow shipped both platforms fast; native modules were not a blocker.',
      },
      {
        tech: 'TTL sessions',
        alternative: 'Always-on sharing',
        reason: 'Privacy is the product — expiry is enforced in the data model, not just the UI.',
      },
    ],
    highlights: [
      'Full Expo/React Native app with timed sharing sessions',
      'Group creation, invites, and in-group chat',
      'Live map + Socket.IO; email and Google/Apple sign-in',
    ],
  },
  {
    id: 5,
    slug: 'iris',
    title: 'IRIS',
    description:
      'Personal AI assistant for your Mac — local LLMs, lasting memory, system tools, and on-device voice.',
    longDescription:
      'A laptop-native AI assistant that talks, remembers, and acts on macOS. LangGraph orchestrates the agent; Ollama (or Anthropic/OpenAI) powers replies; SQLite stores facts and searchable conversation turns. Optional voice: wake word, Whisper STT, and TTS via macOS say, OpenAI, or ElevenLabs. Tools let IRIS open apps, search files, manage Reminders, and read system info — with folder allowlists and Automation permissions.',
    category: 'Tools',
    tags: ['Python', 'LangGraph', 'FastAPI', 'Ollama', 'Whisper'],
    featured: true,
    github: 'https://github.com/fredrickray/IRIS',
    logo: '/projects/iris/logo.svg',
    media: {
      video: '/projects/iris/demo.mp4',
      screenshots: ['/projects/iris/shot-1.png', '/projects/iris/shot-2.png'],
    },
    layers: [
      { label: 'Interfaces', items: ['CLI (Rich)', 'FastAPI HTTP', 'Voice session'] },
      { label: 'Agent core', items: ['LangGraph', 'LangChain tools', 'LLM providers'] },
      { label: 'Memory & voice', items: ['SQLite facts/turns', 'Whisper STT', 'TTS engines'] },
    ],
    architecture: ['CLI / Voice / API', 'LangGraph agent', 'Tools', 'LLM backend', 'SQLite memory'],
    challenges: [
      {
        title: 'Local-first privacy',
        description:
          'Default stack is Ollama on-device — no cloud required. Cloud providers are opt-in via config and env overrides.',
      },
      {
        title: 'Durable, forgettable memory',
        description:
          'Facts inject into every prompt; turns stay searchable. /forget and purge APIs remove facts and related archive text when you mean it.',
      },
      {
        title: 'Safe Mac actions',
        description:
          'Tools are gated by settings and folder allowlists. Spotlight and AppleScript need explicit macOS Automation access.',
      },
      {
        title: 'Voice without bloating chat',
        description:
          'Voice deps stay optional. Whisper, wake word, and TTS engines plug in without weighing down the core REPL and API.',
      },
    ],
    tradeoffs: [
      {
        tech: 'Ollama default',
        alternative: 'Cloud-only LLM',
        reason: 'Offline and private by default; Anthropic/OpenAI remain one config switch away.',
      },
      {
        tech: 'SQLite + FTS5',
        alternative: 'Hosted vector DB',
        reason: 'Zero ops on a laptop; optional nomic-embed-text upgrades recall without a network service.',
      },
      {
        tech: 'LangGraph',
        alternative: 'Ad-hoc prompt loop',
        reason: 'Checkpoints, tool routing, and streaming come structured — critical once voice and tools stack on.',
      },
    ],
    highlights: [
      'Local Ollama (or Anthropic/OpenAI) with LangGraph agent loop',
      'SQLite facts + turn archive with optional embeddings',
      'macOS tools + optional wake word, Whisper, and multi-engine TTS',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const categories = ['All', 'Systems', 'Tools', 'ML', 'Mobile'] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  const normalized = slug === 'marketlense' ? 'marketlens' : slug;
  return projects.find((p) => p.slug === normalized);
}
