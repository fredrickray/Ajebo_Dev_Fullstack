export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  focus: 'backend' | 'lead' | 'data' | 'platform';
  tools: string[];
  bullets: string[];
};

export const experience: Experience[] = [
  {
    id: 'psychspace',
    role: 'Backend Engineer',
    company: 'PsychSpace',
    period: '02/2026 – Present',
    location: 'Canada',
    focus: 'backend',
    tools: ['NestJS', 'MongoDB', 'Django', 'PostgreSQL', 'JWT', 'S3'],
    bullets: [
      'Architected and built two interoperating backend services: a NestJS/MongoDB product API and a Django/PostgreSQL scoring engine, communicating via RS256-signed service-to-service JWTs.',
      'Designed the core data model across users, businesses, test content, commerce, and assessment attempts, using the native MongoDB driver with migrate-mongo for schema/index management.',
      'Built the psychometric scoring pipeline in the Marker service, aggregating session responses and returning scored profiles back to the API for persistence.',
      'Implemented role-based access control, S3-compatible file uploads, Swagger documentation, and structured logging across the platform.',
    ],
  },
  {
    id: 'claymore',
    role: 'Backend Engineer | Engineering Team Lead',
    company: 'Claymore Limited',
    period: '12/2024 – 01/2026',
    location: 'Lagos, Nigeria',
    focus: 'lead',
    tools: ['Node.js', 'MongoDB', 'Socket.io', 'JWT', 'AWS', 'Joi'],
    bullets: [
      'Led an engineering team through sprint planning, task allocation, and code review as Engineering Team Lead.',
      'Architected RESTful APIs and database schemas for stakeholder management, project tracking, workstreams, and case handling (Stakeholders Connect platform).',
      'Built a real-time chat and notification system using Socket.io, and implemented JWT-based authentication with role-based access control.',
      'Optimized MongoDB queries and schema design to improve scalability under production load.',
      'Owned CI/CD pipelines and deployment on AWS, alongside data validation/error-handling layers using Joi.',
    ],
  },
  {
    id: 'sustaina',
    role: 'Backend Developer',
    company: 'SustainaFinance DataNexus',
    period: '01/2024 – 01/2025',
    location: 'Esch-sur-Alzette, Luxembourg',
    focus: 'data',
    tools: ['Data pipelines', 'ESG', 'Security', 'Governance'],
    bullets: [
      'Built data pipelines to ingest, harmonize, and validate ESG scores, financial statements, and sustainability metrics from multiple sources and countries.',
      'Implemented real-time calculation and analysis logic for ESG and financial metrics using scalable database architecture.',
      'Applied security and data governance controls to ensure data integrity and regulatory compliance.',
    ],
  },
  {
    id: 'padding',
    role: 'Backend Developer',
    company: 'Padding Technologies',
    period: '01/2024 – 03/2025',
    location: 'Lagos, Nigeria',
    focus: 'backend',
    tools: ['Node.js', 'Express', 'PostgreSQL', 'Testing'],
    bullets: [
      'Built scalable backend services for the Evolution and Officing products using Node.js, Express, and PostgreSQL.',
      'Designed and optimized relational database schemas and complex SQL queries.',
      'Wrote unit/integration tests to catch defects early and maintained technical documentation for team handoff.',
      'Collaborated cross-functionally with frontend, design, and product to ship cohesive features.',
    ],
  },
  {
    id: 'hng',
    role: 'Backend Developer',
    company: 'HNG Tech',
    period: '06/2023 – 10/2023',
    location: 'Remote',
    focus: 'platform',
    tools: ['Node.js', 'Microservices', 'Auth', 'Payments'],
    bullets: [
      'Built the backend server for a screen-recording Chrome extension, handling real-time data efficiently.',
      'Contributed to an authentication microservice and a payment microservice for a large e-commerce platform.',
    ],
  },
];
