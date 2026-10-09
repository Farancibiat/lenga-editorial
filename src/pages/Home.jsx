import { Link } from 'react-router-dom'
import titulo from '../assets/home/titulo-mapa-castro.svg'
import historiaLocal from '../assets/home/historia-local.svg'
import mapasCastro from '../assets/home/mapas-castro.webp'
import mapaChiloe from '../assets/home/mapa-chiloe-2019.webp'
import ultimaVersion from '../assets/home/ultima-version-2019.svg'
import elMapa from '../assets/home/el-mapa.svg'
import hechoAMano from '../assets/home/hecho-a-mano.svg'
import iglesia from '../assets/home/iglesia-castro.webp'
import fotoAnosLuz from '../assets/anos-luz.jpg'
import logoAnosLuz from '../assets/logo-anos-luz.png'
import MapaCastroLogo from '../components/MapaCastroLogo.jsx'
import { mailtoUrl, whatsappUrl } from '../constants'
import { OPCIONES } from '../data/opciones2027.js'
import {
  AHORRO_MAXIMO,
  AHORRO_PREVENTA,
  ALCANCE_2027,
  CUPOS_BANNER,
  DESCUENTO_HISTORICOS,
  DISTRIBUCION,
  ETAPAS,
  estadoEtapa,
  getEtapaActual,
} from '../data/venta2027.js'

const MENSAJE_RESERVA = 'Hola, quiero reservar mi espacio en el Mapa Castro 2027.'
const MENSAJE_PROXIMA = 'Hola, quiero saber de la próxima edición del Mapa Castro.'

// Textos que cambian según la etapa de venta (ver data/venta2027.js).
function avisoEtapa(etapa) {
  if (!etapa) {
    return {
      etiqueta: 'Venta 2027 cerrada',
      cierre: 'La venta 2027 cerró: escríbenos y te avisamos de la próxima edición.',
      mensaje: MENSAJE_PROXIMA,
    }
  }
  const hasta = etapa.cierre ? `hasta el ${etapa.cierre}` : etapa.rango
  if (etapa.conDescuento) {
    return {
      etiqueta: `${etapa.nombre} · ${hasta}`,
      cierre: `${etapa.nombre} ${hasta}: ahorra hasta ${AHORRO_MAXIMO}% frente a la venta final.`,
      mensaje: MENSAJE_RESERVA,
    }
  }
  return {
    etiqueta: `${etapa.nombre} · ${hasta}`,
    cierre: `Últimos días: la venta cierra el ${etapa.cierre ?? etapa.rango}.`,
    mensaje: MENSAJE_RESERVA,
  }
}

const ICONOS = {
  calendario: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  mapa: (
    <>
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </>
  ),
  pincel: (
    <>
      <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </>
  ),
  telefono: (
    <>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </>
  ),
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 17h4v4h-4" />
    </>
  ),
}

function Icono({ nombre }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONOS[nombre]}
    </svg>
  )
}

const BENEFICIOS = [
  {
    icono: 'calendario',
    titulo: 'Todo 2027, en Castro y en ferias',
    texto: 'Distribución a partir de diciembre, durante toda la temporada.',
  },
  {
    icono: 'mapa',
    titulo: 'En las recepciones de la ciudad',
    texto:
      'En hoteles, restaurantes y cafés, en las manos de quien recorre Castro.',
  },
  {
    icono: 'pincel',
    titulo: 'Pintado a mano',
    texto:
      'Castro en acuarela, edificio por edificio: un mapa que viaja a los hogares de miles de visitantes.',
  },
  {
    icono: 'telefono',
    titulo: 'Del papel al teléfono',
    texto:
      'Un QR lleva al directorio web, con tus datos, fotos y enlace a tu sitio.',
  },
]

// Ejemplos visuales de cada opción, dibujados con HTML/CSS como en el
// brochure (datos de muestra de Años Luz, igual que en el directorio).
function DemoVineta() {
  return (
    <>
      <img className="demo-fondo" src={mapasCastro} alt="" loading="lazy" />
      <span className="demo-vineta">
        Años Luz
        <br />
        Café y Restaurant
      </span>
    </>
  )
}

