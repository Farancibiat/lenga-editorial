import MapaCastroLogo from '../components/MapaCastroLogo.jsx'
import fotoAnosLuz from '../assets/anos-luz.jpg'
import logoAnosLuz from '../assets/logo-anos-luz.png'
import { CONTACT_EMAIL, WHATSAPP_URL } from '../constants'

const FICHA_INCLUYE = [
  'Nombre, categoría y ubicación',
  'Descripción de tu servicio',
  'Teléfono, correo, sitio web y redes sociales',
  'Galería de fotos',
]

const MAILTO_PREVENTA = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'Ficha en el Directorio — Mapa Castro 2027',
)}`

const CONTACTOS_DESTACADA = [
  { type: 'address', label: 'San Martín 309, Castro' },
  { type: 'phone', label: '+56 65 263 0865' },
  { type: 'web', label: 'anosluz.cl' },
  { type: 'instagram', label: '@anosluzchiloe' },
]

const CONTACTOS_ESTANDAR = CONTACTOS_DESTACADA.slice(0, 2)

const ICON_PATHS = {
  address: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
}

function ContactChip({ type, label }) {
  return (
    <span className="ficha-chip">
      <svg
        className="chip-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {ICON_PATHS[type]}
      </svg>
      {label}
    </span>
  )
}

// El título de la pestaña lo setea usePageViews desde analytics/pages.js.
function Directorio() {
  return (
    <main>
      <section className="hero dir-hero" data-ga-section="dir_hero">
        <MapaCastroLogo />
        <span className="eyebrow">Mapa Castro 2027</span>
        <h1>Directorio</h1>
        <p className="hero-text">
          Mapa Castro pone tu negocio en las manos del turista mientras camina
          por la ciudad. El directorio te acompaña en el momento siguiente,
          cuando ya está con el teléfono en la mano buscando dónde comer,
          dónde alojar o qué hacer. Todos los avisadores de esta edición
          entran al directorio.
        </p>
        <div className="hero-actions">
          <span className="tag">Próximamente — lanzamiento en noviembre</span>
        </div>
      </section>

      <section className="section" data-ga-section="dir_fichas">
        <h2>Así se verá tu ficha</h2>
        <div className="dir-fichas">
          <figure className="ficha-card ficha-destacada">
            <div className="ficha-shadow">
              <div className="ficha-body">
                <img
                  src={fotoAnosLuz}
                  alt="Fachada del restaurante Años Luz en Castro"
                  className="ficha-photo-img"
                />
                <span className="ficha-cat">Gastronomía · Castro</span>
                <h3 className="ficha-name">Años Luz</h3>
                <p className="ficha-desc">
                  Cocina chilota y mariscos frente a la Plaza de Armas de
                  Castro. Productos del archipiélago, carta de temporada y una
                  buena relación precio-calidad.
                </p>
                <div className="ficha-contacts">
                  {CONTACTOS_DESTACADA.map((contact) => (
                    <ContactChip key={contact.type} {...contact} />
                  ))}
                </div>
              </div>
            </div>
            <figcaption>
              <strong>Ficha Destacada</strong> · avisadores con banner
            </figcaption>
          </figure>

          <figure className="ficha-card ficha-estandar">
            <div className="ficha-shadow">
              <div className="ficha-body">
                <img
                  src={logoAnosLuz}
                  alt="Logo del restaurante Años Luz"
                  className="ficha-logo-img"
                />
                <span className="ficha-cat">Gastronomía · Castro</span>
                <h3 className="ficha-name">Años Luz</h3>
                <div className="ficha-contacts">
                  {CONTACTOS_ESTANDAR.map((contact) => (
                    <ContactChip key={contact.type} {...contact} />
                  ))}
                </div>
              </div>
            </div>
            <figcaption>
              <strong>Ficha Estándar</strong> · avisadores con viñeta
            </figcaption>
          </figure>
        </div>
        <p className="dir-note">
          Ficha de muestra con datos referenciales del antiguo restaurante
          Años Luz de Castro. El diseño final del directorio se presentará
          junto con el lanzamiento del sitio.
        </p>
      </section>

      <section className="section" data-ga-section="dir_que_incluye">
        <h2>Qué incluye tu ficha</h2>
        <ul className="dir-list">
          {FICHA_INCLUYE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section
        className="section dir-franja-wrap"
        data-ga-section="dir_franja_incluido"
      >
        <div className="dir-franja">
          <span className="dir-franja-tag">Incluido en todos los planes</span>
          <p>
            Tu viñeta o banner en el mapa impreso incluye además una ficha con
            posicionamiento destacado en el directorio, durante toda la
            vigencia de la edición 2027, sin costo adicional.
          </p>
        </div>
      </section>

      <section className="section dir-banners" data-ga-section="dir_banners">
        <h2>Publicidad en el sitio web</h2>
        <p className="dir-banners-text">
          Además de las fichas del directorio, el sitio web tendrá espacios
          para avisos publicitarios (banners) en sus páginas más visitadas.
          Estos espacios aún no están a la venta: los formatos, los cupos y
          los valores se anunciarán durante 2027, y los avisadores de la
          edición 2027 tendrán prioridad para reservarlos.
        </p>
      </section>

      <section className="section dir-cta" data-ga-section="dir_cta">
        <h2>Sé uno de esos detalles que vale la pena descubrir</h2>
        <p className="dir-cta-text">
          Reserva tu espacio en Mapa Castro 2027 y asegura tu ficha en el
          directorio desde el primer día.
        </p>
        <div className="hero-actions">
          <a
            className="button"
            href={MAILTO_PREVENTA}
            data-ga-location="dir_cta"
            data-ga-label="Escríbenos"
          >
            Escríbenos
          </a>
          <a
            className="button button-secondary"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            data-ga-location="dir_cta"
            data-ga-label="WhatsApp"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}

export default Directorio
