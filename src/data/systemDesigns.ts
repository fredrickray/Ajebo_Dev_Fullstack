// Minimal request-flow diagrams for project detail (adapted from backend portfolio ArchFlow).
// Flow only — no ERD schemas.

export type FlowNodeKind = 'client' | 'edge' | 'service' | 'data' | 'external' | 'queue';

export type FlowNode = {
  id: string;
  label: string;
  sub?: string;
  col: number;
  row: number;
  kind: FlowNodeKind;
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

export type ArchFlow = {
  request: string;
  caption: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  trace: string[];
};

export type SystemDesign = {
  flow: ArchFlow;
};

export const systemDesigns: Record<string, SystemDesign> = {
  'openrdb-studio': {
    flow: {
      request: 'invoke("run_query", sql)',
      caption:
        'React UI talks to the Rust core through Tauri IPC. SQLx pools connections over Tokio; credentials stay in the OS keychain.',
      nodes: [
        { id: 'ui', label: 'React UI', sub: 'Monaco · results', col: 0, row: 0.6, kind: 'client' },
        { id: 'ipc', label: 'Tauri IPC', sub: 'Command bridge', col: 1, row: 0.6, kind: 'edge' },
        { id: 'core', label: 'Rust Core', sub: 'Connections', col: 2, row: 0.6, kind: 'service' },
        { id: 'keychain', label: 'OS Keychain', sub: 'Credentials', col: 2, row: 1.8, kind: 'external' },
        { id: 'pool', label: 'SQLx Pool', sub: 'Tokio · async', col: 3, row: 0.6, kind: 'service' },
        { id: 'postgres', label: 'PostgreSQL', col: 4, row: 0, kind: 'data' },
        { id: 'mysql', label: 'MySQL', col: 4, row: 0.9, kind: 'data' },
        { id: 'sqlite', label: 'SQLite', col: 4, row: 1.8, kind: 'data' },
      ],
      edges: [
        { from: 'ui', to: 'ipc', label: 'invoke' },
        { from: 'ipc', to: 'core' },
        { from: 'core', to: 'keychain', label: 'creds', dashed: true },
        { from: 'core', to: 'pool' },
        { from: 'pool', to: 'postgres' },
        { from: 'pool', to: 'mysql' },
        { from: 'pool', to: 'sqlite' },
      ],
      trace: ['ui', 'ipc', 'core', 'pool', 'postgres', 'pool', 'core', 'ipc', 'ui'],
    },
  },

  marketlens: {
    flow: {
      request: 'GET /signals/AAPL/decision',
      caption:
        'Ingest workers store market and signal data. FastAPI pulls recent features, runs the ensemble, and returns a scored decision.',
      nodes: [
        { id: 'feeds', label: 'Market Feeds', sub: 'Prices · fundamentals', col: 0, row: 0, kind: 'external' },
        { id: 'news', label: 'Signal Sources', sub: 'News · events', col: 0, row: 1, kind: 'external' },
        { id: 'client', label: 'Client', sub: 'Dashboard', col: 0, row: 2.4, kind: 'client' },
        { id: 'ingest', label: 'Ingest Workers', sub: 'Normalize', col: 1, row: 0.5, kind: 'service' },
        { id: 'api', label: 'FastAPI', sub: 'Decision API', col: 1, row: 2.4, kind: 'service' },
        { id: 'postgres', label: 'PostgreSQL', sub: 'Market store', col: 2, row: 1.3, kind: 'data' },
        { id: 'pipeline', label: 'Feature Pipeline', sub: 'Windows · indicators', col: 3, row: 0.5, kind: 'service' },
        { id: 'ensemble', label: 'Model Ensemble', sub: 'RF · LightGBM', col: 4, row: 1.3, kind: 'service' },
      ],
      edges: [
        { from: 'feeds', to: 'ingest' },
        { from: 'news', to: 'ingest' },
        { from: 'ingest', to: 'postgres', label: 'store' },
        { from: 'postgres', to: 'pipeline', label: 'train' },
        { from: 'pipeline', to: 'ensemble' },
        { from: 'client', to: 'api' },
        { from: 'api', to: 'postgres', label: 'recent' },
        { from: 'api', to: 'ensemble', label: 'infer', dashed: true },
      ],
      trace: ['client', 'api', 'postgres', 'pipeline', 'ensemble', 'api', 'client'],
    },
  },

  propspacex: {
    flow: {
      request: 'POST /v1/properties/verify',
      caption:
        'Gateway handles auth and rate limits, verifies the user, then routes over gRPC to property and payment services. Mail runs async via RabbitMQ.',
      nodes: [
        { id: 'client', label: 'Client', sub: 'Web · Mobile', col: 0, row: 1.2, kind: 'client' },
        { id: 'gateway', label: 'API Gateway', sub: 'Auth · limits', col: 1, row: 1.2, kind: 'service' },
        { id: 'user', label: 'User Service', sub: 'JWT · wallet', col: 2, row: 0.2, kind: 'service' },
        { id: 'property', label: 'Property Service', sub: 'Listings', col: 2, row: 1.2, kind: 'service' },
        { id: 'payment', label: 'Payment Service', sub: 'NestJS', col: 2, row: 2.2, kind: 'service' },
        { id: 'rabbitmq', label: 'RabbitMQ', sub: 'Events', col: 3, row: 2.2, kind: 'queue' },
        { id: 'mongo', label: 'MongoDB', sub: 'Properties', col: 3, row: 1.2, kind: 'data' },
        { id: 'postgres', label: 'PostgreSQL', sub: 'Users', col: 3, row: 0.2, kind: 'data' },
        { id: 'mail', label: 'Mail Service', sub: 'SMTP', col: 4, row: 2.2, kind: 'service' },
      ],
      edges: [
        { from: 'client', to: 'gateway' },
        { from: 'gateway', to: 'user', label: 'verify' },
        { from: 'gateway', to: 'property', label: 'gRPC' },
        { from: 'gateway', to: 'payment', label: 'gRPC' },
        { from: 'user', to: 'postgres' },
        { from: 'property', to: 'mongo' },
        { from: 'payment', to: 'rabbitmq', label: 'events', dashed: true },
        { from: 'rabbitmq', to: 'mail', label: 'consume', dashed: true },
      ],
      trace: ['client', 'gateway', 'user', 'gateway', 'property', 'mongo'],
    },
  },

  echoloc: {
    flow: {
      request: 'WS session.start(group, ttl)',
      caption:
        'Expo authenticates over REST, then streams location pings over Socket.IO. Session manager enforces TTL and ends sharing when time is up.',
      nodes: [
        { id: 'app', label: 'Expo App', sub: 'React Native', col: 0, row: 1.1, kind: 'client' },
        { id: 'rest', label: 'REST API', sub: 'Auth · groups', col: 1, row: 0.4, kind: 'service' },
        { id: 'socket', label: 'Socket.IO', sub: 'Pings · fanout', col: 1, row: 1.8, kind: 'service' },
        { id: 'oauth', label: 'OAuth', sub: 'Google · Apple', col: 2, row: 0, kind: 'external' },
        { id: 'session', label: 'Session Manager', sub: 'TTL · expiry', col: 2, row: 1.1, kind: 'service' },
        { id: 'mongo', label: 'MongoDB', sub: 'Groups · pings', col: 3, row: 1.1, kind: 'data' },
      ],
      edges: [
        { from: 'app', to: 'rest', label: 'auth' },
        { from: 'app', to: 'socket', label: 'pings' },
        { from: 'rest', to: 'oauth', label: 'verify', dashed: true },
        { from: 'rest', to: 'mongo' },
        { from: 'socket', to: 'session' },
        { from: 'session', to: 'mongo' },
        { from: 'session', to: 'socket', label: 'expiry', dashed: true },
        { from: 'socket', to: 'app', label: 'broadcast', dashed: true },
      ],
      trace: ['app', 'socket', 'session', 'mongo', 'session', 'socket', 'app'],
    },
  },
};

export function getSystemDesign(slug: string): SystemDesign | undefined {
  return systemDesigns[slug];
}
