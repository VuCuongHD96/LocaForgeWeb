import type { SourceStringRow, StringFilter, TranslationStatus } from "./types";

export function matchesFilter(row: SourceStringRow, f: StringFilter): boolean {
  switch (f) {
    case "all":
      return true;
    case "untranslated":
      return row.status === "untranslated";
    case "translated":
      return row.status === "draft" || row.status === "approved";
    case "needs_review":
      return row.status === "needs_review";
    default:
      return true;
  }
}

export function matchesSearch(row: SourceStringRow, q: string): boolean {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return (
    row.key.toLowerCase().includes(s) ||
    row.source.toLowerCase().includes(s) ||
    row.translation.toLowerCase().includes(s) ||
    row.context.toLowerCase().includes(s)
  );
}

export function statusLabel(status: TranslationStatus): string {
  const map: Record<TranslationStatus, string> = {
    untranslated: "Chưa dịch",
    draft: "Bản nháp",
    needs_review: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
  };
  return map[status];
}
