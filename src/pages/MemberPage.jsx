import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InvestigatorPortrait from '../components/InvestigatorPortrait.jsx'
import teamMembers from '../data/teamMembers.js'
import NotFoundPage from './NotFoundPage.jsx'

function MemberPage() {
  const { slug = '' } = useParams()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const memberIndex = teamMembers.findIndex((person) => person.slug === slug)

  if (memberIndex === -1) {
    return <NotFoundPage />
  }

  const member = teamMembers[memberIndex]
  const previousMember =
    teamMembers[(memberIndex - 1 + teamMembers.length) % teamMembers.length]
  const nextMember = teamMembers[(memberIndex + 1) % teamMembers.length]
  const memberName = member.displayName ?? member.name
  const detailsId = `member-details-${member.id.toLowerCase()}`

  return (
    <section className="placeholder-page placeholder-member member-profile-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        PERSONAL AUTORIZADO · PERFIL INDIVIDUAL
      </div>
      <p className="section-kicker">EXPEDIENTE DE PERSONAL · {member.id}</p>
      <h1>{memberName}</h1>

      <nav className="member-profile-navigation" aria-label="Navegación entre integrantes">
        <Link to={`/equipo/${previousMember.slug}`} aria-label={`Perfil anterior: ${previousMember.displayName ?? previousMember.name}`}>
          <span aria-hidden="true">←</span>
          <span><small>ANTERIOR</small>{previousMember.displayName ?? previousMember.name}</span>
        </Link>
        <Link to="/equipo">Volver al equipo</Link>
        <Link to={`/equipo/${nextMember.slug}`} aria-label={`Perfil siguiente: ${nextMember.displayName ?? nextMember.name}`}>
          <span><small>SIGUIENTE</small>{nextMember.displayName ?? nextMember.name}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <article className="member-profile-card">
        <div className="member-profile-photo">
          <InvestigatorPortrait
            className="member-investigator-portrait"
            member={member}
          />
          <span className="member-profile-photo-id">{member.id} · ARCHIVO X</span>
        </div>
        <div className="member-profile-summary">
          <p className="section-kicker">FICHA DE IDENTIFICACIÓN</p>
          <h2>{memberName}</h2>
          <p className="member-profile-role">INVESTIGADOR/A · GALERÍA CÓDIGO</p>
          <p className="member-profile-presentation">
            {member.presentation ??
              'Presentación personal no disponible en la fuente consultada.'}
          </p>
          <button
            className="member-details-toggle"
            type="button"
            aria-expanded={isDetailsOpen}
            aria-controls={detailsId}
            onClick={() => setIsDetailsOpen((open) => !open)}
          >
            {isDetailsOpen ? 'Cerrar ficha ampliada' : 'Consultar ficha ampliada'}
            <span aria-hidden="true">{isDetailsOpen ? '−' : '+'}</span>
          </button>
        </div>
      </article>

      {isDetailsOpen && (
        <section className="member-details-panel" id={detailsId} aria-label={`Ficha ampliada de ${memberName}`}>
          <div className="member-details-section">
            <p className="section-kicker">HABILIDADES E INTERESES</p>
            {member.skillsAndInterests ? (
              <ul>
                {member.skillsAndInterests.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p>Este dato no está documentado en la fuente consultada.</p>
            )}
          </div>
          <div className="member-details-section">
            <p className="section-kicker">PERFIL DOCUMENTADO</p>
            <a href={member.github} target="_blank" rel="noreferrer">
              GitHub · {member.github.split('/').at(-1)}
              <span aria-hidden="true"> ↗</span>
            </a>
          </div>
          <div className="member-details-section">
            <p className="section-kicker">PARTICIPACIÓN EN ARCHIVO X</p>
            <p>
              {member.participation ??
                'No hay responsabilidades individuales del proyecto documentadas.'}
            </p>
          </div>
        </section>
      )}
    </section>
  )
}

export default MemberPage
