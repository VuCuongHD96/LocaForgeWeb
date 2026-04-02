# Localize Forge - Product Design Blueprint

## 1) Wireframe UI (Dark mode, VSCode-style)

### 1.1 Overall Layout

```text
+--------------------------------------------------------------------------------------------------+
| Top Bar                                                                                          |
| [Localize Forge] [Project: Hollow Knight VN v] [Search (Ctrl/Cmd+K)] [Notifications] [Profile] |
+--------------------------------------------------------------------------------------------------+
| Sidebar (IDE-like)       | Translation Workspace                                                 |
|--------------------------|-----------------------------------------------------------------------|
| - Dashboard              | Header: Project / Locale / Branch / Progress                           |
| - Projects               | [Filters: Untranslated | Translated | Needs review | Mine] [Sort v]  |
| - Workspace              |-----------------------------------------------------------------------|
| - Review Queue           | Source Strings Table                                                   |
| - Contributors           | --------------------------------------------------------------------- |
| - Glossary & TM          | Key | Source Text | Context | Current Translation | Status | Actions |
| - Settings               | --------------------------------------------------------------------- |
|                          | menu.play          "Play"         Main menu   "Choi"      reviewed  |
|                          | ui.hp_label        "HP"           HUD         "Mau"       draft     |
|                          | ...                                                                    |
|                          |                                                                       |
|                          | Inline Editor Panel (right drawer / bottom panel)                      |
|                          | Source: "Press Start"                                                   |
|                          | Context: Title screen button                                            |
|                          | Screenshot: [image]                                                     |
|                          | Candidate translations (+ votes):                                       |
|                          | 1) "Nhan Bat dau" (+12) [Approve] [Reject]                              |
|                          | 2) "Bam de choi" (+4)                                                   |
|                          | [Submit new translation] [Save draft]                                   |
|                          |                                                                       |
+--------------------------------------------------------------------------------------------------+
| Bottom Status Bar: connected | locale vi-VN | strings 1,250 | untranslated 320 | reviewed 740   |
+--------------------------------------------------------------------------------------------------+
```

### 1.2 Key Screens

1. **Dashboard**
   - Progress by language, reviewer throughput, pending review count.
   - Activity feed (who translated/reviewed what).
2. **Project Detail**
   - String list with filters and full-text search.
   - Upload source files (JSON/CSV/XML), map keys, and parse preview.
3. **Translation Workspace**
   - Inline editing in table cells.
   - Right-side context panel with screenshot + metadata.
4. **Review Queue**
   - Candidate translations ranked by votes.
   - Reviewer actions: approve/reject with optional comment.
5. **History / Version Panel**
   - Per-string timeline: created -> translated -> reviewed -> edited.

### 1.3 Interaction Notes

- **Quick search** (`Ctrl/Cmd+K`): jump to project/string/key/user.
- **Keyboard-first flow**:
  - `J/K`: next/prev string
  - `E`: edit current string
  - `Ctrl/Cmd+Enter`: submit translation
  - `R`: mark needs review
- **Color semantics**:
  - Draft: gray
  - Needs review: amber
  - Approved: green
  - Rejected: red

---

## 2) Database Structure (PostgreSQL)

### 2.1 Core Tables

