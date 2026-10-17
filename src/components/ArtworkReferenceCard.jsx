import { useState } from 'react'

function ArtworkReferenceCard({ artwork, iiifUrl }) {
  const [imageUnavailable, setImageUnavailable] = useState(false)
  const imageUrl =
    artwork.image_id && iiifUrl
      ? `${iiifUrl.replace(/\/$/, '')}/${artwork.image_id}/full/843,/0/default.jpg`
      : null

  return (
    <article className="artwork-reference-card">
      <div className="artwork-reference-card-header">
        <span>REGISTRO EXTERNO · {artwork.id}</span>
        <span className="artwork-public-domain">DOMINIO PÚBLICO</span>
      </div>
      {imageUrl && !imageUnavailable ? (
        <div className="artwork-reference-image">
          <img
            alt={artwork.title ? `Obra: ${artwork.title}` : 'Obra de arte de la colección del museo'}
            loading="lazy"
            onError={() => setImageUnavailable(true)}
            src={imageUrl}
          />
        </div>
      ) : (
        <div className="artwork-reference-image artwork-reference-image-missing">
          <span aria-hidden="true">▧</span>
          <small>
            {imageUnavailable
              ? 'IMAGEN NO DISPONIBLE'
              : 'SIN IMAGEN EN EL REGISTRO'}
          </small>
        </div>
      )}
      <div className="artwork-reference-body">
        <h2>{artwork.title || 'Obra sin título registrado'}</h2>
        <p className="artwork-reference-artist">
          {artwork.artist_display || 'Autoría no informada'}
        </p>
        <dl>
          <dt>FECHA</dt>
          <dd>{artwork.date_display || 'Fecha no informada'}</dd>
        </dl>
        {artwork.api_link && (
          <a
            className="artwork-source-link"
            href={artwork.api_link}
            rel="noreferrer"
            target="_blank"
          >
            Consultar ficha del museo <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default ArtworkReferenceCard
