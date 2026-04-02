import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import "../LocalizeForge/localize-forge.css";
import { LocalizeForgeApp } from "../LocalizeForge/LocalizeForgeApp";

const appRoot = document.querySelector<HTMLDivElement>("#app");

if (!appRoot) {
  throw new Error("Root element #app not found");
}

ReactDOM.createRoot(appRoot).render(
  <React.StrictMode>
    <LocalizeForgeApp />
  </React.StrictMode>,
);
