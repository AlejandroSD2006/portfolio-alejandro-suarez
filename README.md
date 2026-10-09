# TAREA 2: Nuxt, páginas legales, cookies, preloader, scroll animations y más skills

Eres un desarrollador frontend senior. Esta tarea **continúa** el rediseño anterior del portfolio (secciones Skills, componentes dinámicos, etc.). Vas a **añadir y migrar**, no a rehacer el diseño. Lee todo este documento antes de tocar nada.

## 0. Cómo quiero que trabajes

1. **Primero lee, luego escribe.** Abre y lee `package.json`, `src/App.vue`, `src/main.js`, `src/style.css`, todo `src/components/`, `src/composables/`, `src/directives/` y `src/data/`. **Comprueba qué existe ya de la tarea anterior** (`SkillsSection.vue`, `SkillCard.vue`, `SkillIcon.vue`, `NeuralBackground.vue`, `TypewriterText.vue`, `CountUp.vue`, `v-reveal`, `v-magnetic`, `src/data/skills.js`…). Si existe, **modifícalo**; si falta algo que este documento necesita, créalo siguiendo las especificaciones de aquí.
2. **Trabaja por fases**, en orden. Al acabar cada fase ejecuta `npm run build`; si falla, arréglalo antes de seguir. Si no puedes terminar todo, prioriza en este orden: Fase 1 → 6 → 3 → 2 → 4 → 5 → 7.
3. **No me preguntes entre fases.** Ante una ambigüedad elige la opción más simple y anótala en el informe final.
4. **No lances comandos que bloqueen la terminal** (`npm run dev`, `npm run preview`). Valida con `npm run build` y con `grep`.
5. **No inventes datos personales ni legales.** Todo dato que no esté en el código ni en este documento (NIF, dirección, dominio, hosting…) queda como `// TODO(alex): ...` y se muestra en la web como un marcador visible `[TO BE COMPLETED]` (ver Fase 6).
6. **Todo el texto visible de la web está en inglés**, incluidas las páginas legales, el banner de cookies y el preloader. Comentarios de código en español, breves.

## 1. Fase 0 — Checkpoint y entorno

1. Ejecuta `node -v`. **Nuxt 4.6 exige Node `^22.22.3 || ^24.15.0 || >=26`.** Si la versión es menor, **para** y dime exactamente cómo actualizar (nvm / instalador), sin tocar nada más.
2. Si hay repositorio git: `git switch -c feat/nuxt-legal-preloader` y haz un commit de checkpoint con lo que haya (`chore: checkpoint before nuxt migration`).
3. Dependencias permitidas en esta tarea: `nuxt`, `@nuxt/image`, `@nuxt/fonts` (nuevas) y las que ya hay (`vue`, `lucide-vue-next`, `simple-icons`). **Nada más.** No añadas `vue-router` (Nuxt ya lo incluye) ni librerías de animación.
4. **Cambio de regla respecto a la tarea anterior:** antes estaba prohibido `localStorage`. Ahora se permite **solo** para guardar la elección de consentimiento de cookies (Fase 6). Para cualquier otra cosa sigue prohibido, incluido `sessionStorage`.

## 2. Fase 1 — Migración a Nuxt 4 (sin cambiar el diseño)

Quiero Nuxt por tres razones: optimización de imágenes (`@nuxt/image`), rutas por archivos (páginas legales) y HTML prerenderizado. El aspecto y el comportamiento de la web **no deben cambiar**.

**Mapa de migración (convenciones de Nuxt 4: el código vive en `app/`):**

| Ahora | Después |
|---|---|
| `index.html` | `nuxt.config.ts` → `app.head` (conserva `lang="en"`, `<title>` "Alejandro Suárez Durán — Cloud & Systems", meta description y `theme-color`). **Elimina** los `<link>` de Google Fonts (ver Fase 2). |
| `src/main.js` | Se elimina. Las directivas se registran en `app/plugins/directives.js` |
| `src/App.vue` | `app/app.vue` (solo `<NuxtLayout><NuxtPage /></NuxtLayout>`), `app/layouts/default.vue` (preloader, barra de progreso, header, `<slot />`, footer, banner de cookies) y `app/pages/index.vue` (hero, marquee, Experience, Skills, About, Contact) |
| `src/style.css` | `app/assets/css/main.css` (registrado en `css: ['~/assets/css/main.css']`) |
| `src/components/**` | `app/components/**` |
| `src/composables/**`, `src/data/**`, `src/directives/**` | `app/composables/**`, `app/data/**`, `app/directives/**` |
| `Curriculum-Alejandro.pdf` (importado con `?url`) | `public/Curriculum-Alejandro.pdf`, enlazado como `/Curriculum-Alejandro.pdf` |
| `img-prueba/*` | `public/img/*` (necesario para que `@nuxt/image` las procese) |
| `vite.config.js` | Se elimina |

