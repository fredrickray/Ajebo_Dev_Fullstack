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
    { href: '/projects', label: 'Projects' },
    { href: '/experience', label: 'Experience' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <Link href="/" className="logo">
            <span className="mark mono">AD</span>
            <span>{profile.brand}</span>
          </Link>

          <div className={`links ${menuOpen ? 'on' : ''}`}>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href)) ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}
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
            <button type="button" className="theme mono" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'light' ? 'Dark' : 'Light'}
            </button>
            <button
              type="button"
              className="btn btn-secondary hide-sm"
              onClick={() => setResumeOpen(true)}
            >
              Resume
            </button>
            <Link href="/contact" className="btn btn-primary hide-sm">
              Let&apos;s talk
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
            background: var(--navbar-bg);
            backdrop-filter: blur(14px);
            border-bottom: 1px solid var(--border);
          }
          .wrap {
            max-width: var(--container-max);
            margin: 0 auto;
            padding: 0 24px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
          }
          .logo {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            font-family: var(--font-display), sans-serif;
            font-weight: 700;
            font-size: 15px;
            color: var(--text-primary);
          }
          .logo:hover {
            color: var(--text-primary);
          }
          .mark {
            font-size: 11px;
            letter-spacing: 0.06em;
            color: var(--btn-ink);
            background: var(--primary);
            padding: 6px 8px;
            border-radius: var(--radius-sm);
          }
          .links {
            display: flex;
            gap: 22px;
            align-items: center;
          }
          .links :global(a),
          .mobile-resume {
            font-size: 14px;
            font-weight: 600;
            color: var(--text-secondary);
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            padding: 0;
          }
          .links :global(a.active),
          .links :global(a:hover),
          .mobile-resume:hover {
            color: var(--primary);
          }
          .actions {
            display: flex;
            gap: 8px;
            align-items: center;
          }
          .theme {
            border: none;
            background: none;
            color: var(--text-muted);
            font-size: 11px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            cursor: pointer;
            padding: 8px;
          }
          .menu {
            display: none;
            border: 1px solid var(--border-strong);
            background: var(--bg-card);
            border-radius: var(--radius-sm);
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 700;
            cursor: pointer;
          }
          .mobile-resume {
            display: none;
          }
          @media (max-width: 920px) {
            .links {
              position: fixed;
              top: var(--nav-height);
              left: 0;
              right: 0;
              background: var(--bg-card);
              border-bottom: 1px solid var(--border);
              flex-direction: column;
              align-items: flex-start;
              padding: 20px 24px;
              gap: 16px;
              opacity: 0;
              visibility: hidden;
              transform: translateY(-8px);
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
