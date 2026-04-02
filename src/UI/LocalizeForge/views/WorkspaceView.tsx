import type { SourceStringRow, StringFilter } from "../types";
import { statusLabel } from "../stringHelpers";

interface WorkspaceViewProps {
  locale: string;
  filter: StringFilter;
  onFilterChange: (f: StringFilter) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  rows: SourceStringRow[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onTranslationChange: (id: string, text: string) => void;
  onSaveDraft: (id: string) => void;
  onSubmitForReview: (id: string) => void;
  onApproveCandidate: (id: string, text: string) => void;
  onReject: (id: string) => void;
  onVote: (stringId: string, candidateId: string) => void;
}

export function WorkspaceView({
  locale,
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  rows,
  selectedId,
  onSelect,
  onTranslationChange,
  onSaveDraft,
  onSubmitForReview,
  onApproveCandidate,
  onReject,
  onVote,
}: WorkspaceViewProps) {
  const selected = rows.find((r) => r.id === selectedId);

  const chips: { id: StringFilter; label: string }[] = [
    { id: "all", label: "Tất cả" },
    { id: "untranslated", label: "Chưa dịch" },
    { id: "translated", label: "Đã dịch" },
    { id: "needs_review", label: "Cần review" },
  ];

  return (
    <div className="lf-page" style={{ display: "flex", flexDirection: "column", paddingBottom: 8 }}>
      <h1 className="lf-page-title" style={{ marginBottom: 8 }}>
        Translation workspace
      </h1>
      <div className="lf-workspace-header">
        <span className="lf-locale-badge">{locale}</span>
        <input
          type="search"
          className="lf-inline-input"
          style={{ maxWidth: 320, minHeight: 32 }}
          placeholder="Lọc theo key, source, bản dịch…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Tìm trong bảng"
        />
        <div className="lf-chip-group" role="tablist" aria-label="Bộ lọc trạng thái">
          {chips.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              className="lf-chip"
              data-active={filter === c.id ? "true" : undefined}
              onClick={() => onFilterChange(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lf-workspace-split">
        <div className="lf-table-wrap">
          <table className="lf-table">
            <thead>
              <tr>
                <th>Key</th>
                <th>Source</th>
                <th>Bản dịch</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="lf-empty">Không có chuỗi khớp bộ lọc.</div>
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    data-selected={selectedId === row.id ? "true" : undefined}
                    onClick={() => onSelect(row.id)}
                  >
                    <td>
                      <span className="lf-key">{row.key}</span>
                    </td>
                    <td>
                      <div className="lf-source">{row.source}</div>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <textarea
                        className="lf-inline-input"
                        rows={2}
                        value={row.translation}
                        placeholder="Nhập bản dịch…"
                        onChange={(e) =>
                          onTranslationChange(row.id, e.target.value)
                        }
                        aria-label={`Dịch ${row.key}`}
                      />
                    </td>
                    <td>
                      <span
                        className={`lf-status-pill ${row.status}`}
                        title={statusLabel(row.status)}
                      >
                        {statusLabel(row.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <aside className="lf-context" aria-label="Ngữ cảnh & ứng viên">
          <div className="lf-context-header">Chi tiết chuỗi</div>
          <div className="lf-context-body">
            {!selected ? (
              <p className="lf-empty" style={{ padding: 16 }}>
                Chọn một dòng trong bảng để xem ngữ cảnh.
              </p>
            ) : (
              <>
                <div className="lf-context-block">
                  <div className="lf-context-label">Source</div>
                  <pre>{selected.source}</pre>
                </div>
                <div className="lf-context-block">
                  <div className="lf-context-label">Ngữ cảnh / màn hình</div>
                  <pre style={{ fontSize: 12 }}>{selected.context}</pre>
                </div>
                {selected.screenshotHint ? (
                  <div className="lf-context-block">
                    <div className="lf-context-label">Screenshot (placeholder)</div>
                    <pre>{selected.screenshotHint}</pre>
                  </div>
                ) : null}

                <div className="lf-row-actions">
                  <button
                    type="button"
                    className="lf-btn lf-btn-ghost"
                    onClick={() => onSaveDraft(selected.id)}
                  >
                    Lưu nháp
                  </button>
                  <button
                    type="button"
                    className="lf-btn"
                    onClick={() => onSubmitForReview(selected.id)}
                  >
                    Gửi duyệt
                  </button>
                </div>

                {selected.candidates.length > 0 ? (
                  <div className="lf-context-block" style={{ marginTop: 16 }}>
                    <div className="lf-context-label">Ứng viên & vote (demo)</div>
                    <ul className="lf-candidates">
                      {selected.candidates.map((c) => (
                        <li key={c.id} className="lf-candidate">
                          <span className="lf-candidate-score">+{c.score}</span>
                          <span className="lf-candidate-text">{c.text}</span>
                          <button
                            type="button"
                            className="lf-btn lf-btn-ghost"
                            style={{ padding: "4px 8px" }}
                            onClick={() => onVote(selected.id, c.id)}
                            title="Upvote"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            className="lf-btn lf-btn-primary"
                            style={{ padding: "4px 8px" }}
                            onClick={() => onApproveCandidate(selected.id, c.text)}
                          >
                            Duyệt
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="lf-row-actions" style={{ marginTop: 12 }}>
                  <button
                    type="button"
                    className="lf-btn lf-btn-danger"
                    onClick={() => onReject(selected.id)}
                  >
                    Từ chối bản hiện tại
                  </button>
                </div>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
