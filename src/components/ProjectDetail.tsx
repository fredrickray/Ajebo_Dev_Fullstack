'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';

export default function ProjectDetail({ project }: { project: Project }) {
  const sections = [
    { id: 'layers', label: 'Stack layers', index: '01' },
    { id: 'architecture', label: 'Architecture', index: '02' },
    ...(project.services?.length
      ? [{ id: 'services', label: 'Services', index: '03' }]
      : []),
    {
      id: 'challenges',
      label: 'Challenges',
      index: project.services?.length ? '04' : '03',
    },
    {
      id: 'tradeoffs',
      label: 'Trade-offs',
      index: project.services?.length ? '05' : '04',
    },
  ];

  const [activeId, setActiveId] = useState(sections[0].id);
  const scrollRef = useRef<HTMLElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { root, rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeIndex = sections.findIndex((s) => s.id === activeId);

  return (
    <div className="pd">
      <header className="head">
        <div className="container">
          <p className="crumb mono">
            <Link href="/projects">Projects</Link>
            <span> / </span>
            <span>{project.title}</span>
          </p>
          <span className="mono cat">{project.category}</span>
          <h1>{project.title}</h1>
          <p className="desc">{project.longDescription}</p>
          <div className="tags">
            {project.tags.map((t) => (
              <span key={t} className="mono">
                {t}
              </span>
            ))}
          </div>
          <div className="actions">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Live demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              GitHub
            </a>
            {project.repos?.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                {r.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="layout container">
        <aside className="side">
          <p className="mono side-label">Contents</p>
          <nav>
            {sections.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={activeId === s.id ? 'on' : i < activeIndex ? 'passed' : ''}
                onClick={() => scrollTo(s.id)}
              >
                <span className="mono">{s.index}</span>
                {s.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="scroll" ref={scrollRef}>
          <section
            id="layers"
            ref={(el) => {
              sectionRefs.current.layers = el;
            }}
          >
            <h2>
              <span className="mono">01</span> Stack layers
            </h2>
            <div className="layers">
              {project.layers.map((layer) => (
                <div key={layer.label} className="layer">
                  <h3>{layer.label}</h3>
                  <div className="chips">
                    {layer.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="architecture"
            ref={(el) => {
              sectionRefs.current.architecture = el;
            }}
          >
            <h2>
              <span className="mono">02</span> Architecture
            </h2>
            <div className="arch">
              {project.architecture.map((node, i) => (
                <div key={node} className="node">
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <strong>{node}</strong>
                </div>
              ))}
            </div>
            <ul className="highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>

          {project.services && (
            <section
              id="services"
              ref={(el) => {
                sectionRefs.current.services = el;
              }}
            >
              <h2>
                <span className="mono">03</span> Services
              </h2>
              <div className="services">
                {project.services.map((svc) => (
                  <article key={svc.slug} className="svc">
                    <h3>{svc.title}</h3>
                    <p>{svc.description}</p>
                    <div className="chips">
                      {svc.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <a href={svc.github} target="_blank" rel="noopener noreferrer" className="svc-link">
                      GitHub →
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section
            id="challenges"
            ref={(el) => {
              sectionRefs.current.challenges = el;
            }}
          >
            <h2>
              <span className="mono">{project.services?.length ? '04' : '03'}</span> Engineering
              challenges
            </h2>
            <div className="list">
              {project.challenges.map((c, i) => (
                <div key={c.title} className="row">
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section
            id="tradeoffs"
            ref={(el) => {
              sectionRefs.current.tradeoffs = el;
            }}
          >
            <h2>
              <span className="mono">{project.services?.length ? '05' : '04'}</span> Trade-offs &
              decisions
            </h2>
            <div className="trades">
              {project.tradeoffs.map((t) => (
                <div key={t.tech} className="trade">
                  <div className="pair">
                    <strong>{t.tech}</strong>
                    <span className="mono">vs</span>
                    <span>{t.alternative}</span>
                  </div>
                  <p>{t.reason}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="cta">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open live demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              View on GitHub
            </a>
            <Link href="/contact" className="btn btn-secondary">
              Discuss similar work
            </Link>
          </div>
        </main>
      </div>

      <style jsx>{`
        .head {
          padding: 64px 0 40px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }
        .crumb {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 18px;
        }
        .crumb :global(a) {
          color: var(--primary);
        }
        .cat {
          color: var(--primary);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        h1 {
          font-size: clamp(36px, 5vw, 52px);
          margin: 8px 0 14px;
        }
        .desc {
          max-width: 720px;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 18px;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }
        .tags span {
          font-size: 11px;
          border: 1px solid var(--border);
          padding: 4px 8px;
          color: var(--text-muted);
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .layout {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 32px;
          padding-top: 40px;
          padding-bottom: 80px;
          align-items: start;
        }
        .side {
          position: sticky;
          top: calc(var(--nav-height) + 24px);
        }
        .side-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .side button {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          text-align: left;
          border: none;
          background: none;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
        }
        .side button .mono {
          color: var(--text-muted);
          font-size: 11px;
        }
        .side button.on {
          color: var(--text-primary);
        }
        .side button.on .mono {
          color: var(--primary);
        }
        .scroll {
          max-height: calc(100vh - var(--nav-height) - 80px);
          overflow-y: auto;
          padding-right: 8px;
        }
        section {
          padding-bottom: 48px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border);
        }
        h2 {
          font-size: 22px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        h2 .mono {
          color: var(--primary);
          font-size: 13px;
        }
        .layers {
          display: grid;
          gap: 10px;
        }
        .layer {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px;
        }
        .layer h3 {
          font-size: 15px;
          margin-bottom: 10px;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .chips span {
          font-size: 12px;
          border: 1px solid var(--border);
          padding: 4px 8px;
          color: var(--text-muted);
        }
        .arch {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        .node {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 14px;
        }
        .node .mono {
          display: block;
          color: var(--primary);
          font-size: 11px;
          margin-bottom: 6px;
        }
        .node strong {
          font-size: 14px;
        }
        .highlights {
          list-style: none;
        }
        .highlights li {
          position: relative;
          padding-left: 14px;
          margin-bottom: 10px;
          color: var(--text-secondary);
        }
        .highlights li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 5px;
          height: 5px;
          background: var(--primary);
          border-radius: 50%;
        }
        .services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .svc {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px;
        }
        .svc h3 {
          font-size: 16px;
          margin-bottom: 8px;
        }
        .svc p {
          color: var(--text-secondary);
          font-size: 13px;
          margin-bottom: 12px;
        }
        .svc-link {
          display: inline-block;
          margin-top: 12px;
          font-size: 13px;
          font-weight: 700;
          color: var(--primary);
        }
        .list .row {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 14px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }
        .list .mono {
          color: var(--primary);
          padding-top: 3px;
        }
        .list h3 {
          font-size: 16px;
          margin-bottom: 6px;
        }
        .list p {
          color: var(--text-secondary);
          font-size: 14px;
        }
        .trades {
          display: grid;
          gap: 12px;
        }
        .trade {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px;
        }
        .pair {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .pair .mono {
          color: var(--text-muted);
          font-size: 11px;
        }
        .trade p {
          color: var(--text-secondary);
          font-size: 14px;
        }
        .cta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 8px;
        }
        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .side {
            position: static;
          }
          .scroll {
            max-height: none;
            overflow: visible;
          }
          .services {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
