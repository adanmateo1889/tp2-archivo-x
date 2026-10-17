import { useEffect, useState } from 'react'

const ARTWORKS_API_URL =
  'https://api.artic.edu/api/v1/artworks/search?q=painting&limit=24&fields=id,title,artist_display,date_display,is_public_domain'

function ArtInstituteApiStatus() {
  const [requestNumber, setRequestNumber] = useState(0)
  const [requestState, setRequestState] = useState({
    status: 'loading',
    artworks: [],
    error: '',
  })

  useEffect(() => {
    const controller = new AbortController()

    async function checkApi() {
      setRequestState({ status: 'loading', artworks: [], error: '' })

      try {
        const response = await fetch(ARTWORKS_API_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`El servicio respondió con el estado HTTP ${response.status}.`)
        }

        const payload = await response.json()
        if (!Array.isArray(payload.data)) {
          throw new Error('La respuesta del museo no contiene una lista de registros.')
        }

        const artworks = payload.data
          .filter((artwork) => artwork.is_public_domain === true)
          .slice(0, 12)

        setRequestState({
          status: artworks.length > 0 ? 'success' : 'empty',
          artworks,
          error: '',
        })
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        console.error('No se pudo verificar la API del Art Institute of Chicago.', error)
        setRequestState({
          status: 'error',
          artworks: [],
          error:
            error instanceof TypeError
              ? 'No se pudo conectar con el servicio. Revisá tu conexión e intentá nuevamente.'
              : error.message || 'Ocurrió un error al consultar el servicio.',
        })
      }
    }

    checkApi()
    return () => controller.abort()
  }, [requestNumber])

  const firstArtwork = requestState.artworks[0]

  return (
    <section
      className={`documentation-api-status documentation-api-status-${requestState.status}`}
      aria-labelledby="documentation-api-title"
    >
      <div className="documentation-api-heading">
        <div>
          <p className="section-kicker">INTEGRACIÓN DE API · FUENTE EXTERNA</p>
          <h2 id="documentation-api-title">Art Institute of Chicago</h2>
        </div>
        <a href="https://api.artic.edu/docs/" target="_blank" rel="noreferrer">
          Documentación oficial <span aria-hidden="true">↗</span>
        </a>
      </div>

      {requestState.status === 'loading' && (
        <p role="status" aria-live="polite">
          Verificando conexión con la API pública…
        </p>
      )}

      {requestState.status === 'error' && (
        <div className="documentation-api-message" role="alert">
          <p>No se pudo consultar la API: {requestState.error}</p>
          <button
            type="button"
            disabled={requestState.status === 'loading'}
            onClick={() => setRequestNumber((current) => current + 1)}
          >
            Reintentar consulta
          </button>
        </div>
      )}

      {requestState.status === 'empty' && (
        <div className="documentation-api-message" role="status">
          <p>La API respondió, pero no devolvió registros de dominio público para esta búsqueda.</p>
          <button
            type="button"
            onClick={() => setRequestNumber((current) => current + 1)}
          >
            Consultar nuevamente
          </button>
        </div>
      )}

      {requestState.status === 'success' && (
        <div className="documentation-api-result" role="status" aria-live="polite">
          <p>
            Consulta exitosa: {requestState.artworks.length}{' '}
            {requestState.artworks.length === 1
              ? 'registro público'
              : 'registros públicos'}{' '}
            recibidos. Esta verificación no descarga ni muestra imágenes.
          </p>
          {firstArtwork && (
            <p className="documentation-api-sample">
              Ejemplo recibido: <strong>{firstArtwork.title || 'Obra sin título registrado'}</strong>
              {firstArtwork.artist_display ? ` · ${firstArtwork.artist_display}` : ''}
              {firstArtwork.date_display ? ` · ${firstArtwork.date_display}` : ''}
            </p>
          )}
          <button
            type="button"
            onClick={() => setRequestNumber((current) => current + 1)}
          >
            Actualizar verificación
          </button>
        </div>
      )}
    </section>
  )
}

export default ArtInstituteApiStatus
