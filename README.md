# ARCHIVO X — El misterio de la Galería Código

**Trabajo Práctico Grupal 2 · Frontend**

ARCHIVO X es una aplicación web interactiva de investigación. El visitante recorre una galería, consulta expedientes, contrasta testimonios y relaciona evidencias para avanzar en un caso ficticio. La interfaz adopta la estética de una agencia detectivesca: fondos oscuros, acentos rojos y dorados, documentos y fichas de archivo.

> Este README describe funcionalidades verificadas en el código del proyecto. La consigna oficial del TP2 no está incluida en este repositorio; la evaluación de cada requisito debe contrastarse con la consigna entregada por la cátedra.

## Relación con el TP1: Galería Código

El proyecto continúa la identidad narrativa y visual de **Galería Código**, el sitio grupal del TP1 cuya colección sirve de antecedente visual para la investigación ficticia de este TP2. En ARCHIVO X, los cinco integrantes son investigadores; las obras sustraídas pertenecen al expediente del caso y no se usan como sus fotografías personales. Los recursos heredados que aparecen en la escena se conservaron sin alteraciones.

## Equipo

Los siguientes enlaces corresponden a perfiles públicos de GitHub configurados en el proyecto. Se enlazan las cuentas, sin atribuirles responsabilidades individuales en el TP2.

