const developmentLog = [
  {
    id: 'etapa-1-rutas',
    stage: 'Etapa 1',
    title: 'Estructura base y navegación',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'Se organizó la aplicación React con una estructura compartida de navegación, páginas y layout, manteniendo las rutas internas accesibles.',
    work:
      'Se construyeron la base de React con Vite, el enrutamiento con React Router, el layout común, la sidebar responsive y páginas iniciales provisionales.',
    technologies: ['React', 'Vite', 'React Router'],
    decisions: [
      'Mantener una sidebar compartida para evitar repetir la navegación en cada página.',
      'Conservar rutas internas para que la aplicación pudiera crecer por etapas.',
      'Dejar contenido provisional mientras se definían las funcionalidades del juego.',
    ],
    testing:
      'La navegación, las rutas y la presentación en escritorio y móvil se comprobaron manualmente al cerrar la etapa.',
  },
  {
    id: 'etapa-2-identidad',
    stage: 'Etapa 2',
    title: 'Identidad visual de ARCHIVO X',
    areas: ['Diseño', 'Implementación', 'Pruebas'],
    summary:
      'Se definió una estética de agencia de investigaciones con una portada cinematográfica y una identidad visual consistente.',
    work:
      'Se aplicó una paleta oscura con acentos rojos y dorados, documentos, fotografías y un tablero ilustrativo construido con CSS. Se personalizaron la portada, la sidebar y los paneles de las secciones.',
    technologies: ['CSS', 'Variables CSS', 'React'],
    decisions: [
      'Usar composiciones CSS en lugar de imágenes externas aleatorias.',
      'Conservar contraste, respuesta adaptable y soporte para prefers-reduced-motion.',
      'Reservar una estructura para incorporar posteriormente imágenes propias.',
    ],
    testing:
      'Se revisaron visualmente la portada, las secciones y el menú móvil; lint y build finalizaron correctamente.',
  },
  {
    id: 'etapa-3-escena',
    stage: 'Etapa 3',
    title: 'Escena del crimen interactiva',
    areas: ['Diseño', 'Implementación', 'Pruebas'],
    summary:
      'La galería pasó de ser una ilustración a una escena con tres marcos seleccionables y expedientes de obra.',
    work:
      'Se integraron dos retratos disponibles del TP1 sin alterar sus originales. Cada marco abre un expediente; el tercero usa un marcador de identidad pendiente y no atribuye un retrato desconocido.',
    technologies: ['React', 'useState', 'Props', 'Imágenes PNG'],
    decisions: [
      'Mantener componentes ArtworkFrame y ArtworkDossier configurables mediante props.',
      'Representar la obra faltante sin inventar la identidad del integrante.',
      'Mantener el estado de registro local a la escena en esta fase.',
    ],
    testing:
      'Se comprobaron selección por teclado, registro de evidencias, contador y vista móvil.',
  },
  {
    id: 'etapa-4-datos',
    stage: 'Etapa 4',
    title: 'Datos del expediente y construcción del misterio',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'Se prepararon los datos locales del caso, separando información pública y solución confidencial.',
    work:
      'Se creó un archivo JSON con 25 evidencias repartidas en cinco categorías, además de los datos de sospechosos, cronología, obras y solución narrativa.',
    technologies: ['JSON', 'JavaScript ES modules'],
    decisions: [
      'Usar IDs estables para evidencias y mantener los datos en archivos locales.',
      'Mantener la solución aparte de los datos públicos para evitar spoilers accidentales.',
      'Construir pistas compatibles con una deducción progresiva y sin asignar identidades reales pendientes.',
    ],
    testing:
      'Se verificó la cantidad y distribución de los 25 registros y se ejecutaron lint y build.',
  },
  {
    id: 'etapa-5-archivo',
    stage: 'Etapa 5',
    title: 'Archivo de evidencias con búsqueda y filtros',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'El archivo local se convirtió en una consulta dinámica, sin exigir que una evidencia estuviera registrada en la escena.',
    work:
      'Se presentaron los registros mediante EvidenceCard, con búsqueda insensible a mayúsculas, filtro por categoría, combinación de criterios, contador, expansión y estado vacío.',
    technologies: ['React', 'useState', 'useMemo', 'JSON', 'Props'],
    decisions: [
      'Derivar las categorías disponibles desde los valores reales del JSON.',
      'Mantener el archivo íntegro como fuente única de registros.',
      'Permitir restablecer búsqueda y categoría cuando no hay coincidencias.',
    ],
    testing:
      'Se comprobaron los 25 registros, búsqueda, filtro combinado, expansión, estado vacío, restablecimiento y navegación.',
  },
  {
    id: 'etapa-6-deducciones',
    stage: 'Etapa 6',
    title: 'Tablero de investigación y deducciones',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'El tablero permite contrastar pares de evidencias y descubrir conclusiones en una progresión narrativa.',
    work:
      'Se creó un catálogo independiente de siete combinaciones válidas, con deducciones distribuidas en tres fases, y tarjetas reutilizables para pistas y conclusiones.',
    technologies: ['React', 'useState', 'useMemo', 'JavaScript ES modules'],
    decisions: [
      'Comparar las parejas sin depender del orden de selección.',
      'Evitar conclusiones duplicadas y distinguir relaciones no concluyentes.',
      'Impedir el avance a una fase hasta completar las deducciones de la fase anterior.',
    ],
    testing:
      'Se probaron pares válidos e inválidos, orden inverso, control de fases, deduplicación, teclado, navegación y móvil.',
  },
  {
    id: 'etapa-7-progreso',
    stage: 'Etapa 7',
    title: 'Progreso compartido con Context y localStorage',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'El progreso dejó de pertenecer a páginas individuales y pasó a compartirse entre la escena y el tablero.',
    work:
      'Se incorporaron InvestigationContext, InvestigationProvider y useInvestigation para registrar IDs canónicos de evidencias y deducciones, persistirlos y reiniciar con confirmación.',
    technologies: ['React Context', 'Hooks', 'localStorage', 'JSON'],
    decisions: [
      'Guardar IDs de los datos existentes en vez de copiar registros.',
      'Validar y filtrar datos guardados inválidos o desconocidos.',
      'Mostrar errores del almacenamiento y mantener fuera del progreso público la solución narrativa.',
    ],
    testing:
      'Se verificaron persistencia tras recarga, deduplicación, recuperación de datos corruptos, reinicio aceptado/cancelado, etapas y vista móvil.',
  },
  {
    id: 'etapa-8-resolucion',
    stage: 'Etapa 8',
    title: 'Acusación final y desenlace',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'Las rutas de resolución y resultado se transformaron en el cierre funcional del caso AX-001.',
    work:
      'La acusación requiere elegir responsable, método y motivo después de desbloquear las siete deducciones. Una respuesta correcta habilita el desenlace y la reconstrucción cronológica.',
    technologies: ['React Router', 'React Context', 'localStorage', 'React.lazy import dinámico'],
    decisions: [
      'Evaluar conjuntamente las tres respuestas.',
      'No revelar las respuestas correctas tras una acusación incorrecta.',
      'Cargar la solución confidencial solo durante la evaluación y en el resultado autorizado.',
    ],
    testing:
      'Se probaron acusaciones incorrectas y correctas, bloqueo directo del resultado, persistencia tras recarga, reinicio y vista móvil.',
  },
  {
    id: 'etapa-9a-api',
    stage: 'Etapa 9A',
    title: 'Consulta a la API del Art Institute of Chicago',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'Se incorporó una fuente pública real de obras de arte, separada de las evidencias ficticias del expediente.',
    work:
      'La ruta de consulta usa fetch y useEffect para presentar registros de dominio público con título, artista, fecha, imagen y enlace a la ficha del museo.',
    technologies: ['fetch', 'useEffect', 'AbortController', 'API REST', 'IIIF Image API'],
    decisions: [
      'Solicitar únicamente los campos necesarios y filtrar los registros marcados como dominio público.',
      'Construir URL de imagen con la base IIIF entregada en la respuesta de la API.',
      'Aclarar que las referencias externas no son pruebas del caso ni se agregan al JSON local.',
    ],
    testing:
      'Se comprobaron consulta, actualización, error de red, respuesta HTTP 503, reintento y presentación móvil.',
  },
  {
    id: 'etapa-9b-arbol',
    stage: 'Etapa 9B',
    title: 'Árbol interactivo de componentes',
    areas: ['Implementación', 'Pruebas'],
    summary:
      'Se documentó la composición real de React y se habilitó la exploración de sus ramas.',
    work:
      'Se separaron los datos del árbol y la página, con selección de nodos, ficha de responsabilidad, relaciones de Context y controles para expandir o contraer.',
    technologies: ['React', 'useState', 'React props', 'ARIA'],
    decisions: [
      'Modelar relaciones de renderizado separadas de las referencias compartidas de Context.',
      'Representar componentes reutilizados una sola vez, anotando sus múltiples instancias.',
      'No añadir librerías de diagramación.',
    ],
    testing:
      'Se probaron selección, teclado, expandir/contraer, escritorio, móvil y disponibilidad de rutas del juego y API.',
  },
  {
    id: 'etapa-10-bitacora',
    stage: 'Etapa 10',
    title: 'Bitácora interactiva del desarrollo',
    areas: ['Diseño', 'Implementación', 'Pruebas'],
    summary:
      'Se incorporó un registro académico por etapas que distingue decisiones de diseño, implementación y validación.',
    work:
      'Se organizaron entradas cronológicas de las etapas 1 a 10, con filtros, detalles expandibles y un apartado de decisiones técnicas principales.',
    technologies: ['React', 'useState', 'useMemo', 'JavaScript ES modules', 'ARIA'],
    decisions: [
      'Usar números de etapa en vez de asignar fechas o responsables no verificados.',
      'Documentar el desarrollo real del proyecto, separado de la cronología ficticia del caso.',
      'Permitir filtrar por etapa y área sin ocultar la explicación general de decisiones técnicas.',
    ],
    testing:
      'Se comprobaron filtros, expansión, estado vacío, restablecimiento, teclado y presentación móvil.',
  },
  {
    id: 'etapa-11-equipo',
    stage: 'Etapa 11',
    title: 'Equipo investigador y perfiles individuales',
    areas: ['Diseño', 'Implementación', 'Pruebas'],
    summary:
      'La página de equipo pasó a mostrar a las cinco personas confirmadas y perfiles compartidos basados en slugs estables.',
    work:
      'Se incorporaron los cinco retratos y los datos personales disponibles en Galería Código (TP1), los enlaces de GitHub registrados en su README, navegación entre perfiles y fichas ampliables.',
    technologies: ['React Router', 'React', 'useState', 'Props', 'Imágenes locales'],
    decisions: [
      'No completar biografías, habilidades ni responsabilidades que no estén documentadas.',
      'Reutilizar los retratos disponibles y conservar la identidad del TP1 en sus archivos originales.',
      'Mantener la ficha individual en una sola página parametrizada por slug.',
    ],
    testing:
      'Se revisaron las cinco rutas, imágenes, enlaces, navegación, ficha ampliable, slug inexistente, teclado y ancho móvil de 390 px.',
  },
  {
    id: 'etapa-12-sospechosos',
    stage: 'Etapa 12',
    title: 'Archivo interactivo de sospechosos',
    areas: ['Diseño', 'Implementación', 'Pruebas'],
    summary:
      'Las cinco fichas ficticias presentan sus testimonios junto con evidencias referenciadas por los IDs canónicos del archivo.',
    work:
      'Se separaron hechos comprobados, testimonios, contradicciones o puntos por verificar y preguntas abiertas en fichas expandibles.',
    technologies: ['React', 'useState', 'JSON local', 'Props', 'ARIA'],
    decisions: [
      'No tratar una declaración como hecho probado ni convertir una coincidencia en acusación.',
      'Referenciar evidence.json por ID, sin duplicar registros ni cambiar el expediente.',
      'No revelar al responsable ni el desenlace en las fichas públicas.',
    ],
    testing:
      'Se verificaron las cinco fichas, expansión y contracción por teclado, referencias existentes, ausencia de spoiler y responsive a 390 px.',
  },
]

