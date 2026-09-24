// Capa de transporte hacia gtag.js. Nadie fuera de analytics/ debería tocar
// window.gtag directamente: se usan trackEvent / trackPageView.

import {
  GA_CONSENT_DEFAULT,
  GA_DEBUG_MODE,
  GA_ENABLED,
  GA_MEASUREMENT_ID,
  GA_VERBOSE,
} from './config.js'
import { EVENTS } from './events.js'

const MAX_PARAMS = 25
const MAX_VALUE_LENGTH = 100

let initialized = false

// gtag() necesita `arguments` tal cual, por eso no puede ser arrow function.
function gtag() {
  window.dataLayer.push(arguments)
}

function log(...args) {
  if (GA_VERBOSE) console.info('[analytics]', ...args)
}

// GA4 descarta valores demasiado largos y eventos con más de 25 parámetros.
// Recortar acá evita perder el evento completo por un texto largo.
function sanitize(params = {}) {
  const clean = {}
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue
    if (Object.keys(clean).length >= MAX_PARAMS) break
    clean[key] =
      typeof value === 'string' ? value.slice(0, MAX_VALUE_LENGTH) : value
  }
  return clean
}

export function initAnalytics() {
  if (initialized) return
  initialized = true

  if (!GA_ENABLED) {
    log(
      GA_MEASUREMENT_ID
        ? 'desactivado en desarrollo (VITE_GA_DEBUG=true para activarlo)'
        : 'sin VITE_GA_MEASUREMENT_ID: no se envía nada',
    )
    return
  }

  window.dataLayer = window.dataLayer || []

  // Consent Mode v2 debe declararse ANTES del config para que gtag sepa cómo
  // comportarse desde el primer hit.
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: GA_CONSENT_DEFAULT,
    functionality_storage: 'granted',
    security_storage: 'granted',
  })

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    // Las page_view las manda usePageViews en cada cambio de ruta. Si se dejara
    // en true, esta SPA reportaría una sola vista por sesión.
    send_page_view: false,
    debug_mode: GA_DEBUG_MODE || undefined,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
    GA_MEASUREMENT_ID,
  )}`
  document.head.appendChild(script)

  log('inicializado', GA_MEASUREMENT_ID, GA_DEBUG_MODE ? '(debug)' : '')
}

export function trackEvent(name, params = {}) {
  const payload = sanitize(params)
  log('event', name, payload)
  if (!GA_ENABLED) return
  gtag('event', name, payload)
}

export function trackPageView({ path, title, name }) {
  trackEvent(EVENTS.PAGE_VIEW, {
    page_title: title,
    page_location: window.location.href,
    page_path: path,
    page_name: name,
  })
}

// Para conectar un banner de cookies a futuro: updateConsent(true) cuando la
// persona acepta, updateConsent(false) cuando rechaza.
export function updateConsent(granted) {
  if (!GA_ENABLED) return
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
  })
  log('consent', granted ? 'granted' : 'denied')
}
