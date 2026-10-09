import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoVerde from '../assets/home/logo-lenga-verde.svg'
import useActiveSection from './useActiveSection.js'

// data-ga-location / data-ga-label alimentan el evento nav_click: dicen por
// qué control entró la persona a cada página, algo que page_view no distingue.
function navItems(pathname) {
  return [
    { key: 'inicio', label: 'Inicio', to: '/' },
    { key: 'que-hacemos', label: '¿Qué hacemos?', to: '/#que-hacemos' },
    { key: 'opciones', label: 'Opciones', to: '/#opciones' },
    { key: 'directorio', label: 'Directorio', to: '/directorio' },
    // El footer está en todas las páginas: Contacto baja al de la página actual.
    { key: 'contacto', label: 'Contacto', to: `${pathname}#contacto` },
  ]
}

// La viñeta (nav-pill.svg) se desliza bajo el ítem con hover/foco y, si no
// hay ninguno, vuelve al de la sección en pantalla.
function SiteHeader() {
  const { pathname } = useLocation()
  const active = useActiveSection()
  const [hovered, setHovered] = useState(null)
  const [pill, setPill] = useState(null)
  const navRef = useRef(null)
  const linkRefs = useRef({})

  const current = hovered ?? active
  const items = navItems(pathname)

  // offsetLeft/offsetWidth son relativos a .site-nav (position: relative).
  const measure = useCallback(() => {
    const link = linkRefs.current[current]
    if (!link || !navRef.current) return
    setPill((prev) => {
      const next = { x: link.offsetLeft, w: link.offsetWidth }
      // La primera vez aparece en su lugar, sin deslizarse desde el borde.
      return { ...next, animate: prev !== null }
    })
  }, [current])

  useLayoutEffect(measure, [measure])

  useEffect(() => {
    // El ancho de cada ítem cambia cuando termina de cargar la fuente.
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/"
        data-ga-location="header"
        data-ga-label="Logo Lenga"
      >
        <img
          src={logoVerde}
          alt="Lenga Editorial"
          className="brand-logo"
          width="226"
          height="63"
        />
      </Link>
      <nav ref={navRef} className="site-nav" aria-label="Principal">
        {pill && (
          <span
            aria-hidden="true"
            className={`nav-pill${pill.animate ? ' is-animated' : ''}`}
            style={{ transform: `translateX(${pill.x}px)`, width: pill.w }}
          />
        )}
        <ul onMouseLeave={() => setHovered(null)}>
          {items.map((item) => (
            <li key={item.key}>
              <Link
                ref={(el) => {
                  linkRefs.current[item.key] = el
                }}
                to={item.to}
                className={item.key === current ? 'is-current' : undefined}
                aria-current={item.key === active ? 'location' : undefined}
                onMouseEnter={() => setHovered(item.key)}
                onFocus={() => setHovered(item.key)}
                onBlur={() => setHovered(null)}
                data-ga-location="header"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default SiteHeader
