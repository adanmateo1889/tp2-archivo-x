import suspects from '../data/suspects.js'
import suspectDossiers from '../data/suspectDossiers.js'
import SuspectCard from '../components/SuspectCard.jsx'

const dossierBySuspectId = new Map(
  suspectDossiers.map((dossier) => [dossier.suspectId, dossier]),
)

function SuspectsPage() {
  return (
    <section className="placeholder-page suspects-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        PERSONAS DE INTERÉS · ENTREVISTAS Y REGISTROS
      </div>
      <p className="section-kicker">EXPEDIENTE AX-001 · CINCO DECLARACIONES</p>
      <h1>Sospechosos</h1>
      <p className="placeholder-description">
        Consultá las declaraciones y contrastalas con registros existentes. Las
        fichas distinguen entre hechos documentados, testimonios, puntos por
        verificar y preguntas abiertas; ninguna referencia aislada determina
        una responsabilidad.
      </p>

      <aside className="suspects-reading-guide" aria-label="Criterio de lectura">
        <span aria-hidden="true">i</span>
        <p>
          <strong>Guía de lectura:</strong> un registro acredita únicamente lo
          que describe. Las declaraciones son testimonios, no hechos
          comprobados. Los puntos de tensión requieren corroboración.
        </p>
      </aside>

      <div className="suspect-dossier-list">
        {suspects.map((suspect) => (
          <SuspectCard
            dossier={dossierBySuspectId.get(suspect.id)}
            key={suspect.id}
            suspect={suspect}
          />
        ))}
      </div>

      <p className="suspects-footer-note">
        ARCHIVO DE SOSPECHOSOS · NO CONFUNDIR CON EL EQUIPO INVESTIGADOR
      </p>
    </section>
  )
}

export default SuspectsPage
