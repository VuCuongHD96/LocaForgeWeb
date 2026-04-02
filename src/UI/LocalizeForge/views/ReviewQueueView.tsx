import type { SourceStringRow } from "../types";
import { statusLabel } from "../stringHelpers";

interface ReviewQueueViewProps {
  rows: SourceStringRow[];
  onApprove: (id: string, text: string) => void;
  onReject: (id: string) => void;
}

export function ReviewQueueView({
  rows,
  onApprove,
  onReject,
}: ReviewQueueViewProps) {
  const queue = rows.filter((r) => r.status === "needs_review");

  return (
    <div className="lf-page">
      <h1 className="lf-page-title">Review queue</h1>
      <p className="lf-page-desc">
        Các bản dịch chờ duyệt. Approve / reject là demo trên state cục bộ.
      </p>
      {queue.length === 0 ? (
        <div className="lf-empty">Không có mục nào cần review.</div>
      ) : (
        queue.map((r) => (
          <div key={r.id} className="review-card">
            <div className="lf-key">{r.key}</div>
            <div style={{ fontSize: 12, color: "var(--lf-text-muted)", marginBottom: 8 }}>
              {r.source}
            </div>
            <pre
              style={{
                margin: "0 0 12px",
                padding: 10,
                borderRadius: 6,
                border: "1px solid var(--lf-border)",
                background: "var(--lf-bg)",
                fontFamily: "var(--lf-mono)",
                fontSize: 12,
              }}
            >
              {r.translation || "(trống)"}
            </pre>
            <span className={`lf-status-pill ${r.status}`}>
              {statusLabel(r.status)}
            </span>
            <div className="lf-row-actions" style={{ marginTop: 12 }}>
              <button
                type="button"
                className="lf-btn lf-btn-primary"
                onClick={() => onApprove(r.id, r.translation)}
              >
                Approve
              </button>
              <button
                type="button"
                className="lf-btn lf-btn-danger"
                onClick={() => onReject(r.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
