'use client';

export default function ResumeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Resume">
      <button type="button" className="backdrop" aria-label="Close" onClick={onClose} />
      <div className="panel">
        <div className="head">
          <div>
            <p className="mono kicker">Resume</p>
            <h2>Fredrick Anyanwu</h2>
          </div>
          <div className="actions">
            <a
              href="/resume.pdf"
              download="Fredrick_Anyanwu_Resume_FullStack.pdf"
              className="btn btn-primary"
            >
              Download
            </a>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
        <iframe title="Resume PDF" src="/resume.pdf" className="frame" />
      </div>

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: grid;
          place-items: center;
          padding: 24px;
        }
        .backdrop {
          position: absolute;
          inset: 0;
          background: rgba(6, 11, 20, 0.65);
          border: none;
          cursor: pointer;
        }
        .panel {
          position: relative;
          width: min(920px, 100%);
          height: min(88vh, 900px);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-card);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .head {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border);
        }
        .kicker {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 4px;
        }
        h2 {
          font-size: 22px;
        }
        .actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        .frame {
          flex: 1;
          width: 100%;
          border: none;
          background: var(--bg-secondary);
        }
      `}</style>
    </div>
  );
}
