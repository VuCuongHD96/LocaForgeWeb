import "./style.css";
import "reflect-metadata";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { SideNav } from "../SideNav/SideNav";
import { TopBar } from "../Topbar/TopBar";
import { type WorkspaceViewData, dashboard } from "../SideNav/WorkspaceViewData";
import { ProjectViewData } from '../ViewData/ProjectViewData';
import { DashboardView } from '../Dashboard/DashboardView';

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("Root element #app not found");
}

const App = () => {
  const [currentView, setCurrentView] = useState<WorkspaceViewData>(dashboard);

  const handleViewChange = (view: WorkspaceViewData) => {
    console.log("View changed to:", view);
    setCurrentView(view);
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
        projects={ProjectViewData.DefaultItems}
        selectedProjectId="demo"
        onProjectChange={handleProjectChange}
        onOpenPalette={handleOpenPalette}
      />
      <div className="lf-main-content">
        <SideNav onViewChange={handleViewChange} />
        <main className="lf-content">
          {currentView.name === "Dashboard" ? (
            <DashboardView
              project={ProjectViewData.DefaultItems[0]}
              rows={[
                // {
                //   id: '1',
                //   key: 'welcome.title',
                //   source: 'Welcome to our app',
                //   context: 'Main landing page title',
                //   translation: 'Chào mừng đến với ứng dụng của chúng tôi',
                //   status: 'approved'
                // },
                // {
                //   id: '2',
                //   key: 'button.submit',
                //   source: 'Submit',
                //   context: 'Form submit button',
                //   translation: 'Gửi',
                //   status: 'approved'
                // },
                // {
                //   id: '3',
                //   key: 'error.required',
                //   source: 'This field is required',
                //   context: 'Validation error message',
                //   translation: 'Trường này là bắt buộc',
                //   status: 'needs_review'
                // },
                // {
                //   id: '4',
                //   key: 'menu.settings',
                //   source: 'Settings',
                //   context: 'Navigation menu item',
                //   translation: '',
                //   status: 'untranslated'
                // }
              ]}
            />
          ) : (
            <div style={{ padding: "2rem" }}>
              <h1>{currentView.name}</h1>
              <p>View content for {currentView.name} will be implemented here.</p>
            </div>
          )}
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