| Integrante | GitHub |
|---|---|
| Adán Mateo (Mateo Israel Adan) | [adanmateo1889](https://github.com/adanmateo1889) |
| Fernando Ezequiel Baca | [fernando-eb2406](https://github.com/fernando-eb2406) |
| Carmen Leonela Lamas | [Carleu27](https://github.com/Carleu27) |
| Raúl Alberto Mata Botana | [RaulMataBotana](https://github.com/RaulMataBotana) |
| Marcelo Yrala | [Marcelo-Yrala](https://github.com/Marcelo-Yrala) |

## Tecnologías

- React 19 y JavaScript con módulos ES.
- Vite 8 para desarrollo y compilación.
- React Router 7 para las rutas de la aplicación.
- React Context para compartir el progreso de investigación.
- `localStorage` para conservar el progreso en el navegador actual.
- CSS para estilos, diseño responsive y componentes visuales.
- Oxlint para análisis estático del código.
- API pública del Art Institute of Chicago para consultar referencias de obras reales, separadas de las evidencias ficticias.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0` (requisito de Vite en las dependencias instaladas).
- npm.
- Conexión a Internet para consultar la API externa. El resto de la aplicación y las evidencias del caso se sirven desde el proyecto local.

## Instalación y ejecución local

Desde la carpeta raíz del proyecto:

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite. |
| `npm run lint` | Ejecuta Oxlint. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. Ejecutar después de `npm run build`. |

## Secciones y rutas

| Ruta | Sección |
|---|---|
| `/` | Portada del expediente. |
| `/equipo` | Presentación de los cinco investigadores. |
| `/equipo/:slug` | Perfil individual; los slugs válidos se obtienen de los datos del equipo. |
| `/escena-del-crimen` | Escena interactiva con tres obras ausentes y registro de indicios. |
| `/evidencias` | Archivo local de evidencias con búsqueda, categorías y fichas expandibles. |
| `/sospechosos` | Fichas de personajes ficticios con testimonios, información por corroborar y referencias a evidencias. |
| `/tablero-de-pistas` | Mesa para relacionar evidencias y desbloquear deducciones. |
| `/resolver-caso` | Formulario de acusación disponible al completar las deducciones. |
| `/resultado` | Desenlace, accesible tras resolver correctamente el caso. |
| `/arbol-componentes` | Árbol navegable de componentes React representados en la aplicación. |
| `/bitacora` | Línea de tiempo del desarrollo por etapas. |
| `/documentacion` | Guía de navegación y funcionamiento, con una verificación mínima de la API externa. |

Las rutas desconocidas muestran una página 404. `/inicio` redirige a la portada.

## Funcionalidades interactivas

- **Escena del crimen:** permite seleccionar los tres marcos, consultar sus expedientes y registrar indicios.
- **Archivo de evidencias:** presenta los 25 registros del JSON local; permite buscar sin distinguir mayúsculas por código, título y descripción, filtrar por categoría y combinar ambos criterios. Cada ficha puede expandirse y la vista incluye contador, estado vacío y restablecimiento de filtros.
- **Sospechosos:** presenta cinco personajes ficticios. Sus fichas distinguen hechos registrados, testimonios, tensiones por corroborar y preguntas abiertas. Las referencias apuntan a IDs existentes del archivo local. La página no identifica al responsable.
- **Tablero de investigación:** permite relacionar dos evidencias, informa cuando una relación no es concluyente y muestra las deducciones desbloqueadas por fases. La interfaz no presenta por anticipado la resolución del caso.
- **Resolución:** el botón se habilita al completar responsable, método y motivo; la evaluación sigue bloqueada hasta descubrir las siete deducciones. Una acusación incorrecta abre una pantalla de resultado que no revela la solución y permite revisar o reintentar; una correcta habilita el desenlace.
- **Progreso:** se puede reiniciar la investigación mediante la opción de la sidebar y su confirmación.
- **Perfiles del equipo:** las tarjetas enlazan a cinco páginas individuales reutilizadas mediante una ruta dinámica. La información no disponible se deja sin completar, en lugar de inventarla.
- **Navegación responsive:** layout compartido, sidebar adaptable y rutas internas para recorrer el proyecto.

## Datos de evidencias

`src/data/evidence.json` es la fuente local de las **25 evidencias ficticias**, cada una con un ID y datos como título, categoría, descripción, ubicación y relevancia. La distribución actual es:

| Categoría | Registros |
|---|---:|
| Evidencias físicas | 8 |
| Registros digitales | 6 |
| Testimonios | 5 |
| Documentos | 4 |
| Fotografías | 2 |
| **Total** | **25** |

El archivo de consulta usa los registros directamente, sin duplicarlos ni exigir que se hayan registrado previamente en la escena. Las categorías del filtro se derivan de los valores del JSON.

Los sospechosos, las opciones de acusación, las deducciones, la cronología y la solución narrativa se mantienen en archivos de datos separados dentro de `src/data/`. La solución se importa de forma dinámica en el flujo de evaluación del caso; este README no revela el desenlace.

## Estado y persistencia

`InvestigationProvider` comparte mediante React Context los IDs de evidencias registradas, los IDs de deducciones desbloqueadas y el resultado de la acusación. El progreso se guarda en `localStorage` bajo la clave `archivo-x-investigation-progress-v1`, se valida al recuperarse y se limpia al reiniciar la investigación.

La persistencia es local al navegador y al dispositivo: no hay una cuenta de usuario ni sincronización entre dispositivos. La solución narrativa no se expone en el estado público del Context.

## API pública

Para conservar el requisito académico de consumir una API pública, la página `/documentacion` verifica con `fetch` y `useEffect` la API del [Art Institute of Chicago](https://api.artic.edu/docs/):

```text
https://api.artic.edu/api/v1/artworks/search?q=painting&limit=24&fields=id,title,artist_display,date_display,is_public_domain
```

El panel muestra estados de carga, éxito, error y ausencia de resultados, permite reintentar y presenta un registro real de dominio público recibido. **No descarga ni muestra imágenes**: se retiró la galería externa y sus solicitudes IIIF. Esta comprobación de metadatos está separada de las evidencias ficticias de `evidence.json`, no se guarda como progreso y no interviene en el misterio. La consulta requiere conexión a Internet y puede estar temporalmente indisponible.

## Árbol de componentes y bitácora

- **Árbol:** `/arbol-componentes` presenta una jerarquía navegable de la aplicación y permite expandir, contraer y seleccionar nodos. Su catálogo se mantiene en `src/data/componentTree.js`.
- **Bitácora:** `/bitacora` organiza el desarrollo del proyecto en entradas por etapa, con filtros y contenido expandible. Los datos están en `src/data/developmentLog.js`. Las etapas se identifican por número cuando no hay una fecha verificable; no se asignan responsabilidades individuales no documentadas.

## Organización del proyecto

```text
.
├── public/
│   ├── audio/               # Música ambiental
│   └── img/investigadores/  # Fotografías personales y avatar provisional
├── src/
│   ├── assets/              # Recursos gráficos locales; incluye imágenes de obras del caso
│   ├── components/
│   │   └── layout/          # AppLayout y Sidebar compartidos
│   ├── context/             # Context, Provider y hook de investigación
│   ├── data/                # JSON y módulos de datos del caso y del proyecto
│   ├── pages/               # Páginas asociadas a las rutas
│   ├── App.jsx              # Definición de rutas
│   ├── App.css              # Estilos de la aplicación
│   ├── index.css            # Estilos globales y variables
│   └── main.jsx             # Montaje de React, Router y Provider
├── index.html
├── package.json
└── README.md
```

Los componentes compartidos principales son `ArtworkFrame`, `ArtworkDossier`, `EvidenceCard`, `ClueCard`, `DeductionCard`, `SuspectCard`, `ArtInstituteApiStatus`, `InvestigatorPortrait` y `BackgroundMusic`. Las páginas individuales del equipo se resuelven con `MemberPage` y la ruta dinámica `/equipo/:slug`.

### Fotografías del equipo

Las fotos de investigadores se sirven desde `public/img/investigadores/`, separadas de las imágenes originales utilizadas por las obras del caso. Para agregar o reemplazar una foto, guardá un archivo JPEG con el nombre exacto correspondiente; no hace falta modificar componentes de React:

| Integrante | Ruta pública |
|---|---|
| Adán Mateo | `public/img/investigadores/adan-mateo.png` |
| Fernando Ezequiel Baca | `public/img/investigadores/fernando-ezequiel-baca.jpg` |
| Carmen Leonela Lamas | `public/img/investigadores/carmen-leonela-lamas.jpg` |
| Raúl Alberto Mata Botana | `public/img/investigadores/raul-alberto-mata-botana.jpg` |
| Marcelo Yrala | `public/img/investigadores/marcelo-yrala.jpg` |

Si alguna ruta no contiene una imagen que pueda cargarse, `InvestigatorPortrait` muestra automáticamente `public/img/investigadores/avatar-investigador.svg`. Adán tiene asignada la ruta `adan-mateo.png`, pero el archivo todavía no está presente en el directorio de recursos; hasta incorporarlo se muestra el avatar. Los otros cuatro perfiles conservan el avatar provisional hasta que se incorporen sus fotografías.

## Música ambiental

La composición elegida es *Gymnopédie No. 1*, de Erik Satie. El reproductor usa `public/audio/ambient-mystery.ogg`, un archivo Ogg/Vorbis (no MP3) cuya huella SHA-1 coincide con el archivo de Wikimedia Commons citado abajo.

**Créditos y licencia de la grabación**

- Composición: Erik Satie, *Gymnopédie No. 1* (composición de dominio público).
- Intérprete/autor indicado en los metadatos y en Wikimedia Commons: Robin Alciatore.
- Fuente/crédito de origen: [Musopen](https://musopen.org/), según la ficha de [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg).
- Licencia indicada por Wikimedia Commons: dominio público. La ficha reproduce la declaración de Musopen de que sus grabaciones son de dominio público; Musopen solicita, como cortesía, no vender directamente sus grabaciones y atribuir Musopen a obras comerciales o derivadas.

`BackgroundMusic` está integrado en la sidebar y mantiene una sola instancia al navegar. La reproducción requiere activación explícita y no comienza al cargar o recargar, aunque `localStorage` recuerde la preferencia. El audio se reproduce en bucle con volumen máximo de 12 %, fade-in de 2 segundos y fade-out de 1,5 segundos.

## Asistencia de inteligencia artificial

La preparación de esta documentación y la revisión de datos del repositorio en la Etapa 14 se realizaron con asistencia de un asistente de IA mediante Copilot SDK en VS Code. En los archivos revisados no hay un registro verificable del uso de IA durante las etapas anteriores ni por parte de cada integrante; por eso no se atribuye ese uso a otras personas o etapas.

## Pruebas y verificaciones

En esta revisión final se ejecutaron:

```bash
npm.cmd run lint
npm.cmd run build
```

Ambos comandos finalizaron correctamente. Una verificación funcional con Playwright recorrió las rutas principales y los cinco perfiles; comprobó las fichas ampliables, navegación entre integrantes, expediente de una obra, respuesta de la API, fallback de imágenes y apertura del menú móvil. También confirmó una sola instancia de audio, activación explícita, continuidad al navegar, volumen máximo de 12 % y que una preferencia guardada no inicia la reproducción tras recargar. No se observó desbordamiento horizontal a 390 px, 768 px ni 1440 px. La prueba actual no repitió el recorrido completo de deducciones y acusación; esa funcionalidad no se modificó en esta revisión.

La API del Art Institute respondió con registros en pruebas anteriores. La versión de entrega verifica únicamente la API JSON; ya no incluye solicitudes IIIF ni galería de imágenes externas.

## Créditos y fuentes

- **Art Institute of Chicago:** API pública para consultar metadatos de obras; consultar la [documentación oficial de la API](https://api.artic.edu/docs/). Esta versión no incorpora imágenes externas.
- **Galería Código (TP1):** las imágenes heredadas de `src/assets/images/` siguen disponibles como recursos de las obras representadas en la escena; no se utilizan como fotos del equipo en portada, directorio ni perfiles. La procedencia y las condiciones de uso originales deben conservarse según la documentación del TP1.
- **Identidad visual:** paleta, composición del expediente, marcos y recursos CSS integrados en este proyecto.

No se encontró en los archivos revisados una atribución individual o licencia detallada para todos los recursos visuales heredados. El equipo debe confirmar esa información antes de publicar.

## Publicación

**Vercel:** pendiente de publicación. El enlace se agregará cuando el equipo despliegue la aplicación; no hay una URL publicada confirmada todavía.

## Información por confirmar antes de la entrega

- Enlace de despliegue en Vercel.
- Procedencia y licencia o autorización de uso de los recursos visuales heredados, si corresponde.
- Incorporar las fotografías personales del equipo en las rutas documentadas cuando estén disponibles; hasta entonces, los perfiles usan el avatar provisional.
- Si la cátedra solicita algún requisito adicional que no esté descrito en la consigna disponible para este repositorio.
- Presentación y habilidades/intereses de Adán Mateo (Mateo Israel Adan), si el equipo desea completar su perfil.
- Participaciones individuales del equipo, únicamente si desean documentarlas y pueden verificarlas.
