# Analytics — Google Analytics 4

Toda la medición vive en [`src/analytics/`](../src/analytics/). El sitio es una
SPA: GA4 por sí solo contaría **una sola vista por sesión**, así que las
`page_view` se envían a mano en cada cambio de ruta y la medición automática de
gtag se apaga con `send_page_view: false`.

Si `VITE_GA_MEASUREMENT_ID` no está definida, el módulo completo queda en no-op
y el build ni siquiera incluye el código de gtag.

---

## 1. Qué se mide

### Eventos

| Evento | Cuándo se dispara | Parámetros propios |
| --- | --- | --- |
| `page_view` | Cada cambio de ruta. Los anclas (`/#contacto`) **no** cuentan como vista nueva. | `page_name` |
| `contact_click` | Clic en mail, teléfono o WhatsApp. **Este es el evento clave.** | `contact_method`, `link_location`, `link_label` |
| `outbound_click` | Clic a un dominio externo. | `link_url`, `link_location`, `link_label` |
| `file_download` | Clic a un PDF, imagen, doc, etc. | `link_url`, `link_location`, `link_label` |
| `nav_click` | Clic en un enlace interno marcado con `data-ga-location`. | `link_url`, `link_location`, `link_label` |
| `scroll_depth` | Al cruzar 25 / 50 / 75 / 100 % de la página. Una vez por ruta. | `scroll_percent`, `page_name` |
| `section_view` | Cuando una sección `[data-ga-section]` entra en pantalla de verdad. | `section_id`, `page_name` |
| `page_not_found` | URL inexistente antes de redirigir a la home. | `attempted_path` |
| `web_vitals` | LCP, INP, CLS, FCP y TTFB reales de cada visita. | `metric_name`, `metric_value`, `metric_rating`, `metric_id` |

### Secciones (`section_id`)

`home_hero`, `home_que_hacemos`, `home_contacto`,
`dir_hero`, `dir_fichas`, `dir_que_incluye`, `dir_franja_incluido`,
`dir_banners`, `dir_cta`

### Ubicaciones de enlace (`link_location`)

`header`, `home_hero`, `home_contacto`, `dir_cta`

### Cómo instrumentar algo nuevo

No hace falta tocar JS. Un solo listener delegado clasifica todos los enlaces:

```jsx
<section data-ga-section="mi_seccion">
  <a href="..." data-ga-location="mi_seccion" data-ga-label="Texto corto">…</a>
</section>
```

Mail, teléfono, WhatsApp, externos y archivos se detectan solos aunque no
tengan atributos. `data-ga-location` sólo es obligatorio para que un enlace
**interno** genere `nav_click`.

---

## 2. Configuración en Google Analytics

Con la cuenta ya creada, falta crear la **propiedad**. En
[analytics.google.com](https://analytics.google.com) → **Administrar** (⚙,
abajo a la izquierda).

### Cómo moverse en Administrar

Los pasos de abajo caen en dos lugares distintos, y es fácil confundirlos:

- **Dentro del flujo de datos** (Administrar → *Recopilación y modificación de
  datos* → **Flujos de datos** → clic en el flujo): sólo la **Medición
  mejorada** (2.3) y el **tráfico interno** (2.6). Es la pantalla que muestra
  el ID de medición.
- **En el menú lateral de Administrar**, fuera del flujo: las **definiciones
  personalizadas** (2.4), los **eventos clave** (2.5), los **filtros** y la
  **retención** (2.6 y 2.7).

Si estás en la pantalla del flujo buscando las dimensiones, no están ahí:
hay que volver atrás al menú de Administrar.

### 2.1 Crear la propiedad

1. Columna **Propiedad** → **Crear** → **Propiedad**.
2. Nombre: `Lenga Editorial`.
3. Zona horaria: **(GMT-03:00) Chile**. Moneda: **Peso chileno (CLP)**.
   La zona horaria define dónde corta cada día en los informes; cambiarla
   después no reprocesa los datos viejos.
4. Sector: *Artes y entretenimiento*. Tamaño: el que corresponda.
5. Objetivo: **Generar clientes potenciales**.
6. Aceptar las condiciones del servicio.

### 2.2 Crear el flujo de datos

1. Plataforma: **Web**.
2. URL: `https://www.lengaeditorial.cl` — Nombre: `Sitio lengaeditorial.cl`.
3. **Copiar el ID de medición**: `G-XXXXXXXXXX`. Ese valor va en
   `VITE_GA_MEASUREMENT_ID` (paso 3).

### 2.3 Ajustar la Medición mejorada ← el paso que más se olvida

Dentro del flujo → **Medición mejorada** (engranaje):

