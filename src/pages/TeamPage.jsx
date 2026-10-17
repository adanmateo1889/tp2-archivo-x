import { Link } from 'react-router-dom'
import teamMembers from '../data/teamMembers.js'

function TeamPage() {
  return (
    <section className="placeholder-page placeholder-team team-directory-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        PERSONAL AUTORIZADO · UNIDAD DE INVESTIGACIÓN
      </div>
      <p className="section-kicker">EXPEDIENTE AX-001 · EQUIPO</p>
      <h1>Equipo investigador</h1>
      <p className="placeholder-description">
        Cinco integrantes de Galería Código continúan la investigación como
        equipo. Abrí una credencial para consultar los datos personales que
        están documentados.
      </p>

      <div className="team-member-grid" aria-label="Integrantes del equipo investigador">
        {teamMembers.map((member) => (
          <Link
            className="team-member-card"
            key={member.id}
            to={`/equipo/${member.slug}`}
            aria-label={`Abrir expediente personal de ${member.name}`}
          >
            <span className="team-member-photo">
              {member.portrait ? (
                <img src={member.portrait} alt={`Retrato de ${member.name}`} />
              ) : (
                <span
                  className="team-portrait-pending"
                  role="img"
                  aria-label={`Retrato pendiente de ${member.name}`}
                >
                  <span aria-hidden="true">FOTO PENDIENTE</span>
                </span>
              )}
              <span className="team-member-photo-id">{member.id}</span>
            </span>
            <span className="team-member-card-details">
              <span>INVESTIGADOR/A · CREDENCIAL {member.id.slice(-2)}</span>
              <strong>{member.name}</strong>
              <small>ABRIR EXPEDIENTE <span aria-hidden="true">↗</span></small>
            </span>
          </Link>
        ))}
      </div>

      <aside className="team-record-note">
        <span aria-hidden="true">!</span>
        <p>
          Los retratos y datos personales proceden de Galería Código (TP1). No se
          asignan responsabilidades individuales en ARCHIVO X que no estén
          documentadas.
        </p>
      </aside>
    </section>
  )
}

export default TeamPage
