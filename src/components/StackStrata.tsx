'use client';

const layers = [
  {
    id: 'ui',
    label: 'Interface',
    items: ['React', 'React Native', 'Tauri', 'Tailwind'],
  },
  {
    id: 'api',
    label: 'API & services',
    items: ['NestJS', 'Express', 'FastAPI', 'JWT / RBAC', 'gRPC'],
  },
  {
    id: 'data',
    label: 'Data & infra',
    items: ['PostgreSQL', 'MongoDB', 'AWS', 'CI/CD'],
  },
] as const;

export default function StackStrata() {
  return (
    <div className="strata" aria-hidden="true">
      <div className="chrome">
        <span className="mono">stack.strata</span>
        <span className="mono live">LIVE</span>
      </div>
      {layers.map((layer, i) => (
        <div key={layer.id} className={`layer l${i}`}>
          <div className="meta">
            <span className="mono idx">{String(i + 1).padStart(2, '0')}</span>
            <strong>{layer.label}</strong>
          </div>
          <div className="tags">
            {layer.items.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .strata {
          background: rgba(238, 242, 246, 0.04);
          border: 1px solid var(--border-dark);
          border-radius: var(--radius);
          overflow: hidden;
          animation: rise 0.85s ease 0.1s both;
          box-shadow: 0 24px 50px rgba(0, 0, 0, 0.28);
        }
        .chrome {
          display: flex;
          justify-content: space-between;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-dark);
          background: rgba(0, 0, 0, 0.2);
        }
        .chrome .mono {
          font-size: 11px;
          color: var(--text-on-dark-muted);
          letter-spacing: 0.06em;
        }
        .live {
          color: var(--primary) !important;
        }
        .layer {
          padding: 18px 16px;
          border-bottom: 1px solid var(--border-dark);
        }
        .layer:last-child {
          border-bottom: none;
        }
        .l0 {
          background: rgba(34, 211, 238, 0.06);
        }
        .l1 {
          background: rgba(34, 211, 238, 0.1);
        }
        .l2 {
          background: rgba(34, 211, 238, 0.14);
        }
        .meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .idx {
          font-size: 11px;
          color: var(--primary);
        }
        .meta strong {
          font-family: var(--font-display), sans-serif;
          font-size: 15px;
          color: var(--text-on-dark);
          font-weight: 600;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tags span {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-on-dark-muted);
          border: 1px solid var(--border-dark);
          border-radius: 999px;
          padding: 5px 9px;
        }
      `}</style>
    </div>
  );
}
