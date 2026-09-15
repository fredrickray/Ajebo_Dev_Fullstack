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
            <p className="section-kicker">explore my work</p>
            <h1>
              Systems, tools,
              <br />
              ML &amp; mobile
            </h1>
            <p className="lede">
              Case studies with architecture, challenges, trade-offs — plus live demos and GitHub.
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
            <Reveal key={p.slug} delay={i * 40}>
              <article className="card">
                <div className="top">
                  <span className="mono cat">{p.category}</span>
                  <div className="links">
                    {p.live && (
                      <a href={p.live} target="_blank" rel="noopener noreferrer">
                        Live
                      </a>
                    )}
                    <a href={p.github} target="_blank" rel="noopener noreferrer">
                      GitHub
                    </a>
                  </div>
                </div>
                <h2>
                  <Link href={`/projects/${p.slug}`}>{p.title}</Link>
                </h2>
                <p>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <Link href={`/projects/${p.slug}`} className="btn btn-secondary btn-sm">
                  Case study
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <style jsx>{`
        .hero {
          padding: 40px 0 36px;
        }
        h1 {
          font-size: clamp(36px, 5vw, 52px);
          margin-bottom: 12px;
        }
        .lede {
          max-width: 520px;
          color: var(--text-secondary);
          margin-bottom: 22px;
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
          border-radius: var(--radius-sm);
          padding: 8px 12px;
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
          gap: 12px;
        }
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
        }
        .top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .cat {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--primary);
        }
        .links {
          display: flex;
          gap: 12px;
        }
        .links a {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .links a:hover {
          color: var(--primary);
        }
        h2 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        h2 :global(a):hover {
          color: var(--primary);
        }
        .card p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
          margin-bottom: 14px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
        }
        .tags span {
          font-size: 11px;
          border: 1px solid var(--border);
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
