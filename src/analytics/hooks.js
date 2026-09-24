// Hooks de medición. Todo el estado "ya lo reporté" vive a nivel de módulo y no
// en useRef: en desarrollo StrictMode monta cada componente dos veces y con
// refs se duplicarían los hits.

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { CONTACT_METHODS, EVENTS, PARAMS } from './events.js'
import { trackEvent, trackPageView } from './gtag.js'
import { getPageMeta } from './pages.js'

/* ------------------------------------------------------------------ */
/* page_view                                                          */
/* ------------------------------------------------------------------ */

let lastTrackedPath = null

export function usePageViews() {
  const location = useLocation()
  // Los anclas del menú (/#contacto) cambian location pero no la página. Se
  // deja el hash fuera de la clave para no inflar las page_view.
  const path = location.pathname + location.search

  useEffect(() => {
    if (lastTrackedPath === path) return
    lastTrackedPath = path

    const meta = getPageMeta(location.pathname)
    // El título se setea acá, justo antes del hit, para que page_title nunca
    // salga con el de la página anterior.
    document.title = meta.title
    trackPageView({ path, title: meta.title, name: meta.name })
  }, [path, location.pathname])
}

/* ------------------------------------------------------------------ */
/* scroll_depth                                                       */
/* ------------------------------------------------------------------ */

const SCROLL_STEPS = [25, 50, 75, 100]

let scrollState = { path: null, fired: new Set() }

export function useScrollDepth() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (scrollState.path !== pathname) {
      scrollState = { path: pathname, fired: new Set() }
    }
    const meta = getPageMeta(pathname)
    let frame = 0

    const measure = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      // Página que cabe entera en pantalla: se vio el 100% sin hacer scroll.
      const percent =
        scrollable <= 0 ? 100 : Math.round((window.scrollY / scrollable) * 100)

      for (const step of SCROLL_STEPS) {
        if (percent < step || scrollState.fired.has(step)) continue
        scrollState.fired.add(step)
        trackEvent(EVENTS.SCROLL_DEPTH, {
          [PARAMS.SCROLL_PERCENT]: step,
          [PARAMS.PAGE_NAME]: meta.name,
        })
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    // Primera medición diferida: fuentes e imágenes todavía pueden cambiar la
    // altura del documento y falsear el porcentaje.
    const initial = setTimeout(measure, 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      clearTimeout(initial)
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])
}

/* ------------------------------------------------------------------ */
/* section_view                                                       */
/* ------------------------------------------------------------------ */

let sectionState = { path: null, fired: new Set() }

export function useSectionViews() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (sectionState.path !== pathname) {
      sectionState = { path: pathname, fired: new Set() }
    }
    const meta = getPageMeta(pathname)
    const nodes = document.querySelectorAll('[data-ga-section]')
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          // Una sección más alta que la pantalla nunca alcanza 40% de ratio,
          // por eso también cuenta si llena media pantalla.
          const seenEnough =
            entry.intersectionRatio >= 0.4 ||
            entry.intersectionRect.height >= window.innerHeight * 0.5
          if (!seenEnough) continue

          const id = entry.target.dataset.gaSection
          if (!id || sectionState.fired.has(id)) continue
          sectionState.fired.add(id)
          observer.unobserve(entry.target)
          trackEvent(EVENTS.SECTION_VIEW, {
            [PARAMS.SECTION_ID]: id,
            [PARAMS.PAGE_NAME]: meta.name,
          })
        }
      },
      { threshold: [0, 0.1, 0.25, 0.4, 0.75, 1] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [pathname])
}

/* ------------------------------------------------------------------ */
/* clics en enlaces                                                   */
/* ------------------------------------------------------------------ */

const FILE_RE = /\.(pdf|zip|docx?|xlsx?|pptx?|csv|jpe?g|png|svg|mp4|mp3)(\?|#|$)/i
const WHATSAPP_RE = /(^|\.)(wa\.me|whatsapp\.com)$/i

// Clasifica un <a> en un evento. Devuelve null si no vale la pena reportarlo.
function describeLink(anchor) {
  const href = anchor.getAttribute('href') || ''
  if (!href || href.startsWith('#')) return null

  const linkLocation = anchor.dataset.gaLocation || ''
  const base = {
    [PARAMS.LINK_LOCATION]: linkLocation || 'sin_ubicacion',
    [PARAMS.LINK_LABEL]: (
      anchor.dataset.gaLabel ||
      anchor.textContent ||
      ''
    ).trim(),
  }

  if (href.startsWith('mailto:')) {
    return {
      name: EVENTS.CONTACT_CLICK,
      params: { ...base, [PARAMS.CONTACT_METHOD]: CONTACT_METHODS.EMAIL },
    }
  }
  if (href.startsWith('tel:')) {
    return {
      name: EVENTS.CONTACT_CLICK,
      params: { ...base, [PARAMS.CONTACT_METHOD]: CONTACT_METHODS.PHONE },
    }
  }

  let url
  try {
    url = new URL(href, window.location.href)
  } catch {
    return null
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null

  const withUrl = { ...base, [PARAMS.LINK_URL]: url.href }

  if (WHATSAPP_RE.test(url.hostname)) {
    return {
      name: EVENTS.CONTACT_CLICK,
      params: { ...withUrl, [PARAMS.CONTACT_METHOD]: CONTACT_METHODS.WHATSAPP },
    }
  }
  if (FILE_RE.test(url.pathname)) {
    return { name: EVENTS.FILE_DOWNLOAD, params: withUrl }
  }
  if (url.hostname !== window.location.hostname) {
    return { name: EVENTS.OUTBOUND_CLICK, params: withUrl }
  }
  // Enlace interno: sólo se reporta si está marcado con data-ga-location, para
  // no duplicar lo que ya cuenta page_view.
  if (!linkLocation) return null
  return {
    name: EVENTS.NAV_CLICK,
    params: { ...base, [PARAMS.LINK_URL]: url.pathname + url.hash },
  }
}

// Un solo listener delegado en document cubre todos los enlaces del sitio,
// presentes y futuros, sin tener que envolver cada <a> en un componente.
export function useLinkTracking() {
  useEffect(() => {
    const handler = (event) => {
      // auxclick incluye el botón derecho; sólo interesa el central.
      if (event.type === 'auxclick' && event.button !== 1) return
      const anchor = event.target?.closest?.('a[href]')
      if (!anchor) return
      const hit = describeLink(anchor)
      if (hit) trackEvent(hit.name, hit.params)
    }

    document.addEventListener('click', handler)
    document.addEventListener('auxclick', handler)
    return () => {
      document.removeEventListener('click', handler)
      document.removeEventListener('auxclick', handler)
    }
  }, [])
}
