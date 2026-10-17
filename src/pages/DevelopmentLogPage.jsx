import { useMemo, useState } from 'react'
import developmentLog, {
  developmentDecisions,
} from '../data/developmentLog.js'

const categoryLabels = ['Todas las áreas', 'Diseño', 'Implementación', 'Pruebas']
const stageLabels = [
  'Todas las etapas',
  ...developmentLog.map((entry) => entry.stage),
]

function DevelopmentLogPage() {
  const [selectedStage, setSelectedStage] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedEntryIds, setExpandedEntryIds] = useState(() => new Set())

  const filteredEntries = useMemo(
    () =>
      developmentLog.filter((entry) => {
        const matchesStage =
          selectedStage === 'all' || entry.stage === selectedStage
        const matchesCategory =
          selectedCategory === 'all' ||
          entry.areas.includes(selectedCategory)
        return matchesStage && matchesCategory
      }),
    [selectedStage, selectedCategory],
  )

  function toggleEntry(entryId) {
    setExpandedEntryIds((currentIds) => {
      const nextIds = new Set(currentIds)
      if (nextIds.has(entryId)) {
        nextIds.delete(entryId)
      } else {
        nextIds.add(entryId)
      }
      return nextIds
    })
  }

  function resetFilters() {
    setSelectedStage('all')
    setSelectedCategory('all')
  }

  const hasActiveFilters =
    selectedStage !== 'all' || selectedCategory !== 'all'

  return (
    <section className="placeholder-page development-log-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        REGISTRO DE CAMPO · DESARROLLO DEL PROYECTO
      </div>
      <p className="section-kicker">BITÁCORA ACADÉMICA · ETAPAS 1–12</p>
      <h1>Bitácora del equipo</h1>
      <p className="placeholder-description">
        Registro de la evolución de ARCHIVO X: decisiones de diseño,
        implementación y pruebas. Las entradas usan el número de etapa porque no
        hay fechas ni responsables individuales verificables en el proyecto.
      </p>

      <aside className="logbook-record-note" role="note">
        <span aria-hidden="true">i</span>
        <p>
          Esta bitácora documenta el desarrollo académico de la aplicación, no
          la cronología ficticia del robo de Galería Código. No se asignan
          responsables personales ni fechas no confirmadas.
        </p>
      </aside>

      <section className="logbook-filter-panel" aria-label="Filtros de bitácora">
        <label>
          <span>FILTRAR POR ETAPA</span>
          <select
            onChange={(event) => setSelectedStage(event.target.value)}
            value={selectedStage}
          >
            <option value="all">{stageLabels[0]}</option>
            {stageLabels.slice(1).map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>FILTRAR POR ÁREA</span>
          <select
            onChange={(event) => setSelectedCategory(event.target.value)}
            value={selectedCategory}
          >
            <option value="all">{categoryLabels[0]}</option>
            {categoryLabels.slice(1).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <p aria-live="polite" className="logbook-result-count" role="status">
          <strong>{filteredEntries.length}</strong>
          {filteredEntries.length === 1 ? 'entrada' : 'entradas'}
        </p>
        {hasActiveFilters && (
          <button
            className="logbook-reset-button"
            onClick={resetFilters}
            type="button"
          >
            Restablecer filtros
          </button>
        )}
      </section>

      {filteredEntries.length > 0 ? (
        <section aria-label="Línea de tiempo del desarrollo" className="logbook-timeline">
          {filteredEntries.map((entry, index) => {
            const isExpanded = expandedEntryIds.has(entry.id)

            return (
              <article
                className={`logbook-entry${isExpanded ? ' logbook-entry-expanded' : ''}`}
                key={entry.id}
              >
                <span aria-hidden="true" className="logbook-timeline-marker">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="logbook-entry-card">
                  <header className="logbook-entry-header">
                    <div className="logbook-entry-labels">
                      <span className="logbook-entry-stage">{entry.stage}</span>
                      <div className="logbook-entry-areas" aria-label="Áreas de trabajo">
                        {entry.areas.map((area) => (
                          <span
                            className={`logbook-category logbook-category-${area.toLowerCase()}`}
                            key={area}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="logbook-date-note">REFERENCIA POR ETAPA</span>
                  </header>
                  <div className="logbook-entry-summary">
                    <h2>{entry.title}</h2>
                    <p>{entry.summary}</p>
                  </div>
                  <div
                    className="logbook-entry-details"
                    hidden={!isExpanded}
                    id={`logbook-details-${entry.id}`}
                  >
                      <section>
                        <h3>Trabajo realizado</h3>
                        <p>{entry.work}</p>
                      </section>
                      <section>
                        <h3>Tecnologías y herramientas</h3>
                        <ul className="logbook-tag-list">
                          {entry.technologies.map((technology) => (
                            <li key={technology}>{technology}</li>
                          ))}
                        </ul>
                      </section>
                      <section>
                        <h3>Decisiones importantes</h3>
                        <ul>
                          {entry.decisions.map((decision) => (
                            <li key={decision}>{decision}</li>
                          ))}
                        </ul>
                      </section>
                      <section className="logbook-testing">
                        <h3>Validación</h3>
                        <p>{entry.testing}</p>
                      </section>
                  </div>
                  <footer className="logbook-entry-footer">
                    <button
                      aria-controls={`logbook-details-${entry.id}`}
                      aria-expanded={isExpanded}
                      onClick={() => toggleEntry(entry.id)}
                      type="button"
                    >
                      {isExpanded ? 'Contraer entrada' : 'Leer entrada completa'}
                      <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
                    </button>
                  </footer>
                </div>
              </article>
            )
          })}
        </section>
      ) : (
        <section className="logbook-empty-state" aria-live="polite">
          <span aria-hidden="true">?</span>
          <h2>No hay entradas para esos filtros</h2>
          <p>Probá con otra etapa o área, o restablecé la búsqueda.</p>
          <button className="logbook-reset-button" onClick={resetFilters} type="button">
            Restablecer filtros
          </button>
        </section>
      )}

      <section className="logbook-decisions" aria-labelledby="logbook-decisions-heading">
        <header>
          <span>CRITERIOS DEL PROYECTO</span>
          <h2 id="logbook-decisions-heading">Decisiones técnicas principales</h2>
          <p>
            Resumen de los criterios que atraviesan distintas etapas de
            desarrollo.
          </p>
        </header>
        <div className="logbook-decision-grid">
          {developmentDecisions.map((decision) => (
            <article className="logbook-decision-card" key={decision.title}>
              <span>{decision.area}</span>
              <h3>{decision.title}</h3>
              <p>{decision.description}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  )
}

export default DevelopmentLogPage
