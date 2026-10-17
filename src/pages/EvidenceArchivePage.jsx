import { useMemo, useState } from 'react'
import evidenceRecords from '../data/evidence.json'
import EvidenceCard from '../components/EvidenceCard.jsx'

const categoryLabels = {
  evidencias_fisicas: 'Evidencias físicas',
  registros_digitales: 'Registros digitales',
  testimonios: 'Testimonios',
  documentos: 'Documentos',
  fotografias: 'Fotografías',
}

function EvidenceArchivePage() {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = useMemo(
    () => [...new Set(evidenceRecords.map((evidence) => evidence.categoria))],
    [],
  )

  const filteredEvidence = useMemo(() => {
    const normalizedSearch = searchText.trim().toLocaleLowerCase('es')

    return evidenceRecords.filter((evidence) => {
      const matchesCategory =
        selectedCategory === 'all' || evidence.categoria === selectedCategory
      const searchableText =
        `${evidence.id} ${evidence.titulo} ${evidence.descripcion}`.toLocaleLowerCase(
          'es',
        )

      return matchesCategory && searchableText.includes(normalizedSearch)
    })
  }, [searchText, selectedCategory])

  function resetFilters() {
    setSearchText('')
    setSelectedCategory('all')
  }

  return (
    <section className="placeholder-page evidence-archive-page">
      <div className="eyebrow">
        <span className="eyebrow-line" />
        ARCHIVO DOCUMENTAL · CONSULTA DE EVIDENCIAS
      </div>
      <p className="section-kicker">EXPEDIENTE AX-001 · REGISTRO LOCAL</p>
      <h1>Archivo de evidencias</h1>
      <p className="placeholder-description">
        Consultá los registros reunidos durante la investigación. Buscá por
        código, título o descripción, o filtrá por categoría para localizar un
        expediente.
      </p>

      <section className="evidence-search-panel" aria-label="Búsqueda y filtros">
        <label className="evidence-search-field">
          <span>BUSCAR EN EL ARCHIVO</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Código, título o descripción..."
          />
        </label>
        <label className="evidence-category-field">
          <span>FILTRAR POR CATEGORÍA</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {categoryLabels[category] ?? category.replaceAll('_', ' ')}
              </option>
            ))}
          </select>
        </label>
        <p className="evidence-result-count" aria-live="polite" role="status">
          <strong>{filteredEvidence.length}</strong>
          <span>
            {filteredEvidence.length === 1
              ? 'registro encontrado'
              : 'registros encontrados'}
          </span>
        </p>
      </section>

      {filteredEvidence.length > 0 ? (
        <div className="evidence-card-grid">
          {filteredEvidence.map((evidence) => (
            <EvidenceCard evidence={evidence} key={evidence.id} />
          ))}
        </div>
      ) : (
        <section className="evidence-empty-state" aria-live="polite">
          <span className="empty-state-mark" aria-hidden="true">?</span>
          <h2>No se encontraron evidencias</h2>
          <p>
            Probá con otro término o cambiá la categoría seleccionada para
            continuar la búsqueda.
          </p>
          <button
            className="reset-evidence-filters"
            type="button"
            onClick={resetFilters}
          >
            Restablecer filtros
          </button>
        </section>
      )}
    </section>
  )
}

export default EvidenceArchivePage
