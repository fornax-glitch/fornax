import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { LanguageProvider } from "../i18n/LanguageContext"

import Home from "../pages/Home/Home"
import Admin from "../pages/Admin/Admin"
import Login from "../pages/Login/Login"
import NotFound from "../pages/NotFound/NotFound"

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Admin */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </Router>
    </LanguageProvider>
  )
}