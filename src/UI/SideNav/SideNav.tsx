import { workspaceNavItems, type WorkspaceViewData } from "./WorkspaceViewData";
import "../Dashboard/DashboardView.css";

interface SideNavProps {
  onViewChange: (view: WorkspaceViewData) => void;
}

const STATIC_NAV_ITEMS = [
  { id: 'glossary', name: 'Glossary', icon: '📖', disabled: true, title: 'Sắp có' },
  { id: 'settings', name: 'Settings', icon: '⚙', disabled: true, title: 'Sắp có' },
] as const;

export function SideNav({ onViewChange }: SideNavProps) {
  const handleNavClick = (view: WorkspaceViewData) => {
    onViewChange(view);
  };

  const renderNavItem = (item: WorkspaceViewData, disabled = false, title?: string) => (
    <button
      key={item.id}
      type="button"
      className="lf-nav-item"
      disabled={disabled}
      title={title}
      onClick={() => !disabled && handleNavClick(item)}
    >
      <span className="lf-nav-icon" aria-hidden>
        {item.icon}
      </span>
      {item.name}
    </button>
  );

  return (
    <aside className="lf-sidebar" aria-label="Điều hướng chính">
      <nav>
        <div className="lf-nav-section">Workspace</div>
        {workspaceNavItems.map((item) => renderNavItem(item))}
      </nav>

      <div style={{ flex: 1, minHeight: 8 }} aria-hidden />

      <nav>
        <div className="lf-nav-section">More</div>
        {STATIC_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="lf-nav-item"
            disabled={item.disabled}
            title={item.title}
          >
            <span className="lf-nav-icon" aria-hidden>
              {item.icon}
            </span>
            {item.name}
          </button>
        ))}
      </nav>
    </aside>
  );
}
