'use client';

import { useState } from 'react';
import type { ProjectMedia } from '@/data/projects';

export default function ProjectMediaGallery({
  title,
  media,
}: {
  title: string;
  media?: ProjectMedia;
}) {
  const [videoOk, setVideoOk] = useState(true);
  const [shotOk, setShotOk] = useState<[boolean, boolean]>([true, true]);

  if (!media) return null;

  const shots = media.screenshots.slice(0, 2);

  return (
    <div className="media">
      <div className="video-wrap">
        {media.video && videoOk ? (
          <video
            className="video"
            controls
            playsInline
            preload="metadata"
            onError={() => setVideoOk(false)}
          >
            <source src={media.video} />
          </video>
        ) : (
          <div className="ph video-ph">
            <span className="mono">DEMO VIDEO</span>
            <p>
              Add <code>demo.mp4</code> for {title}
            </p>
          </div>
        )}
      </div>

      <div className="shots">
        {[0, 1].map((i) => {
          const src = shots[i];
          const ok = shotOk[i];
          return (
            <figure key={i} className="shot">
              {src && ok ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  onError={() =>
                    setShotOk((prev) => {
                      const next: [boolean, boolean] = [...prev];
                      next[i] = false;
                      return next;
                    })
                  }
                />
              ) : (
                <div className="ph">
                  <span className="mono">SHOT {i + 1}</span>
                  <p>
                    Add <code>shot-{i + 1}.jpg</code>
                  </p>
                </div>
              )}
              <figcaption className="mono">Screenshot {String(i + 1).padStart(2, '0')}</figcaption>
            </figure>
          );
        })}
      </div>

      <style jsx>{`
        .media {
          display: grid;
          gap: 14px;
          margin-bottom: 8px;
        }
        .video-wrap {
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          background: var(--bg-card);
          box-shadow: var(--shadow-card);
        }
        .video {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #0a0a0a;
        }
        .shots {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .shot {
          margin: 0;
          border: 1px solid var(--border);
          border-radius: 14px;
          overflow: hidden;
          background: var(--bg-card);
        }
        .shot img {
          display: block;
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
        }
        .shot figcaption {
          padding: 8px 12px;
          font-size: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
        }
        .ph {
          aspect-ratio: 16 / 10;
          display: grid;
          place-content: center;
          gap: 6px;
          text-align: center;
          background: var(--bg-secondary);
          color: var(--text-muted);
          padding: 20px;
        }
        .video-ph {
          aspect-ratio: 16 / 9;
        }
        .ph .mono {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: var(--accent);
        }
        .ph p {
          font-size: 13px;
          color: var(--text-secondary);
        }
        .ph code {
          font-family: var(--font-mono), monospace;
          font-size: 12px;
          color: var(--text-primary);
        }
        @media (max-width: 700px) {
          .shots {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