- **Vistas de página**: dejar activa, pero abrir *Mostrar configuración
  avanzada* y **desmarcar "Cambios de página basados en eventos del historial
  del navegador"**. Si queda marcada, cada navegación de la SPA se cuenta dos
  veces (la nuestra + la de GA) y todas las métricas por página quedan al doble.
- **Desplazamientos**: **desactivar**. GA sólo mide un 90 % único; nuestro
  `scroll_depth` mide 25/50/75/100.
- **Clics salientes** y **Descargas de archivos**: dejarlas activas. Usan el
  nombre `click` / `file_download` de GA y sirven de respaldo.

### 2.4 Registrar las dimensiones personalizadas

Una dimensión personalizada **no es un evento**. Los eventos (`contact_click`,
`section_view`, …) llegan solos desde el código, y cada uno trae **parámetros**
(`contact_method`, `section_id`, …). Registrar la dimensión es lo que hace que
ese parámetro se pueda usar como columna o filtro en los informes. Sin el
registro los datos llegan igual, pero quedan invisibles.

Ruta: **Administrar → Visualización de datos y eventos → Definiciones
personalizadas** → pestaña **Dimensiones personalizadas** → botón **Crear
dimensión personalizada** (arriba a la derecha).

Por cada fila de la tabla de abajo:

1. **Nombre de la dimensión**: el nombre legible (columna izquierda).
2. **Ámbito**: **Evento**.
3. **Parámetro del evento**: el nombre técnico (columna derecha), escrito
   **exactamente** igual, en minúsculas y con guiones bajos.
4. Guardar.

> **El desplegable de "Parámetro del evento" va a estar vacío al principio.**
> GA4 sólo lista parámetros que ya recibió alguna vez. Hay que **escribir el
> nombre a mano** y elegir la opción que aparece abajo del campo, del tipo
> *"`contact_method` (introducido manualmente)"*. Es correcto y funciona igual.

| Nombre de la dimensión | Parámetro del evento |
| --- | --- |
| Ubicación del enlace | `link_location` |
| Etiqueta del enlace | `link_label` |
| URL del enlace | `link_url` |
| Canal de contacto | `contact_method` |
| Sección vista | `section_id` |
| Página | `page_name` |
| Profundidad de scroll | `scroll_percent` |
| Ruta no encontrada | `attempted_path` |
| Métrica web | `metric_name` |
| Calidad de la métrica | `metric_rating` |

Y en la pestaña **Métricas personalizadas** → Crear:

| Nombre | Parámetro | Unidad |
| --- | --- | --- |
| Valor métrica web | `metric_value` | Estándar |

> Los datos se empiezan a acumular **desde que se registra la dimensión**; no
> se aplica hacia atrás. Conviene dejarlas creadas antes de publicar.

### 2.5 Marcar el evento clave (conversión)

**Administrar → Visualización de datos y eventos → Eventos clave** → **Nuevo
evento clave**.

El cuadro *Crear un evento* mezcla dos cosas: crear un evento nuevo y marcarlo
como clave. Nosotros **no** queremos crear nada — `contact_click` ya lo envía
el sitio — sólo marcarlo. Los campos quedan así:

| Campo | Valor | Por qué |
| --- | --- | --- |
| Nombre del evento | `contact_click` | Igual al del código, sin espacios. |
| Marcar como evento clave | **Activado** | Es el punto del paso. |
| Valor del evento clave predeterminado | **No asignar ningún valor** | No vendemos en línea; un valor monetario inventado sólo ensucia los informes. |
| Método de recuento | **Una vez por sesión** | Ver nota abajo. |
| Elige cómo crear un evento | **Crear con código** | Ver advertencia abajo. |

> ⚠️ **"Crear sin código" viene marcado por defecto y es la opción equivocada.**
> Crea un evento *derivado* que se dispara a partir de otro — la pantalla
> propone `page_view` + *URL contains*. Si lo dejas así, GA4 inventaría un
> `contact_click` en cada carga de página y el evento clave quedaría inservible.
> Hay que elegir **"Crear con código"**, que significa "el nombre ya lo envía mi
> sitio": al marcarla desaparecen los campos de activador y URL.

**Sobre el método de recuento.** GA4 recomienda *Una vez por evento*, pero a
este volumen conviene *Una vez por sesión*: en móvil un `tel:` o un `mailto:`
se suele tocar dos veces (la primera abre el diálogo del sistema), y eso
aparecería como dos personas interesadas. Con *una vez por sesión* el evento
clave responde "cuántas visitas intentaron contactarnos", que es la pregunta
real. No se pierde nada: el evento `contact_click` a secas sigue contando
**todos** los clics, así que el desglose por `contact_method` queda intacto.

**Alternativa más simple.** Una vez que el evento haya llegado al menos una vez
(hasta ~24 h después de publicar), aparece en **Administrar → Visualización de
datos y eventos → Eventos** y basta con activar ahí el interruptor *Marcar como
evento clave*, sin pasar por este cuadro.

