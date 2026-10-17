import { useState } from 'react'

const categoryLabels = {
  evidencias_fisicas: 'Evidencias físicas',
  registros_digitales: 'Registros digitales',
  testimonios: 'Testimonios',
  documentos: 'Documentos',
  fotografias: 'Fotografías',
}

function EvidenceCard({ evidence }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const categoryLabel =
    categoryLabels[evidence.categoria] ?? evidence.categoria.replaceAll('_', ' ')

  return (
    <article
      className={`evidence-card${isExpanded ? ' evidence-card-expanded' : ''}`}
    >
      <div className="evidence-card-header">
        <span className="evidence-code">{evidence.id}</span>
        <span className={`evidence-relevance relevance-${evidence.relevancia}`}>
          Relevancia {evidence.relevancia}
        </span>
      </div>

      <div className="evidence-card-body">
        <span className="evidence-category">{categoryLabel}</span>
        <h2>{evidence.titulo}</h2>
        <p className="evidence-description">{evidence.descripcion}</p>

        <dl className="evidence-location">
          <dt>UBICACIÓN</dt>
          <dd>{evidence.ubicacion}</dd>
        </dl>

        {isExpanded && (
          <div className="evidence-expanded-details">
            <span>NOTA COMPLEMENTARIA</span>
            <p>{evidence.descripcionAmpliada}</p>
          </div>
        )}
      </div>

      <footer className="evidence-card-footer">
        <button
          className="evidence-expand-button"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? 'Cerrar expediente' : 'Examinar expediente'}
          <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
        </button>
      </footer>
    </article>
  )
}

export default EvidenceCard
