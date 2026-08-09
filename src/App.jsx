import logoLenga from './assets/logo-lenga.svg'
import './App.css'

const CONTACT_EMAIL = 'contacto@lengaeditorial.cl'
const CONTACT_PHONE = '+56 9 5709 7420'

const FEATURES = [
  {
    title: 'Mapas ilustrados',
    text: 'Dibujamos a mano, en acuarela, calle a calle, los rincones de Chiloé.',
  },
  {
    title: 'Ediciones de colección',
    text: 'Piezas numeradas y enmarcadas, pensadas para durar en el tiempo.',
  },
  {
    title: 'Identidad local',
    text: 'Cada mapa reúne el comercio y los oficios que dan vida a cada ciudad.',
  },
]

function App() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top">
          <img src={logoLenga} alt="Lenga Editorial" className="brand-logo" />
        </a>
        <nav className="site-nav">
          <a href="#que-hacemos">Qué hacemos</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <span className="eyebrow">Cartografía ilustrada de Chiloé</span>
          <h1>Estamos tejiendo un sitio nuevo</h1>
          <p className="hero-text">
            lengaeditorial.cl se está preparando. Muy pronto podrás conocer
            aquí nuestros mapas ilustrados y ediciones de colección.
          </p>
          <div className="hero-actions">
            <a className="button" href={`mailto:${CONTACT_EMAIL}`}>
              Escríbenos
            </a>
            <span className="badge">Sitio en construcción</span>
          </div>
        </section>

        <section id="que-hacemos" className="features">
          <h2>Qué hacemos</h2>
          <div className="feature-grid">
            {FEATURES.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contacto" className="contact">
          <h2>Conversemos</h2>
          <p>Mientras terminamos el sitio, puedes escribirnos directamente.</p>
          <div className="contact-links">
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}>
              {CONTACT_PHONE}
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <img src={logoLenga} alt="Lenga Editorial" className="footer-logo" />
        <span className="footer-copy">
          © {new Date().getFullYear()} · Chiloé, Chile
        </span>
      </footer>
    </>
  )
}

export default App
