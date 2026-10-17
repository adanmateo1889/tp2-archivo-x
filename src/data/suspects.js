const suspects = [
  {
    id: 'sospechosa-clara',
    nombre: 'Clara Montes',
    rol: 'Curadora de Galería Código',
    declaracion:
      '“Comprobé que los tres marcos estuvieran ocupados antes de abrir. Durante el apagón estaba en la oficina administrativa.”',
    coartada:
      'El registro de recepción y una integrante del equipo de atención la ubican en la oficina entre las 22:05 y las 22:24.',
  },
  {
    id: 'sospechoso-bruno',
    nombre: 'Bruno Salcedo',
    rol: 'Guardia de seguridad',
    declaracion:
      '“Estaba cubriendo el sector este. Revisé una alerta cerca del pasillo de carga y no vi a nadie salir.”',
    coartada:
      'La tarjeta de patrulla lo registra en el recorrido este y luego en el pasillo de carga durante la alerta.',
  },
  {
    id: 'sospechoso-tomas',
    nombre: 'Tomás Rivas',
    rol: 'Técnico de mantenimiento',
    declaracion:
      '“Ejecuté la prueba del relé desde el subsuelo. Estaba autorizada y no subí a la sala.”',
    coartada:
      'La consola registra su actividad en el panel eléctrico durante la prueba; otro técnico declara haber observado el procedimiento.',
  },
  {
    id: 'sospechosa-valentina',
    nombre: 'Valentina Cruz',
    rol: 'Coleccionista',
    declaracion:
      '“Pregunté si las obras podían adquirirse, pero me fui antes de que cerrara la galería.”',
    coartada:
      'El lector del vestíbulo registra su salida a las 21:42 y no hay una entrada posterior.',
  },
  {
    id: 'sospechosa-elena',
    nombre: 'Elena Vargas',
    rol: 'Asistente de restauración',
    declaracion:
      '“Me quedé en el taller tomando mediciones de humedad. No entré a la sala esa noche.”',
    coartada:
      'El registro de actividad del taller sitúa tareas de conservación en su turno; el lector interno también registra un desplazamiento del turno de restauración durante el intervalo del apagón.',
  },
]

export default suspects
