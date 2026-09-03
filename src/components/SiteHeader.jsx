import { Link } from 'react-router-dom'
import logoVerde from '../assets/logo-horizontal-verde.svg'

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <img src={logoVerde} alt="Lenga Editorial" className="brand-logo" />
      </Link>
      <nav className="site-nav">
        <Link to="/#que-hacemos">Qué hacemos</Link>
        <Link to="/directorio">Directorio</Link>
        <Link to="/#contacto">Contacto</Link>
      </nav>
    </header>
  )
}

export default SiteHeader