```sql
-- Users and roles
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  source_language TEXT NOT NULL DEFAULT 'en',
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'translator', 'reviewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, user_id)
);

-- Localization resources and strings
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_format TEXT NOT NULL CHECK (file_format IN ('json', 'csv', 'xml')),
  source_hash TEXT,
  uploaded_by UUID REFERENCES users(id),
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE source_strings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES resources(id) ON DELETE SET NULL,
  string_key TEXT NOT NULL,
  source_text TEXT NOT NULL,
  context_description TEXT,
  screenshot_url TEXT,
  character_limit INT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, string_key)
);

-- Translations and review workflow
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_string_id UUID NOT NULL REFERENCES source_strings(id) ON DELETE CASCADE,
  locale TEXT NOT NULL, -- e.g., vi-VN
  translated_text TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'needs_review', 'approved', 'rejected')),
  submitted_by UUID NOT NULL REFERENCES users(id),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE translation_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_id UUID NOT NULL REFERENCES translations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  value SMALLINT NOT NULL CHECK (value IN (1, -1)),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(translation_id, user_id)
);

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  translation_id UUID NOT NULL REFERENCES translations(id) ON DELETE CASCADE,
  reviewer_id UUID NOT NULL REFERENCES users(id),
  decision TEXT NOT NULL CHECK (decision IN ('approved', 'rejected')),
  comment TEXT,
  reviewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Full version history per string
CREATE TABLE string_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_string_id UUID NOT NULL REFERENCES source_strings(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('created', 'updated', 'submitted', 'approved', 'rejected')),
  old_value TEXT,
  new_value TEXT,
  actor_id UUID REFERENCES users(id),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 2.2 Recommended Indexes

```sql
CREATE INDEX idx_source_strings_project ON source_strings(project_id);
CREATE INDEX idx_translations_source_locale ON translations(source_string_id, locale);
CREATE INDEX idx_translations_status ON translations(status);
CREATE INDEX idx_reviews_translation ON reviews(translation_id);
CREATE INDEX idx_string_history_string_locale ON string_history(source_string_id, locale);
```

### 2.3 Permission Model

- `admin`: manage project, members, resources, settings
- `translator`: create/edit translations, vote
- `reviewer`: all translator permissions + approve/reject

Use **row-level security** (if Supabase) based on `project_members`.

---

## 3) Main Components (React + TypeScript)

### 3.1 App Shell

- `AppLayout`
- `TopBar`
- `SideNav`
- `CommandPalette` (`Ctrl/Cmd+K`)
- `StatusBar`

### 3.2 Workspace

- `ProjectWorkspacePage`
- `WorkspaceHeader` (locale, branch, progress)
- `StringFilterBar` (status filters + search + tags)
- `StringTable`
- `StringRow`
- `InlineTranslationEditor`
- `ContextPanel` (description + screenshot)
- `CandidateList` (vote + ranking)

### 3.3 Review

- `ReviewQueuePage`
- `ReviewCard`
- `ApproveRejectActions`
- `ReviewCommentBox`

### 3.4 Project Management

- `ProjectsPage`
- `CreateProjectModal`
- `FileUploadDropzone`
- `FileMappingPreview` (JSON/CSV/XML parser result)
- `MemberRoleManager`
- `ProgressDashboard`

### 3.5 Shared/State

- `api/client.ts` (fetch wrapper)
- `store/workspaceStore.ts` (Zustand/Redux)
- `hooks/useRealtimeTranslations.ts`
- `types/domain.ts`

---

## 4) Required APIs

### 4.1 Auth & User

- `POST /auth/signup`
- `POST /auth/login`
- `GET /me`

### 4.2 Projects

- `POST /projects` - create project
- `GET /projects` - list user projects
- `GET /projects/:projectId` - project detail
- `PATCH /projects/:projectId` - update metadata
- `DELETE /projects/:projectId` - archive/delete

### 4.3 Membership & Roles

- `GET /projects/:projectId/members`
- `POST /projects/:projectId/members` - invite/add member
- `PATCH /projects/:projectId/members/:userId` - change role
- `DELETE /projects/:projectId/members/:userId`

### 4.4 Resources & Source Strings

- `POST /projects/:projectId/resources/upload` - upload JSON/CSV/XML
- `GET /projects/:projectId/resources`
- `GET /projects/:projectId/strings?status=&q=&tag=&locale=&page=`
- `GET /projects/:projectId/strings/:stringId`
- `PATCH /projects/:projectId/strings/:stringId` - update context/tag

### 4.5 Translations

- `POST /projects/:projectId/strings/:stringId/translations`
- `PATCH /projects/:projectId/translations/:translationId`
- `POST /projects/:projectId/translations/:translationId/submit`
- `GET /projects/:projectId/strings/:stringId/translations?locale=vi-VN`

### 4.6 Voting & Review

- `POST /projects/:projectId/translations/:translationId/votes` (`value: 1/-1`)
- `POST /projects/:projectId/translations/:translationId/review` (`approved/rejected`)
- `GET /projects/:projectId/review-queue?locale=vi-VN`

### 4.7 History & Dashboard

- `GET /projects/:projectId/strings/:stringId/history?locale=vi-VN`
- `GET /projects/:projectId/dashboard`
  - total strings
  - translated %
  - needs review count
  - approved count
  - top contributors

### 4.8 Realtime Channels

- `translation.updated`
- `translation.submitted`
- `translation.reviewed`
- `vote.changed`
- `string.locked` / `string.unlocked` (optional edit collision control)

---

## 5) Suggested MVP Roadmap

1. **MVP-1**: Project creation + file upload + string list + basic translation submit
2. **MVP-2**: Review queue + approve/reject + progress dashboard
3. **MVP-3**: Voting + command palette + realtime updates + full history timeline

