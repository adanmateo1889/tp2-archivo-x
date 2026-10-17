import { NavLink } from 'react-router-dom'
import useInvestigation from '../../context/useInvestigation.js'

const navigationGroups = [
  {
    label: 'Investigación',
    links: [
      { to: '/escena-del-crimen', label: 'Escena del crimen', number: '01', icon: 'gallery' },
      { to: '/tablero-de-pistas', label: 'Tablero de pistas', number: '02', icon: 'board' },
      { to: '/sospechosos', label: 'Sospechosos', number: '03', icon: 'person' },
      { to: '/resolver-caso', label: 'Resolver el caso', number: '04', icon: 'search' },
      { to: '/resultado', label: 'Resultado', number: '05', icon: 'file' },
    ],
  },
  {
    label: 'Archivo',
    links: [
      { to: '/equipo', label: 'Equipo investigador', number: '06', icon: 'team' },
      { to: '/evidencias', label: 'Archivo de evidencias', number: '07', icon: 'evidence' },
      { to: '/investigacion-api', label: 'Consulta externa', number: '08', icon: 'globe' },
    ],
  },
  {
    label: 'Proyecto',
    links: [
      { to: '/arbol-componentes', label: 'Árbol de componentes', number: '09', icon: 'tree' },
      { to: '/bitacora', label: 'Bitácora', number: '10', icon: 'log' },
      { to: '/documentacion', label: 'Documentación', number: '11', icon: 'manual' },
    ],
  },
]

const iconPaths = {
  gallery: <><path d="M3 5h18v15H3z" /><path d="M6 16l4-5 3 3 2-2 3 4" /></>,
  board: <><rect x="3" y="4" width="18" height="16" rx="1" /><path d="M7 8h4M7 12h10M7 16h6" /></>,
  person: <><circle cx="12" cy="8" r="3" /><path d="M5 20c.5-4 2.8-6 7-6s6.5 2 7 6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>,
  team: <><circle cx="9" cy="8" r="2.5" /><circle cx="17" cy="9" r="2" /><path d="M3.5 19c.3-3.3 2-5 5.5-5s5.2 1.7 5.5 5M15 14c3.4-.5 5.3 1 5.5 4" /></>,
  evidence: <><path d="M5 4h14v17H5z" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
  tree: <><circle cx="12" cy="5" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 7v5M6 16v-4h12v4" /></>,
  log: <><path d="M5 4h14v17H5zM8 8h8M8 12h8M8 16h5" /></>,
  manual: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 4H20v16H7.5A3.5 3.5 0 0 0 4 21z" /><path d="M4 5v16M8 8h8M8 12h8" /></>,
}

function NavIcon({ name }) {
  return (
    <svg className="nav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  )
}

function Sidebar({ isOpen, onNavigate }) {
  const { resetInvestigation } = useInvestigation()

  function handleReset() {
    const confirmed = window.confirm(
      '¿Reiniciar la investigación? Se borrarán las evidencias y deducciones guardadas en este navegador.',
    )
    if (confirmed) {
      resetInvestigation()
      onNavigate()
    }
  }

  return (
    <aside
      className={`sidebar${isOpen ? ' sidebar-open' : ''}`}
      id="primary-navigation"
    >
      <NavLink className="brand" to="/" onClick={onNavigate} end>
        <span className="brand-mark" aria-hidden="true">
          X
        </span>
        <span className="brand-name">
          <strong>ARCHIVO X</strong>
          <small>AGENCIA DE INVESTIGACIÓN</small>
        </span>
      </NavLink>

      <div className="case-file">
        <span className="case-file-label">EXPEDIENTE ACTIVO</span>
        <strong>El misterio de la</strong>
        <strong>Galería Código</strong>
        <span className="case-file-id">N.º AX-001 · ABIERTO</span>
      </div>

      <nav aria-label="Navegación principal">
        {navigationGroups.map((group) => (
          <div className="nav-group" key={group.label}>
            <h2 className="nav-group-title">{group.label}</h2>
            {group.links.map((link) => (
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? ' nav-link-active' : ''}`
                }
                key={link.to}
                to={link.to}
                onClick={onNavigate}
              >
                <span className="nav-number">{link.number}</span>
                <NavIcon name={link.icon} />
                <span>{link.label}</span>
                <span className="nav-active-mark" aria-hidden="true">
                  ›
                </span>
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <button
        className="reset-investigation-button"
        type="button"
        onClick={handleReset}
      >
        <span aria-hidden="true">↺</span>
        Reiniciar investigación
      </button>

      <div className="sidebar-note">
        <span className="sidebar-note-mark" aria-hidden="true">
          !
        </span>
        <p>Acceso restringido al personal autorizado.</p>
      </div>
    </aside>
  )
}

export default Sidebar