### 2.6 Excluir tu propio tráfico

1. En la pantalla del flujo de datos, bloque **Etiqueta de Google** →
   **Configurar ajustes de etiquetas** → *Mostrar todo* → **Definir tráfico
   interno** → **Crear**.
   Nombre `Equipo Lenga`, `traffic_type` = `internal`, IP **igual a** tu IP
   pública (la ves buscando "cuál es mi IP" en Google).
2. **Administrar → Recopilación y modificación de datos → Filtros de datos** →
   el filtro *Internal Traffic* viene en **Probando**: cambiarlo a **Activo**.
   Mientras esté en "Probando" no filtra nada.

### 2.7 Subir la retención de datos

**Administrar → Recopilación y modificación de datos → Conservación de datos** →
*Conservación de datos de eventos de usuario*: viene en el mínimo (**2 meses**),
subirlo a **14 meses** → Guardar. Es gratis y es lo que permite comparar
temporadas.

### 2.8 Vincular Search Console (recomendado)

**Administrar → Vinculaciones de productos → Search Console**. Muestra qué
búsquedas de Google traen gente al sitio, dato que GA4 por sí solo no tiene.

---

## 3. Variables de entorno

| Variable | Para qué |
| --- | --- |
| `VITE_GA_MEASUREMENT_ID` | ID de medición `G-XXXXXXXXXX`. Sin ella no se envía nada. |
| `VITE_GA_DEBUG` | `true` activa la medición en desarrollo y manda los hits a DebugView. |
| `VITE_GA_CONSENT_DEFAULT` | `denied` para arrancar con Consent Mode v2 denegado. |

### Local

`.env.local` ya existe con el ID de la propiedad y `VITE_GA_DEBUG=true`. Está
en `.gitignore`, así que no se sube al repo.

> Vite carga `.env.local` **también en `npm run build`**. Un build hecho en tu
> máquina queda con `debug_mode` activo. No afecta a producción porque Netlify
> compila desde git (donde el archivo no existe) usando su propia variable de
> entorno — pero no subas el `dist/` local a mano.

### Netlify

**Site configuration → Environment variables → Add a variable**
`VITE_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`.

Después **Deploys → Trigger deploy → Clear cache and deploy site**.
Vite inyecta las variables **en el build**, no en runtime: sin un deploy nuevo
la variable no existe para el sitio publicado.

---

## 4. Cómo probar antes de publicar

1. En `.env.local`:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_GA_DEBUG=true
   ```
2. `npm run dev`.
3. GA4 → **Administrar → DebugView**. Navegar el sitio: deberían aparecer
   `page_view`, `section_view`, `scroll_depth`, `contact_click` y `web_vitals`.
4. Chequeo rápido de duplicados: ir de la home al directorio y volver. Tienen
   que salir **3** `page_view`, no 6. Si salen 6, quedó marcada la casilla del
   historial del navegador (paso 2.3).

Sin `VITE_GA_DEBUG`, en desarrollo no se envía nada pero la consola imprime
`[analytics] event …` con lo que se habría mandado. Sirve para verificar el
cableado sin tocar los datos reales.

---

## 5. Consentimiento

Está implementado **Consent Mode v2** con `ad_storage`, `ad_user_data` y
`ad_personalization` siempre denegados (el sitio no hace publicidad) y
`analytics_storage` concedido por defecto, que es lo que corresponde en Chile.

Si más adelante se agrega un banner de cookies: setear
`VITE_GA_CONSENT_DEFAULT=denied` y llamar a `updateConsent(true)` desde
`src/analytics/gtag.js` cuando la persona acepte.

---

## 6. Pendientes conocidos

**El QR impreso no trae parámetros de campaña.** `scripts/generate-qr.mjs`
apunta a `https://www.lengaeditorial.cl/directorio` sin UTM, así que en GA4 esas
visitas caen en *Directo* y no se pueden separar del resto. El QR ya está
impreso en el brochure 2027, así que no se toca; para la próxima tirada
conviene generar el QR contra:

```
https://www.lengaeditorial.cl/directorio?utm_source=qr&utm_medium=print&utm_campaign=mapa_castro_2027
```

Mientras tanto, una aproximación razonable: tráfico directo a `/directorio` como
página de entrada ≈ escaneos del QR.

**El brochure no se mide.** `public/documentos/brochure_2027.pdf` se sirve como
archivo estático y no está enlazado desde ninguna página. GA4 no puede ver esas
descargas (un PDF no ejecuta JavaScript). Si interesa medirlas, basta con
enlazarlo desde el sitio: el evento `file_download` ya está cableado y lo toma
automáticamente.
