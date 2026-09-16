'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Project } from '@/data/projects';
import { getSystemDesign } from '@/data/systemDesigns';
import ArchFlow from '@/components/ArchFlow';
import ProjectMediaGallery from '@/components/ProjectMediaGallery';

export default function ProjectDetail({ project }: { project: Project }) {
  const design = getSystemDesign(project.slug);

  const sections = [
    { id: 'media', label: 'Walkthrough', index: '01' },
    { id: 'layers', label: 'Stack layers', index: '02' },
    { id: 'architecture', label: 'Architecture', index: '03' },
    ...(project.services?.length
      ? [{ id: 'services', label: 'Services', index: '04' }]
      : []),
    {
      id: 'challenges',
      label: 'Challenges',
      index: project.services?.length ? '05' : '04',
    },
    {
      id: 'tradeoffs',
      label: 'Trade-offs',
      index: project.services?.length ? '06' : '05',
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
          <div className="title-row">
            {project.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.logo} alt="" className="logo" width={48} height={48} />
            )}
            <h1>{project.title}</h1>
          </div>
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
            id="media"
            ref={(el) => {
              sectionRefs.current.media = el;
            }}
          >
            <h2>
              <span className="mono">01</span> Walkthrough
            </h2>
            <p className="section-lede">One short demo and two screens from the product.</p>
            <ProjectMediaGallery title={project.title} media={project.media} />
          </section>

          <section
            id="layers"
            ref={(el) => {
              sectionRefs.current.layers = el;
            }}
          >
            <h2>
              <span className="mono">02</span> Stack layers
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
              <span className="mono">03</span> Architecture
            </h2>
            {design ? (
              <>
                <ArchFlow flow={design.flow} />
                <p className="caption">{design.flow.caption}</p>
              </>
            ) : (
              <div className="arch">
                {project.architecture.map((node, i) => (
                  <div key={node} className="node">
                    <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                    <strong>{node}</strong>
                  </div>
                ))}
              </div>
            )}
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
                <span className="mono">04</span> Services
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
              <span className="mono">{project.services?.length ? '05' : '04'}</span> Engineering
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
              <span className="mono">{project.services?.length ? '06' : '05'}</span> Trade-offs &
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
          padding: 48px 0 40px;
          border-bottom: 1px solid var(--border);
        }
        .crumb {
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 18px;
        }
        .crumb :global(a) {
          color: var(--accent);
        }
        .cat {
          color: var(--text-muted);
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 8px 0 14px;
        }
        .title-row .logo {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: cover;
          border: 1px solid var(--border);
          background: var(--bg-card);
          flex-shrink: 0;
        }
        h1 {
          font-size: clamp(36px, 5vw, 52px);
          margin: 0;
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
          gap: 28px;
          padding-top: 36px;
          padding-bottom: 72px;
          align-items: start;
        }
        .side {
          position: sticky;
          top: calc(var(--nav-height) + 16px);
        }
        .side-label {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 12px;
        }
        .side nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .side button {
          display: flex;
          align-items: center;
          gap: 10px;
          text-align: left;
          border: none;
          background: transparent;
          color: var(--text-muted);
          font: inherit;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 10px;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .side button .mono {
          font-size: 10px;
          color: inherit;
        }
        .side button:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }
        .side button.on {
          color: var(--text-primary);
          background: var(--bg-card);
          border: 1px solid var(--border);
          transform: translateX(2px);
        }
        .side button.passed {
          color: var(--text-secondary);
        }
        .scroll {
          max-height: calc(100vh - var(--nav-height) - 48px);
          overflow-y: auto;
          padding-right: 8px;
          scroll-behavior: smooth;
        }
        section {
          padding-bottom: 48px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border);
        }
        h2 {
          font-size: 22px;
          margin-bottom: 16px;
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        h2 .mono {
          font-size: 12px;
          color: var(--accent);
        }
        .section-lede {
          color: var(--text-secondary);
          font-size: 14px;
          margin: -6px 0 16px;
        }
        .layers {
          display: grid;
          gap: 10px;
        }
        .layer {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 16px 18px;
        }
        .layer h3 {
          font-size: 14px;
          margin-bottom: 10px;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .chips span {
          font-size: 12px;
          padding: 5px 9px;
          border-radius: 999px;
          background: var(--bg-secondary);
          color: var(--text-secondary);
        }
        .arch {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 8px;
          margin-bottom: 16px;
        }
        .node {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .node .mono {
          font-size: 10px;
          color: var(--accent);
        }
        .caption {
          margin-top: 14px;
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.7;
          max-width: 640px;
        }
        .highlights {
          margin-top: 18px;
          list-style: none;
        }
        .highlights li {
          position: relative;
          padding: 8px 0 8px 16px;
          color: var(--text-secondary);
          font-size: 14px;
          border-bottom: 1px solid var(--border);
        }
        .highlights li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 15px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }
        .services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .svc {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
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
          line-height: 1.6;
        }
        .svc-link {
          display: inline-block;
          margin-top: 12px;
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
        }
        .list .row {
          display: grid;
          grid-template-columns: 40px 1fr;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid var(--border);
        }
        .list .mono {
          color: var(--accent);
          padding-top: 4px;
          font-size: 11px;
        }
        .list h3 {
          font-size: 16px;
          margin-bottom: 6px;
        }
        .list p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }
        .trades {
          display: grid;
          gap: 10px;
        }
        .trade {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 16px 18px;
        }
        .pair {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .pair .mono {
          font-size: 10px;
          color: var(--text-muted);
        }
        .trade p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }
        .cta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          padding: 28px 0 12px;
        }
        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }
          .side {
            position: static;
          }
          .side nav {
            flex-direction: row;
            flex-wrap: wrap;
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
