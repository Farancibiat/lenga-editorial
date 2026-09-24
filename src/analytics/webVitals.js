// Core Web Vitals reales, medidos en el navegador de cada visita.
//
// Sirve para responder "¿el sitio se siente lento para la gente que llega?"
// con datos de campo y no con una medición de laboratorio tipo PageSpeed.

import { EVENTS, PARAMS } from './events.js'
import { trackEvent } from './gtag.js'

let started = false

export function startWebVitals() {
  if (started) return
  started = true

  // Import dinámico: web-vitals queda en su propio chunk y no retrasa el
  // primer render.
  import('web-vitals')
    .then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      const report = ({ name, value, rating, id }) => {
        trackEvent(EVENTS.WEB_VITALS, {
          [PARAMS.METRIC_NAME]: name,
          // GA4 guarda métricas como enteros. CLS es un decimal chico (0–1),
          // por eso se envía multiplicado por 1000: 0.08 → 80.
          [PARAMS.METRIC_VALUE]: Math.round(
            name === 'CLS' ? value * 1000 : value,
          ),
          [PARAMS.METRIC_RATING]: rating,
          [PARAMS.METRIC_ID]: id,
        })
      }

      onLCP(report) // Largest Contentful Paint — carga percibida
      onINP(report) // Interaction to Next Paint — respuesta a la interacción
      onCLS(report) // Cumulative Layout Shift — estabilidad visual
      onFCP(report) // First Contentful Paint
      onTTFB(report) // Time To First Byte — respuesta del hosting
    })
    .catch(() => {
      // Si el chunk no carga, la medición de vitals simplemente no ocurre: no
      // tiene por qué romper el resto del sitio.
    })
}
