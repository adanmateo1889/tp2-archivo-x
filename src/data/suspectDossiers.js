const suspectDossiers = [
  {
    suspectId: 'sospechosa-clara',
    verifiedFacts: [
      {
        text: 'El inventario firmado registra los tres retratos originales el 14 de septiembre; la fotografía de apertura muestra una obra en cada marco, sin certificar su identidad.',
        evidenceIds: ['DOC-01', 'FOT-02'],
      },
    ],
    testimonyEvidenceId: 'TES-01',
    pointsToVerify: [
      {
        text: 'Su recuerdo de haber comprobado los marcos no incluye una comparación de números de inventario ni de superficies.',
        evidenceIds: ['TES-01', 'DOC-01'],
      },
    ],
    openQuestions: [
      '¿Qué detalles de las obras comprobó antes de abrir la exposición?',
      '¿Puede confirmarse de manera independiente cuánto tiempo permaneció en la oficina?',
    ],
  },
  {
    suspectId: 'sospechoso-bruno',
    verifiedFacts: [
      {
        text: 'Las cámaras dejaron de grabar durante siete minutos y los accesos exteriores no registraron aperturas durante ese intervalo.',
        evidenceIds: ['DIG-01', 'DIG-02'],
      },
    ],
    testimonyEvidenceId: 'TES-02',
    pointsToVerify: [
      {
        text: 'Su relato lo ubica en el sector este y luego junto al pasillo de carga; el registro de puertas no documenta salidas en el intervalo crítico.',
        evidenceIds: ['TES-02', 'DIG-02'],
      },
    ],
    openQuestions: [
      '¿Qué originó la alerta del pasillo de carga?',
      '¿Qué recorridos quedaron registrados fuera del intervalo sin cámaras?',
    ],
  },
  {
    suspectId: 'sospechoso-tomas',
    verifiedFacts: [
      {
        text: 'La prueba del relé estaba autorizada y había sido comunicada al personal antes de su ejecución.',
        evidenceIds: ['DIG-03', 'DOC-04'],
      },
    ],
    testimonyEvidenceId: 'TES-03',
    pointsToVerify: [
      {
        text: 'La consola confirma la prueba del relé, pero no determina por sí sola quién estuvo presente en otros sectores de la galería.',
        evidenceIds: ['DIG-03', 'TES-03'],
      },
    ],
    openQuestions: [
      '¿La prueba programada explica por completo la interrupción de las cámaras?',
      '¿Puede verificarse quién observó la operación del panel?',
    ],
  },
  {
    suspectId: 'sospechosa-valentina',
    verifiedFacts: [
      {
        text: 'Su credencial registró la salida a las 21:42 y no muestra un reingreso; existe una propuesta de traslado privado sin autorización.',
        evidenceIds: ['DIG-04', 'DOC-02'],
      },
    ],
    testimonyEvidenceId: 'TES-04',
    pointsToVerify: [
      {
        text: 'El interés en adquirir las obras aparece en su declaración y en la correspondencia, pero estos registros no prueban una participación en la desaparición.',
        evidenceIds: ['TES-04', 'DOC-02', 'DIG-04'],
      },
    ],
    openQuestions: [
      '¿Quién presentó la propuesta de traslado privado y qué respuesta recibió?',
      '¿Qué ocurrió en la conversación sobre una posible adquisición?',
    ],
  },
  {
    suspectId: 'sospechosa-elena',
    verifiedFacts: [
      {
        text: 'Se registraron tres facsímiles enviados a imprimir desde una estación del taller de restauración y materiales para tres montajes retirados por el turno de conservación.',
        evidenceIds: ['DIG-05', 'DOC-03'],
      },
    ],
    testimonyEvidenceId: 'TES-05',
    pointsToVerify: [
      {
        text: 'La declaración sitúa a la asistente en el taller durante el apagón; una credencial del turno de restauración abrió el acceso interno hacia la sala y regresó durante ese período. El registro no identifica por sí solo a quien llevaba la credencial.',
        evidenceIds: ['TES-05', 'DIG-06'],
      },
    ],
    openQuestions: [
      '¿Quién utilizó la credencial del turno de restauración?',
      '¿A qué trabajo correspondían los facsímiles y los materiales de montaje registrados?',
    ],
  },
]

export default suspectDossiers
