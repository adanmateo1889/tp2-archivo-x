import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useInvestigation from '../context/useInvestigation.js'
import accusationOptions from '../data/accusationOptions.js'
import suspects from '../data/suspects.js'
import deductions from '../data/deductions.js'

function AnswerGroup({ name, legend, options, value, onChange }) {
  return (
    <fieldset className="accusation-answer-group">
      <legend>
        <span>{legend.number}</span>
        {legend.label}
      </legend>
      <div className="accusation-options">
        {options.map((option) => {
          const inputId = `${name}-${option.id}`

          return (
            <label
              className={`accusation-option${value === option.id ? ' accusation-option-selected' : ''}`}
              htmlFor={inputId}
              key={option.id}
            >
              <input
                checked={value === option.id}
                id={inputId}
                name={name}
                onChange={() => onChange(option.id)}
                required
                type="radio"
                value={option.id}
              />
              <span className="accusation-option-indicator" aria-hidden="true" />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

function CaseResolutionPage() {
  const navigate = useNavigate()
  const { unlockedDeductionIds, submitAccusation, caseResolved } =
    useInvestigation()
  const [answers, setAnswers] = useState({
    suspectId: '',
    methodId: '',
    motiveId: '',
  })
  const [feedback, setFeedback] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasAllDeductions = unlockedDeductionIds.length === deductions.length
  const hasCompleteAnswers = Object.values(answers).every(Boolean)

  if (caseResolved) {
    return <Navigate replace to="/resultado" />
  }

  function updateAnswer(field, value) {
    setAnswers((currentAnswers) => ({ ...currentAnswers, [field]: value }))
    setFeedback(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!hasAllDeductions || !hasCompleteAnswers || isSubmitting) {
      return
    }

    if (caseResolved) {
      navigate('/resultado', { replace: true })
      return
    }

    setIsSubmitting(true)
    setFeedback(null)
    try {
      const result = await submitAccusation(answers)
      if (result === 'correct' || result === 'already-resolved') {
        navigate('/resultado', { replace: true })
        return
      }

      if (result === 'locked') {
        setFeedback({
          type: 'error',
          text: 'La acusación todavía no está habilitada. Completá las siete deducciones del tablero.',
        })
      } else if (result === 'incorrect') {
        setFeedback({
          type: 'incorrect',
          text: 'La acusación no coincide con todas las pruebas. Revisá las evidencias y las deducciones antes de intentarlo de nuevo.',
        })
      } else {
        setFeedback({
          type: 'error',
          text: 'No se pudo evaluar la acusación. Revisá las tres respuestas e intentá nuevamente.',
        })
      }
    } catch (error) {
      console.error('No se pudo evaluar la acusación del expediente AX-001.', error)
      setFeedback({
        type: 'error',
        text: 'Ocurrió un error al evaluar la acusación. Tu investigación sigue guardada; volvé a intentarlo.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="placeholder-page case-resolution-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        CONCLUSIÓN DE LA INVESTIGACIÓN · AX-001
      </div>
      <p className="section-kicker">ACUSACIÓN FORMAL · EXPEDIENTE CLASIFICADO</p>
      <h1>Resolver el caso</h1>
      <p className="placeholder-description">
        Contrastá las deducciones y presentá una hipótesis completa: responsable,
        método y motivo. La acusación se evalúa en conjunto.
      </p>

      <section className="accusation-progress" aria-label="Progreso requerido">
        <div className="accusation-progress-mark" aria-hidden="true">X</div>
        <div className="accusation-progress-copy">
          <span>REQUISITO PARA PRESENTAR LA ACUSACIÓN</span>
          <strong>
            {unlockedDeductionIds.length} / {deductions.length} deducciones
            descubiertas
          </strong>
          <p>
            {hasAllDeductions
              ? 'El tablero está completo. Ya podés someter tu conclusión a evaluación.'
              : 'Completá las siete deducciones en el tablero de pistas para habilitar la acusación.'}
          </p>
        </div>
        {!hasAllDeductions && (
          <Link className="text-link" to="/tablero-de-pistas">
            Volver al tablero <span aria-hidden="true">→</span>
          </Link>
        )}
      </section>

      <form className="accusation-form" onSubmit={handleSubmit}>
        <AnswerGroup
          legend={{ number: '01', label: '¿Quién fue responsable?' }}
          name="suspect"
          onChange={(value) => updateAnswer('suspectId', value)}
          options={suspects.map((suspect) => ({
            id: suspect.id,
            label: `${suspect.nombre} — ${suspect.rol}`,
          }))}
          value={answers.suspectId}
        />
        <AnswerGroup
          legend={{ number: '02', label: '¿Cómo desaparecieron las obras?' }}
          name="method"
          onChange={(value) => updateAnswer('methodId', value)}
          options={accusationOptions.methods}
          value={answers.methodId}
        />
        <AnswerGroup
          legend={{ number: '03', label: '¿Cuál fue el motivo?' }}
          name="motive"
          onChange={(value) => updateAnswer('motiveId', value)}
          options={accusationOptions.motives}
          value={answers.motiveId}
        />

        {feedback && (
          <p
            className={`accusation-feedback accusation-feedback-${feedback.type}`}
            role="status"
          >
            <span aria-hidden="true">
              {feedback.type === 'incorrect' ? '!' : '·'}
            </span>
            {feedback.text}
          </p>
        )}

        <div className="accusation-submit-row">
          <p>
            Tus respuestas se evaluarán como una sola acusación. Un intento
            incorrecto no revelará las respuestas correctas.
          </p>
          <button
            className="accusation-submit-button"
            disabled={!hasAllDeductions || !hasCompleteAnswers || isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'EVALUANDO…' : 'PRESENTAR ACUSACIÓN'}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default CaseResolutionPage
