import type { AppView } from "../types";

interface SideNavProps {
  view: AppView;
  onViewChange: (v: AppView) => void;
}

const items: { id: AppView; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard", icon: "◫" },
  { id: "projects", label: "Projects", icon: "▤" },
  { id: "workspace", label: "Workspace", icon: "≡" },
  { id: "review", label: "Review", icon: "✓" },
];

export function SideNav({ view, onViewChange }: SideNavProps) {
  return (
    <aside className="lf-sidebar" aria-label="Điều hướng chính">
      <div className="lf-nav-section">Workspace</div>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          className="lf-nav-item"
          data-active={view === it.id ? "true" : undefined}
          onClick={() => onViewChange(it.id)}
        >
          <span className="lf-nav-icon" aria-hidden>
            {it.icon}
          </span>
          {it.label}
        </button>
      ))}
      <div style={{ flex: 1, minHeight: 8 }} aria-hidden />
      <div className="lf-nav-section">More</div>
      <button type="button" className="lf-nav-item" disabled title="Sắp có">
        <span className="lf-nav-icon">📖</span>
        Glossary
      </button>
      <button type="button" className="lf-nav-item" disabled title="Sắp có">
        <span className="lf-nav-icon">⚙</span>
        Settings
      </button>
    </aside>
  );
}
