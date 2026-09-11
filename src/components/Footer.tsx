'use client';

import Link from 'next/link';
import { profile } from '@/data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="brand">
          <span className="mark">AD</span>
          <div>
            <p className="name">{profile.name}</p>
            <p className="tag">Open to contract work, full-time roles, and hard systems problems.</p>
          </div>
        </div>
        <div className="links">
          <Link href="/contact">Contact</Link>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
        <p className="copy mono">
          © {year} {profile.name.toUpperCase()}
        </p>
      </div>
      <style jsx>{`
        .footer {
          background: var(--bg-footer);
          color: var(--text-on-dark);
          padding: 48px 0 28px;
          border-top: 1px solid var(--border-dark);
        }
        .wrap {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
        }
        .brand {
          display: flex;
          gap: 14px;
          align-items: flex-start;
          margin-bottom: 28px;
        }
        .mark {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--text-on-dark);
          color: var(--bg-footer);
          display: grid;
          place-items: center;
          font-size: 11px;
          font-weight: 800;
          flex-shrink: 0;
        }
        .name {
          font-family: var(--font-display), sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .tag {
          color: var(--text-on-dark-muted);
          font-size: 14px;
          max-width: 420px;
        }
        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          margin-bottom: 28px;
        }
        .links :global(a) {
          color: var(--text-on-dark-muted);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .links :global(a:hover) {
          color: var(--text-on-dark);
        }
        .copy {
          font-size: 11px;
          letter-spacing: 0.08em;
          color: var(--text-on-dark-muted);
        }
      `}</style>
    </footer>
  );
}
