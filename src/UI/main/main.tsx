import "./style.css";
import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import { SideNav } from "../SideNav/SideNav";

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("Root element #app not found");
}

ReactDOM.createRoot(appRoot).render(
  <React.StrictMode>
    <SideNav onViewChange={() => { }} />
  </React.StrictMode>,
);
