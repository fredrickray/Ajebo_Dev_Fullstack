'use client';

import { useEffect, useRef, useState } from 'react';

const INTERACTIVE =
  'a, button, [role="button"], input, textarea, select, label, summary, .btn, [data-cursor]';

export default function CanvasPointer() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const dotRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const hoverRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.body.classList.add('has-custom-cursor');

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const next = !!el?.closest(INTERACTIVE);
      hoverRef.current = next;
      setHovering(next);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);

    const tick = () => {
      const ease = hoverRef.current ? 0.28 : 0.18;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (badgeRef.current) {
        badgeRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mouseenter', onEnter);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`canvas-pointer ${visible ? 'on' : ''} ${hovering ? 'hover' : ''} ${pressing ? 'press' : ''}`}
      aria-hidden="true"
    >
      <div ref={dotRef} className="dot" />
      <div ref={badgeRef} className="badge mono">
        <span className="label">{hovering ? 'open' : 'you'}</span>
      </div>

      <style jsx global>{`
        @media (pointer: fine) {
          body.has-custom-cursor,
          body.has-custom-cursor * {
            cursor: none !important;
          }
        }
      `}</style>

      <style jsx>{`
        .canvas-pointer {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .canvas-pointer.on {
          opacity: 1;
        }
        .dot,
        .badge {
          position: fixed;
          top: 0;
          left: 0;
          will-change: transform;
          pointer-events: none;
        }
        .dot {
          width: 10px;
          height: 10px;
          margin: -5px 0 0 -5px;
          border-radius: 50%;
          background: var(--ink);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.4);
          transition: width 0.2s ease, height 0.2s ease, margin 0.2s ease,
            background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .badge {
          margin: 14px 0 0 10px;
          padding: 6px 10px 6px 8px;
          border-radius: 6px;
          background: var(--ink);
          color: var(--btn-ink);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          box-shadow: 0 8px 20px rgba(17, 17, 17, 0.18);
          transform-origin: top left;
          transition: background 0.2s ease, color 0.2s ease, scale 0.15s ease;
        }
        .badge::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 10px;
          width: 10px;
          height: 10px;
          background: var(--ink);
          transform: rotate(45deg);
          border-radius: 2px;
          transition: background 0.2s ease;
        }
        .label {
          position: relative;
          z-index: 1;
        }
        .hover .dot {
          width: 32px;
          height: 32px;
          margin: -16px 0 0 -16px;
          background: transparent;
          border: 1.5px solid var(--ink);
          box-shadow: none;
        }
        .hover .badge {
          background: var(--ink);
          color: var(--btn-ink);
        }
        .hover .badge::before {
          background: var(--ink);
        }
        .press .badge {
          scale: 0.94;
        }
      `}</style>
    </div>
  );
}
