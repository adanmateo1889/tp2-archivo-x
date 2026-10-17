import { Link } from 'react-router-dom'

const routeGroups = [
  {
    title: 'Investigación',
    links: [
      { to: '/escena-del-crimen', label: 'Escena del crimen', description: 'Inspeccioná los marcos y registrá sus indicios.' },
      { to: '/tablero-de-pistas', label: 'Tablero de pistas', description: 'Relacioná evidencias y desbloqueá deducciones.' },
      { to: '/sospechosos', label: 'Sospechosos', description: 'Contrastá testimonios, registros y preguntas abiertas.' },
      { to: '/resolver-caso', label: 'Resolver el caso', description: 'Presentá la acusación cuando estén completas las deducciones.' },
      { to: '/resultado', label: 'Resultado', description: 'Consultá el desenlace luego de resolver correctamente.' },
    ],
  },
  {
    title: 'Archivo',
    links: [
      { to: '/equipo', label: 'Equipo investigador', description: 'Perfiles de los cinco integrantes del grupo.' },
      { to: '/evidencias', label: 'Archivo de evidencias', description: 'Consulta local de 25 evidencias con búsqueda y filtros.' },
      { to: '/investigacion-api', label: 'Archivo externo', description: 'Referencias de obras consultadas en la API del museo.' },
    ],
  },
  {
    title: 'Proyecto',
    links: [
      { to: '/arbol-componentes', label: 'Árbol de componentes', description: 'Explorá la jerarquía actual de componentes React.' },
      { to: '/bitacora', label: 'Bitácora', description: 'Revisá el desarrollo del proyecto por etapas.' },
    ],
  },
]

function DocumentationPage() {
  return (
    <section className="placeholder-page documentation-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        MANUAL OPERATIVO · EXPEDIENTE AX-001
      </div>
      <p className="section-kicker">GUÍA DE NAVEGACIÓN Y FUNCIONAMIENTO</p>
      <h1>Documentación</h1>
      <p className="placeholder-description">
        ARCHIVO X es una aplicación React con rutas internas, un caso
        interactivo y secciones de consulta del proyecto. Usá esta guía para
        recorrer las áreas disponibles y entender cómo se conserva el avance.
      </p>

      <section className="documentation-overview" aria-label="Tecnologías y persistencia">
        <article>
          <span>INTERFAZ Y RUTAS</span>
          <h2>React · Vite · React Router</h2>
          <p>Las páginas comparten el layout y la navegación lateral.</p>
        </article>
        <article>
          <span>PROGRESO DEL CASO</span>
          <h2>Context · localStorage</h2>
          <p>Se guardan IDs de evidencias, deducciones y estado de acusación en este navegador.</p>
        </article>
        <article>
          <span>FUENTES DE DATOS</span>
          <h2>JSON local · API pública</h2>
          <p>Las evidencias ficticias se mantienen separadas de las referencias externas del museo.</p>
        </article>
      </section>

      {routeGroups.map((group) => (
        <section className="documentation-route-group" key={group.title}>
          <h2>{group.title}</h2>
          <ul>
            {group.links.map((route) => (
              <li key={route.to}>
                <Link to={route.to}>{route.label}<span aria-hidden="true"> ↗</span></Link>
                <p>{route.description}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <p className="documentation-storage-note">
        El progreso se guarda únicamente en el navegador actual. La opción
        «Reiniciar investigación» de la barra lateral elimina ese progreso tras
        una confirmación.
      </p>
    </section>
  )
}

export default DocumentationPage
