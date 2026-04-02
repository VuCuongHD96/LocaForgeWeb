export type AppView = "dashboard" | "projects" | "workspace" | "review";

export type StringFilter = "all" | "untranslated" | "translated" | "needs_review";

export type TranslationStatus =
  | "untranslated"
  | "draft"
  | "needs_review"
  | "approved"
  | "rejected";

export interface CandidateTranslation {
  id: string;
  text: string;
  score: number;
}

export interface SourceStringRow {
  id: string;
  key: string;
  source: string;
  context: string;
  /** placeholder for screenshot in real app */
  screenshotHint?: string;
  translation: string;
  status: TranslationStatus;
  candidates: CandidateTranslation[];
}

export interface ProjectSummary {
  id: string;
  name: string;
  slug: string;
  sourceLang: string;
  targetLang: string;
  stringCount: number;
  progressPercent: number;
}
