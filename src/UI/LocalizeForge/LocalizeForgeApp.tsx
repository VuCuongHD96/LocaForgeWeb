import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CommandPalette, type PaletteAction } from "./components/CommandPalette";
import { SideNav } from "./components/SideNav";
import { StatusBar } from "./components/StatusBar";
import { TopBar } from "./components/TopBar";
import { MOCK_PROJECTS, MOCK_STRINGS } from "./mockData";
import { matchesFilter, matchesSearch } from "./stringHelpers";
import type { AppView, SourceStringRow, StringFilter } from "./types";
import { DashboardView } from "./views/DashboardView";
import { ProjectsView } from "./views/ProjectsView";
import { ReviewQueueView } from "./views/ReviewQueueView";
import { WorkspaceView } from "./views/WorkspaceView";

const LOCALE = "vi-VN";

function nextStatusAfterEdit(
  prev: SourceStringRow,
  text: string,
): SourceStringRow["status"] {
  if (text.trim() === "") return "untranslated";
  if (prev.status === "approved" || prev.status === "needs_review")
    return prev.status;
  if (prev.status === "rejected") return "draft";
  return "draft";
}

export function LocalizeForgeApp() {
  const [view, setView] = useState<AppView>("workspace");
  const [selectedProjectId, setSelectedProjectId] = useState(
    MOCK_PROJECTS[0]?.id ?? "",
  );
  const [rows, setRows] = useState<SourceStringRow[]>(() => [...MOCK_STRINGS]);
  const [filter, setFilter] = useState<StringFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStringId, setSelectedStringId] = useState<string | null>(
    MOCK_STRINGS[0]?.id ?? null,
  );
  const [paletteOpen, setPaletteOpen] = useState(false);

  const project = useMemo(
    () => MOCK_PROJECTS.find((p) => p.id === selectedProjectId),
    [selectedProjectId],
  );

  const filteredRows = useMemo(() => {
    return rows.filter(
      (r) => matchesFilter(r, filter) && matchesSearch(r, searchQuery),
    );
  }, [rows, filter, searchQuery]);

  useEffect(() => {
    if (view !== "workspace") return;
    if (filteredRows.some((r) => r.id === selectedStringId)) return;
    setSelectedStringId(filteredRows[0]?.id ?? null);
  }, [view, filteredRows, selectedStringId]);

  const untranslatedCount = useMemo(
    () => rows.filter((r) => r.status === "untranslated").length,
    [rows],
  );
  const needsReviewCount = useMemo(
    () => rows.filter((r) => r.status === "needs_review").length,
    [rows],
  );

  const patchRow = useCallback((id: string, patch: Partial<SourceStringRow>) => {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    );
  }, []);

  const onTranslationChange = useCallback(
    (id: string, text: string) => {
      setRows((prev) =>
        prev.map((r) => {
          if (r.id !== id) return r;
          const status = nextStatusAfterEdit(r, text);
          return { ...r, translation: text, status };
        }),
      );
    },
    [],
  );

  const onSaveDraft = useCallback(
    (id: string) => {
      const row = rows.find((r) => r.id === id);
      if (!row || row.translation.trim() === "") return;
      patchRow(id, { status: "draft" });
    },
    [rows, patchRow],
  );

  const onSubmitForReview = useCallback(
    (id: string) => {
      const row = rows.find((r) => r.id === id);
      if (!row || row.translation.trim() === "") return;
      patchRow(id, { status: "needs_review" });
    },
    [rows, patchRow],
  );

  const onApproveCandidate = useCallback((id: string, text: string) => {
    patchRow(id, {
      translation: text,
      status: "approved",
    });
  }, [patchRow]);

  const onRejectString = useCallback(
    (id: string) => {
      patchRow(id, { status: "rejected" });
    },
    [patchRow],
  );

  const onVote = useCallback((stringId: string, candidateId: string) => {
    setRows((prev) =>
      prev.map((r) => {
        if (r.id !== stringId) return r;
        return {
          ...r,
          candidates: r.candidates.map((c) =>
            c.id === candidateId ? { ...c, score: c.score + 1 } : c,
          ),
        };
      }),
    );
  }, []);

  const onApproveFromReview = useCallback(
    (id: string, text: string) => {
      if (!text.trim()) return;
      patchRow(id, { status: "approved" });
    },
    [patchRow],
  );

  const paletteActions: PaletteAction[] = useMemo(
    () => [
      {
        id: "dash",
        label: "Mở Dashboard",
        hint: "Thống kê tiến độ",
        run: () => setView("dashboard"),
      },
      {
        id: "ws",
        label: "Mở Translation workspace",
        hint: "Bảng chuỗi & ngữ cảnh",
        run: () => setView("workspace"),
      },
      {
        id: "rev",
        label: "Mở Review queue",
        hint: "Duyệt bản dịch",
        run: () => setView("review"),
      },
      {
        id: "proj",
        label: "Mở Projects",
        hint: "Danh sách game",
        run: () => setView("projects"),
      },
    ],
    [],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  let main: ReactNode;
  switch (view) {
    case "dashboard":
      main = <DashboardView project={project} rows={rows} />;
      break;
    case "projects":
      main = (
        <ProjectsView
          projects={MOCK_PROJECTS}
          selectedId={selectedProjectId}
          onSelect={(id) => {
            setSelectedProjectId(id);
            setView("workspace");
          }}
        />
      );
      break;
    case "review":
      main = (
        <ReviewQueueView
          rows={rows}
          onApprove={onApproveFromReview}
          onReject={onRejectString}
        />
      );
      break;
    default:
      main = (
        <WorkspaceView
          locale={LOCALE}
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          rows={filteredRows}
          selectedId={selectedStringId}
          onSelect={setSelectedStringId}
          onTranslationChange={onTranslationChange}
          onSaveDraft={onSaveDraft}
          onSubmitForReview={onSubmitForReview}
          onApproveCandidate={onApproveCandidate}
          onReject={onRejectString}
          onVote={onVote}
        />
      );
  }

  return (
    <div className="lf-app">
      <TopBar
        projects={MOCK_PROJECTS}
        selectedProjectId={selectedProjectId}
        onProjectChange={setSelectedProjectId}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <div className="lf-main">
        <SideNav view={view} onViewChange={setView} />
        <main className="lf-content">{main}</main>
      </div>
      <StatusBar
        project={project}
        locale={LOCALE}
        stringCount={rows.length}
        untranslatedCount={untranslatedCount}
        needsReviewCount={needsReviewCount}
      />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={paletteActions}
      />
    </div>
  );
}
