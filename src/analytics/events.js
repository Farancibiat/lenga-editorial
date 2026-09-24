// Nombres de eventos y parámetros personalizados.
//
// Se centralizan acá para que el nombre que se envía y el que se registra como
// dimensión personalizada en GA4 no se despeguen nunca. Reglas de GA4: nombre
// de evento y de parámetro ≤ 40 caracteres, valor de texto ≤ 100.

export const EVENTS = {
  PAGE_VIEW: 'page_view',
  // Clic en un canal de contacto (mail, teléfono, WhatsApp). Este es el evento
  // a marcar como Evento clave / conversión en GA4.
  CONTACT_CLICK: 'contact_click',
  OUTBOUND_CLICK: 'outbound_click',
  FILE_DOWNLOAD: 'file_download',
  NAV_CLICK: 'nav_click',
  SCROLL_DEPTH: 'scroll_depth',
  SECTION_VIEW: 'section_view',
  PAGE_NOT_FOUND: 'page_not_found',
  WEB_VITALS: 'web_vitals',
}

// Parámetros personalizados. Cada uno debe registrarse como dimensión (o
// métrica) personalizada en GA4 para poder usarlo en informes. Ver README.
export const PARAMS = {
  LINK_LOCATION: 'link_location', // hero, header, footer, cta_directorio, ...
  LINK_LABEL: 'link_label',
  LINK_URL: 'link_url',
  CONTACT_METHOD: 'contact_method', // email | phone | whatsapp
  SECTION_ID: 'section_id',
  PAGE_NAME: 'page_name', // home | directorio
  SCROLL_PERCENT: 'scroll_percent', // 25 | 50 | 75 | 100
  ATTEMPTED_PATH: 'attempted_path',
  METRIC_NAME: 'metric_name', // LCP | INP | CLS | FCP | TTFB
  METRIC_VALUE: 'metric_value',
  METRIC_RATING: 'metric_rating', // good | needs-improvement | poor
  METRIC_ID: 'metric_id',
}

export const CONTACT_METHODS = {
  EMAIL: 'email',
  PHONE: 'phone',
  WHATSAPP: 'whatsapp',
}
