# ARCHIVO X — El misterio de la Galería Código

**Trabajo Práctico Grupal 2 · Frontend**

[Aplicación publicada en Vercel](https://tp2-archivo-x.vercel.app/) · [Repositorio en GitHub](https://github.com/adanmateo1889/tp2-archivo-x)

## Descripción y objetivo

ARCHIVO X es una aplicación web interactiva de investigación ambientada en la ficticia Galería Código. Tres obras desaparecieron y el visitante debe examinar la escena, consultar evidencias, contrastar declaraciones y relacionar indicios para resolver el caso.

El objetivo del proyecto es aplicar conceptos de desarrollo frontend —componentes reutilizables, navegación entre páginas, estado, persistencia en el navegador, diseño responsive e interacción— en una experiencia narrativa con estética de agencia detectivesca.

## Temática y funcionamiento

La interfaz utiliza una presentación cinematográfica de expediente: paleta oscura con acentos rojos y dorados, fichas, credenciales y registros. Los cinco integrantes reales del grupo aparecen como investigadores; las obras robadas forman parte del misterio y no se usan como retratos de los integrantes. Los sospechosos son personajes ficticios.

La investigación avanza desde la inspección de tres marcos vacíos hasta el archivo de evidencias y el tablero de deducciones. Para presentar una acusación hay que elegir responsable, método y motivo; la evaluación requiere, además, haber descubierto las siete deducciones. Una acusación incorrecta ofrece un resultado sin revelar la solución y permite volver a intentarlo. El desenlace correcto se muestra únicamente después de resolver el caso.

## Integrantes

Los perfiles de GitHub configurados para el equipo son:

| Integrante | Perfil |
|---|---|
| Adán Mateo (Mateo Israel Adan) | [adanmateo1889](https://github.com/adanmateo1889) |
| Fernando Ezequiel Baca | [fernando-eb2406](https://github.com/fernando-eb2406) |
| Carmen Leonela Lamas | [Carleu27](https://github.com/Carleu27) |
| Raúl Alberto Mata Botana | [RaulMataBotana](https://github.com/RaulMataBotana) |
| Marcelo Yrala | [Marcelo-Yrala](https://github.com/Marcelo-Yrala) |

No se asignan responsabilidades individuales que no estén documentadas en el proyecto.

## Tecnologías

- React 19 y JavaScript con módulos ES.
- Vite 8 para desarrollo y compilación.
- React Router 7 para navegación y rutas internas.
- React Context para compartir el progreso de investigación.
- `localStorage` para conservar el progreso y la preferencia de música en el navegador.
- CSS propio para estilos y diseño responsive.
- Oxlint para análisis estático.

## Funcionalidades principales

- Portada y escena interactiva con tres obras desaparecidas.
- Archivo local de 25 evidencias, con búsqueda por texto, filtro por categoría y fichas expandibles.
- Cinco sospechosos ficticios con declaraciones, coartadas y referencias a IDs de evidencias.
- Tablero para combinar evidencias y desbloquear siete deducciones.
- Acusación de tres partes, con resultado incorrecto sin spoiler y desenlace para la resolución correcta.
- Progreso del caso compartido mediante Context y persistido en `localStorage`; incluye opción para reiniciar la investigación.
- Equipo de cinco integrantes con rutas de perfil, navegación entre perfiles e información ampliable.
- Avatar provisional automático cuando una fotografía de investigador no está disponible.
- Sidebar compartida y adaptable, con indicación de sección activa y menú móvil.
- Música ambiental opcional: requiere activación explícita, se conserva al navegar, funciona en bucle con volumen máximo del 12 %, fade-in de 2 segundos y fade-out de 1,5 segundos.
- Árbol de componentes navegable y bitácora del desarrollo.
- Página de Documentación con guía de rutas y persistencia.

### Fotografías del equipo

Las fotos personales se configuran como recursos públicos en `public/img/investigadores/`, separados de las imágenes de las obras del caso. Las rutas previstas están definidas en `src/data/teamMembers.js`; el componente `InvestigatorPortrait` usa el avatar `public/img/investigadores/avatar-investigador.svg` cuando no encuentra una fotografía. Para cada persona se debe colocar un archivo en la ruta asociada a su perfil; la imagen de Adán está configurada como `adan-mateo.png`. La disponibilidad de un archivo puede variar según los recursos incorporados al repositorio.

## Rutas

| Ruta | Contenido |
|---|---|
| `/` | Portada del expediente y accesos iniciales. |
| `/escena-del-crimen` | Inspección de los marcos e indicios. |
| `/evidencias` | Archivo local con búsqueda y filtros. |
| `/sospechosos` | Fichas de personajes ficticios. |
| `/tablero-de-pistas` | Relación de indicios y deducciones. |
| `/resolver-caso` | Formulario de acusación. |
| `/resultado` | Resultado de la acusación; el desenlace se protege hasta resolver correctamente. |
| `/equipo` | Presentación del equipo investigador. |
| `/equipo/:slug` | Perfil individual por slug. |
| `/arbol-componentes` | Árbol expandible de componentes. |
| `/bitacora` | Registro del desarrollo por etapas. |
| `/documentacion` | Guía de navegación y funcionamiento. |

Las rutas inexistentes muestran una página 404. `/inicio` redirige a la portada.

## Datos, estado y persistencia

Las 25 evidencias del caso se mantienen en `src/data/evidence.json`. Los sospechosos, opciones de acusación, deducciones, cronología y datos del proyecto se organizan en módulos dentro de `src/data/`.

`InvestigationProvider` comparte los IDs de evidencias registradas, las deducciones desbloqueadas y el resultado de la acusación. El estado se valida al recuperarse y se persiste localmente con la clave `archivo-x-investigation-progress-v1`. No hay cuentas ni sincronización entre dispositivos. La solución se carga de forma dinámica tras una acusación correcta.

## Integración de API

La interfaz de consulta del Art Institute of Chicago fue retirada y actualmente no hay una integración API activa en las rutas de la aplicación. El archivo fuente `src/components/ArtInstituteApiStatus.jsx` permanece en el proyecto, pero no está montado ni realiza consultas. Si la consigna académica exige que la versión entregada consuma una API, este requisito debe revisarse y la integración deberá volver a incorporarse en una superficie visible.

## Estructura general

```text
public/
├── audio/                    # Grabación ambiental local
└── img/investigadores/       # Fotografías y avatar provisional
src/
├── assets/                   # Recursos gráficos locales, incluidas imágenes de las obras
├── components/               # Componentes reutilizables y layout
│   └── layout/               # AppLayout y Sidebar
├── context/                  # Provider, Context y hook de investigación
├── data/                     # Evidencias JSON y datos del caso/proyecto
├── pages/                    # Páginas asociadas a las rutas
├── App.jsx                   # Definición de rutas
├── App.css                   # Estilos de la aplicación
├── index.css                 # Estilos globales y variables
└── main.jsx                  # Montaje de React, Router y Provider
README.md
package.json
```

El árbol de componentes se mantiene en `src/data/componentTree.js`; la bitácora, en `src/data/developmentLog.js`.

## Instalación y ejecución local

Requisitos: Node.js `^20.19.0` o `>=22.12.0` y npm. Desde la carpeta raíz:

```bash
npm install
npm run dev
```

Vite informará la dirección local para abrir en el navegador.

### Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run lint` | Ejecuta Oxlint. |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de producción. |

## Despliegue

El proyecto está publicado en Vercel: **[https://tp2-archivo-x.vercel.app/](https://tp2-archivo-x.vercel.app/)**.

## Créditos y consideraciones

- La composición musical utilizada es *Gymnopédie No. 1*, de Erik Satie. El recurso local es `public/audio/ambient-mystery.ogg` (Ogg/Vorbis); la grabación se atribuye a Robin Alciatore, con origen Musopen y licencia indicada como dominio público en [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Erik_Satie_-_gymnopedies_-_la_1_ere._lent_et_douloureux.ogg). La composición y la licencia de una grabación son cuestiones distintas.
- Se conservan recursos gráficos heredados de Galería Código (TP1) para la escena de las obras. La procedencia y condiciones originales de esos recursos deben respetarse.
- La aplicación no requiere credenciales ni variables de entorno para ejecutarse localmente.
- La consigna oficial de la cátedra no está incluida en el repositorio; contrastar con ella los requisitos académicos de entrega, en particular el uso de una API externa.