**`nuxt.config.ts`** (es el único archivo TypeScript; el resto del código sigue en JS):
```ts
export default defineNuxtConfig({
  compatibilityDate: '2026-10-09',
  devServer: { port: 5173 },                      // mantengo mi puerto de siempre
  modules: ['@nuxt/image', '@nuxt/fonts'],
  components: [{ path: '~/components', pathPrefix: false }],  // los componentes de /ui conservan su nombre
  css: ['~/assets/css/main.css'],
  routeRules: { '/**': { prerender: true } },
  image: { format: ['avif', 'webp'], quality: 80 },
  // app.head y fonts: ver arriba y Fase 2
})
```

**Reglas de la migración:**
- `package.json` scripts: `dev: nuxt dev`, `build: nuxt build`, `generate: nuxt generate`, `preview: nuxt preview`, `postinstall: nuxt prepare`. Elimina `vite` y `@vitejs/plugin-vue` de las dependencias (Nuxt los incluye).
- `.gitignore`: añade `.nuxt`, `.output`, `.data`, `.nitro`, `.cache`. Mantén lo que ya tiene.
- **SSR-safe:** todo acceso a `window`, `document`, `matchMedia`, `IntersectionObserver` o `requestAnimationFrame` va dentro de `onMounted` o tras `import.meta.client`. `useMotion.js` debe seguir siendo seguro en servidor.
- **Directivas (`v-reveal`, `v-magnetic`):** regístralas en el plugin con `nuxtApp.vueApp.directive(...)` y añade a cada una `getSSRProps: () => ({})` para que no rompan el render de servidor.
- **`NeuralBackground`** se renderiza solo en cliente (`<ClientOnly>` o sufijo `.client.vue`). **`TypewriterText`** y **`CountUp`** deben renderizar en servidor el valor/texto final y arrancar la animación en `onMounted` (sin *hydration mismatch*).
- Los enlaces de navegación a secciones pasan a `<NuxtLink :to="{ path: '/', hash: '#work' }">` (para que funcionen también desde las páginas legales). Mantén `scroll-behavior: smooth` y `scroll-padding-top`.
- `useScrollSpy` debe tolerar que las secciones no existan (páginas legales) y reiniciarse al cambiar de ruta.
- No cambies estilos ni textos en esta fase salvo lo imprescindible para que compile.

**Verificación:** `npm run build` sin errores y existen en `.output/public` los HTML de `/`.

## 3. Fase 2 — Imágenes fluidas y fuentes propias

**Imágenes con `@nuxt/image` (v2, ya instalado):** sustituye los `<img>` por componentes de Nuxt Image.
- **Hero** (`nebulosa`): `<NuxtImg src="/img/nebulosa.avif" class="landscape-image" sizes="100vw md:55vw" format="avif,webp" :preload="{ fetchPriority: 'high' }" loading="eager" fetchpriority="high" placeholder placeholder-class="is-placeholder" alt="A colorful nebula surrounded by stars" @load="..." />`. Es la imagen crítica: se precarga con prioridad alta y aparece con *blur-up* (placeholder borroso que se enfoca).
- **About** (`jupiter`): `<NuxtPicture src="/img/jupiter.jpeg" format="avif,webp" sizes="100vw md:45vw" loading="lazy" placeholder alt="Jupiter and its cloud bands, including the Great Red Spot" />`. Esto resuelve que el original pese 1,7 MB: se sirve redimensionada y en AVIF/WebP.
- Mantén las clases y el `object-fit: cover` actuales; los contenedores ya tienen `aspect-ratio`, así que no debe haber saltos de layout (CLS).
- No añadas CSS de `opacity` + `@load` para hacer fade-in a mano: el `placeholder` ya hace la transición suave y un fade manual puede dejar la imagen invisible si carga antes de la hidratación.
- No configures un `provider` a mano: `@nuxt/image` detecta Vercel por sí solo. `// TODO(alex): confirmar dónde se despliega`.
- Si IPX no pudiera leer el AVIF original, no lo "arregles" convirtiendo imágenes: usa `format="webp"` en ese componente y dímelo en el informe.

