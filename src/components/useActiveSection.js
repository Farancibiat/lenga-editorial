import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { reportSectionView } from '../analytics/hooks.js'

// Qué ítem del menú corresponde a lo que se ve en pantalla:
// - "contacto" cuando el footer (efecto cortina) quedó descubierto a medias,
// - en la home, "que-hacemos" desde que esa sección llega al centro,
// - fuera de la home, la ruta (hoy sólo /directorio).
function computeActive(pathname) {
  const vh = window.innerHeight
  const content = document.querySelector('.site-content')
  const footer = document.getElementById('contacto')
  if (content && footer) {
    // El footer es sticky: su rect siempre está "en pantalla", así que lo que
    // cuenta es cuánto dejó ver el contenido al subir.
    const revealed = vh - content.getBoundingClientRect().bottom
    if (revealed > Math.min(footer.offsetHeight, vh) * 0.5) return 'contacto'
  }
  if (pathname === '/directorio') return 'directorio'
  const queHacemos = document.getElementById('que-hacemos')
  if (queHacemos && queHacemos.getBoundingClientRect().top < vh * 0.5) {
    return 'que-hacemos'
  }
  return 'inicio'
}

export default function useActiveSection() {
  const { pathname } = useLocation()
  // Se guarda la ruta junto al ítem: justo al navegar, el estado todavía es
  // el de la página anterior y no debe reportarse como vista de esta.
  const [active, setActive] = useState({ path: pathname, key: 'inicio' })

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const key = computeActive(pathname)
      // Mismo objeto si nada cambió: evita re-renderizar el header en cada frame.
      setActive((prev) =>
        prev.path === pathname && prev.key === key ? prev : { path: pathname, key },
      )
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  useEffect(() => {
    if (active.path === pathname && active.key === 'contacto') {
      reportSectionView('footer_contacto', pathname)
    }
  }, [active, pathname])

  return active.key
}
