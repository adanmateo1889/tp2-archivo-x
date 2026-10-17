import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import useInvestigation from '../../context/useInvestigation.js'

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { storageMessage } = useInvestigation()

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <div className="app-shell">
      <Sidebar isOpen={isMenuOpen} onNavigate={closeMenu} />
      {isMenuOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      )}

      <div className="main-column">
        <header className="topbar">
          <button
            className="menu-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="topbar-case">
            <span className="status-light" />
            Caso 001 <span className="topbar-divider">/</span> Galería Código
          </div>
          <span className="topbar-classification">Clasificado</span>
        </header>

        <main className="page-content">
          {storageMessage && (
            <p className="storage-notice" role="status">
              {storageMessage}
            </p>
          )}
          <Outlet />
        </main>

        <footer className="site-footer">
          <span>ARCHIVO X</span>
          <span>Unidad de investigación · Galería Código</span>
        </footer>
      </div>
    </div>
  )
}

export default AppLayout
