// Calendario de venta del Mapa Castro 2027 (brochure, pág. 7).
//
// Fuente única para el home y la viñeta de WhatsApp: al venderse un cupo o
// cambiar una fecha se edita sólo este archivo. Los precios no se escriben
// acá a propósito (quedarían en el bundle); sólo el % de ahorro.

// Fechas en hora de Chile, inclusive, como 'AAAA-MM-DD'.
export const ETAPAS = [
  {
    id: 'preventa',
    nombre: 'Pre-venta',
    desde: '2026-08-17',
    hasta: '2026-09-30',
    rango: '17 ago – 30 sep',
  },
  {
    id: 'preventa2',
    nombre: 'Pre-venta 2',
    desde: '2026-10-01',
    hasta: '2026-10-14',
    rango: '1 – 14 oct',
    cierre: '14 de octubre',
    conDescuento: true,
  },
  {
    id: 'final',
    nombre: 'Venta final',
    desde: '2026-10-15',
    hasta: '2026-10-25',
    rango: '15 – 25 oct',
    cierre: '25 de octubre',
  },
]

export const DISTRIBUCION = {
  nombre: 'Distribución',
  rango: 'Desde diciembre',
  texto: 'Todo 2027 en Castro y en ferias',
}

export const CUPOS_BANNER = 6
export const DESCUENTO_HISTORICOS = 9

// Ahorro de la Pre-venta 2 frente a la Venta final, redondeado.
export const AHORRO_PREVENTA = {
  banner: 7,
  vineta: 9,
  ilustracion: 17,
}
export const AHORRO_MAXIMO = Math.max(...Object.values(AHORRO_PREVENTA))

export const ALCANCE_2027 =
  'Tu publicidad presente todo 2027, en Castro y en ferias. Distribución a partir de diciembre.'

// 'AAAA-MM-DD' del día en Chile: el corte de cada etapa es a medianoche de
// Chile, no de quien mira la página.
function hoyEnChile(now) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
  }).format(now)
}

// En desarrollo, /?fecha=2026-10-20 simula otro día para revisar cada estado.
function fechaSimulada() {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null
  const fecha = new URLSearchParams(window.location.search).get('fecha')
  return /^\d{4}-\d{2}-\d{2}$/.test(fecha ?? '') ? fecha : null
}

// Etapa vigente, o null si la venta ya cerró. Antes de la primera etapa
// devuelve la primera.
export function getEtapaActual(now = new Date()) {
  const hoy = fechaSimulada() ?? hoyEnChile(now)
  return ETAPAS.find((etapa) => hoy <= etapa.hasta) ?? null
}

export function estadoEtapa(etapa, actual) {
  if (!actual) return 'finalizada'
  const i = ETAPAS.indexOf(etapa)
  const j = ETAPAS.indexOf(actual)
  if (i < j) return 'finalizada'
  return i === j ? 'actual' : 'proxima'
}
