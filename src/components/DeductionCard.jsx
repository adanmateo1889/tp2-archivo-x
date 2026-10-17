function DeductionCard({ deduction, evidenceById, number }) {
  return (
    <article className="deduction-card">
      <div className="deduction-card-heading">
        <span className="deduction-number">{String(number).padStart(2, '0')}</span>
        <span className="deduction-stage">CONCLUSIÓN DESBLOQUEADA</span>
      </div>
      <h3>{deduction.title}</h3>
      <p>{deduction.conclusion}</p>
      <div className="deduction-sources" aria-label="Evidencias relacionadas">
        {deduction.evidenceIds.map((evidenceId) => (
          <span key={evidenceId}>
            {evidenceId} · {evidenceById[evidenceId].titulo}
          </span>
        ))}
      </div>
      <div className="deduction-next-question">
        <span>PRÓXIMA PREGUNTA</span>
        <p>{deduction.nextQuestion}</p>
      </div>
    </article>
  )
}

export default DeductionCard
