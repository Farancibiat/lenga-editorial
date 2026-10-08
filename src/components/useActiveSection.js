import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { isFooterRevealed } from './curtain.js'

// Qué ítem del menú corresponde a lo que se ve en pantalla:
// - "contacto" cuando el footer (efecto cortina) quedó descubierto a medias,
// - en la home, la última sección del menú ("opciones" o "que-hacemos") que
//   ya llegó al centro de la pantalla,
// - fuera de la home, la ruta (hoy sólo /directorio).
// De abajo hacia arriba: gana la primera que ya pasó el centro.
const HOME_SECTIONS = ['opciones', 'que-hacemos']

function computeActive(pathname) {
  if (isFooterRevealed()) return 'contacto'
  if (pathname === '/directorio') return 'directorio'
  for (const id of HOME_SECTIONS) {
    const section = document.getElementById(id)
    if (section && section.getBoundingClientRect().top < window.innerHeight * 0.5) {
      return id
    }
  }
  return 'inicio'
}

export default function useActiveSection() {
  const { pathname } = useLocation()
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      // Mismo valor si nada cambió: React no re-renderiza el header.
      setActive(computeActive(pathname))
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

  return active
}
