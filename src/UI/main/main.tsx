import "./style.css";
import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import { SideNav } from "../SideNav/SideNav";
import { TopBar } from "../Topbar/TopBar";
import { type WorkspaceViewData } from "../SideNav/WorkspaceViewData";

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("Root element #app not found");
}

const App = () => {
  const handleViewChange = (view: WorkspaceViewData) => {
    console.log("View changed to:", view);
  };

  const handleProjectChange = (projectId: string) => {
    console.log("Project changed to:", projectId);
  };

  const handleOpenPalette = () => {
    console.log("Opening command palette");
  };

  return (
    <div className="lf-app">
      <TopBar
        selectedProjectId="demo"
        onProjectChange={handleProjectChange}
        onOpenPalette={handleOpenPalette}
      />
      <div className="lf-main-content">
        <SideNav onViewChange={handleViewChange} />
        <main className="lf-content">
          <div style={{ padding: "2rem" }}>
            <h1>Welcome to Localize Forge</h1>
            <p>Select a view from the sidebar to get started.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

ReactDOM.createRoot(appRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
