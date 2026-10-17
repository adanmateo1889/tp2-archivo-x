import { useContext } from 'react'
import InvestigationContext from './InvestigationContext.js'

function useInvestigation() {
  const context = useContext(InvestigationContext)
  if (context === null) {
    throw new Error(
      'useInvestigation debe utilizarse dentro de InvestigationProvider.',
    )
  }

  return context
}

export default useInvestigation
