import type { ProjectSummary, SourceStringRow } from "./types";

export const MOCK_PROJECTS: ProjectSummary[] = [
  {
    id: "p1",
    name: "Hollow Knight: Silksong",
    slug: "silksong",
    sourceLang: "en",
    targetLang: "vi-VN",
    stringCount: 1240,
    progressPercent: 42,
  },
  {
    id: "p2",
    name: "Celeste: Farewell",
    slug: "celeste-farewell",
    sourceLang: "en",
    targetLang: "vi-VN",
    stringCount: 890,
    progressPercent: 78,
  },
];

export const MOCK_STRINGS: SourceStringRow[] = [
  {
    id: "s1",
    key: "menu.play",
    source: "Play",
    context: "Main menu — primary action to start a new run.",
    screenshotHint: "title_screen.png",
    translation: "Chơi",
    status: "approved",
    candidates: [
      { id: "c1", text: "Chơi", score: 24 },
      { id: "c2", text: "Bắt đầu", score: 8 },
    ],
  },
  {
    id: "s2",
    key: "ui.hp_label",
    source: "HP",
    context: "HUD health label above the mask icons.",
    translation: "Máu",
    status: "draft",
    candidates: [
      { id: "c3", text: "Máu", score: 5 },
      { id: "c4", text: "HP", score: 3 },
    ],
  },
  {
    id: "s3",
    key: "dialog.tutorial.jump",
    source: "Press {0} to jump.",
    context: "Tutorial: placeholder {0} is the bound key.",
    translation: "",
    status: "untranslated",
    candidates: [],
  },
  {
    id: "s4",
    key: "item.desc.nail",
    source: "The weapon of a forgotten kingdom.",
    context: "Inventory flavor text for the nail.",
    translation: "Vũ khí của một vương quốc đã quên.",
    status: "needs_review",
    candidates: [
      { id: "c5", text: "Vũ khí của một vương quốc đã quên.", score: 11 },
      { id: "c6", text: "Thanh kiếm của vương quốc phai mờ.", score: 7 },
    ],
  },
  {
    id: "s5",
    key: "pause.settings",
    source: "Settings",
    context: "Pause menu entry.",
    translation: "Cài đặt",
    status: "approved",
    candidates: [{ id: "c7", text: "Cài đặt", score: 18 }],
  },
  {
    id: "s6",
    key: "boss.death_quote",
    source: "You are not the first.",
    context: "Boss defeat line — ominous, short.",
    translation: "",
    status: "untranslated",
    candidates: [],
  },
];
