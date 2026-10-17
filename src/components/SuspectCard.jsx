import { useId, useState } from 'react'
import evidenceRecords from '../data/evidence.json'

const evidenceById = new Map(
  evidenceRecords.map((evidence) => [evidence.id, evidence]),
)

function EvidenceReferences({ evidenceIds }) {
  return (
    <ul className="suspect-evidence-references" aria-label="Registros relacionados">
      {evidenceIds.map((evidenceId) => {
        const evidence = evidenceById.get(evidenceId)

        return (
          <li key={evidenceId}>
            <span className="suspect-evidence-id">{evidence.id}</span>
            <span>{evidence.titulo}</span>
          </li>
        )
      })}
    </ul>
  )
}

function SuspectCard({ suspect, dossier }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const generatedId = useId()
  const detailsId = `suspect-details-${generatedId}`
  const testimony = evidenceById.get(dossier.testimonyEvidenceId)

  return (
    <article className={`suspect-dossier${isExpanded ? ' suspect-dossier-expanded' : ''}`}>
      <header className="suspect-dossier-heading">
        <div>
          <span className="suspect-file-id">{suspect.id}</span>
          <h2>{suspect.nombre}</h2>
          <p>{suspect.rol}</p>
        </div>
        <span className="suspect-classification">PERSONA DE INTERÉS</span>
      </header>

      <section className="suspect-statement" aria-label={`Testimonio de ${suspect.nombre}`}>
        <span className="suspect-section-label">TESTIMONIO · {testimony.id}</span>
        <blockquote>{suspect.declaracion}</blockquote>
        <p>{suspect.coartada}</p>
      </section>

      <button
        className="suspect-expand-button"
        type="button"
        aria-expanded={isExpanded}
        aria-controls={detailsId}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {isExpanded ? 'Cerrar ficha de análisis' : 'Examinar ficha de análisis'}
        <span aria-hidden="true">{isExpanded ? '−' : '+'}</span>
      </button>

      {isExpanded && (
        <div className="suspect-dossier-details" id={detailsId}>
          <section className="suspect-analysis-section">
            <h3><span aria-hidden="true">●</span> Hechos comprobados</h3>
            {dossier.verifiedFacts.map((fact) => (
              <article className="suspect-analysis-item" key={fact.text}>
                <p>{fact.text}</p>
                <EvidenceReferences evidenceIds={fact.evidenceIds} />
              </article>
            ))}
          </section>

          <section className="suspect-analysis-section suspect-testimony-section">
            <h3><span aria-hidden="true">“</span> Testimonio</h3>
            <p>
              La declaración y la coartada son versiones atribuidas a la persona
              entrevistada; su contenido no se presenta como un hecho probado.
            </p>
            <EvidenceReferences evidenceIds={[dossier.testimonyEvidenceId]} />
          </section>

          <section className="suspect-analysis-section suspect-tension-section">
            <h3><span aria-hidden="true">!</span> Contradicciones y puntos a verificar</h3>
            {dossier.pointsToVerify.map((point) => (
              <article className="suspect-analysis-item" key={point.text}>
                <p>{point.text}</p>
                <EvidenceReferences evidenceIds={point.evidenceIds} />
              </article>
            ))}
          </section>

          <section className="suspect-analysis-section suspect-questions-section">
            <h3><span aria-hidden="true">?</span> Preguntas abiertas</h3>
            <ul className="suspect-open-questions">
              {dossier.openQuestions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </article>
  )
}

export default SuspectCard
