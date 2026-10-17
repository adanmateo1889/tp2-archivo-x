import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import useInvestigation from '../context/useInvestigation.js'
import caseData from '../data/caseData.js'
import suspects from '../data/suspects.js'

function CaseResultPage() {
  const { accusationResult, caseResolved } = useInvestigation()
  const [solution, setSolution] = useState(null)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!caseResolved) {
      return undefined
    }

    let isCurrent = true
    import('../data/caseSolution.js')
      .then(({ default: caseSolution }) => {
        if (isCurrent) {
          setSolution(caseSolution)
        }
      })
      .catch((error) => {
        console.error('No se pudo cargar el desenlace del expediente AX-001.', error)
        if (isCurrent) {
          setLoadError(true)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [caseResolved])

  if (!caseResolved) {
    if (accusationResult === 'incorrect') {
      return (
        <section className="placeholder-page case-result-page">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            ARCHIVO AX-001 · ACUSACIÓN NO CONFIRMADA
          </div>
          <p className="section-kicker">RESULTADO DE LA INVESTIGACIÓN</p>
          <h1>La hipótesis no coincide</h1>
          <p className="placeholder-description">
            La acusación presentada no coincide con todas las pruebas. El caso
            continúa abierto; revisá tus deducciones y podés volver a intentarlo.
            La solución no se revela en este resultado.
          </p>
          <div className="case-result-actions">
            <Link className="text-link" to="/tablero-de-pistas">
              Revisar el tablero <span aria-hidden="true">→</span>
            </Link>
            <Link className="text-link" to="/resolver-caso">
              Volver a presentar la acusación <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )
    }

    return <Navigate replace to="/resolver-caso" />
  }

  if (loadError) {
    return (
      <section className="placeholder-page case-result-page">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          ARCHIVO AX-001 · ERROR DE LECTURA
        </div>
        <h1>No se pudo abrir el desenlace</h1>
        <p className="placeholder-description" role="alert">
          La acusación continúa registrada. Recargá la página para volver a
          intentar cargar el expediente final.
        </p>
      </section>
    )
  }

  if (!solution) {
    return (
      <section className="placeholder-page case-result-page" aria-live="polite">
        <div className="eyebrow">
          <span className="eyebrow-line" />
          ARCHIVO AX-001 · DESCLASIFICANDO
        </div>
        <h1>Reconstruyendo el expediente…</h1>
      </section>
    )
  }

  const responsible = suspects.find(
    (suspect) => suspect.id === solution.responsibleSuspectId,
  )

  return (
    <section className="placeholder-page case-result-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        EXPEDIENTE DESCLASIFICADO · AX-001
      </div>
      <p className="section-kicker">ACUSACIÓN CONFIRMADA · CIERRE DEL CASO</p>
      <h1>La última restauración</h1>
      <p className="placeholder-description">
        Las piezas que desaparecieron durante el apagón no eran los retratos
        originales. La evidencia, puesta en orden, reconstruye una operación
        preparada con antelación.
      </p>

      <article className="case-reveal-card" aria-labelledby="case-reveal-heading">
        <div className="case-reveal-stamp">CASO RESUELTO</div>
        <div className="case-reveal-heading">
          <span>RESPONSABLE IDENTIFICADA</span>
          <h2 id="case-reveal-heading">
            {responsible?.nombre ?? 'Responsable del caso'}
          </h2>
          <p>{responsible?.rol}</p>
        </div>
        <div className="case-reveal-narrative">
          <section>
            <h3>La sustitución</h3>
            <p>{solution.method}</p>
          </section>
          <section>
            <h3>El motivo</h3>
            <p>{solution.motive}</p>
          </section>
          <section>
            <h3>El apagón</h3>
            <p>{solution.resolution}</p>
          </section>
        </div>
      </article>

      <section className="case-chronology" aria-labelledby="case-chronology-heading">
        <header>
          <span>RECONSTRUCCIÓN DE HECHOS</span>
          <h2 id="case-chronology-heading">Cronología del caso</h2>
        </header>
        <ol>
          {caseData.cronologia.map((event, index) => (
            <li key={`${event.fecha}-${event.hora}`}>
              <span className="chronology-index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <span className="chronology-time">
                  {event.fecha} · {event.hora}
                </span>
                <p>{event.evento}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Link className="text-link" to="/escena-del-crimen">
        Volver a la escena del crimen <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

export default CaseResultPage
