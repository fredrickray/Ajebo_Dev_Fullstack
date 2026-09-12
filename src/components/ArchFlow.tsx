'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ArchFlow as ArchFlowData, FlowNode } from '@/data/systemDesigns';

const COL_W = 208;
const ROW_H = 84;
const NODE_W = 152;
const NODE_H = 54;
const PAD_X = 28;
const PAD_Y = 34;

const KIND_LABEL: Record<FlowNode['kind'], string> = {
  client: 'CLIENT',
  edge: 'EDGE',
  service: 'SVC',
  data: 'DATA',
  queue: 'QUEUE',
  external: 'EXT',
};

type Pt = { x: number; y: number };

function center(node: FlowNode): Pt {
  return {
    x: PAD_X + node.col * COL_W + NODE_W / 2,
    y: PAD_Y + node.row * ROW_H + NODE_H / 2,
  };
}

/** Anchor the edge on the side of each box facing the other node. */
function anchors(a: FlowNode, b: FlowNode): [Pt, Pt] {
  const ca = center(a);
  const cb = center(b);
  const dx = cb.x - ca.x;
  const dy = cb.y - ca.y;

  if (Math.abs(dx) * NODE_H > Math.abs(dy) * NODE_W) {
    const dir = dx > 0 ? 1 : -1;
    return [
      { x: ca.x + (dir * NODE_W) / 2, y: ca.y },
      { x: cb.x - (dir * NODE_W) / 2, y: cb.y },
    ];
  }
  const dir = dy > 0 ? 1 : -1;
  return [
    { x: ca.x, y: ca.y + (dir * NODE_H) / 2 },
    { x: cb.x, y: cb.y - (dir * NODE_H) / 2 },
  ];
}

function edgePath(a: FlowNode, b: FlowNode): string {
  const [p1, p2] = anchors(a, b);
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  if (Math.abs(dy) < 2 || Math.abs(dx) < 2) {
    return `M${p1.x},${p1.y} L${p2.x},${p2.y}`;
  }
  // gentle S-curve for diagonal links
  const c = Math.min(Math.abs(dx) * 0.5, 64);
  if (Math.abs(dx) >= Math.abs(dy)) {
    return `M${p1.x},${p1.y} C${p1.x + Math.sign(dx) * c},${p1.y} ${p2.x - Math.sign(dx) * c},${p2.y} ${p2.x},${p2.y}`;
  }
  const cy = Math.min(Math.abs(dy) * 0.5, 56);
  return `M${p1.x},${p1.y} C${p1.x},${p1.y + Math.sign(dy) * cy} ${p2.x},${p2.y - Math.sign(dy) * cy} ${p2.x},${p2.y}`;
}