**Fuentes autoalojadas con `@nuxt/fonts`** (esto es también por privacidad: así el navegador del visitante **no** contacta con Google al cargar la web):
```ts
fonts: { families: [
  { name: 'Manrope', provider: 'google', weights: [400, 500, 600, 700, 800] },
  { name: 'DM Mono', provider: 'google', weights: [400, 500] },
] }
```
- Georgia es una fuente del sistema: no hay que cargarla.
- **Verificación obligatoria:** tras `npm run build`, `grep -R "fonts.googleapis.com\|fonts.gstatic.com" .output/public` **no debe devolver nada**. Si devuelve algo, corrígelo.

## 4. Fase 3 — Preloader con mi nombre

Crea `app/components/AppPreloader.vue` y úsalo en `layouts/default.vue`. Debe verse **cuidado y "chachi"**, coherente con la estética editorial del sitio.

**Diseño:**
- Pantalla completa, `position: fixed; inset: 0; z-index: 100`, fondo `var(--ink)`, texto `var(--paper)`, acento `var(--lime)`.
- Arriba a la izquierda, mono 10px: `PORTFOLIO — 2026`. Arriba a la derecha: `CLOUD · SYSTEMS · DATA`.
- Centro: el logo `AS` (círculo SVG de 1px que **se dibuja** con `stroke-dashoffset` y las letras `AS` en mono dentro), y debajo mi nombre grande en dos líneas: **`ALEJANDRO`** (Manrope 800, mayúsculas, `letter-spacing: -.04em`, `clamp(44px, 9vw, 132px)`) y **`Suárez Durán`** (Georgia cursiva, clase `.serif-accent`, mismo tamaño). Cada línea va en un contenedor con `overflow: hidden` y cada **letra** es un `<span style="--i: n">` que sube desde `translateY(110%)` con `transition-delay: calc(var(--i) * 35ms)` y la curva `var(--ease)`. Divide el texto con `Array.from(...)` (hay una `Á`/`á` acentuada) y que se renderice igual en servidor y cliente.
- Abajo: una barra fina (1px, `scaleX(progreso)`, color `var(--lime)`) y a la derecha un contador mono `000 → 100`.
- Salida: el nombre sube y desaparece (`translateY(-110%)`), y la pantalla se abre como una **cortina** que se levanta con `clip-path: inset(0 0 100% 0)` en ~800ms con `var(--ease)`, dejando ver el hero.

**Lógica (progreso REAL, no falso):** el progreso se calcula con estas tareas completadas: (1) `document.fonts.ready`, (2) el evento `@load` de la imagen del hero (con timeout de 4 s por si falla), (3) `document.readyState === 'complete'`. El valor mostrado se suaviza con `requestAnimationFrame` (interpolación) para que no dé saltos. **Duración mínima 1600 ms** (para que se aprecie la animación del nombre) y **tope máximo 6000 ms** tras el cual se fuerza la salida.
- Al terminar: quita la clase `is-loading` de `<html>`, pon `document.documentElement.dataset.ready = 'true'`, dispara `window.dispatchEvent(new Event('app:ready'))` y elimina el componente del DOM (`v-if`).
- Bloqueo de scroll mientras carga: `useHead({ htmlAttrs: { class: 'is-loading' } })` y `html.is-loading { overflow: hidden; }`.
- **Solo una vez por carga completa de página**: usa `useState('preloaderDone', () => false)`. En navegación interna (p. ej. al ir a una página legal) no vuelve a salir. **No guardes nada en storage** para esto.
- **Sin JavaScript:** el preloader se renderiza en servidor, así que añade `useHead({ noscript: [{ innerHTML: '<style>.preloader{display:none!important}html.is-loading{overflow:auto!important}</style>' }] })` para que nadie se quede atascado.
- **Accesibilidad:** contenedor con `role="status"` y `aria-live="polite"`; el nombre animado con `aria-hidden="true"` y un `<span class="sr-only">Loading Alejandro Suárez Durán's portfolio</span>`. Con `prefers-reduced-motion`: sin animación por letras ni cortina; se muestra el nombre estático, la barra avanza y la salida es un fade de ≤250 ms.

