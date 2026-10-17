const componentTree = {
  id: 'application-runtime',
  label: 'ARCHIVO X · Aplicación React',
  kind: 'group',
  description:
    'Composición de runtime real de la aplicación. Los nodos agrupadores y de infraestructura ayudan a leer el flujo, pero no cuentan como componentes propios del proyecto.',
  children: [
    {
      id: 'render-runtime',
      label: 'Jerarquía de renderizado',
      kind: 'group',
      description:
        'Relaciones de envoltura y renderizado según main.jsx, App.jsx y las páginas actuales.',
      children: [
        {
          id: 'strict-mode',
          label: 'StrictMode',
          kind: 'framework',
          source: 'React',
          description:
            'Modo de desarrollo de React que ayuda a detectar efectos secundarios y patrones problemáticos.',
          children: [
            {
              id: 'investigation-provider',
              label: 'InvestigationProvider',
              kind: 'context',
              source: 'src/context/InvestigationProvider.jsx',
              description:
                'Envuelve la aplicación y conserva en localStorage las evidencias registradas, deducciones y resultado de la acusación.',
              usageNote:
                'Se monta una sola vez en la raíz y comparte su valor con las páginas consumidoras.',
              children: [
                {
                  id: 'browser-router',
                  label: 'BrowserRouter',
                  kind: 'framework',
                  source: 'React Router',
                  description:
                    'Habilita la navegación del navegador y entrega el contexto de rutas a App.',
                  children: [
                    {
                      id: 'app',
                      label: 'App',
                      kind: 'application',
                      source: 'src/App.jsx',
                      description:
                        'Declara las rutas de la aplicación y conecta cada URL con su página bajo el layout compartido.',
                      children: [
                        {
                          id: 'routes',
                          label: 'Routes / Route',
                          kind: 'framework',
                          source: 'React Router · src/App.jsx',
                          description:
                            'Resuelve la URL activa. Las rutas de contenido heredan AppLayout; /inicio redirige a portada.',
                          children: [
                            {
                              id: 'app-layout',
                              label: 'AppLayout',
                              kind: 'layout',
                              source: 'src/components/layout/AppLayout.jsx',
                              description:
                                'Mantiene sidebar, encabezado, aviso de almacenamiento, Outlet y pie compartidos entre rutas.',
                              contexts: ['InvestigationContext'],
                              children: [
                                {
                                  id: 'sidebar',
                                  label: 'Sidebar',
                                  kind: 'layout',
                                  source: 'src/components/layout/Sidebar.jsx',
                                  description:
                                    'Presenta la navegación principal, la ruta activa y la acción confirmada para reiniciar el progreso.',
                                  usageNote:
                                    'AppLayout la renderiza una vez; NavIcon se instancia para los íconos de navegación.',
                                  contexts: ['InvestigationContext'],
                                  children: [
                                    {
                                      id: 'nav-icon',
                                      label: 'NavIcon',
                                      kind: 'reusable',
                                      source: 'src/components/layout/Sidebar.jsx',
                                      description:
                                        'Componente local de Sidebar que dibuja el SVG correspondiente a cada sección.',
                                      usageNote:
                                        'Una única definición renderizada como varias instancias dentro del menú.',
                                    },
                                  ],
                                },
                                {
                                  id: 'outlet',
                                  label: 'Outlet · página de la ruta activa',
                                  kind: 'framework',
                                  source: 'React Router',
                                  description:
                                    'Punto donde React Router renderiza la página coincidente dentro del layout común.',
                                  children: [
                                    {
                                      id: 'home-page',
                                      label: 'HomePage',
                                      kind: 'page',
                                      source: 'src/pages/HomePage.jsx',
                                      routes: ['/'],
                                      description:
                                        'Presenta el expediente AX-001, la escena ilustrativa y los accesos iniciales a la investigación.',
                                    },
                                    {
                                      id: 'crime-scene-page',
                                      label: 'CrimeScenePage',
                                      kind: 'page',
                                      source: 'src/pages/CrimeScenePage.jsx',
                                      routes: ['/escena-del-crimen'],
                                      description:
                                        'Permite seleccionar los tres marcos, consultar su expediente y registrar indicios en el Context.',
                                      contexts: ['InvestigationContext'],
                                      children: [
                                        {
                                          id: 'artwork-frame',
                                          label: 'ArtworkFrame',
                                          kind: 'reusable',
                                          source: 'src/components/ArtworkFrame.jsx',
                                          description:
                                            'Botón accesible que representa un marco desaparecido e informa su selección y estado.',
                                          usageNote:
                                            'Se renderiza tres veces, una por cada obra; se muestra una sola definición.',
                                        },
                                        {
                                          id: 'artwork-dossier',
                                          label: 'ArtworkDossier',
                                          kind: 'reusable',
                                          source: 'src/components/ArtworkDossier.jsx',
                                          description:
                                            'Expediente de la obra seleccionada, con retrato o marcador pendiente, indicio y registro.',
                                          usageNote:
                                            'Renderizado condicionalmente para la obra activa; sus retratos son recursos, no componentes.',
                                        },
                                      ],
                                    },
                                    {
                                      id: 'investigation-board-page',
                                      label: 'InvestigationBoardPage',
                                      kind: 'page',
                                      source: 'src/pages/InvestigationBoardPage.jsx',
                                      routes: ['/tablero-de-pistas'],
                                      description:
                                        'Permite relacionar dos evidencias, desbloquea deducciones válidas y aplica progresión por fases.',
                                      contexts: ['InvestigationContext'],
                                      children: [
                                        {
                                          id: 'clue-card',
                                          label: 'ClueCard',
                                          kind: 'reusable',
                                          source: 'src/components/ClueCard.jsx',
                                          description:
                                            'Tarjeta seleccionable con datos de una evidencia del archivo local.',
                                          usageNote:
                                            'La página genera instancias a partir de los registros existentes; una sola definición.',
                                        },
                                        {
                                          id: 'deduction-card',
                                          label: 'DeductionCard',
                                          kind: 'reusable',
                                          source: 'src/components/DeductionCard.jsx',
                                          description:
                                            'Expone una conclusión descubierta y las evidencias que la fundamentan.',
                                          usageNote:
                                            'Se instancia por cada deducción desbloqueada y no duplicada.',
                                        },
                                      ],
                                    },
                                    {
                                      id: 'evidence-archive-page',
                                      label: 'EvidenceArchivePage',
                                      kind: 'page',
                                      source: 'src/pages/EvidenceArchivePage.jsx',
                                      routes: ['/evidencias'],
                                      description:
                                        'Busca y filtra los 25 registros locales, sin exigir que hayan sido registrados en la investigación.',
                                      children: [
                                        {
                                          id: 'evidence-card',
                                          label: 'EvidenceCard',
                                          kind: 'reusable',
                                          source: 'src/components/EvidenceCard.jsx',
                                          description:
                                            'Tarjeta expandible que muestra metadatos y descripción ampliada de una evidencia.',
                                          usageNote:
                                            'La página crea una tarjeta por registro visible; el componente se define una sola vez.',
                                        },
                                      ],
                                    },
                                    {
                                      id: 'case-resolution-page',
                                      label: 'CaseResolutionPage',
                                      kind: 'page',
                                      source: 'src/pages/CaseResolutionPage.jsx',
                                      routes: ['/resolver-caso'],
                                      description:
                                        'Recoge responsable, método y motivo; solo permite presentar la acusación tras completar las siete deducciones.',
                                      contexts: ['InvestigationContext'],
                                      children: [
                                        {
                                          id: 'answer-group',
                                          label: 'AnswerGroup',
                                          kind: 'reusable',
                                          source: 'src/pages/CaseResolutionPage.jsx',
                                          description:
                                            'Componente local que agrupa opciones radio accesibles para responder una parte de la acusación.',
                                          usageNote:
                                            'Se instancia tres veces en la página para responsable, método y motivo.',
                                        },
                                      ],
                                    },
                                    {
                                      id: 'case-result-page',
                                      label: 'CaseResultPage',
                                      kind: 'page',
                                      source: 'src/pages/CaseResultPage.jsx',
                                      routes: ['/resultado'],
                                      description:
                                        'Protege el desenlace hasta resolver correctamente, luego carga la solución confidencial y presenta la cronología.',
                                      contexts: ['InvestigationContext'],
                                    },
                                    {
                                      id: 'art-institute-page',
                                      label: 'ArtInstituteArchivePage',
                                      kind: 'page',
                                      source: 'src/pages/ArtInstituteArchivePage.jsx',
                                      routes: ['/investigacion-api'],
                                      description:
                                        'Consulta la API pública del Art Institute of Chicago y representa registros externos de dominio público.',
                                      children: [
                                        {
                                          id: 'artwork-reference-card',
                                          label: 'ArtworkReferenceCard',
                                          kind: 'reusable',
                                          source: 'src/components/ArtworkReferenceCard.jsx',
                                          description:
                                            'Ficha de una obra externa con título, autoría, fecha, imagen IIIF disponible y enlace al museo.',
                                          usageNote:
                                            'Se instancia por cada registro recibido; no forma parte del archivo de evidencias del caso.',
                                        },
                                      ],
                                    },
                                    {
                                      id: 'component-tree-page',
                                      label: 'ComponentTreePage',
                                      kind: 'page',
                                      source: 'src/pages/ComponentTreePage.jsx',
                                      routes: ['/arbol-componentes'],
                                      description:
                                        'Permite expandir o contraer la jerarquía de componentes, seleccionar nodos y consultar sus responsabilidades.',
                                      children: [
                                        {
                                          id: 'component-tree-node',
                                          label: 'ComponentTreeNode',
                                          kind: 'reusable',
                                          source: 'src/pages/ComponentTreePage.jsx',
                                          description:
                                            'Renderiza recursivamente cada nodo del árbol y sus ramas accesibles.',
                                          usageNote:
                                            'Un único componente recursivo genera todas las instancias visibles del árbol.',
                                        },
                                      ],
                                    },
                                    {
                                      id: 'team-page',
                                      label: 'TeamPage',
                                      kind: 'page',
                                      source: 'src/pages/TeamPage.jsx',
                                      routes: ['/equipo'],
                                      description:
                                        'Presenta el listado de las cinco personas confirmadas y enlaza cada credencial con su perfil estable.',
                                    },
                                    {
                                      id: 'member-page',
                                      label: 'MemberPage',
                                      kind: 'page',
                                      source: 'src/pages/MemberPage.jsx',
                                      routes: ['/equipo/:slug'],
                                      description:
                                        'Resuelve el slug del integrante, muestra su expediente y permite navegar entre perfiles.',
                                    },
                                    {
                                      id: 'suspects-page',
                                      label: 'SuspectsPage',
                                      kind: 'page',
                                      source: 'src/pages/SuspectsPage.jsx',
                                      routes: ['/sospechosos'],
                                      description:
                                        'Combina las cinco fichas públicas con hechos, testimonios, puntos por verificar y preguntas abiertas, enlazados a evidencias por ID.',
                                      children: [
                                        {
                                          id: 'suspect-card',
                                          label: 'SuspectCard',
                                          kind: 'reusable',
                                          source: 'src/components/SuspectCard.jsx',
                                          description:
                                            'Expone una ficha expandible de una persona de interés y organiza por separado la evidencia y su declaración.',
                                          usageNote:
                                            'SuspectCard genera una instancia por sospechoso; las referencias apuntan a evidence.json.',
                                          children: [
                                            {
                                              id: 'evidence-references',
                                              label: 'EvidenceReferences',
                                              kind: 'reusable',
                                              source: 'src/components/SuspectCard.jsx',
                                              description:
                                                'Resuelve IDs de evidencia y presenta los códigos y títulos canónicos del archivo local.',
                                            },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      id: 'documentation-page',
                                      label: 'DocumentationPage',
                                      kind: 'page',
                                      source: 'src/pages/DocumentationPage.jsx',
                                      routes: ['/documentacion'],
                                      description:
                                        'Explica navegación, tecnologías, persistencia local y fuentes de datos, con enlaces internos a las secciones vigentes.',
                                    },
                                    {
                                      id: 'not-found-page',
                                      label: 'NotFoundPage',
                                      kind: 'page',
                                      source: 'src/pages/NotFoundPage.jsx',
                                      routes: ['*', '/equipo/:slug desconocido'],
                                      description:
                                        'Presenta el estado 404 y un enlace para volver a la portada.',
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'shared-context-index',
      label: 'Referencias de estado compartido · relaciones no jerárquicas',
      kind: 'referenceGroup',
      description:
        'Este índice documenta dependencias de estado. Sus elementos no son hijos de renderizado: las páginas acceden al Provider mediante el hook.',
      children: [
        {
          id: 'investigation-context',
          label: 'InvestigationContext',
          kind: 'contextResource',
          source: 'src/context/InvestigationContext.js',
          description:
            'Objeto Context de React usado por InvestigationProvider para ofrecer el progreso compartido.',
          usageNote:
            'El Context no es un componente visual. Su Provider envuelve la aplicación desde main.jsx.',
          relatedNodes: [
            'investigation-provider',
            'app-layout',
            'sidebar',
            'crime-scene-page',
            'investigation-board-page',
            'case-resolution-page',
            'case-result-page',
          ],
        },
        {
          id: 'use-investigation',
          label: 'useInvestigation',
          kind: 'hook',
          source: 'src/context/useInvestigation.js',
          description:
            'Hook compartido que lee el Context y arroja un error explícito si se usa fuera del Provider.',
          usageNote:
            'Es una función hook, no un componente; por eso no se suma al total de componentes.',
          relatedNodes: [
            'app-layout',
            'sidebar',
            'crime-scene-page',
            'investigation-board-page',
            'case-resolution-page',
            'case-result-page',
          ],
        },
      ],
    },
  ],
}

export default componentTree
