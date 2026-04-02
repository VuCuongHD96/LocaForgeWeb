import type { ProjectSummary, SourceStringRow } from "../types";

interface DashboardViewProps {
  project: ProjectSummary | undefined;
  rows: SourceStringRow[];
}

export function DashboardView({ project, rows }: DashboardViewProps) {
  const total = rows.length;
  const untranslated = rows.filter((r) => r.status === "untranslated").length;
  const needsReview = rows.filter((r) => r.status === "needs_review").length;
  const approved = rows.filter((r) => r.status === "approved").length;
  const pct =
    total === 0 ? 0 : Math.round(((total - untranslated) / total) * 100);

  return (
    <div className="lf-page">
      <h1 className="lf-page-title">Dashboard</h1>
      <p className="lf-page-desc">
        Tiến độ dịch (demo) — dự án{" "}
        <strong style={{ color: "var(--lf-text)" }}>
          {project?.name ?? "—"}
        </strong>
      </p>
      <div className="lf-cards">
        <div className="lf-card">
          <h3>Hoàn thành ước lượng</h3>
          <div className="lf-stat">{pct}%</div>
          <div className="lf-stat-label">Dựa trên số chuỗi đã có bản dịch</div>
          <div className="lf-progress-bar">
            <div
              className="lf-progress-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
        <div className="lf-card">
          <h3>Tổng chuỗi</h3>
          <div className="lf-stat">{total}</div>
          <div className="lf-stat-label">Source strings trong workspace demo</div>
        </div>
        <div className="lf-card">
          <h3>Chưa dịch</h3>
          <div className="lf-stat">{untranslated}</div>
          <div className="lf-stat-label">Cần người dịch</div>
        </div>
        <div className="lf-card">
          <h3>Chờ duyệt</h3>
          <div className="lf-stat">{needsReview}</div>
          <div className="lf-stat-label">Reviewer có thể xử lý</div>
        </div>
        <div className="lf-card">
          <h3>Đã duyệt</h3>
          <div className="lf-stat">{approved}</div>
          <div className="lf-stat-label">Bản dịch đã chốt</div>
        </div>
      </div>
    </div>
  );
}
