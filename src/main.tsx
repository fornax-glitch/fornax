import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes";
import { LanguageProvider } from "./i18n/LanguageContext";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </LanguageProvider>
  </React.StrictMode>
);