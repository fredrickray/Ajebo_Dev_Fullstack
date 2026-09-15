'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={visible ? 'reveal on' : 'reveal'}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
      <style jsx>{`
        .reveal {
          opacity: 0;
          transform: translateY(18px) scale(0.985);
          filter: blur(4px);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            filter 0.7s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform, filter;
        }
        .reveal.on {
          opacity: 1;
          transform: none;
          filter: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
