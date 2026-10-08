// Las tres formas de aparecer en el Mapa Castro 2027 (brochure, págs. 3–7).
// La clave de cada opción es también su clave en AHORRO_PREVENTA.

const VIGENCIA = 'Vigencia: todo 2027, en Castro y en ferias'
const ADHESIVO = 'Adhesivo de fachada Mapa Castro con QR al directorio'

export const OPCIONES = [
  {
    id: 'vineta',
    nombre: 'Viñeta',
    ubicacion: 'Frente del mapa',
    resumen:
      'Tu negocio señalado sobre el mapa ilustrado, justo en la esquina donde está.',
    incluye: [
      '4 estilos: servicio + nombre, solo nombre, sitio web o dibujo + viñeta',
      'Ícono de categoría: alojamiento, gastronomía o servicios',
      'Ficha estándar en el directorio web',
      ADHESIVO,
      VIGENCIA,
    ],
    mensaje: 'Hola, quiero cotizar una viñeta en el Mapa Castro 2027.',
  },
  {
    id: 'banner',
    nombre: 'Banner + ilustración de edificio',
    etiqueta: 'Máxima visibilidad',
    destacada: true,
    ubicacion: 'Dorso del mapa',
    resumen:
      'Tu aviso con logo y datos de contacto, y tu edificio pintado en acuarela dentro del mapa.',
    incluye: [
      'Banner a elección: descriptivo (120 caracteres y 3 datos), de productos (90 caracteres y 4 datos) o de contacto (hasta 6 datos)',
      'Tu fachada ilustrada en acuarela dentro del mapa',
      'Ficha destacada en el directorio web',
      ADHESIVO,
      VIGENCIA,
    ],
    mensaje:
      'Hola, quiero cotizar un banner + ilustración de edificio en el Mapa Castro 2027.',
  },
  {
    id: 'ilustracion',
    nombre: 'Ilustración de edificio',
    etiqueta: 'Complemento',
    ubicacion: 'Sobre tu viñeta o banner',
    resumen:
      'Tu fachada en acuarela dentro del mapa, para que el turista te reconozca al pasar.',
    incluye: [
      'Fachada pintada a mano, edificio por edificio',
      'Exclusiva para clientes de viñeta o banner',
      ADHESIVO,
      VIGENCIA,
    ],
    mensaje:
      'Hola, quiero sumar la ilustración de mi edificio al Mapa Castro 2027.',
  },
]
