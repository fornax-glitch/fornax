import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./app/routes"
import { LanguageProvider } from "./i18n/LanguageContext"
import { HelmetProvider } from "react-helmet-async"
import { AuthProvider } from "./auth/AuthProvider"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <HelmetProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </HelmetProvider>
    </LanguageProvider>
  </React.StrictMode>
)