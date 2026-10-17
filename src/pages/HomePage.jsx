import { Link } from 'react-router-dom'
import teamMembers from '../data/teamMembers.js'

const firstSteps = [
  {
    number: '01',
    title: 'Inspeccionar la galería',
    description: 'Reconocé la escena y los espacios vacíos de los cuadros.',
    to: '/escena-del-crimen',
  },
  {
    number: '02',
    title: 'Reunir indicios',
    description: 'Consultá las evidencias y el tablero de investigación.',
    to: '/tablero-de-pistas',
  },
  {
    number: '03',
    title: 'Contrastar versiones',
    description: 'Revisá las declaraciones de quienes estaban en la galería.',
    to: '/sospechosos',
  },
]

function HomePage() {
  return (
    <div className="home-page">
      <header className="home-masthead">
        <Link className="home-agency" to="/" aria-label="ARCHIVO X, volver a portada">
          <span className="agency-seal" aria-hidden="true">X</span>
          <span>
            <strong>ARCHIVO X</strong>
            <small>AGENCIA DE INVESTIGACIONES</small>
          </span>
        </Link>
        <div className="home-case-reference">
          <span className="status-light" />
          UNIDAD 01 <span>/</span> BUENOS AIRES
        </div>
      </header>

      <section className="case-hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span /> EXPEDIENTE 001</p>
          <h1>
            El misterio de
            <br />
            <em>la Galería Código</em>
          </h1>
          <p className="hero-summary">
            Tres cuadros desaparecieron de la galería. La sala quedó a oscuras,
            las coartadas no encajan y alguien dejó algo atrás. El caso está en
            tus manos.
          </p>
          <Link className="primary-link" to="/escena-del-crimen">
            <span>ABRIR EXPEDIENTE 001</span>
            <span aria-hidden="true">→</span>
          </Link>
          <p className="hero-confidential">ACCESO AUTORIZADO · INVESTIGACIÓN EN CURSO</p>
        </div>

        <div className="evidence-board" aria-label="Composición ilustrativa de tablero de investigación">
          <div className="board-topline">
            <span>ANÁLISIS DEL CASO</span>
            <span>FIG. 001-A</span>
          </div>
          <div className="board-canvas">
            <span className="board-thread thread-one" aria-hidden="true" />
            <span className="board-thread thread-two" aria-hidden="true" />
            <span className="board-thread thread-three" aria-hidden="true" />
            <div className="polaroid polaroid-gallery">
              <div className="polaroid-image gallery-photo">
                <span className="photo-lamp" />
                <span className="photo-frame frame-a" />
                <span className="photo-frame frame-b" />
                <span className="photo-frame frame-c" />
                <span className="photo-floor" />
              </div>
              <span className="polaroid-caption">SALA PRINCIPAL · 22:14</span>
            </div>
            <div className="polaroid polaroid-clue">
              <div className="polaroid-image clue-photo">
                <span className="clue-paper" />
                <span className="clue-mark">?</span>
              </div>
              <span className="polaroid-caption">INDICIO SIN CLASIFICAR</span>
            </div>
            <div className="case-note">
              <span>NOTA DE CAMPO</span>
              <strong>3 obras<br />desaparecidas</strong>
              <small>Prioridad: alta</small>
              <span className="note-pin" />
            </div>
            <span className="board-pin pin-gallery" aria-hidden="true" />
            <span className="board-pin pin-clue" aria-hidden="true" />
            <span className="board-pin pin-note" aria-hidden="true" />
            <span className="board-coordinate">GC / 01</span>
          </div>
          <div className="board-caption">
            <span>ARCHIVO FOTOGRÁFICO</span>
            <span>ILUSTRACIÓN DEL EXPEDIENTE</span>
          </div>
        </div>
        <span className="hero-stamp" aria-hidden="true">
          CASO
          <strong>ABIERTO</strong>
        </span>
      </section>

      <section className="briefing-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">PROTOCOLO DE CAMPO</p>
            <h2>Comenzá la investigación</h2>
          </div>
          <span className="section-index">01 — 03</span>
        </div>

        <div className="first-steps">
          {firstSteps.map((step) => (
            <Link className="step-card" key={step.number} to={step.to}>
              <span className="step-number">{step.number}</span>
              <span className="step-arrow" aria-hidden="true">↗</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="team-preview">
        <div className="section-heading">
          <div>
            <p className="section-kicker">PERSONAL AUTORIZADO</p>
            <h2>Equipo investigador</h2>
          </div>
          <Link className="text-link team-all-link" to="/equipo">
            Ver equipo completo <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="investigator-strip">
          {teamMembers.map((member) => (
            <Link
              className="investigator-mini"
              key={member.id}
              to={`/equipo/${member.slug}`}
            >
              <span className="mini-portrait">
                {member.portrait ? (
                  <img src={member.portrait} alt="" />
                ) : (
                  <span aria-hidden="true">{member.id.slice(-2)}</span>
                )}
              </span>
              <span className="mini-profile">
                <strong>{member.name}</strong>
                <small>INVESTIGADOR/A</small>
              </span>
              <span className="mini-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="provisional-note">
        <span aria-hidden="true">!</span>
        <p>
          <strong>Ilustración de portada.</strong> El tablero es una composición
          gráfica creada con CSS; las evidencias del caso se consultan en sus
          fichas y en el archivo local.
        </p>
      </div>
    </div>
  )
}

export default HomePage
