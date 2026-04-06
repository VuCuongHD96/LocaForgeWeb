import { v4 as uuidv4 } from "uuid";

export interface WorkspaceViewData {
  id: string;
  name: string;
  icon: string;
}

export const dashboard: WorkspaceViewData = {
  id: uuidv4(),
  name: "Dashboard",
  icon: "◫",
};

export const projects: WorkspaceViewData = {
  id: uuidv4(),
  name: "Projects",
  icon: "▤",
};

export const workspace: WorkspaceViewData = {
  id: uuidv4(),
  name: "Workspace",
  icon: "≡",
};

export const review: WorkspaceViewData = {
  id: uuidv4(),
  name: "Review",
  icon: "✓",
};

export const workspaceNavItems: WorkspaceViewData[] = [
  dashboard,
  projects,
  workspace,
  review,
];