export default function ArchFlow({ flow }: { flow: ArchFlowData }) {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nodeById = useMemo(() => {
    const map = new Map<string, FlowNode>();
    flow.nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [flow]);

  const { width, height } = useMemo(() => {
    const maxCol = Math.max(...flow.nodes.map((n) => n.col));
    const maxRow = Math.max(...flow.nodes.map((n) => n.row));
    return {
      width: PAD_X * 2 + maxCol * COL_W + NODE_W,
      height: PAD_Y * 2 + maxRow * ROW_H + NODE_H,
    };
  }, [flow]);

  // Start the trace loop only when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % (flow.trace.length + 1)); // +1 = idle beat between loops
    }, 950);
    return () => clearInterval(timer);
  }, [running, flow.trace.length]);

  const hopFrom = step > 0 && step <= flow.trace.length - 1 ? flow.trace[step - 1] : null;
  const hopTo = step > 0 && step <= flow.trace.length - 1 ? flow.trace[step] : null;
  const activeNode = step < flow.trace.length ? flow.trace[step] : null;

  return (
    <div className="arch-flow" ref={containerRef}>
      <div className="flow-chrome">
        <span className="flow-badge mono">REQUEST</span>
        <span className="flow-req mono">{flow.request}</span>
        <span className="flow-live mono">
          <span className="flow-dot" />
          tracing
        </span>
      </div>

      <div className="flow-scroll">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="flow-svg"
          style={{ minWidth: Math.min(width, 860) }}
          role="img"
          aria-label={`Architecture diagram — ${flow.request}`}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0.5 L7.5,4 L0,7.5 Z" fill="var(--graph-line)" />
            </marker>
            <marker
              id="arrow-active"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0,0.5 L7.5,4 L0,7.5 Z" fill="var(--graph-node)" />
            </marker>
          </defs>

          {flow.edges.map((edge, i) => {
            const a = nodeById.get(edge.from);
            const b = nodeById.get(edge.to);
            if (!a || !b) return null;
            const d = edgePath(a, b);
            const isHop =
              (hopFrom === edge.from && hopTo === edge.to) ||
              (hopFrom === edge.to && hopTo === edge.from);
            const [p1, p2] = anchors(a, b);
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            return (
              <g key={`${edge.from}-${edge.to}-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={isHop ? 'var(--graph-node)' : 'var(--graph-line)'}
                  strokeWidth={isHop ? 2 : 1.3}
                  strokeDasharray={edge.dashed ? '5 5' : undefined}
                  markerEnd={isHop ? 'url(#arrow-active)' : 'url(#arrow)'}
                  style={{ opacity: isHop ? 1 : 0.5, transition: 'opacity 0.3s ease, stroke 0.3s ease' }}
                />
                {isHop && (
                  <circle r="4" fill="var(--graph-node)">
                    <animateMotion dur="0.9s" repeatCount="1" path={d} />
                  </circle>
                )}
                {edge.label && (
                  <g>
                    <rect
                      x={midX - edge.label.length * 3.1 - 5}
                      y={midY - 8}
                      width={edge.label.length * 6.2 + 10}
                      height={15}
                      rx="3"
                      fill="var(--bg-card)"
                      stroke={isHop ? 'var(--graph-node)' : 'var(--graph-chrome-border)'}
                      strokeWidth="0.75"
                      style={{ transition: 'stroke 0.3s ease' }}
                    />
                    <text
                      x={midX}
                      y={midY + 3}
                      textAnchor="middle"
                      className="edge-label"
                      fill={isHop ? 'var(--graph-node)' : 'var(--graph-muted)'}
                    >
                      {edge.label}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {flow.nodes.map((node) => {
            const x = PAD_X + node.col * COL_W;
            const y = PAD_Y + node.row * ROW_H;
            const lit = activeNode === node.id;
            const onPath = flow.trace.includes(node.id);
            return (
              <g key={node.id} transform={`translate(${x}, ${y})`}>
                {lit && (
                  <rect
                    x="-4"
                    y="-4"
                    width={NODE_W + 8}
                    height={NODE_H + 8}
                    rx="6"
                    fill="none"
                    stroke="var(--graph-node)"
                    strokeWidth="1"
                    opacity="0.45"
                  />
                )}
                <rect
                  width={NODE_W}
                  height={NODE_H}
                  rx="4"
                  fill={lit ? 'var(--graph-node-lit-fill)' : 'var(--graph-node-idle-fill)'}
                  stroke={lit ? 'var(--graph-node)' : onPath ? 'var(--graph-border)' : 'var(--graph-node-idle-stroke)'}
                  strokeWidth={lit ? 1.5 : 1}
                  style={{ transition: 'fill 0.3s ease, stroke 0.3s ease' }}
                />
                <text
                  x="12"
                  y="23"
                  className="node-label"
                  fill={lit ? 'var(--graph-node)' : 'var(--text-primary)'}
                  style={{ transition: 'fill 0.3s ease' }}
                >
                  {node.label}
                </text>
                {node.sub && (
                  <text x="12" y="40" className="node-sub" fill="var(--graph-muted)">
                    {node.sub}
                  </text>
                )}
                <text
                  x={NODE_W - 10}
                  y="16"
                  textAnchor="end"
                  className="node-kind"
                  fill={lit ? 'var(--graph-node)' : 'var(--graph-muted)'}
                >
                  {KIND_LABEL[node.kind]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <style jsx>{`
        .arch-flow {
          border: 1px solid var(--graph-border);
          border-radius: var(--radius);
          background: var(--graph-surface);
          overflow: hidden;
        }

        .flow-chrome {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 10px 16px;
          border-bottom: 1px solid var(--graph-chrome-border);
          font-size: 11px;
        }

        .flow-badge {
          color: var(--graph-node);
          letter-spacing: 1.5px;
          font-weight: 600;
        }

        .flow-req {
          color: var(--text-secondary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .flow-live {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--graph-muted);
          flex-shrink: 0;
        }

        .flow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--graph-node);
          animation: pulse 1.6s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .flow-scroll {
          overflow-x: auto;
          padding: 8px;
        }

        .flow-svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .flow-svg :global(.node-label) {
          font-family: var(--font-mono), monospace;
          font-size: 12.5px;
          font-weight: 600;
        }

        .flow-svg :global(.node-sub) {
          font-family: var(--font-mono), monospace;
          font-size: 9.5px;
        }

        .flow-svg :global(.node-kind) {
          font-family: var(--font-mono), monospace;
          font-size: 8px;
          letter-spacing: 0.8px;
          opacity: 0.75;
        }

        .flow-svg :global(.edge-label) {
          font-family: var(--font-mono), monospace;
          font-size: 9px;
        }
      `}</style>
    </div>
  );
}
