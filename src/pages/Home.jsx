import isotipoVerde from '../assets/isotipo-verde.svg'
import { CONTACT_EMAIL, CONTACT_PHONE } from '../constants'

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

// El título de la pestaña lo setea usePageViews desde analytics/pages.js, para
// que page_title en GA4 nunca quede desfasado de la ruta.
function Home() {
  return (
    <main id="top">
      <section className="hero" data-ga-section="home_hero">
        <span className="eyebrow">Cartografía ilustrada de Chiloé</span>
        <h1>Estamos tejiendo un sitio nuevo</h1>
        <p className="hero-text">
          lengaeditorial.cl se está preparando. Muy pronto podrás conocer
          aquí nuestros mapas ilustrados y ediciones de colección.
        </p>
        <div className="hero-actions">
          <a
            className="button"
            href={`mailto:${CONTACT_EMAIL}`}
            data-ga-location="home_hero"
            data-ga-label="Escríbenos"
          >
            Escríbenos
          </a>
          <span className="tag">Sitio en construcción</span>
        </div>
      </section>

      <section
        id="que-hacemos"
        className="section features"
        data-ga-section="home_que_hacemos"
      >
        <div className="features-head">
          <img src={isotipoVerde} alt="" aria-hidden="true" className="features-leaf" />
          <h2>Qué hacemos</h2>
        </div>
        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="contacto"
        className="section contact"
        data-ga-section="home_contacto"
      >
        <h2>Conversemos</h2>
        <p>Mientras terminamos el sitio, puedes escribirnos directamente.</p>
        <div className="contact-links">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-ga-location="home_contacto"
            data-ga-label="Correo"
          >
            {CONTACT_EMAIL}
          </a>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
            data-ga-location="home_contacto"
            data-ga-label="Teléfono"
          >
            {CONTACT_PHONE}
          </a>
        </div>
      </section>
    </main>
  )
}

export default Home
