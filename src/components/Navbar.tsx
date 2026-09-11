'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ResumeModal from './ResumeModal';
import { profile } from '@/data/profile';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Work' },
    { href: '/experience', label: 'Experience' },
  ];

  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <Link href="/" className="logo" aria-label={profile.brand}>
            <span className="mark">AD</span>
          </Link>

          <div className={`links ${menuOpen ? 'on' : ''}`}>
            {links.map((l) => {
              const active =
                pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={active ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="mobile-resume"
              onClick={() => {
                setMenuOpen(false);
                setResumeOpen(true);
              }}
            >
              Resume
            </button>
          </div>

          <div className="actions">
            <a
              className="chip hide-sm"
              href={`mailto:${profile.email}`}
              title="Email"
              aria-label="Email"
            >
              EM
            </a>
            <a
              className="chip hide-sm"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
            >
              GH
            </a>
            <a
              className="chip hide-sm"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              LI
            </a>
            <button type="button" className="theme mono" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <Link href="/contact" className="btn btn-primary hide-sm contact">
              Contact
            </Link>
            <button type="button" className="menu" onClick={() => setMenuOpen(!menuOpen)}>
              Menu
            </button>
          </div>
        </div>

        <style jsx>{`
          .nav {
            position: fixed;
            inset: 0 0 auto;
            z-index: 1000;
            height: var(--nav-height);
            display: flex;
            align-items: center;
            padding: 0 16px;
          }
          .wrap {
            width: min(100%, 1040px);
            margin: 0 auto;
            height: 54px;
            padding: 0 14px 0 12px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            background: var(--navbar-bg);
            border: 1px solid var(--border);
            border-radius: 999px;
            backdrop-filter: blur(12px);
            box-shadow: var(--shadow-card);
          }
          .logo {
            display: grid;
            place-items: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--ink);
            color: var(--btn-ink);
            flex-shrink: 0;
          }
          .logo:hover {
            color: var(--btn-ink);
          }
          .mark {
            font-family: var(--font-display), sans-serif;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.04em;
          }
          .links {
            display: flex;
            gap: 4px;
            align-items: center;
          }
          .links :global(a),
          .mobile-resume {
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--text-secondary);
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            padding: 8px 12px;
            border-radius: 999px;
          }
          .links :global(a.active) {
            background: var(--accent-soft);
            color: var(--accent);
          }
          .links :global(a:hover),
          .mobile-resume:hover {
            color: var(--text-primary);
          }
          .actions {
            display: flex;
            gap: 6px;
            align-items: center;
          }
          .chip {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            border: 1px solid var(--border);
            display: grid;
            place-items: center;
            font-size: 10px;
            font-weight: 800;
            color: var(--text-secondary);
            background: var(--bg-card);
          }
          .chip:hover {
            color: var(--text-primary);
            border-color: var(--border-strong);
          }
          .theme {
            border: none;
            background: none;
            color: var(--text-muted);
            font-size: 10px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            cursor: pointer;
            padding: 6px;
          }
          .contact {
            padding: 9px 14px;
          }
          .menu {
            display: none;
            border: 1px solid var(--border-strong);
            background: var(--bg-card);
            border-radius: 999px;
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
          .mobile-resume {
            display: none;
          }
          @media (max-width: 900px) {
            .links {
              position: fixed;
              top: calc(var(--nav-height) + 8px);
              left: 16px;
              right: 16px;
              background: var(--bg-card);
              border: 1px solid var(--border);
              border-radius: var(--radius);
              flex-direction: column;
              align-items: stretch;
              padding: 12px;
              gap: 4px;
              opacity: 0;
              visibility: hidden;
              transform: translateY(-6px);
              transition: all 0.2s ease;
            }
            .links.on {
              opacity: 1;
              visibility: visible;
              transform: translateY(0);
            }
            .hide-sm {
              display: none !important;
            }
            .menu,
            .mobile-resume {
              display: inline-flex;
            }
          }
        `}</style>
      </nav>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
