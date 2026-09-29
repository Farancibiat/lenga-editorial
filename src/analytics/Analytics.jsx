import { useEffect } from 'react'
import {
  useFooterView,
  useLinkTracking,
  usePageViews,
  useScrollDepth,
  useSectionViews,
} from './hooks.js'
import { startWebVitals } from './webVitals.js'

// Componente sin UI: concentra toda la medición automática del sitio.
// Debe ir dentro de <BrowserRouter> porque los hooks leen la ruta actual.
function Analytics() {
  usePageViews() // page_view por cambio de ruta
  useScrollDepth() // scroll_depth 25/50/75/100
  useSectionViews() // section_view de cada [data-ga-section]
  useFooterView() // section_view del footer (footer_contacto)
  useLinkTracking() // contact_click / outbound_click / file_download / nav_click

  useEffect(() => {
    startWebVitals()
  }, [])

  return null
}

export default Analytics