function DemoBanner() {
  return (
    <div className="demo-banner">
      <img src={logoAnosLuz} alt="" loading="lazy" />
      <div>
        <strong>Años Luz ofrece:</strong>
        <span>Desayuno · Pescados · Mariscos · Menú</span>
        <small>San Martín 309 · anosluz.cl</small>
      </div>
    </div>
  )
}

function DemoIlustracion() {
  return <img className="demo-edificio" src={iglesia} alt="" loading="lazy" />
}

const DEMOS = {
  vineta: DemoVineta,
  banner: DemoBanner,
  ilustracion: DemoIlustracion,
}

function OpcionCard({ opcion, etapa }) {
  const Demo = DEMOS[opcion.id]
  return (
    <article
      className={`opcion-card${opcion.destacada ? ' is-destacada' : ''}`}
    >
      {opcion.etiqueta && (
        <span className="opcion-etiqueta">{opcion.etiqueta}</span>
      )}
      <div className="opcion-demo" aria-hidden="true">
        <Demo />
      </div>
      <div className="opcion-body">
        <span className="opcion-ubicacion">{opcion.ubicacion}</span>
        <h3>{opcion.nombre}</h3>
        <p className="opcion-resumen">{opcion.resumen}</p>
        {etapa && (
          <div className="opcion-pills">
            {etapa.conDescuento && (
              <span className="pill-ahorro">
                Ahorra {AHORRO_PREVENTA[opcion.id]}% en pre-venta
              </span>
            )}
            {opcion.id === 'banner' && (
              <span className="pill-cupos">Últimos {CUPOS_BANNER} cupos</span>
            )}
          </div>
        )}
        <ul className="opcion-incluye" aria-label="Incluye">
          {opcion.incluye.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <a
          className="button button-venta opcion-cta"
          href={whatsappUrl(etapa ? opcion.mensaje : MENSAJE_PROXIMA)}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-location="opciones"
          data-ga-label={`Cotizar ${opcion.nombre}`}
        >
          {etapa ? 'Cotizar esta opción' : 'Avísame de la próxima'}
        </a>
      </div>
    </article>
  )
}

const ESTADO_ETAPA = {
  finalizada: 'Finalizada',
  actual: 'Ahora',
  proxima: 'Próxima',
}

function Calendario({ etapa, aviso }) {
  return (
    <section
      id="calendario"
      className="venta-calendario"
      data-ga-section="home_calendario"
    >
      <div className="calendario-inner">
        <h2>Calendario de venta</h2>
        <p className="calendario-mensaje">{aviso.cierre}</p>

        <ol className="calendario-etapas">
          {ETAPAS.map((item) => {
            const estado = estadoEtapa(item, etapa)
            return (
              <li key={item.id} className={`etapa is-${estado}`}>
                <span className="etapa-estado">{ESTADO_ETAPA[estado]}</span>
                <strong>{item.nombre}</strong>
                <span className="etapa-rango">{item.rango}</span>
                {estado === 'actual' && item.conDescuento && (
                  <span className="etapa-ahorro">
                    Ahorra hasta {AHORRO_MAXIMO}%
                  </span>
                )}
              </li>
            )
          })}
          <li className="etapa is-distribucion">
            <span className="etapa-estado">Luego</span>
            <strong>{DISTRIBUCION.nombre}</strong>
            <span className="etapa-rango">{DISTRIBUCION.rango}</span>
            <span className="etapa-nota">{DISTRIBUCION.texto}</span>
          </li>
        </ol>

        {etapa && (
          <div className="calendario-insignias">
            <span className="insignia">
              ¡Últimos <b>{CUPOS_BANNER} cupos</b> de banner!
            </span>
            <span className="insignia">
              Clientes históricos <b>{DESCUENTO_HISTORICOS}% OFF</b>
            </span>
          </div>
        )}

        <a
          className="button button-oscuro"
          href={whatsappUrl(aviso.mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-location="calendario"
          data-ga-label="Reservar desde calendario"
        >
          {!etapa
            ? 'Escríbenos'
            : etapa.conDescuento
              ? 'Asegura el precio de pre-venta'
              : 'Reserva tu espacio'}
        </a>
      </div>
    </section>
  )
}

// Composición del Figma "Landing_Lenga" (lienzo de 1920 px). Cada bloque se
// ubica con --x / --y / --w en px del Figma (ver .home-canvas en App.css);
// los textos van contorneados en SVG para calzar exacto con la tipografía
// Mont del diseño, y su contenido real queda en .sr-only para lectores de
// pantalla y buscadores. Desde "Por qué estar" en adelante el contenido va
// en flujo normal: son las secciones de venta (brochure 2027).
//
// data-aos: animación de entrada al hacer scroll (AOS, igual que
// orbeconsultores.com). El título de la pestaña lo setea usePageViews desde
// analytics/pages.js.
function Home() {
  const etapa = getEtapaActual()
  const aviso = avisoEtapa(etapa)

  return (
    <main id="top" className="home">
      <section id="inicio" className="home-inicio" data-ga-section="home_hero">
        <div className="home-canvas home-hero">
          <h1 className="home-titulo" data-aos="fade-up">
            <span className="sr-only">Mapa Castro está de vuelta</span>
            <img src={titulo} alt="" width="452" height="111" />
          </h1>

          <div
            className="home-historia"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <h2 className="sr-only">Historia local</h2>
            <p className="sr-only">15 años de evolución local ilustrados</p>
            <img src={historiaLocal} alt="" width="409" height="220" />
          </div>

          <img
            className="home-mapas"
            src={mapasCastro}
            alt="Ediciones del Mapa Castro desplegadas"
            width="608"
            height="455"
            fetchPriority="high"
            data-aos="fade-up"
            data-aos-delay="300"
          />
        </div>

        <div className="hero-cta">
          <p className="venta-tag">
            <span className="venta-dot" aria-hidden="true" />
            {aviso.etiqueta}
          </p>
          <div className="hero-actions">
            <a
              className="button button-venta"
              href={whatsappUrl(aviso.mensaje)}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-location="hero"
              data-ga-label="Reserva tu espacio"
            >
              {etapa ? 'Reserva tu espacio' : 'Escríbenos'}
            </a>
            <Link
              className="button button-secondary"
              to="/#opciones"
              data-ga-location="hero"
              data-ga-label="Ver opciones"
            >
              Ver opciones
            </Link>
          </div>
          <p className="hero-alcance">
            Todo 2027 · Castro y ferias · Distribución desde diciembre
          </p>
        </div>
      </section>

      <section
        id="que-hacemos"
        className="home-canvas home-que-hacemos"
        data-ga-section="home_que_hacemos"
      >
        <figure className="home-folleto" data-aos="fade-up">
          <img
            className="home-folleto-img"
            src={mapaChiloe}
            alt="Portada del Mapa Chiloé 2019"
            width="677"
            height="363"
            loading="lazy"
          />
          <figcaption
            className="home-folleto-nota"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="sr-only">2019 · Última versión</span>
            <img src={ultimaVersion} alt="" width="155" height="163" />
          </figcaption>
        </figure>

        <div className="home-el-mapa" data-aos="fade-up" data-aos-delay="200">
          <h2 className="sr-only">El mapa</h2>
          <p className="sr-only">
            350.000 impresiones desde 2005-2019. 15 ediciones. 25.000
            impresiones por año.
          </p>
          <img src={elMapa} alt="" width="418" height="275" loading="lazy" />
        </div>

        <div className="home-hecho" data-aos="fade-up">
          <h2 className="sr-only">Hecho a mano</h2>
          <p className="sr-only">
            100% acuarela. Ilustrada edificio por edificio.
          </p>
          <img src={hechoAMano} alt="" width="529" height="150" loading="lazy" />
        </div>

        <img
          className="home-iglesia"
          src={iglesia}
          alt="Iglesia de San Francisco de Castro ilustrada en acuarela"
          width="535"
          height="704"
          loading="lazy"
          data-aos="fade-up"
          data-aos-delay="200"
        />
      </section>

      <section
        id="por-que"
        className="section venta-por-que"
        data-ga-section="home_por_que"
      >
        <span className="venta-eyebrow">Por qué estar en el mapa</span>
        <h2>
          Presente justo cuando el viajero decide{' '}
          <mark className="venta-marca">dónde comer, dónde alojar y qué visitar</mark>
        </h2>
        <ul className="beneficios">
          {BENEFICIOS.map((beneficio) => (
            <li key={beneficio.titulo} data-aos="fade-up">
              <span className="beneficio-icono">
                <Icono nombre={beneficio.icono} />
              </span>
              <h3>{beneficio.titulo}</h3>
              <p>{beneficio.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="opciones"
        className="section venta-opciones"
        data-ga-section="home_opciones"
      >
        <span className="venta-eyebrow">Mapa Castro 2027 · 16ª edición</span>
        <h2>Elige cómo aparecer</h2>
        <p className="venta-intro">
          Tres formas de estar en el mapa. Todas incluyen ficha en el
          directorio web y adhesivo de fachada.
        </p>
        <div className="opciones-grid">
          {OPCIONES.map((opcion) => (
            <OpcionCard key={opcion.id} opcion={opcion} etapa={etapa} />
          ))}
        </div>
        <p className="venta-letra-chica">
          Las ilustraciones consideran tamaño casa; edificios más grandes se
          conversan con Lenga Editorial. Cupos de banner sujetos a
          factibilidad. Información referencial: la participación se formaliza
          con un contrato con términos y condiciones.
        </p>
      </section>

      <Calendario etapa={etapa} aviso={aviso} />

      <section
        id="mas-alla"
        className="section venta-mas-alla"
        data-ga-section="home_mas_alla"
      >
        <span className="venta-eyebrow">Nueva cara, nuevos productos</span>
        <h2>Tu negocio, más allá del mapa</h2>
        <div className="mas-alla-grid">
          <article className="mas-alla-card" data-aos="fade-up">
            <div className="adhesivo-demo" aria-hidden="true">
              <span className="adhesivo-cabecera">
                <span>tu negocio</span>
                <span>
                  edición <b>2027</b>
                </span>
              </span>
              <img src={iglesia} alt="" loading="lazy" />
              <span className="adhesivo-pie">
                <MapaCastroLogo />
                <Icono nombre="qr" />
              </span>
            </div>
            <div className="mas-alla-texto">
              <span className="opcion-ubicacion">Incluido</span>
              <h3>Adhesivo de fachada</h3>
              <p>
                Un adhesivo de alta calidad para tu vitrina o entrada. El
                turista reconoce tu local tal como aparece en el mapa y, con el
                QR, llega directo a tu ficha en el directorio.
              </p>
            </div>
          </article>

          <article
            className="mas-alla-card"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="directorio-demo" aria-hidden="true">
              <img src={fotoAnosLuz} alt="" loading="lazy" />
              <span className="ficha-cat">Gastronomía</span>
              <strong>Años Luz</strong>
              <span className="directorio-demo-chips">
                <span />
                <span />
              </span>
            </div>
            <div className="mas-alla-texto">
              <span className="opcion-ubicacion">Incluido</span>
              <h3>Directorio web</h3>
              <p>
                Todos los avisadores entran al directorio: el turista que ya
                tiene el teléfono en la mano encuentra tus datos, fotos y
                enlace a tu sitio.
              </p>
              <Link
                className="link-flecha"
                to="/directorio"
                data-ga-location="mas_alla"
                data-ga-label="Conoce el directorio"
              >
                Conoce el directorio →
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section
        id="reservar"
        className="section venta-reservar"
        data-ga-section="home_reservar"
      >
        <h2>Sé uno de esos detalles que vale la pena descubrir</h2>
        <p className="venta-intro">
          {etapa && 'Reserva tu espacio en Mapa Castro 2027. '}
          {aviso.cierre}
        </p>
        <div className="hero-actions">
          <a
            className="button button-venta"
            href={whatsappUrl(aviso.mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            data-ga-location="home_cta"
            data-ga-label="WhatsApp"
          >
            Escríbenos por WhatsApp
          </a>
          <a
            className="button button-secondary"
            href={mailtoUrl('Reserva Mapa Castro 2027')}
            data-ga-location="home_cta"
            data-ga-label="Correo"
          >
            Escríbenos un correo
          </a>
        </div>
        <p className="hero-alcance">{ALCANCE_2027}</p>
      </section>
    </main>
  )
}

export default Home
