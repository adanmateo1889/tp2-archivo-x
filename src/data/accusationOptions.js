const accusationOptions = {
  methods: [
    {
      id: 'sustitucion-previa',
      label:
        'Los originales se reemplazaron antes de la exposición; durante el apagón se retiraron las reproducciones.',
    },
    {
      id: 'salida-en-apagon',
      label:
        'Los originales se descolgaron durante el apagón y salieron por una puerta de servicio.',
    },
    {
      id: 'transporte-autorizado',
      label:
        'Un traslado autorizado sacó los tres cuadros antes del cierre, sin alterar las cámaras.',
    },
    {
      id: 'alteracion-de-registros',
      label:
        'Los registros fueron modificados para ocultar una extracción nocturna de los originales.',
    },
  ],
  motives: [
    {
      id: 'venta-privada',
      label: 'Obtener un beneficio personal con una venta privada.',
    },
    {
      id: 'encubrir-error',
      label: 'Ocultar un error en el inventario antes de una auditoría.',
    },
    {
      id: 'proteger-obras',
      label: 'Impedir que los originales fueran vendidos ilegalmente.',
    },
    {
      id: 'disputa-artistica',
      label: 'Desviar la atención de una disputa sobre la autoría de los retratos.',
    },
  ],
}

export default accusationOptions
