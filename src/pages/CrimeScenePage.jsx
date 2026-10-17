import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArtworkDossier from '../components/ArtworkDossier.jsx'
import ArtworkFrame from '../components/ArtworkFrame.jsx'
import useInvestigation from '../context/useInvestigation.js'
import evidenceRecords from '../data/evidence.json'

const artworks = [
  {
    id: 'obra-01',
    number: '01',
    evidenceId: 'FIS-02',
    title: 'El retrato de Adán',
    location: 'Muro norte · Sala principal',
  },
  {
    id: 'obra-02',
    number: '02',
    evidenceId: 'FIS-03',
    title: 'La mirada de Raúl',
    location: 'Muro central · Sala principal',
  },
  {
    id: 'obra-03',
    number: '03',
    evidenceId: 'FIS-07',
    title: 'El retrato de Fernando',
    location: 'Muro este · Sala principal',
  },
]

function CrimeScenePage() {
  const [selectedArtworkId, setSelectedArtworkId] = useState(null)
  const {
    registeredEvidenceIds,
    registerEvidence,
  } = useInvestigation()
  const selectedArtwork = artworks.find(
    (artwork) => artwork.id === selectedArtworkId,
  )
  const selectedEvidence = evidenceRecords.find(
    (evidence) => evidence.id === selectedArtwork?.evidenceId,
  )

  return (
    <section className="placeholder-page crime-scene-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        LUGAR DE LOS HECHOS · ACCESO AUTORIZADO
      </div>
      <p className="section-kicker">EXPEDIENTE AX-001 · INSPECCIÓN INICIAL</p>
      <h1>Escena del crimen</h1>
      <p className="placeholder-description">
        Tres obras desaparecieron de la sala principal. Seleccioná un marco para
        abrir el expediente de la obra y examinar el indicio encontrado en el
        lugar.
      </p>

      <section className="crime-scene-board" aria-labelledby="gallery-heading">
        <header className="crime-board-heading">
          <div>
            <span className="crime-board-label">REGISTRO FOTOGRÁFICO · 22:14</span>
            <h2 id="gallery-heading">Galería Código · Sala principal</h2>
          </div>
          <div className="evidence-counter" aria-live="polite">
            <span className="counter-mark" aria-hidden="true">X</span>
            <span>
              <strong>
                {artworks.filter((artwork) =>
                  registeredEvidenceIds.includes(artwork.evidenceId),
                ).length} / {artworks.length}
              </strong>
              <small>EVIDENCIAS REGISTRADAS</small>
            </span>
          </div>
        </header>

        <div className="crime-gallery-wall">
          <span className="gallery-wall-light" aria-hidden="true" />
          <div className="crime-frames">
            {artworks.map((artwork) => (
              <ArtworkFrame
                artwork={artwork}
                isSelected={selectedArtworkId === artwork.id}
                isExamined={registeredEvidenceIds.includes(artwork.evidenceId)}
                key={artwork.id}
                onSelect={() => setSelectedArtworkId(artwork.id)}
              />
            ))}
          </div>
          <span className="scene-tape scene-tape-left" aria-hidden="true" />
          <span className="scene-tape scene-tape-right" aria-hidden="true" />
        </div>

        <footer className="crime-board-footer">
          <span>FIG. A · ESTADO DE LA SALA AL ARRIBO</span>
          <span>SELECCIONÁ UN MARCO PARA EXAMINARLO</span>
        </footer>
      </section>

      {selectedArtwork ? (
        <ArtworkDossier
          artwork={selectedArtwork}
          evidence={selectedEvidence}
          isExamined={registeredEvidenceIds.includes(selectedArtwork.evidenceId)}
          onRegisterEvidence={() => registerEvidence(selectedArtwork.evidenceId)}
        />
      ) : (
        <div className="scene-instruction" role="status">
          <span className="instruction-crosshair" aria-hidden="true">+</span>
          <p>
            <strong>Inspección pendiente.</strong> Elegí cualquiera de los tres
            marcos para consultar el expediente de la obra desaparecida.
          </p>
        </div>
      )}

      <div className="scene-next-step">
        <span>AVANCE DE LA INVESTIGACIÓN</span>
        <Link className="text-link" to="/tablero-de-pistas">
          Continuar al tablero de pistas <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}

export default CrimeScenePage
