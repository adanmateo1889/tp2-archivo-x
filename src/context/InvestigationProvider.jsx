import { useCallback, useRef, useState } from 'react'
import InvestigationContext from './InvestigationContext.js'
import deductions from '../data/deductions.js'
import evidenceRecords from '../data/evidence.json'
import suspects from '../data/suspects.js'
import accusationOptions from '../data/accusationOptions.js'

const STORAGE_KEY = 'archivo-x-investigation-progress-v1'
const STORAGE_VERSION = 1
const evidenceIds = new Set(evidenceRecords.map((evidence) => evidence.id))
const deductionsById = new Map(
  deductions.map((deduction) => [deduction.id, deduction]),
)

function emptyProgress() {
  return {
    registeredEvidenceIds: [],
    unlockedDeductionIds: [],
    accusationResult: null,
    storageMessage: '',
  }
}

function readSavedProgress() {
  if (typeof window === 'undefined') {
    return emptyProgress()
  }

  let savedValue

  try {
    savedValue = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return {
      ...emptyProgress(),
      storageMessage:
        'No se pudo acceder al almacenamiento local. El progreso se conservará solo durante esta sesión.',
    }
  }

  if (savedValue === null) {
    return emptyProgress()
  }

  let parsedValue

  try {
    parsedValue = JSON.parse(savedValue)
  } catch {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      return {
        ...emptyProgress(),
        storageMessage:
          'El progreso guardado estaba dañado y no se pudo borrar del almacenamiento local.',
      }
    }

    return {
      ...emptyProgress(),
      storageMessage:
        'El progreso guardado estaba dañado; se inició una investigación nueva.',
    }
  }

  const hasValidShape =
    parsedValue !== null &&
    typeof parsedValue === 'object' &&
    !Array.isArray(parsedValue) &&
    parsedValue.version === STORAGE_VERSION &&
    Array.isArray(parsedValue.registeredEvidenceIds) &&
    Array.isArray(parsedValue.unlockedDeductionIds)

  if (!hasValidShape) {
    return {
      ...emptyProgress(),
      storageMessage:
        'El formato del progreso guardado no es válido; se inició una investigación nueva.',
    }
  }

  const registeredEvidenceIds = [
    ...new Set(
      parsedValue.registeredEvidenceIds.filter(
        (id) => typeof id === 'string' && evidenceIds.has(id),
      ),
    ),
  ]
  const unlockedDeductionIds = [
    ...new Set(
      parsedValue.unlockedDeductionIds.filter(
        (id) => typeof id === 'string' && deductionsById.has(id),
      ),
    ),
  ]
  const accusationResult =
    parsedValue.accusationResult === 'correct' ||
    parsedValue.accusationResult === 'incorrect'
      ? parsedValue.accusationResult
      : null
  const wasSanitized =
    registeredEvidenceIds.length !== parsedValue.registeredEvidenceIds.length ||
    unlockedDeductionIds.length !== parsedValue.unlockedDeductionIds.length ||
    (parsedValue.accusationResult !== undefined &&
      parsedValue.accusationResult !== accusationResult)

  return {
    registeredEvidenceIds,
    unlockedDeductionIds,
    accusationResult,
    storageMessage: wasSanitized
      ? 'Se descartaron identificadores desconocidos o repetidos del progreso guardado.'
      : '',
  }
}

function InvestigationProvider({ children }) {
  const [progress, setProgress] = useState(readSavedProgress)
  const progressRef = useRef(progress)

  const commitProgress = useCallback((nextProgress) => {
    let storageMessage = ''

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            version: STORAGE_VERSION,
            registeredEvidenceIds: nextProgress.registeredEvidenceIds,
            unlockedDeductionIds: nextProgress.unlockedDeductionIds,
            accusationResult: nextProgress.accusationResult,
          }),
        )
      } catch {
        storageMessage =
          'No se pudo guardar el progreso en este navegador. Continúa disponible durante la sesión actual.'
      }
    }

    const committedProgress = { ...nextProgress, storageMessage }
    progressRef.current = committedProgress
    setProgress(committedProgress)
  }, [])

  const registerEvidence = useCallback(
    (evidenceId) => {
      if (!evidenceIds.has(evidenceId)) {
        return 'invalid'
      }

      const currentProgress = progressRef.current
      if (currentProgress.registeredEvidenceIds.includes(evidenceId)) {
        return 'already-registered'
      }

      commitProgress({
        ...currentProgress,
        registeredEvidenceIds: [
          ...currentProgress.registeredEvidenceIds,
          evidenceId,
        ],
      })
      return 'registered'
    },
    [commitProgress],
  )

  const unlockDeduction = useCallback(
    (deductionId) => {
      const deduction = deductionsById.get(deductionId)
      if (!deduction) {
        return 'invalid'
      }

      const currentProgress = progressRef.current
      if (currentProgress.unlockedDeductionIds.includes(deductionId)) {
        return 'already-unlocked'
      }

      const priorStageDeductionIds = deductions
        .filter((candidate) => candidate.stage < deduction.stage)
        .map((candidate) => candidate.id)
      const hasCompletedPriorStages = priorStageDeductionIds.every((id) =>
        currentProgress.unlockedDeductionIds.includes(id),
      )

      if (!hasCompletedPriorStages) {
        return 'locked'
      }

      commitProgress({
        ...currentProgress,
        unlockedDeductionIds: [
          ...currentProgress.unlockedDeductionIds,
          deductionId,
        ],
      })
      return 'unlocked'
    },
    [commitProgress],
  )

  const submitAccusation = useCallback(
    async ({ suspectId, methodId, motiveId }) => {
      if (progressRef.current.accusationResult === 'correct') {
        return 'already-resolved'
      }

      if (
        !suspects.some((suspect) => suspect.id === suspectId) ||
        !accusationOptions.methods.some((option) => option.id === methodId) ||
        !accusationOptions.motives.some((option) => option.id === motiveId)
      ) {
        return 'invalid'
      }

      if (progressRef.current.unlockedDeductionIds.length !== deductions.length) {
        return 'locked'
      }

      const { default: solution } = await import('../data/caseSolution.js')
      const isCorrect =
        suspectId === solution.responsibleSuspectId &&
        methodId === solution.correctMethodId &&
        motiveId === solution.correctMotiveId
      const accusationResult = isCorrect ? 'correct' : 'incorrect'

      commitProgress({
        ...progressRef.current,
        accusationResult,
      })
      return accusationResult
    },
    [commitProgress],
  )

  const resetInvestigation = useCallback(() => {
    let storageMessage = ''

    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        storageMessage =
          'No se pudo borrar el progreso del almacenamiento local de este navegador.'
      }
    }

    const nextProgress = { ...emptyProgress(), storageMessage }
    progressRef.current = nextProgress
    setProgress(nextProgress)
  }, [])

  const value = {
    registeredEvidenceIds: progress.registeredEvidenceIds,
    unlockedDeductionIds: progress.unlockedDeductionIds,
    accusationResult: progress.accusationResult,
    caseResolved: progress.accusationResult === 'correct',
    storageMessage: progress.storageMessage,
    registerEvidence,
    unlockDeduction,
    submitAccusation,
    resetInvestigation,
  }

  return (
    <InvestigationContext.Provider value={value}>
      {children}
    </InvestigationContext.Provider>
  )
}

export default InvestigationProvider
