const confidentialCaseSolution = {
  classification: 'CONFIDENCIAL · NO IMPORTAR EN COMPONENTES PÚBLICOS',
  responsibleSuspectId: 'sospechosa-elena',
  correctMethodId: 'sustitucion-previa',
  correctMotiveId: 'proteger-obras',
  method:
    'Los originales fueron retirados entre el registro fotográfico del 13 de septiembre y la apertura del 18. Se instalaron facsímiles preparados con materiales de montaje reversible; durante el apagón programado se retiraron las copias para simular un robo nocturno.',
  motive:
    'Elena Vargas descubrió que se intentaba trasladar y vender las obras sin autorización. Ocultó los originales en un espacio de conservación protegido para impedir la operación.',
  resolution:
    'El apagón de siete minutos fue real y la prueba del relé estaba autorizada. El hecho de que no se forzaran puertas ni se registraran salidas exteriores resulta coherente porque las piezas que se retiraron esa noche eran facsímiles, no los originales.',
  substitutionEvidenceIds: [
    'FIS-04',
    'FIS-05',
    'DOC-01',
    'DOC-03',
    'DIG-05',
    'FOT-01',
    'FOT-02',
  ],
  responsibilityEvidenceIds: [
    'DIG-05',
    'DIG-06',
    'DOC-03',
    'DOC-04',
    'TES-05',
  ],
  motiveEvidenceIds: ['DOC-02'],
  reasonableFalseLeads: {
    'sospechosa-clara': ['TES-01', 'DOC-02'],
    'sospechoso-bruno': ['DIG-01', 'TES-02'],
    'sospechoso-tomas': ['DIG-03', 'TES-03'],
    'sospechosa-valentina': ['DIG-04', 'TES-04', 'DOC-02'],
    'sospechosa-elena': ['DIG-05', 'DIG-06', 'DOC-03', 'TES-05'],
  },
}

export default confidentialCaseSolution