**Composable `useAppReady()`** (`app/composables/useAppReady.js`): devuelve un `ref` booleano `ready`. En `onMounted`: si `document.documentElement.dataset.ready === 'true'` → `true`; si no, espera una vez a `app:ready`. **Todo lo que arranca solo en la primera pantalla espera a `ready`:** typewriter, `NeuralBackground`, `CountUp` del hero y los reveals iniciales. Así no se pierden animaciones detrás de la cortina.

## 5. Fase 4 — Animaciones de scroll al bajar Y al subir

Quiero que los elementos **aparezcan al bajar y también al volver a subir** (se repiten, no son de una sola vez), y que la dirección se note.

**Esta fase sustituye la especificación anterior de `v-reveal` (que era "una sola vez").** Reescribe `app/directives/reveal.js`:
- Añade la clase `reveal` al montar. Modificadores: `v-reveal` (sube desde abajo), `.fade` (solo opacidad), `.left`, `.right` (entra en horizontal 32px), `.zoom` (`scale(.94)` → 1). Retardo: `v-reveal="{ delay: 120 }"` → `--reveal-delay`.
- Un **único listener de scroll pasivo compartido** guarda la dirección (`'down' | 'up'`).
- `IntersectionObserver` con `threshold: 0.12` y `rootMargin: '0px 0px -6% 0px'`.
  - Al **entrar**: escribe `el.dataset.dir = direction`, fuerza reflow (`void el.offsetWidth`) y en el siguiente `requestAnimationFrame` añade `is-visible`. Si se baja, el elemento llega desde **abajo** (`translateY(+28px)`); si se sube, llega desde **arriba** (`translateY(-28px)`).
  - Al **salir** del viewport: quita `is-visible`, de modo que se vuelve a animar la próxima vez.
- CSS: `.reveal { opacity: 0; transform: translate3d(var(--rx, 0), var(--ry, 28px), 0); transition: opacity .7s var(--ease), transform .7s var(--ease); transition-delay: var(--reveal-delay, 0ms); } .reveal[data-dir="up"] { --ry: -28px; } .reveal.is-visible { opacity: 1; transform: none; }`
- No empieza a observar hasta `app:ready` (si ya está listo, empieza al montar).
- Con `prefers-reduced-motion: reduce` la directiva no hace nada (todo visible).
- Limpieza: `unmounted` desconecta el observer del elemento.

**Dónde aplicarla (con variedad, no todo igual):** cabeceras de sección (`.work-heading`, cabecera de Skills, `.section-heading`, `.contact-copy`), `StatsStrip` (con `delay` escalonado 0/100/200), tarjetas de proyecto (`.left` y `.right`), contenedor del grid de Skills, entradas del timeline de educación (delay escalonado), `.about-body`, `.message-form`.

**Reglas para evitar conflictos:**
- **Nunca** pongas `v-reveal` y un `transform` de hover/tilt en el **mismo elemento**: envuelve o usa el elemento interno. (Ej.: el reveal va en `.project-card`; el hover de elevación, en `.project-art`.)
- No apliques `v-reveal` a cada `SkillCard` individual (choca con el `TransitionGroup` del filtro): aplícalo al contenedor del grid.

**Opcional, solo al final y si no complica nada:** parallax suave de las dos imágenes como mejora progresiva con `@supports (animation-timeline: view())` (`animation-timeline: view()` y un `translateY` de ±20px). Si el navegador no lo soporta, no pasa nada. Si dudas, omítelo.

## 6. Fase 5 — Skills nuevas y cambio de "Résumé"

