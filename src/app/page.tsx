'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';
import StackStrata from '@/components/StackStrata';
import { profile } from '@/data/profile';
import { experience } from '@/data/experience';
import { featuredProjects } from '@/data/projects';
import { skillGroups } from '@/data/skills';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="copy">
            <p className="brand mono">{profile.brand}</p>
            <h1>
              {profile.firstName}
              <br />
              {profile.lastName}
            </h1>
            <p className="availability mono">
              <span className="dot" />
              {profile.availability}
            </p>
            <p className="role">{profile.role}</p>
            <p className="lede">{profile.tagline}</p>
            <div className="hero-actions">
              <Link href="/projects" className="btn btn-primary">
                View projects
              </Link>
              <Link href="/contact" className="btn btn-on-dark">
                Contact
              </Link>
            </div>
            <div className="social">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <StackStrata />
        </div>
      </section>

      <section className="highlights">
        <div className="container grid">
          {profile.highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <article className="card">
                <span className="mono num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="about">
        <div className="container about-grid">
          <Reveal>
            <p className="section-kicker">Profile</p>
            <h2 className="section-title">Systems first, interfaces when needed</h2>
          </Reveal>
          <Reveal delay={80}>
            <p>{profile.about}</p>
            <p className="muted">{profile.aboutExtended}</p>
          </Reveal>
        </div>
      </section>

      <section className="projects">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Projects</p>
            <h2 className="section-title">Selected work</h2>
          </Reveal>
          <div className="proj-grid">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link href={`/projects/${p.slug}`} className="proj">
                  <span className="mono cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="tags">
                    {p.tags.slice(0, 4).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/projects" className="text-link">
              All projects →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="experience">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Experience</p>
            <h2 className="section-title">Where I&apos;ve built</h2>
          </Reveal>
          <div className="timeline">
            {experience.slice(0, 3).map((item, i) => (
              <Reveal key={item.id} delay={i * 50}>
                <article className="row">
                  <span className="mono when">{item.period}</span>
                  <div>
                    <h3>
                      {item.role}
                      <span className="co"> · {item.company}</span>
                    </h3>
                    <p>{item.bullets[0]}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/experience" className="text-link">
              Full experience →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="skills">
        <div className="container">
          <Reveal>
            <p className="section-kicker">Skills</p>
            <h2 className="section-title">Stack</h2>
          </Reveal>
          <div className="skill-grid">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 40}>
                <div className="skill">
                  <h3 className="mono">{g.label}</h3>
                  <p>{g.items.join(' · ')}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <Reveal>
            <h2>Need a backend-leaning full-stack engineer?</h2>
            <p>APIs, data models, and the interfaces that prove them — based in {profile.location}.</p>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-primary">
                Start a conversation
              </Link>
              <a href={`mailto:${profile.email}`} className="btn btn-secondary">
                Email
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .hero {
          background: var(--bg-hero);
          padding: 64px 0 72px;
          border-bottom: 1px solid var(--border);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }
        .copy {
          animation: rise 0.75s ease both;
        }
        .brand {
          color: var(--primary);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .copy h1 {
          font-size: clamp(44px, 7vw, 72px);
          color: var(--text-on-dark);
          margin-bottom: 16px;
        }
        .availability {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-on-dark-muted);
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary);
          animation: pulse-dot 2s ease infinite;
        }
        .role {
          color: var(--primary);
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .lede {
          color: var(--text-on-dark-muted);
          font-size: 17px;
          max-width: 460px;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 18px;
        }
        .social {
          display: flex;
          gap: 16px;
        }
        .social a {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-on-dark-muted);
        }
        .social a:hover {
          color: var(--primary);
        }
        .highlights,
        .skills,
        .cta {
          padding: var(--section-padding) 0;
        }
        .highlights {
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .card,
        .proj,
        .skill {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 24px;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .card:hover,
        .proj:hover,
        .skill:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-card);
          border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
        }
        .num {
          color: var(--primary);
          font-size: 12px;
          display: block;
          margin-bottom: 12px;
        }
        .card h3,
        .proj h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }
        .card p,
        .proj p,
        .about p,
        .row p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
        }
        .about {
          padding: var(--section-padding) 0;
          background: var(--bg-primary);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 40px;
        }
        .muted {
          margin-top: 14px;
          color: var(--text-muted);
        }
        .projects {
          padding: var(--section-padding) 0;
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .proj-grid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .proj {
          display: block;
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
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 14px;
        }
        .tags span {
          font-size: 11px;
          border: 1px solid var(--border);
          border-radius: 999px;
          padding: 4px 8px;
          color: var(--text-muted);
        }
        .text-link {
          display: inline-block;
          margin-top: 22px;
          font-weight: 700;
          color: var(--primary);
        }
        .experience {
          padding: var(--section-padding) 0;
          background: var(--bg-primary);
        }
        .timeline {
          margin-top: 28px;
          border-top: 1px solid var(--border);
        }
        .row {
          display: grid;
          grid-template-columns: 150px 1fr;
          gap: 20px;
          padding: 22px 0;
          border-bottom: 1px solid var(--border);
        }
        .when {
          font-size: 12px;
          color: var(--text-muted);
          padding-top: 6px;
        }
        .row h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .co {
          color: var(--text-secondary);
          font-weight: 600;
        }
        .skills {
          background: var(--bg-secondary);
          border-top: 1px solid var(--border);
        }
        .skill-grid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .skill h3 {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 10px;
          font-family: var(--font-mono), monospace;
          font-weight: 500;
        }
        .skill p {
          color: var(--text-secondary);
          font-size: 14px;
        }
        .cta {
          background: var(--bg-primary);
          border-top: 1px solid var(--border);
        }
        .cta-inner {
          max-width: 600px;
        }
        .cta h2 {
          font-size: clamp(26px, 4vw, 36px);
          margin-bottom: 12px;
        }
        .cta p {
          color: var(--text-secondary);
          margin-bottom: 22px;
        }
        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        @media (max-width: 900px) {
          .hero-grid,
          .grid,
          .about-grid,
          .proj-grid,
          .skill-grid,
          .row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
