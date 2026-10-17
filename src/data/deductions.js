const deductions = [
  {
    id: 'manipulacion-cuidadosa',
    evidenceIds: ['FIS-01', 'FIS-08'],
    stage: 1,
    stageLabel: 'Indicios de manipulación',
    title: 'Los marcos se retiraron con cuidado',
    conclusion:
      'La ausencia de daños y el roce regular de los anclajes apuntan a una manipulación controlada, no a una extracción apresurada.',
    nextQuestion:
      'Si no hubo forcejeo, ¿los marcos se manipularon antes de la noche del incidente?',
  },
  {
    id: 'materiales-montaje',
    evidenceIds: ['DOC-03', 'FIS-04'],
    stage: 1,
    stageLabel: 'Indicios de manipulación',
    title: 'Hubo una intervención previa en los marcos',
    conclusion:
      'El vale registra soportes y adhesivo reversible suficientes para tres montajes; los residuos recientes aparecen en los tres marcos.',
    nextQuestion:
      '¿Qué se fijó con esos materiales y cuándo ocurrió el montaje?',
  },
  {
    id: 'soporte-no-coincide',
    evidenceIds: ['DOC-01', 'FIS-05'],
    stage: 2,
    stageLabel: 'Posible sustitución previa',
    title: 'El soporte hallado no coincide con el inventario',
    conclusion:
      'El inventario describe lino en las obras originales, pero el filamento recuperado es sintético. La diferencia requiere una explicación.',
    nextQuestion:
      '¿La superficie fotografiada antes de la apertura corresponde a los originales inventariados?',
  },
  {
    id: 'superficies-distintas',
    evidenceIds: ['FOT-01', 'FOT-02'],
    stage: 2,
    stageLabel: 'Posible sustitución previa',
    title: 'Las superficies fotografiadas presentan diferencias',
    conclusion:
      'Al comparar el registro del 13 de septiembre con la imagen de apertura, cambian la textura y los reflejos visibles en las obras.',
    nextQuestion:
      '¿Podría haber habido otras piezas en los marcos antes del apagón?',
  },
  {
    id: 'preparacion-de-facsimiles',
    evidenceIds: ['DIG-05', 'DOC-03'],
    stage: 2,
    stageLabel: 'Posible sustitución previa',
    title: 'Se prepararon materiales para tres reproducciones',
    conclusion:
      'La cola de impresión contiene tres facsímiles y el vale de depósito cubre soportes de lienzo y adhesivo para tres montajes.',
    nextQuestion:
      '¿Hay una imagen que permita comparar lo expuesto con los originales?',
  },
  {
    id: 'facsimiles-en-apertura',
    evidenceIds: ['DIG-05', 'FOT-02'],
    stage: 3,
    stageLabel: 'El apagón bajo examen',
    title: 'La imagen de apertura no demuestra que fueran los originales',
    conclusion:
      'La fotografía confirma que había tres piezas colgadas, mientras el registro de impresión confirma la preparación de tres facsímiles. La presencia de cuadros no prueba la presencia de los originales.',
    nextQuestion:
      '¿Qué ocurrió con las piezas retiradas durante los siete minutos sin cámaras?',
  },
  {
    id: 'apagon-sin-salida',
    evidenceIds: ['DIG-01', 'DIG-02'],
    stage: 3,
    stageLabel: 'El apagón bajo examen',
    title: 'El apagón no coincide con una salida del edificio',
    conclusion:
      'Las cámaras dejaron de grabar siete minutos, pero los lectores exteriores siguieron activos y no registraron salidas.',
    nextQuestion:
      '¿Lo que desapareció durante el apagón era necesariamente lo que había antes?',
  },
]

export default deductions