**Añade a `app/data/skills.js` estas 5 skills** (con el mismo formato que las demás). Iconos ya verificados en `simple-icons` 16.34.0:
- **Vercel** → categoría `cloud`, icono `siVercel`.
- **AWS** → categoría `cloud`. **`simple-icons` no tiene el icono de AWS**: usa el icono `Cloud` de lucide.
- **Vue** → categoría `web`, icono `siVuedotjs`.
- **Pandas** → categoría `data`, icono `siPandas`.
- **PyMath** → categoría `data`, icono `Sigma` de lucide. Deja `// TODO(alex): confirmar el nombre exacto de esta skill; si es NumPy o SymPy, cambiar el icono a siNumpy o siSympy (ambos existen)`.
- No añadas `usedIn` a ninguna de las nuevas. No añadas ninguna otra skill.
- Total tras el cambio: **17 skills** (cloud 7 · data 5 · web 4 · network 1). Los contadores (`StatsStrip`, filtros, texto "N TECHNOLOGIES") salen de los datos, así que se actualizan solos; comprueba que es así y que el marquee también incluye las nuevas.

**"Résumé" → "View CV":**
- En el nav (escritorio y menú móvil), el texto `Résumé` pasa a **`View CV`** (mantén el icono `ArrowUpRight`, el `target="_blank"` y `rel="noreferrer"`). Añade `aria-label="View CV (opens PDF in a new tab)"`.
- Busca con `grep -ri "résumé\|resume"` en todo `app/` y sustituye cualquier otra aparición visible por "CV" o "View CV" según el contexto. No cambies el nombre del archivo PDF.

## 7. Fase 6 — Aviso legal, política de privacidad y cookies

La web debe tener **tres páginas legales** (en inglés) y un **sistema de consentimiento de cookies**. Aplican la normativa española y europea: RGPD (Reglamento UE 2016/679), LOPDGDD (Ley Orgánica 3/2018) y LSSI-CE (Ley 34/2002; art. 10 y art. 22.2).

**Rutas y archivos:**
- `app/pages/legal-notice.vue` → `/legal-notice` ("Legal Notice")
- `app/pages/privacy-policy.vue` → `/privacy-policy` ("Privacy Policy")
- `app/pages/cookie-policy.vue` → `/cookie-policy` ("Cookie Policy")
- `app/components/LegalPage.vue`: plantilla común (`.wrap`, columna de lectura de ~70ch, eyebrow mono `LEGAL / ...`, `<h1>` en el estilo del sitio con parte `.serif-accent`, línea mono `Last updated: {lastUpdated}`, índice de secciones con anclas si hay más de 4, enlace "← Back to home"). Cada página con `useSeoMeta({ title, description })`.
- `app/data/legal.js`:
```js
export const legal = {
  owner: 'Alejandro Suárez Durán',
  email: 'asuadur14@gmail.com',
  taxId: '',     // TODO(alex): NIF/NIE
  address: '',   // TODO(alex): dirección postal
  domain: '',    // TODO(alex): dominio de la web
  hosting: '',   // TODO(alex): proveedor de hosting (¿Vercel?)
  lastUpdated: '2026-10-09',
}
```
- **Campos vacíos:** se muestran en la web como `<mark class="todo">[TO BE COMPLETED]</mark>` (fondo `var(--lime-soft)`), y en desarrollo hay un `console.warn` que lista los campos pendientes. Así es imposible publicarlos sin darse cuenta.
- En cada página, un comentario al inicio del archivo: `<!-- Borrador generado con IA: el titular debe revisarlo (idealmente con un profesional legal) antes de publicar. -->`

**Contenido de cada página (redáctalo en inglés claro y conciso, sin jerga innecesaria, y SIN inventar hechos):**

*Legal Notice* (art. 10 LSSI-CE): 1) Owner identification: nombre, NIF/NIE, dirección, email, dominio. 2) Purpose: personal portfolio website to showcase professional experience, skills and contact details. 3) Terms of use. 4) Intellectual and industrial property: contenido y diseño © Alejandro Suárez Durán; los logos de tecnologías pertenecen a sus respectivos titulares y se usan solo para identificarlas; iconos de interfaz de Lucide; **sección "Image credits" con `// TODO(alex)`** porque las dos imágenes del sitio (nebulosa y Júpiter) son de prueba y necesito confirmar su autoría y licencia. 5) Liability disclaimer. 6) External links (LinkedIn, etc.). 7) Governing law: Spanish law; Spanish courts, sin perjuicio de los derechos de consumidor que correspondan.

