import adanPortrait from '../assets/images/adan-retrato.png'
import fernandoPortrait from '../assets/images/fernando-retrato.jpg'
import raulPortrait from '../assets/images/raul-retrato.png'

const artworkImages = {
  'obra-01': {
    src: adanPortrait,
    alt: 'Retrato artístico de Adán Mateo enmarcado como una pintura clásica.',
  },
  'obra-02': {
    src: raulPortrait,
    alt: 'Retrato impresionista de Raúl Mata con marco dorado.',
  },
  'obra-03': {
    src: fernandoPortrait,
    alt: 'Retrato artístico de Fernando Ezequiel Baca.',
  },
}

function ArtworkDossier({ artwork, evidence, isExamined, onRegisterEvidence }) {
  const portrait = artworkImages[artwork.id]

  return (
    <article className="artwork-dossier" aria-labelledby="dossier-title">
      <header className="dossier-header">
        <div>
          <p className="dossier-kicker">EXPEDIENTE DE OBRA · AX-001-{artwork.number}</p>
          <h2 id="dossier-title">{artwork.title}</h2>
        </div>
        <span className="dossier-classification">CONFIDENCIAL</span>
      </header>

      <div className="dossier-body">
        <div className="dossier-artwork">
          {portrait ? (
            <img src={portrait.src} alt={portrait.alt} />
          ) : (
            <div
              className="portrait-pending"
              role="img"
              aria-label="Retrato pendiente de recibir, integrante sin identificar"
            >
              <span className="pending-silhouette" aria-hidden="true">
                <i />
                <b />
              </span>
              <strong>RETRATO PENDIENTE</strong>
              <small>IDENTIDAD SIN CONFIRMAR</small>
            </div>
          )}
          <span className="artwork-image-caption">
            {portrait ? 'REGISTRO ORIGINAL · TP1' : 'MATERIAL NO DISPONIBLE'}
          </span>
        </div>

        <div className="dossier-details">
          <dl className="dossier-metadata">
            <div>
              <dt>IDENTIFICACIÓN</dt>
              <dd>{artwork.person}</dd>
            </div>
            <div>
              <dt>UBICACIÓN</dt>
              <dd>{artwork.location}</dd>
            </div>
            <div>
              <dt>ESTADO</dt>
              <dd>OBRA SUSTRAÍDA</dd>
            </div>
          </dl>

          <section className="evidence-report" aria-labelledby="evidence-title">
            <p className="dossier-kicker" id="evidence-title">
              EVIDENCIA JUNTO AL MARCO
            </p>
            <p>{evidence.descripcion}</p>
          </section>

          <button
            className={`register-evidence-button${isExamined ? ' evidence-registered' : ''}`}
            type="button"
            onClick={onRegisterEvidence}
            disabled={isExamined}
          >
            <span aria-hidden="true">{isExamined ? '✓' : '+'}</span>
            {isExamined ? 'EVIDENCIA REGISTRADA' : 'REGISTRAR EVIDENCIA'}
          </button>
          <p className="dossier-status" aria-live="polite">
            {isExamined
              ? 'Este indicio ya forma parte de las evidencias examinadas.'
              : 'El registro de este indicio actualizará el contador de la escena.'}
          </p>
        </div>
      </div>
    </article>
  )
}

export default ArtworkDossier
