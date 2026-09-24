import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import Home from './pages/Home.jsx'
import Directorio from './pages/Directorio.jsx'
import Analytics from './analytics/Analytics.jsx'
import { EVENTS, PARAMS } from './analytics/events.js'
import { trackEvent } from './analytics/gtag.js'
import './App.css'

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo(0, 0)
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/directorio" element={<Directorio />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
  )
}

export default App
