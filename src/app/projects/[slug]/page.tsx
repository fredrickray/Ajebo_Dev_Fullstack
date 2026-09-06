import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="detail">
      <section className="hero">
        <div className="container">
          <Link href="/projects" className="back mono">
            ← Projects
          </Link>
          <p className="section-kicker">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="lede">{project.longDescription}</p>
          <div className="actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View on GitHub
            </a>
            <Link href="/contact" className="btn btn-secondary">
              Discuss similar work
            </Link>
          </div>
        </div>
      </section>

      <section className="body">
        <div className="container layout">
          <div>
            <h2>Highlights</h2>
            <ul>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <aside>
            <h3 className="mono">Architecture</h3>
            <div className="arch">
              {project.architecture.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
            <h3 className="mono">Stack</h3>
            <div className="arch">
              {project.tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .detail .hero {
          padding: 72px 0 56px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }
        .back {
          display: inline-block;
          font-size: 12px;
          color: var(--primary);
          margin-bottom: 18px;
        }
        .detail h1 {
          font-size: clamp(36px, 5vw, 52px);
          margin-bottom: 16px;
        }
        .lede {
          max-width: 680px;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 24px;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .body {
          padding: var(--section-padding) 0;
        }
        .layout {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
        }
        .detail h2 {
          font-size: 22px;
          margin-bottom: 16px;
        }
        .detail ul {
          list-style: none;
        }
        .detail li {
          position: relative;
          padding-left: 16px;
          margin-bottom: 12px;
          color: var(--text-secondary);
          line-height: 1.65;
        }
        .detail li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
        }
        aside {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          height: fit-content;
        }
        aside h3 {
          font-size: 11px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 12px;
        }
        aside h3 + .arch + h3 {
          margin-top: 22px;
        }
        .arch {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .arch span {
          font-size: 12px;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 5px 10px;
          color: var(--text-secondary);
        }
        @media (max-width: 800px) {
          .layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
