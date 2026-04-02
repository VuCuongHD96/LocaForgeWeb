import type { ProjectSummary } from "../types";

interface ProjectsViewProps {
  projects: ProjectSummary[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ProjectsView({
  projects,
  selectedId,
  onSelect,
}: ProjectsViewProps) {
  return (
    <div className="lf-page">
      <h1 className="lf-page-title">Projects</h1>
      <p className="lf-page-desc">
        Quản lý game / bản dịch. Upload file JSON/CSV/XML sẽ gắn với backend sau.
      </p>
      <div className="lf-project-list">
        {projects.map((p) => (
          <div key={p.id} className="lf-project-row">
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "var(--lf-text-muted)" }}>
                {p.slug} · {p.sourceLang} → {p.targetLang} · {p.stringCount}{" "}
                strings · {p.progressPercent}% (mock)
              </div>
            </div>
            <button
              type="button"
              className="lf-btn lf-btn-primary"
              onClick={() => onSelect(p.id)}
              disabled={selectedId === p.id}
            >
              {selectedId === p.id ? "Đang mở" : "Mở workspace"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
