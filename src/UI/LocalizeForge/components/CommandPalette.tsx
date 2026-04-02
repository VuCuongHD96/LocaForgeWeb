import { useEffect, useMemo, useRef, useState } from "react";

export interface PaletteAction {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  actions: PaletteAction[];
}

export function CommandPalette({ open, onClose, actions }: CommandPaletteProps) {
  const [q, setQ] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(s) ||
        (a.hint?.toLowerCase().includes(s) ?? false),
    );
  }, [actions, q]);

  useEffect(() => {
    if (!open) {
      setQ("");
      setHighlight(0);
      return;
    }
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    setHighlight(0);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlight((i) => Math.min(i + 1, Math.max(filtered.length - 1, 0)));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlight((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter" && filtered[highlight]) {
        e.preventDefault();
        filtered[highlight].run();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, highlight, onClose]);

  if (!open) return null;

  return (
    <div
      className="lf-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="lf-modal">
        <input
          ref={inputRef}
          type="search"
          placeholder="Tìm lệnh hoặc điều hướng…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
        />
        <div className="lf-modal-list" role="listbox">
          {filtered.length === 0 ? (
            <div className="lf-modal-hint">Không có kết quả.</div>
          ) : (
            filtered.map((a, i) => (
              <button
                key={a.id}
                type="button"
                className="lf-modal-item"
                data-active={i === highlight ? "true" : undefined}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => {
                  a.run();
                  onClose();
                }}
              >
                {a.label}
                {a.hint ? (
                  <span style={{ color: "var(--lf-text-faint)", marginLeft: 8 }}>
                    {a.hint}
                  </span>
                ) : null}
              </button>
            ))
          )}
        </div>
        <div className="lf-modal-hint">
          ↑↓ chọn · Enter chạy · Esc đóng
        </div>
      </div>
    </div>
  );
}
