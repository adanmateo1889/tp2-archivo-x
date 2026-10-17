import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import CrimeScenePage from './pages/CrimeScenePage.jsx'
import EvidenceArchivePage from './pages/EvidenceArchivePage.jsx'
import InvestigationBoardPage from './pages/InvestigationBoardPage.jsx'
import CaseResolutionPage from './pages/CaseResolutionPage.jsx'
import CaseResultPage from './pages/CaseResultPage.jsx'
import ComponentTreePage from './pages/ComponentTreePage.jsx'
import DevelopmentLogPage from './pages/DevelopmentLogPage.jsx'
import MemberPage from './pages/MemberPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import DocumentationPage from './pages/DocumentationPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import SuspectsPage from './pages/SuspectsPage.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="equipo" element={<TeamPage />} />
        <Route path="equipo/:slug" element={<MemberPage />} />
        <Route path="escena-del-crimen" element={<CrimeScenePage />} />
        <Route
          path="tablero-de-pistas"
          element={<InvestigationBoardPage />}
        />
        <Route
          path="sospechosos"
          element={<SuspectsPage />}
        />
        <Route
          path="resolver-caso"
          element={<CaseResolutionPage />}
        />
        <Route path="resultado" element={<CaseResultPage />} />
        <Route
          path="evidencias"
          element={<EvidenceArchivePage />}
        />
        <Route
          path="arbol-componentes"
          element={<ComponentTreePage />}
        />
        <Route path="bitacora" element={<DevelopmentLogPage />} />
        <Route path="documentacion" element={<DocumentationPage />} />
        <Route path="inicio" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
