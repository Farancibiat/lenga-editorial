import { Link, useLocation } from 'react-router-dom'
import logoBlanco from '../assets/home/logo-lenga-blanco.svg'
import { CONTACT_EMAIL } from '../constants'

// Pie tipo "cortina": es sticky al borde inferior y queda detrás de
// .site-content (z-index menor), así que aparece cuando el contenido termina
// de subir. Mismo mecanismo que usa orbeconsultores.com.
//
// Sin data-ga-section a propósito: al ser sticky el IntersectionObserver lo
// ve "en pantalla" desde el primer momento. Su section_view (footer_contacto)
// lo reporta useActiveSection cuando de verdad queda descubierto.
function SiteFooter() {
  const { pathname } = useLocation()

  return (
    <footer id="contacto" className="site-footer">
      <div className="footer-canvas">
        <img
          src={logoBlanco}
          alt="Lenga Editorial"
          className="footer-logo"
          width="406"
          height="176"
        />
        <nav className="footer-nav" aria-label="Pie de página">
          <Link to="/" data-ga-location="footer">
            Inicio
          </Link>
          <Link to="/#que-hacemos" data-ga-location="footer">
            ¿Qué hacemos?
          </Link>
          <Link to="/directorio" data-ga-location="footer">
            Directorio
          </Link>
          <Link to={`${pathname}#contacto`} data-ga-location="footer">
            Contacto
          </Link>
        </nav>
        <div className="footer-contact">
          <span className="footer-contact-title">Contáctanos</span>
          <a
            className="footer-mail"
            href={`mailto:${CONTACT_EMAIL}`}
            data-ga-location="footer"
            data-ga-label="Correo"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} · Chiloé, Chile
        </p>
      </div>
    </footer>
  )
}

export default SiteFooter