*Privacy Policy* (arts. 13–14 RGPD): 1) Data controller (mismos datos que el aviso legal). 2) Qué datos se tratan y para qué: **(a)** si el visitante me escribe por email, datos del email y del mensaje para responder (base legal: consentimiento / interés legítimo en responder; art. 6.1.a y 6.1.f); **(b)** registros técnicos del servidor (IP, navegador, fecha) tratados por el proveedor de hosting por seguridad y funcionamiento. 3) **Lo que la web NO hace** (mantenlo solo si es cierto en el código): el formulario de contacto no envía datos a ningún servidor, solo abre el cliente de correo del visitante con `mailto:`; las fuentes están autoalojadas (no se contacta con Google); no hay publicidad ni perfiles. 4) Retención: el tiempo necesario para atender la consulta. 5) Recipients and international transfers: hosting provider (`TODO(alex)`: confirmar proveedor y si hay transferencias fuera del EEE y con qué garantías). 6) Rights: acceso, rectificación, supresión, limitación, portabilidad y oposición, y cómo ejercerlos (por email); derecho a reclamar ante la **AEPD** (Agencia Española de Protección de Datos, aepd.es). 7) Security. 8) Changes to this policy. 9) Contacto.

*Cookie Policy* (art. 22.2 LSSI-CE + RGPD): 1) Qué son las cookies y el almacenamiento local. 2) **Tabla de lo que usa esta web**, generada desde `app/data/consent.js` para que doc y código nunca se desincronicen: nombre, tipo (almacenamiento local propio), finalidad, categoría, duración. Hoy solo hay una entrada: la clave del registro de consentimiento (categoría *Strictly necessary*, hasta que se borre o 12 meses). 3) Categorías: *Strictly necessary* (siempre activas) y *Analytics* (desactivadas por defecto; solo se activan si el visitante acepta; `TODO(alex): indicar aquí si se usa alguna herramienta de analítica y cuál`). 4) Cómo cambiar o retirar el consentimiento en cualquier momento (enlace "Cookie settings" del footer) y cómo borrar el almacenamiento desde el navegador. 5) Cookies de terceros: indicar que actualmente no se cargan. 6) Updates.

**Sistema de consentimiento (propio, sin librerías):**
- `app/data/consent.js`: `consentCategories` = `[{ id: 'necessary', label: 'Strictly necessary', required: true, description }, { id: 'analytics', label: 'Analytics', required: false, description: 'Anonymous usage statistics to improve the site. Off unless you accept.' }]` y `consentItems` (la tabla del punto anterior). También `CONSENT_VERSION = 1`.
- `app/composables/useConsent.js` (estado con `useState`): lee/escribe en `localStorage` bajo la clave `portfolio-cookie-consent` un objeto `{ version, timestamp, categories }` (solo en cliente, con `try/catch`). Funciones: `acceptAll()`, `rejectAll()`, `save(categories)`, `openPreferences()`, `hasDecided` (computed). **Se vuelve a preguntar** si cambia `CONSENT_VERSION` o pasan más de 12 meses. Incluye `onConsent('analytics', callback)`: registra una función que solo se ejecuta si hay consentimiento (punto de enganche para cargar analítica en el futuro; **no instales ninguna analítica**).
- `app/components/CookieBanner.vue`: aparece tras `ready` (+400 ms) si `!hasDecided`. Posición fija abajo a la izquierda (máx. 420px) en escritorio y a todo el ancho abajo en móvil. Panel `#fbfaf6`, borde `1px solid var(--line)`, eyebrow mono `COOKIES`, texto breve ("I use only the storage this site needs to work, plus optional analytics if you allow it. You can change your choice at any time.") con enlace a `/cookie-policy`.
  - **Tres acciones**: `Reject all`, `Accept all` y `Settings`. **`Reject all` y `Accept all` tienen exactamente el mismo estilo, tamaño y peso visual** (rechazar tiene que ser tan fácil como aceptar; nada de patrones oscuros). `Settings` es un enlace subrayado mono.
  - No bloquea el scroll ni el contenido (sin *cookie wall*). `role="dialog"`, `aria-labelledby`, `aria-modal="false"`, foco gestionado y accesible con teclado.
