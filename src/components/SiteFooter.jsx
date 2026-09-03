import logoBlanco from '../assets/logo-horizontal-blanco.svg'

function SiteFooter() {
  return (
    <footer className="site-footer">
      <img src={logoBlanco} alt="Lenga Editorial" className="footer-logo" />
      <span className="footer-copy">
        © {new Date().getFullYear()} · Chiloé, Chile
      </span>
    </footer>
  )
}

export default SiteFooter
