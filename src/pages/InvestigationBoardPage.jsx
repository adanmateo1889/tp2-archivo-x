import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ClueCard from '../components/ClueCard.jsx'
import DeductionCard from '../components/DeductionCard.jsx'
import useInvestigation from '../context/useInvestigation.js'
import deductions from '../data/deductions.js'
import evidenceRecords from '../data/evidence.json'

const evidenceById = Object.fromEntries(
  evidenceRecords.map((evidence) => [evidence.id, evidence]),
)

function getCombinationKey(evidenceIds) {
  return [...evidenceIds].sort().join('|')
}

function InvestigationBoardPage() {
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState([])
  const [feedback, setFeedback] = useState({
    type: 'instruction',
    text: 'Seleccioná dos evidencias para buscar una relación entre ellas.',
  })
  const {
    unlockedDeductionIds,
    unlockDeduction,
  } = useInvestigation()

  const selectedEvidence = useMemo(
    () =>
      selectedEvidenceIds.map((evidenceId) => evidenceById[evidenceId]),
    [selectedEvidenceIds],
  )

  const unlockedDeductions = deductions
    .filter((deduction) => unlockedDeductionIds.includes(deduction.id))
    .sort((first, second) => first.stage - second.stage)

  const stages = [...new Set(deductions.map((deduction) => deduction.stage))].sort()
  const currentStage =
    stages.find((stage) =>
      deductions.some(
        (deduction) =>
          deduction.stage === stage &&
          !unlockedDeductionIds.includes(deduction.id),
      ),
    ) ?? stages.at(-1)
  const currentStageLabel = deductions.find(
    (deduction) => deduction.stage === currentStage,
  ).stageLabel

  function toggleEvidence(evidenceId) {
    if (selectedEvidenceIds.includes(evidenceId)) {
      setSelectedEvidenceIds((currentIds) =>
        currentIds.filter((currentId) => currentId !== evidenceId),
      )
      setFeedback({
        type: 'instruction',
        text: 'Evidencia quitada de la selección.',
      })
      return
    }

    if (selectedEvidenceIds.length >= 2) {
      setFeedback({
        type: 'limit',
        text: 'Ya hay dos evidencias seleccionadas. Quitá una antes de elegir otra.',
      })
      return
    }

    setSelectedEvidenceIds((currentIds) => [...currentIds, evidenceId])
    setFeedback({
      type: 'instruction',
      text: selectedEvidenceIds.length === 1
        ? 'Dos evidencias seleccionadas. Ahora podés relacionarlas.'
        : 'Seleccioná una segunda evidencia para establecer una relación.',
    })
  }

  function relateEvidence() {
    if (selectedEvidenceIds.length !== 2) {
      setFeedback({
        type: 'instruction',
        text: 'Seleccioná exactamente dos evidencias antes de relacionarlas.',
      })
      return
    }

    const selectedKey = getCombinationKey(selectedEvidenceIds)
    const deduction = deductions.find(
      (candidate) => getCombinationKey(candidate.evidenceIds) === selectedKey,
    )

    if (!deduction) {
      setFeedback({
        type: 'inconclusive',
        text: 'Esta relación no es concluyente. Revisá los indicios y probá con otra combinación.',
      })
      return
    }

    const unlockResult = unlockDeduction(deduction.id)
    if (unlockResult === 'locked') {
      setFeedback({
        type: 'inconclusive',
        text: 'Esta relación puede ser útil más adelante. Primero completá las deducciones de la etapa actual.',
      })
      return
    }

    if (unlockResult === 'already-unlocked') {
      setFeedback({
        type: 'already-discovered',
        text: `Esta relación ya fue descubierta: «${deduction.title}».`,
      })
      return
    }

    if (unlockResult !== 'unlocked') {
      setFeedback({
        type: 'inconclusive',
        text: 'No se pudo registrar esta deducción. Volvé a intentarlo.',
      })
      return
    }

    setFeedback({
      type: 'discovered',
      text: `Nueva deducción registrada: «${deduction.title}».`,
    })
  }

  return (
    <section className="placeholder-page investigation-board-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        ANÁLISIS DE INDICIOS · MESA DE INVESTIGACIÓN
      </div>
      <p className="section-kicker">EXPEDIENTE AX-001 · TABLERO DE TRABAJO</p>
      <h1>Tablero de pistas</h1>
      <p className="placeholder-description">
        Elegí dos evidencias del archivo y contrastá sus datos. Algunas
        combinaciones permiten avanzar; otras todavía no ofrecen una
        explicación suficiente.
      </p>

      <section className="investigation-workbench" aria-label="Mesa de investigación">
        <header className="workbench-header">
          <div className="workbench-heading">
            <span className="workbench-seal" aria-hidden="true">X</span>
            <span>
              <small>ARCHIVO X · AX-001</small>
              <strong>Mesa de análisis</strong>
            </span>
          </div>
          <div className="deduction-counter" aria-live="polite">
            <strong>{unlockedDeductions.length} / {deductions.length}</strong>
            <span>DEDUCCIONES</span>
          </div>
        </header>

        <div className="investigation-stage">
          <span>ETAPA {currentStage}</span>
          <strong>{currentStageLabel}</strong>
        </div>

        <div className="selected-evidence-panel" aria-live="polite">
          <div>
            <span className="workbench-label">EVIDENCIAS SELECCIONADAS</span>
            <p>
              {selectedEvidence.length === 0
                ? 'Elegí dos tarjetas del archivo.'
                : selectedEvidence.map((evidence) => evidence.id).join(' + ')}
            </p>
          </div>
          <button
            className="relate-evidence-button"
            type="button"
            disabled={selectedEvidenceIds.length !== 2}
            onClick={relateEvidence}
          >
            RELACIONAR PISTAS <span aria-hidden="true">→</span>
          </button>
        </div>

        <p
          className={`deduction-feedback feedback-${feedback.type}`}
          role="status"
          aria-live="polite"
        >
          <span aria-hidden="true">
            {feedback.type === 'discovered' ? '✓' : feedback.type === 'inconclusive' ? '!' : '·'}
          </span>
          {feedback.text}
        </p>

        <div className="clue-card-grid" aria-label="Evidencias disponibles">
          {evidenceRecords.map((evidence) => (
            <ClueCard
              evidence={evidence}
              isSelected={selectedEvidenceIds.includes(evidence.id)}
              key={evidence.id}
              onToggle={() => toggleEvidence(evidence.id)}
            />
          ))}
        </div>
      </section>

      <section className="deductions-section" aria-labelledby="deductions-heading">
        <header className="deductions-section-heading">
          <div>
            <p className="section-kicker">HALLAZGOS CONFIRMADOS</p>
            <h2 id="deductions-heading">Deducciones descubiertas</h2>
          </div>
          <span>{unlockedDeductions.length} REGISTRADAS</span>
        </header>

        {unlockedDeductions.length ? (
          <div className="deduction-card-grid">
            {unlockedDeductions.map((deduction, index) => (
              <DeductionCard
                deduction={deduction}
                evidenceById={evidenceById}
                key={deduction.id}
                number={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="deductions-empty">
            <span aria-hidden="true">⌕</span>
            <p>
              Todavía no hay conclusiones. Relacioná dos evidencias para
              registrar tu primer hallazgo.
            </p>
          </div>
        )}
      </section>

      <div className="board-navigation">
        <Link className="text-link" to="/evidencias">
          Consultar archivo completo <span aria-hidden="true">→</span>
        </Link>
        <span>LAS DEDUCCIONES NO REVELAN TODAVÍA EL DESENLACE</span>
      </div>
    </section>
  )
}

export default InvestigationBoardPage
