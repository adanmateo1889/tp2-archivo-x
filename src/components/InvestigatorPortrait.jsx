import { useState } from 'react'

const FALLBACK_PORTRAIT = '/img/investigadores/avatar-investigador.svg'

function InvestigatorPortrait({ member, className, decorative = false }) {
  const [failedSource, setFailedSource] = useState('')
  const hasPortrait = Boolean(member.portraitPath) && failedSource !== member.portraitPath
  const alt = decorative
    ? ''
    : hasPortrait
      ? `Retrato de ${member.displayName ?? member.name}, investigador/a`
      : `Avatar provisional de ${member.displayName ?? member.name}; fotografía pendiente`

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      loading="lazy"
      onError={() => setFailedSource(member.portraitPath)}
      src={hasPortrait ? member.portraitPath : FALLBACK_PORTRAIT}
    />
  )
}

export default InvestigatorPortrait