- `app/components/CookiePreferences.vue`: diálogo modal con *focus trap*, cierre con `Esc` y clic en el fondo, un interruptor por categoría (`necessary` bloqueado en ON; `analytics` **desmarcado por defecto**, nunca premarcado), botones `Save preferences`, `Reject all`, `Accept all` (de nuevo con el mismo peso visual), `aria-modal="true"`. Se puede abrir desde el banner y desde el footer.
- Con `prefers-reduced-motion`, el banner aparece sin animación; en otro caso, entra con fade + `translateY` desde abajo.
- Sin JavaScript: oculta el banner con el mismo `noscript` del preloader.

**Footer (`layouts/default.vue`):** mantén el wordmark, la frase y el copyright. Añade una fila de enlaces mono: `Privacy Policy · Legal Notice · Cookie Policy · Cookie settings` (este último es un `<button>` con estilo de enlace que llama a `openPreferences()`). Debe ser responsive (en móvil, en columna o en dos columnas, sin desbordar).

**Contacto:** bajo el formulario, junto a la nota actual, añade una frase: "I only use your details to reply to you. See the Privacy Policy." con enlace a `/privacy-policy`. No cambies el funcionamiento del `mailto:`.

## 8. Fase 7 — Pulido y verificación

- `npm run build` final sin errores ni warnings relevantes.
- `grep -R "fonts.googleapis.com\|fonts.gstatic.com" .output/public` → vacío.
- Comprueba que **no hay ningún `console.error`**, ni *hydration mismatch*, en el código (revisa especialmente `TypewriterText`, `CountUp`, `NeuralBackground`, preloader y banner).
- Revisa a 1440, 900 y 390 px: sin scroll horizontal; preloader, banner y diálogo bien en móvil.
- `:focus-visible` correcto en todo lo nuevo (enlaces del footer, botones del banner, interruptores).
- Con `prefers-reduced-motion: reduce`: sin cortina, sin letras animadas, sin reveals, sin canvas animado.

## 9. Criterios de aceptación

- [ ] El proyecto es Nuxt 4, arranca en el puerto 5173 y el diseño es el mismo que antes de migrar.
- [ ] Las imágenes usan `NuxtImg`/`NuxtPicture`: la del hero con `preload` y prioridad alta + blur-up, la de About en lazy + blur-up, ambas en AVIF/WebP.
- [ ] No quedan peticiones a Google Fonts (verificado con `grep`).
- [ ] Preloader con mi nombre: logo `AS` que se dibuja, nombre por letras, progreso real, cortina de salida, una sola vez por carga y sin atascar a usuarios sin JS.
- [ ] Los reveals se repiten al bajar y al subir, y la dirección de entrada cambia (desde abajo / desde arriba).
- [ ] 17 skills; Vercel, AWS, Vue, Pandas y PyMath aparecen con su icono y en el filtro correcto.
- [ ] Donde ponía "Résumé" ahora pone "View CV" (nav de escritorio y móvil).
- [ ] Existen `/legal-notice`, `/privacy-policy` y `/cookie-policy` en inglés, enlazadas desde el footer, con los datos pendientes marcados `[TO BE COMPLETED]`.
- [ ] Banner de cookies con Reject/Accept equivalentes, preferencias por categoría (analytics desactivado por defecto), reabrible desde el footer, sin bloquear la web.
- [ ] `localStorage` se usa únicamente para el registro de consentimiento.
- [ ] `npm run build` pasa.

## 10. Qué NO hacer
No añadir dependencias aparte de `nuxt`, `@nuxt/image` y `@nuxt/fonts`. No instalar ninguna herramienta de analítica. No inventar datos legales, personales ni de skills. No cambiar textos existentes salvo los indicados. No usar `sessionStorage`. No poner `v-reveal` y un transform de hover en el mismo elemento. No convertir imágenes a mano. No tocar `Curriculum-Alejandro.pdf` más allá de moverlo a `public/`.

## 11. Informe final
Al terminar, respóndeme con:
1. Archivos **creados**, **movidos** y **modificados**.
2. Decisiones que tomaste ante ambigüedades.
3. **Lista completa de `TODO(alex)`** pendientes (especialmente los legales).
4. Qué comprobar a mano en `http://localhost:5173` y a qué anchos.
5. Cualquier cosa que no hayas podido completar y por qué.