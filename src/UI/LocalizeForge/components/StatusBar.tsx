import type { ProjectSummary } from "../types";

interface StatusBarProps {
  project: ProjectSummary | undefined;
  locale: string;
  stringCount: number;
  untranslatedCount: number;
  needsReviewCount: number;
}

export function StatusBar({
  project,
  locale,
  stringCount,
  untranslatedCount,
  needsReviewCount,
}: StatusBarProps) {
  return (
    <footer className="lf-statusbar">
      <span className="lf-statusbar-dot" aria-hidden />
      <span>Đã kết nối (demo)</span>
      <span aria-hidden>·</span>
      <span>{project?.name ?? "—"}</span>
      <span aria-hidden>·</span>
      <span>{locale}</span>
      <span aria-hidden>·</span>
      <span>
        strings {stringCount} · chưa dịch {untranslatedCount} · cần review{" "}
        {needsReviewCount}
      </span>
    </footer>
  );
}
