// Configuración de Google Analytics 4.
//
// El ID se inyecta en build time desde la variable de entorno
// VITE_GA_MEASUREMENT_ID (en Netlify: Site configuration → Environment
// variables). Si no está definida, todo el módulo queda en modo no-op:
// el sitio funciona igual, simplemente no se envía nada.

const ID = (import.meta.env.VITE_GA_MEASUREMENT_ID || '').trim()
const IS_DEV = import.meta.env.DEV
const FORCE_DEBUG = import.meta.env.VITE_GA_DEBUG === 'true'

export const GA_MEASUREMENT_ID = ID

// En desarrollo NO se envía nada por defecto, para no ensuciar la propiedad
// con visitas propias. Con VITE_GA_DEBUG=true en .env.local se activa y los
// hits aparecen en tiempo real en GA4 → Administrar → DebugView.
export const GA_ENABLED = Boolean(ID) && (!IS_DEV || FORCE_DEBUG)

// debug_mode enruta los hits a DebugView (y los marca como tráfico de debug).
export const GA_DEBUG_MODE = FORCE_DEBUG

// En dev siempre se loguea a consola lo que *se habría* enviado, así se puede
// verificar el cableado de eventos sin tocar los datos de producción.
export const GA_VERBOSE = IS_DEV

// Consent Mode v2. Chile no exige consentimiento previo para analítica, por eso
// el default es 'granted'. Si algún día se agrega un banner de cookies, basta
// con setear VITE_GA_CONSENT_DEFAULT=denied y llamar a updateConsent(true)
// cuando la persona acepte.
export const GA_CONSENT_DEFAULT =
  import.meta.env.VITE_GA_CONSENT_DEFAULT === 'denied' ? 'denied' : 'granted'
