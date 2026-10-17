import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="placeholder-page not-found-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        REGISTRO NO ENCONTRADO
      </div>
      <p className="section-kicker">ERROR 404</p>
      <h1>Esta pista no existe.</h1>
      <p className="placeholder-description">
        La dirección no coincide con ninguna sección del expediente.
      </p>
      <Link className="primary-link" to="/">
        <span>Volver a la portada</span>
        <span aria-hidden="true">→</span>
      </Link>
    </section>
  )
}

export default NotFoundPage
