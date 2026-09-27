import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './index.css'
import App from './App.jsx'
import { initAnalytics } from './analytics/gtag.js'

// Antes del primer render: así el config de gtag ya existe cuando se dispara
// la primera page_view.
initAnalytics()

// Animaciones de entrada al hacer scroll, con la misma configuración que
// orbeconsultores.com (AOS: fade-up de 1600 ms, apagado en celulares). AOS
// observa el DOM, así que toma solo los [data-aos] que React monte después,
// incluso al cambiar de ruta.
AOS.init({ duration: 1600, disable: 'mobile' })
// Desactivado, AOS sólo limpia los [data-aos] que ya existían al iniciar; los
// que React monta después quedarían ocultos por aos.css. Cuando está activo
// marca el body con data-aos-duration: si falta, se muestran vía CSS.
if (!document.body.hasAttribute('data-aos-duration')) {
  document.documentElement.classList.add('aos-disabled')
}
// Las posiciones de disparo se recalculan cuando ya cargaron imágenes y
// fuentes, por si algo cambió de alto.
window.addEventListener('load', () => AOS.refresh())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
