'use client';

import { useEffect, useState } from 'react';

export default function CanvasRuler() {
  const marks = Array.from({ length: 26 }, (_, i) => i * 100);
  return (
    <div className="ruler" aria-hidden="true">
      <div className="track">
        {marks.map((m) => (
          <span key={m} className="tick" style={{ left: `${(m / 2500) * 100}%` }}>
            <i />
            <em>{m}</em>
          </span>
        ))}
      </div>
      <style jsx>{`
        .ruler {
          width: 100%;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
          background: color-mix(in srgb, var(--bg-card) 70%, transparent);
        }
        .track {
          position: relative;
          height: 28px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .tick {
          position: absolute;
          top: 0;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }
        .tick i {
          width: 1px;
          height: 8px;
          background: var(--text-muted);
          opacity: 0.55;
          display: block;
        }
        .tick em {
          font-style: normal;
          font-family: var(--font-mono), monospace;
          font-size: 9px;
          color: var(--text-muted);
        }
        @media (max-width: 700px) {
          .tick:nth-child(2n) em {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

export function LocalClock() {
  const [now, setNow] = useState('');

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const t = d.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Africa/Lagos',
      });
      setNow(`${t} WAT`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;
  return <span className="mono clock">{now}</span>;
}
