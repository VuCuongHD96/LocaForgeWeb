import "./TopBar.css";

export interface ProjectSummary {
  id: string;
  name: string;
  slug: string;
  sourceLang: string;
  targetLang: string;
  stringCount: number;
  progressPercent: number;
}

interface TopBarProps {
  projects: ProjectSummary[];
  selectedProjectId: string;
  onProjectChange: (id: string) => void;
  onOpenPalette: () => void;
}

export function TopBar({
  projects,
  selectedProjectId,
  onProjectChange,
  onOpenPalette,
}: TopBarProps) {
  // const project = projects.find((x) => x.id === selectedProjectId) ?? projects[0];
  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPod|iPad/i.test(navigator.platform);

  return (
    <header className="lf-topbar">
      <div className="lf-brand" aria-hidden>
        <span className="lf-brand-mark" />
        <span>Localize Forge</span>
      </div>
      <select
        className="lf-project-select"
        value={selectedProjectId}
        onChange={(e) => onProjectChange(e.target.value)}
        aria-label="Chọn dự án"
      >
        {projects.map((proj) => (
          <option key={proj.id} value={proj.id}>
            {proj.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="lf-search-trigger"
        onClick={onOpenPalette}
      >
        <span>Tìm nhanh…</span>
        <kbd>{isMac ? "⌘" : "Ctrl"}+K</kbd>
      </button>
      <div className="lf-top-actions">
        <button
          type="button"
          className="lf-icon-btn"
          title="Thông báo (demo)"
          aria-label="Thông báo"
        >
          🔔
        </button>
        <span className="lf-avatar" title="Demo user">
          LF
        </span>
      </div>
    </header>
  );
}
