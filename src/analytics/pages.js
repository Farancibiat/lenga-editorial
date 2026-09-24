// Título y nombre corto de cada ruta.
//
// Fuente única de verdad: desde acá se setea document.title y se envía
// page_title a GA4. Si cada página seteara su propio título por su cuenta, el
// page_view podría salir con el título de la página anterior (los efectos de
// React no garantizan ese orden) y los informes quedarían fragmentados.

export const PAGE_META = {
  '/': {
    title: 'Lenga Editorial',
    name: 'home',
  },
  '/directorio': {
    title: 'Directorio · Mapa Castro 2027 — Lenga Editorial',
    name: 'directorio',
  },
}

export const FALLBACK_META = {
  title: 'Lenga Editorial',
  name: 'desconocida',
}

export function getPageMeta(pathname) {
  return PAGE_META[pathname] || FALLBACK_META
}
