'use client';

import Link from 'next/link';
import Reveal from '@/components/Reveal';
import CanvasRuler, { LocalClock } from '@/components/CanvasRuler';
import { profile } from '@/data/profile';
import { featuredProjects } from '@/data/projects';

export default function Home() {
  return (
    <>
      <div className="top-pad">
        <CanvasRuler />
      </div>

      <section className="hero">
        <div className="container hero-wrap">
          <p className="clock-wrap">
            <LocalClock />
          </p>

          <div className="stage">
            <p className="intro">my name is</p>

            <span className="sticker a">Most recently at PsychSpace</span>
            <span className="sticker b">Previously at Claymore</span>
            <span className="sticker c">FULL-STACK ENGINEER</span>
            <span className="sticker d">ABUJA · WAT</span>

            <h1 className="name-matrix">
              {profile.firstName.toUpperCase()}
              <br />
              {profile.lastName.toUpperCase()}
            </h1>

            <p className="availability mono">
              <span className="dot" />
              Available for new work
            </p>
          </div>

          <p className="lede">
            I build the systems behind APIs, data platforms, and product interfaces — NestJS and Node
            at the core, React and React Native when the product needs a face.
          </p>

          <Link href="/contact" className="btn btn-primary cta">
            Contact me
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>

      <section className="about">
        <div className="container about-grid">
          <Reveal>
            <p className="section-kicker">about me</p>
            <h2 className="section-title">what&apos;s up</h2>
          </Reveal>
          <Reveal delay={40}>
            <p>
              I&apos;m Fredrick, a fullstack engineer in Nigeria who likes taking complicated systems
              apart and rebuilding them so they just work.
            </p>
            <p className="muted">
              Most recently: backend engineer at PsychSpace, building NestJS and Django services for
              product APIs and scoring. Before that, Engineering Team Lead at Claymore — APIs,
              realtime chat, and AWS delivery.
            </p>
            <div className="tags">
              <span>Backend Systems</span>
              <span>APIs & Auth</span>
              <span>Mobile & Desktop</span>
              <span>Infrastructure</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="work">
        <div className="container">
          <Reveal>
            <p className="section-kicker">explore my work</p>
            <h2 className="section-title">
              Featured
              <br />
              works
            </h2>
            <p className="work-lede">
              Desktop tools, ML decision systems, microservice platforms, and mobile — built end to
              end.
            </p>
          </Reveal>

          <div className="cards">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 50}>
                <article className="card">
                  <div className="card-top">
                    <span className="mono idx">PROJECT {String(i + 1).padStart(2, '0')}</span>
                    <span className="mono cat">{p.category}</span>
                  </div>
                  <h3>
                    {p.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.logo} alt="" className="logo" width={32} height={32} />
                    )}
                    <span>{p.title}</span>
                  </h3>
                  <p>{p.description}</p>
                  <div className="card-actions">
                    <Link href={`/projects/${p.slug}`} className="view">
                      View project ↗
                    </Link>
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
                  <div className="pills">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link href="/projects" className="all">
              All work →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="talk">
        <div className="container talk-box">
          <Reveal>
            <p className="section-kicker">let&apos;s talk</p>
            <h2 className="section-title">Open to new work</h2>
            <p>
              Most energized by systems where reliability matters — APIs, data, and product
              infrastructure. Email is the fastest way to reach me.
            </p>
            <div className="talk-actions">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                {profile.email}
              </a>
              <Link href="/contact" className="btn btn-secondary">
                Contact form
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style jsx>{`
        .top-pad {
          padding-top: 8px;
        }
        .hero {
          padding: 28px 0 72px;
          text-align: center;
        }
        .clock-wrap {
          margin-bottom: 28px;
        }
        .clock-wrap :global(.clock) {
          font-size: 12px;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .stage {
          position: relative;
          max-width: 820px;
          margin: 0 auto 28px;
          padding: 36px 12px 20px;
        }
        .intro {
          font-family: var(--font-script), "Caveat", cursive;
          font-size: clamp(26px, 4vw, 36px);
          color: var(--script-muted);
          margin-bottom: 8px;
        }
        .name-matrix {
          font-size: clamp(40px, 9vw, 84px);
          color: var(--text-primary);
          margin-bottom: 18px;
          animation: name-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .sticker {
          position: absolute;
          font-size: 12px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 6px;
          box-shadow: 0 6px 16px rgba(17, 17, 17, 0.08);
          white-space: nowrap;
          z-index: 2;
          animation:
            sticker-settle 0.65s cubic-bezier(0.22, 1, 0.36, 1) both,
            sticker-drift 5.5s ease-in-out 0.9s infinite;
        }
        .a {
          top: 8px;
          left: 0;
          background: var(--sticker-a);
          color: #1a2e1c;
          --sticker-rot: -6deg;
          animation-delay: 0.05s, 0.9s;
        }
        .b {
          top: 18px;
          right: 0;
          background: var(--sticker-b);
          color: #3b2a16;
          --sticker-rot: 5deg;
          animation-delay: 0.15s, 1.1s;
        }
        .c {
          left: -8px;
          top: 52%;
          background: var(--sticker-c);
          color: #3b3210;
          --sticker-rot: -8deg;
          font-size: 11px;
          letter-spacing: 0.04em;
          animation-delay: 0.25s, 1.3s;
        }
        .d {
          right: -4px;
          top: 48%;
          background: var(--sticker-d);
          color: #4a2030;
          --sticker-rot: 7deg;
          font-size: 11px;
          letter-spacing: 0.04em;
          animation-delay: 0.35s, 1.5s;
        }
        .availability {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse-dot 2.2s ease-in-out infinite;
        }
        .cta {
          transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cta:active {
          transform: scale(0.97);
        }
        .lede {
          max-width: 540px;
          margin: 0 auto 28px;
          color: var(--text-secondary);
          font-size: 17px;
          line-height: 1.7;
        }
        .cta .arrow {
          display: inline-grid;
          place-items: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--accent);
          color: #fff;
          font-size: 12px;
        }
        .about,
        .work,
        .talk {
          padding: var(--section-padding) 0;
        }
        .about {
          border-top: 1px solid var(--border);
        }
        .about-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 36px;
        }
        .about p {
          color: var(--text-secondary);
          font-size: 17px;
          max-width: 560px;
        }
        .muted {
          margin-top: 14px;
          color: var(--text-muted);
          font-size: 15px !important;
        }
        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .tags span {
          font-size: 12px;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 999px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-secondary);
        }
        .work {
          border-top: 1px solid var(--border);
        }
        .work-lede {
          max-width: 480px;
          color: var(--text-secondary);
          margin: 8px 0 32px;
        }
        .cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 24px;
          box-shadow: var(--shadow-card);
          min-height: 220px;
          display: flex;
          flex-direction: column;
          transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .card:hover {
          transform: translateY(-4px);
          border-color: var(--border-strong);
          box-shadow: 0 16px 36px rgba(17, 17, 17, 0.1);
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 14px;
        }
        .idx,
        .cat {
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .card h3 {
          font-size: 28px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .card h3 :global(.logo) {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          object-fit: cover;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          flex-shrink: 0;
        }
        .card p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.65;
          flex: 1;
        }
        .card-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin: 18px 0 14px;
          flex-wrap: wrap;
        }
        .view {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .links {
          display: flex;
          gap: 12px;
        }
        .links a {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-muted);
        }
        .links a:hover {
          color: var(--accent);
        }
        .pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .pills span {
          font-size: 11px;
          font-weight: 700;
          padding: 5px 9px;
          border-radius: 999px;
          background: var(--bg-secondary);
          color: var(--text-secondary);
        }
        .all {
          display: inline-block;
          margin-top: 28px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 13px;
        }
        .talk {
          border-top: 1px solid var(--border);
        }
        .talk-box {
          max-width: 640px;
        }
        .talk p {
          color: var(--text-secondary);
          margin-bottom: 22px;
        }
        .talk-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        @media (max-width: 900px) {
          .about-grid,
          .cards {
            grid-template-columns: 1fr;
          }
          .sticker {
            position: static;
            display: inline-block;
            margin: 4px;
            animation: sticker-settle 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .stage {
            padding-top: 12px;
          }
          .a,
          .b,
          .c,
          .d {
            --sticker-rot: -2deg;
          }
          .b,
          .d {
            --sticker-rot: 2deg;
          }
        }
      `}</style>
    </>
  );
}
