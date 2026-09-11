'use client';

import Link from 'next/link';
import { useState } from 'react';
import Reveal from '@/components/Reveal';
import ResumeModal from '@/components/ResumeModal';
import { profile } from '@/data/profile';
import { experience } from '@/data/experience';
import { skillGroups } from '@/data/skills';

export default function AboutPage() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <div className="about">
      <section className="hero">
        <div className="container">
          <Reveal>
            <p className="section-kicker">about me</p>
            <h1>
              Backend-leaning
              <br />
              full-stack engineer
            </h1>
            <p className="lede">
              {profile.about} {profile.aboutExtended}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="principles">
        <div className="container list">
          {profile.principles.map((p, i) => (
            <Reveal key={p.n} delay={i * 60}>
              <article className="row">
                <span className="mono n">{p.n}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="skills">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Skills</p>
            <h2 className="section-title">What I bring</h2>
          </Reveal>
          <div className="grid">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 40}>
                <div className="block">
                  <h3 className="mono">{g.label}</h3>
                  <p>{g.items.join(' · ')}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="path">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Background</p>
            <h2 className="section-title">Recent roles</h2>
          </Reveal>
          <div className="feed">
            {experience.slice(0, 4).map((item, i) => (
              <Reveal key={item.id} delay={i * 40}>
                <div className="item">
                  <span className="mono">{item.period}</span>
                  <div>
                    <h3>
                      {item.role} · {item.company}
                    </h3>
                    <p>{item.bullets[0]}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="edu">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Education</p>
            <h2>{profile.education.degree}</h2>
            <p className="meta mono">
              {profile.education.school} · {profile.education.period} · {profile.education.location}
            </p>
            <p>{profile.education.description}</p>
          </Reveal>
        </div>
      </section>

      <section className="cta">
        <div className="container actions">
          <Link href="/contact" className="btn btn-primary">
            Get in touch
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            Projects
          </Link>
          <button type="button" className="btn btn-secondary" onClick={() => setResumeOpen(true)}>
            Resume
          </button>
        </div>
      </section>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      <style jsx>{`
        .hero {
          padding: 48px 0 56px;
        }
        h1 {
          font-size: clamp(36px, 6vw, 56px);
          margin-bottom: 18px;
        }
        .lede {
          max-width: 680px;
          color: var(--text-secondary);
          line-height: 1.75;
        }
        .principles,
        .path,
        .cta {
          padding: var(--section-padding) 0;
          border-top: 1px solid var(--border);
        }
        .skills,
        .edu {
          padding: var(--section-padding) 0;
          border-top: 1px solid var(--border);
        }
        .list,
        .feed {
          border-top: 1px solid var(--border);
        }
        .row,
        .item {
          display: grid;
          grid-template-columns: 64px 1fr;
          gap: 18px;
          padding: 24px 0;
          border-bottom: 1px solid var(--border);
        }
        .n {
          color: var(--primary);
          padding-top: 4px;
        }
        .row h3,
        .item h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }
        .row p,
        .item p,
        .edu p {
          color: var(--text-secondary);
          max-width: 580px;
        }
        .item .mono {
          font-size: 12px;
          color: var(--text-muted);
          padding-top: 4px;
        }
        .grid {
          margin-top: 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .block {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 20px;
        }
        .block h3 {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 10px;
          font-family: var(--font-mono), monospace;
          font-weight: 500;
        }
        .block p {
          color: var(--text-secondary);
          font-size: 14px;
        }
        .edu h2 {
          font-size: clamp(24px, 4vw, 32px);
          margin-bottom: 8px;
        }
        .meta {
          color: var(--primary);
          margin-bottom: 12px;
          font-size: 13px;
        }
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        @media (max-width: 760px) {
          .grid,
          .row,
          .item {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
