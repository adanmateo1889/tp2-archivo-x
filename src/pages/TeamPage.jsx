import { Link } from 'react-router-dom'
import InvestigatorPortrait from '../components/InvestigatorPortrait.jsx'
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
            aria-label={`Abrir expediente personal de ${member.displayName ?? member.name}`}
          >
            <span className="team-member-photo">
              <InvestigatorPortrait
                className="team-investigator-portrait"
                member={member}
              />
              <span className="team-member-photo-id">{member.id}</span>
            </span>
            <span className="team-member-card-details">
              <span>INVESTIGADOR/A · CREDENCIAL {member.id.slice(-2)}</span>
              <strong>{member.displayName ?? member.name}</strong>
              <small>ABRIR EXPEDIENTE <span aria-hidden="true">↗</span></small>
            </span>
          </Link>
        ))}
      </div>

      <aside className="team-record-note">
        <span aria-hidden="true">!</span>
        <p>
          Las fotografías de investigadores se gestionan por separado de las
          obras robadas. Mientras no haya una foto en la ruta asignada, se
          muestra un avatar neutro. Los datos personales provienen de Galería
          Código (TP1); no se atribuyen responsabilidades no documentadas.
        </p>
      </aside>
    </section>
  )
}

export default TeamPage
