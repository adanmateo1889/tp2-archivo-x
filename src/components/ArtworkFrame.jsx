function ArtworkFrame({ artwork, isSelected, isExamined, onSelect }) {
  return (
    <button
      className={`crime-frame${isSelected ? ' crime-frame-selected' : ''}`}
      type="button"
      aria-pressed={isSelected}
      aria-label={`Examinar marco ${artwork.number}: ${artwork.title}${isExamined ? ', evidencia registrada' : ''}`}
      onClick={onSelect}
    >
      <span className="crime-frame-inner">
        <span className="crime-frame-number">OBRA {artwork.number}</span>
        <span className="crime-frame-empty">AUSENTE</span>
        <span className="crime-frame-corner" aria-hidden="true" />
      </span>
      <span className="crime-frame-plaque">
        <span>{artwork.location}</span>
        <strong>{isExamined ? 'EVIDENCIA REGISTRADA' : 'MARCO VACÍO'}</strong>
      </span>
      <span className="crime-frame-action">
        {isSelected ? 'EXPEDIENTE ABIERTO' : 'EXAMINAR →'}
      </span>
    </button>
  )
}

export default ArtworkFrame
