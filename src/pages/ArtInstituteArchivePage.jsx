import { useEffect, useState } from 'react'
import ArtworkReferenceCard from '../components/ArtworkReferenceCard.jsx'

const ARTWORKS_API_URL =
  'https://api.artic.edu/api/v1/artworks/search?q=painting&limit=24&fields=id,title,artist_display,date_display,image_id,api_link,is_public_domain'
const REQUESTED_ARTWORK_COUNT = 12

function ArtInstituteArchivePage() {
  const [requestNumber, setRequestNumber] = useState(0)
  const [requestState, setRequestState] = useState({
    status: 'loading',
    artworks: [],
    iiifUrl: null,
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function loadArtworks() {
      setRequestState({
        status: 'loading',
        artworks: [],
        iiifUrl: null,
        error: '',
      })

      try {
        const response = await fetch(ARTWORKS_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`El museo respondió con el estado HTTP ${response.status}.`)
        }

        const payload = await response.json()
        if (!Array.isArray(payload.data)) {
          throw new Error('La respuesta del museo no contiene una lista de obras.')
        }

        const artworks = payload.data
          .filter((artwork) => artwork.is_public_domain === true)
          .slice(0, REQUESTED_ARTWORK_COUNT)
        const iiifUrl =
          typeof payload.config?.iiif_url === 'string'
            ? payload.config.iiif_url
            : null

        setRequestState({
          status: artworks.length > 0 ? 'success' : 'empty',
          artworks,
          iiifUrl,
          error: '',
        })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        console.error('No se pudo consultar el archivo del Art Institute of Chicago.', error)
        setRequestState({
          status: 'error',
          artworks: [],
          iiifUrl: null,
          error:
            error instanceof TypeError
              ? 'No se pudo conectar con el servicio. Revisá tu conexión e intentá nuevamente.'
              : error.message || 'Ocurrió un error al consultar el archivo.',
        })
      }
    }

    loadArtworks()

    return () => controller.abort()
  }, [requestNumber])

  function refreshArchive() {
    setRequestNumber((currentNumber) => currentNumber + 1)
  }

  return (
    <section className="placeholder-page art-institute-archive-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        FUENTE EXTERNA · ART INSTITUTE OF CHICAGO
      </div>
      <p className="section-kicker">CONSULTA PÚBLICA · COLECCIÓN DE ARTE</p>
      <h1>Archivo externo de obras</h1>
      <p className="placeholder-description">
        Consultá registros publicados por un museo real para explorar sus obras,
        autores y fechas. Esta referencia cultural es independiente del
        expediente ficticio AX-001.
      </p>

      <aside className="external-artwork-disclaimer" role="note">
        <span aria-hidden="true">i</span>
        <p>
          <strong>Referencia externa, no evidencia del caso.</strong> Estos
          registros pertenecen a la colección del Art Institute of Chicago y no
          forman parte de las 25 evidencias locales de la investigación.
        </p>
      </aside>

      <section className="external-archive-panel" aria-label="Archivo del museo">
        <header className="external-archive-header">
          <div>
            <span>ART INSTITUTE OF CHICAGO · OPEN ACCESS API</span>
            <h2>Obras de dominio público</h2>
          </div>
          <button
            className="external-archive-refresh"
            disabled={requestState.status === 'loading'}
            onClick={refreshArchive}
            type="button"
          >
            {requestState.status === 'loading'
              ? 'CONSULTANDO…'
              : requestState.status === 'error'
                ? 'REINTENTAR CONSULTA'
                : 'ACTUALIZAR ARCHIVO'}
            <span aria-hidden="true">↻</span>
          </button>
        </header>

        {requestState.status === 'loading' && (
          <div className="external-archive-state" role="status" aria-live="polite">
            <span className="archive-loading-mark" aria-hidden="true">X</span>
            <h3>Consultando el archivo del museo…</h3>
            <p>La búsqueda está en curso. Puede tardar unos segundos.</p>
          </div>
        )}

        {requestState.status === 'error' && (
          <div className="external-archive-state external-archive-error" role="alert">
            <span className="archive-loading-mark" aria-hidden="true">!</span>
            <h3>No se pudo consultar el archivo</h3>
            <p>{requestState.error}</p>
            <button
              className="external-archive-retry"
              onClick={refreshArchive}
              type="button"
            >
              Reintentar consulta
            </button>
          </div>
        )}

        {requestState.status === 'empty' && (
          <div className="external-archive-state" role="status">
            <span className="archive-loading-mark" aria-hidden="true">?</span>
            <h3>No se encontraron obras disponibles</h3>
            <p>
              La consulta no devolvió registros marcados como dominio público.
              Actualizá el archivo para volver a intentarlo.
            </p>
            <button
              className="external-archive-retry"
              onClick={refreshArchive}
              type="button"
            >
              Actualizar archivo
            </button>
          </div>
        )}

        {requestState.status === 'success' && (
          <>
            <p className="external-archive-count" role="status" aria-live="polite">
              {requestState.artworks.length}{' '}
              {requestState.artworks.length === 1
                ? 'registro de dominio público consultado'
                : 'registros de dominio público consultados'}
            </p>
            <div className="artwork-reference-grid">
              {requestState.artworks.map((artwork) => (
                <ArtworkReferenceCard
                  artwork={artwork}
                  iiifUrl={requestState.iiifUrl}
                  key={artwork.id}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <p className="external-archive-attribution">
        Fuente: <a href="https://api.artic.edu/docs/" rel="noreferrer" target="_blank">
          documentación de la API pública del Art Institute of Chicago
        </a>
        . Imágenes servidas por el endpoint IIIF indicado por la API.
      </p>
    </section>
  )
}

export default ArtInstituteArchivePage
