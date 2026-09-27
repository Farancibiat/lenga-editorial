import titulo from '../assets/home/titulo-mapa-castro.svg'
import historiaLocal from '../assets/home/historia-local.svg'
import mapasCastro from '../assets/home/mapas-castro.webp'
import mapaChiloe from '../assets/home/mapa-chiloe-2019.webp'
import ultimaVersion from '../assets/home/ultima-version-2019.svg'
import elMapa from '../assets/home/el-mapa.svg'
import hechoAMano from '../assets/home/hecho-a-mano.svg'
import iglesia from '../assets/home/iglesia-castro.webp'

// Composición del Figma "Landing_Lenga" (lienzo de 1920 px). Cada bloque se
// ubica con --x / --y / --w en px del Figma (ver .home-canvas en App.css);
// los textos van contorneados en SVG para calzar exacto con la tipografía
// Mont del diseño, y su contenido real queda en .sr-only para lectores de
// pantalla y buscadores.
//
// data-aos: animación de entrada al hacer scroll (AOS, igual que
// orbeconsultores.com). El título de la pestaña lo setea usePageViews desde
// analytics/pages.js.
function Home() {
  return (
    <main id="top" className="home">
      <section
        id="inicio"
        className="home-canvas home-hero"
        data-ga-section="home_hero"
      >
        <h1 className="home-titulo" data-aos="fade-up">
          <span className="sr-only">Mapa Castro está de vuelta</span>
          <img src={titulo} alt="" width="452" height="111" />
        </h1>

        <div className="home-historia" data-aos="fade-up" data-aos-delay="150">
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
    </main>
  )
}

export default Home
