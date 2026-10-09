export const CONTACT_EMAIL = 'contacto@lengaeditorial.cl'
export const CONTACT_PHONE = '+56 9 6595 2545'
export const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE.replace(/[^\d]/g, '')}`

// WhatsApp con el mensaje ya escrito: quien escribe no parte de cero y
// nosotros sabemos de entrada qué opción le interesa.
export function whatsappUrl(text) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`
}

export function mailtoUrl(subject) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}
