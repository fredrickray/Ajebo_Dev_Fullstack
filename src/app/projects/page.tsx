'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import Reveal from '@/components/Reveal';
import { projects, categories } from '@/data/projects';

export default function ProjectsPage() {
  const [active, setActive] = useState<(typeof categories)[number]>('All');
  const filtered = useMemo(
    () => (active === 'All' ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <div className="projects">
      <section className="hero">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Projects</p>
            <h1>
              Systems, tools,
              <br />
              <span>ML & mobile</span>
            </h1>
            <p className="lede">
              Backend-heavy products with real interfaces — desktop, web, and React Native.
            </p>
          </Reveal>
          <div className="filters">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                className={active === c ? 'on' : ''}
                onClick={() => setActive(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="list">
        <div className="container grid">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={i * 50}>
              <Link href={`/projects/${p.slug}`} className="card">
                <span className="mono cat">{p.category}</span>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <style jsx>{`
        .hero {
          padding: 72px 0 40px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }
        h1 {
          font-size: clamp(36px, 5vw, 52px);
          margin-bottom: 14px;
        }
        h1 span {
          color: var(--primary);
        }
        .lede {
          max-width: 520px;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }
        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .filters button {
          border: 1px solid var(--border-strong);
          background: transparent;
          color: var(--text-secondary);
          border-radius: 999px;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .filters button.on,
        .filters button:hover {
          background: var(--primary);
          border-color: var(--primary);
          color: var(--btn-ink);
        }
        .list {
          padding: var(--section-padding) 0;
        }
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .card {
          display: block;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 26px;
          color: inherit;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-card);
          color: inherit;
        }
        .cat {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--primary);
          display: block;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .card p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 16px;
        }
        .tags span {
          font-size: 11px;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 4px 8px;
          color: var(--text-muted);
        }
        @media (max-width: 760px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
