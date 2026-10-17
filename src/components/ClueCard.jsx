const categoryLabels = {
  evidencias_fisicas: 'Evidencia física',
  registros_digitales: 'Registro digital',
  testimonios: 'Testimonio',
  documentos: 'Documento',
  fotografias: 'Fotografía',
}

function ClueCard({ evidence, isSelected, onToggle }) {
  return (
    <button
      className={`clue-card${isSelected ? ' clue-card-selected' : ''}`}
      type="button"
      aria-pressed={isSelected}
      onClick={onToggle}
    >
      <span className="clue-card-topline">
        <span className="clue-card-code">{evidence.id}</span>
        <span className="clue-card-category">
          {categoryLabels[evidence.categoria] ?? evidence.categoria}
        </span>
      </span>
      <strong>{evidence.titulo}</strong>
      <span className="clue-card-description">{evidence.descripcion}</span>
      <span className="clue-card-location">
        <span>UBICACIÓN</span>
        {evidence.ubicacion}
      </span>
      <span className="clue-card-select">
        {isSelected ? 'SELECCIONADA' : 'SELECCIONAR'}
        <span aria-hidden="true">{isSelected ? '✓' : '+'}</span>
      </span>
    </button>
  )
}

export default ClueCard
