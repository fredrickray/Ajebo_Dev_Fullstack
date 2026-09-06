'use client';

import Link from 'next/link';
import { profile } from '@/data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="top">
          <div>
            <p className="name">{profile.brand}</p>
            <p className="tag">{profile.role}</p>
          </div>
          <div className="links">
            <Link href="/projects">Projects</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <div className="bottom">
          <p>
            &copy; {year} {profile.name}
          </p>
          <p className="mono">{profile.location}</p>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background: var(--bg-footer);
          color: var(--text-on-dark);
          padding: 48px 0 24px;
          border-top: 1px solid var(--border-dark);
        }
        .wrap {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: 0 24px;
        }
        .top {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--border-dark);
        }
        .name {
          font-family: var(--font-display), sans-serif;
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .tag {
          color: var(--text-on-dark-muted);
          font-size: 14px;
        }
        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 18px;
          align-items: center;
        }
        .links :global(a) {
          color: var(--text-on-dark-muted);
          font-size: 14px;
        }
        .links :global(a:hover) {
          color: var(--primary);
        }
        .bottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
          padding-top: 18px;
          font-size: 13px;
          color: var(--text-on-dark-muted);
        }
      `}</style>
    </footer>
  );
}
