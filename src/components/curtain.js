// El footer es sticky (efecto cortina): su rect siempre está "en pantalla", así
// que lo que cuenta es cuánto dejó ver el contenido al subir. Se da por
// descubierto cuando se ve al menos la mitad. Lo usan el menú (ítem Contacto)
// y analytics (section_view de footer_contacto), para que ambos coincidan.
export function isFooterRevealed() {
  const content = document.querySelector('.site-content')
  const footer = document.getElementById('contacto')
  if (!content || !footer) return false
  const vh = window.innerHeight
  const revealed = vh - content.getBoundingClientRect().bottom
  return revealed > Math.min(footer.offsetHeight, vh) * 0.5
}