export const developmentDecisions = [
  {
    title: 'React Router para navegación interna',
    area: 'Implementación',
    description:
      'Las rutas identifican secciones y páginas; AppLayout mantiene la navegación común sin convertir la aplicación en una maqueta estática.',
  },
  {
    title: 'Componentes reutilizables mediante props',
    area: 'Diseño e implementación',
    description:
      'Tarjetas, marcos y fichas reciben sus datos y estados desde la página que los utiliza, evitando duplicar la estructura visual.',
  },
  {
    title: 'JSON local para evidencias del caso',
    area: 'Implementación',
    description:
      'Las 25 evidencias ficticias se consultan desde una fuente local única. Las referencias externas del museo no se mezclan con estos registros.',
  },
  {
    title: 'Context y localStorage para progreso',
    area: 'Implementación',
    description:
      'El Context comparte IDs de progreso entre rutas; localStorage permite recuperarlos al volver a cargar la aplicación.',
  },
  {
    title: 'API pública separada del misterio',
    area: 'Implementación y diseño',
    description:
      'La API del Art Institute of Chicago aporta referencias culturales reales en una sección independiente, sin alterar evidencias, deducciones ni solución.',
  },
  {
    title: 'Validación manual y comandos del proyecto',
    area: 'Pruebas',
    description:
      'Las funciones interactivas se comprobaron en navegador y en distintos anchos de pantalla; lint y build se ejecutaron con los scripts existentes.',
  },
]

export default developmentLog
