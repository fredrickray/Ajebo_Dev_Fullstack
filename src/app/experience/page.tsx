'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { experience } from '@/data/experience';
import { profile } from '@/data/profile';

export default function ExperiencePage() {
  return (
    <div className="exp">
      <section className="hero">
        <div className="container">
          <Reveal>
            <p className="section-kicker">experience</p>
            <h1>
              APIs, data models,
              <br />
              and team leadership
            </h1>
            <p className="lede">
              Production backends, pipelines, and platforms — with engineering lead experience at
              Claymore.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="list">
        <div className="container">
          {experience.map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <article className="card">
                <div className="head">
                  <div>
                    <span className="mono focus">{item.focus}</span>
                    <h2>{item.role}</h2>
                    <p className="company">
                      {item.company} · {item.location}
                    </p>
                  </div>
                  <span className="mono period">{item.period}</span>
                </div>
                <ul>
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <div className="tools">
                  {item.tools.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="approach">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Approach</p>
            <h2 className="section-title">How I work</h2>
          </Reveal>
          <div className="principles">
            {profile.principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 50}>
                <div className="p">
                  <span className="mono">{p.n}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container box">
          <Reveal>
            <h2>Looking for a full-stack or backend engineer?</h2>
            <p>Let&apos;s talk systems, APIs, and shipped interfaces.</p>
            <Link href="/contact" className="btn btn-primary">
              Discuss a role
            </Link>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .hero {
          padding: 48px 0 52px;
        }
        h1 {
          font-size: clamp(34px, 5vw, 52px);
          margin-bottom: 14px;
        }
        .lede {
          max-width: 520px;
          color: var(--text-secondary);
        }
        .list,
        .approach,
        .cta {
          padding: var(--section-padding) 0;
          border-top: 1px solid var(--border);
        }
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 28px;
          margin-bottom: 12px;
        }
        .head {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }
        .focus {
          display: inline-block;
          font-size: 10px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 8px;
        }
        h2 {
          font-size: clamp(20px, 3vw, 26px);
          margin-bottom: 4px;
        }
        .company {
          color: var(--text-secondary);
          font-size: 14px;
        }
        .period {
          font-size: 12px;
          color: var(--text-muted);
          padding-top: 8px;
        }
        ul {
          list-style: none;
          margin-bottom: 16px;
        }
        li {
          position: relative;
          padding-left: 14px;
          margin-bottom: 10px;
          color: var(--text-secondary);
          font-size: 15px;
          line-height: 1.65;
          max-width: 780px;
        }
        li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 9px;
          width: 5px;
          height: 5px;
          background: var(--primary);
          border-radius: 50%;
        }
        .tools {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tools span {
          font-size: 11px;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 5px 9px;
          color: var(--text-muted);
        }
        .approach {
          border-top: 1px solid var(--border);
        }
        .principles {
          margin-top: 24px;
          border-top: 1px solid var(--border);
        }
        .p {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border);
        }
        .p .mono {
          color: var(--primary);
          padding-top: 4px;
        }
        .p h3 {
          font-size: 18px;
          margin-bottom: 6px;
        }
        .p p {
          color: var(--text-secondary);
          max-width: 540px;
        }
        .box {
          max-width: 560px;
        }
        .box h2 {
          font-size: clamp(24px, 4vw, 32px);
          margin-bottom: 10px;
        }
        .box p {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}
