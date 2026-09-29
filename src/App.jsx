import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import Home from './pages/Home.jsx'
import Directorio from './pages/Directorio.jsx'
import Analytics from './analytics/Analytics.jsx'
import { EVENTS, PARAMS } from './analytics/events.js'
import { trackEvent } from './analytics/gtag.js'
import './App.css'

function ScrollManager() {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    // Dentro de la misma página (menú → ancla) el scroll es suave; al cambiar
    // de página se salta directo.
    const samePage = previousPath.current === location.pathname
    previousPath.current = location.pathname
    const behavior = samePage ? 'smooth' : 'auto'
    const id = location.hash.slice(1)

    if (id === 'contacto') {
      // El footer es sticky: su lugar real es el final del documento.
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior })
      return
    }
    const target = id && document.getElementById(id)
    if (target) {
      target.scrollIntoView({ behavior })
      return
    }
    window.scrollTo({ top: 0, behavior })
  }, [location])

  return null
}

function NotFoundRedirect() {
  const location = useLocation()
  const attempted = location.pathname + location.search

  useEffect(() => {
    // El catch-all manda todo a la home. Sin este evento, una URL mal escrita
    // o un QR impreso con error se verían como una visita normal a "/".
    trackEvent(EVENTS.PAGE_NOT_FOUND, {
      [PARAMS.ATTEMPTED_PATH]: attempted,
    })
  }, [attempted])

  return <Navigate to="/" replace />
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Analytics />
      <SiteHeader />
      {/* .site-content tapa al footer (z-index mayor, fondo opaco) hasta que
          termina de subir: así el pie aparece como una cortina. */}
      <div className="site-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </div>
      <SiteFooter />
      <WhatsAppButton />
    </BrowserRouter>
  )
}

export default App
