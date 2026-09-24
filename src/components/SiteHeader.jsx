import { Link } from 'react-router-dom'
import logoVerde from '../assets/logo-horizontal-verde.svg'

// data-ga-location / data-ga-label alimentan el evento nav_click: dicen por
// qué control entró la persona a cada página, algo que page_view no distingue.
function SiteHeader() {
  return (
    <header className="site-header">
      <Link
        className="brand"
        to="/"
        data-ga-location="header"
        data-ga-label="Logo Lenga"
      >
        <img src={logoVerde} alt="Lenga Editorial" className="brand-logo" />
      </Link>
      <nav className="site-nav">
        <Link to="/#que-hacemos" data-ga-location="header">
          Qué hacemos
        </Link>
        <Link to="/directorio" data-ga-location="header">
          Directorio
        </Link>
        <Link to="/#contacto" data-ga-location="header">
          Contacto
        </Link>
      </nav>
    </header>
  )
}

export default SiteHeader
