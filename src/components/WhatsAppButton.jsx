import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import burbuja from '../assets/home/wa-burbuja.svg'
import marcaMapaCastro from '../assets/home/wa-mapa-castro.svg'
import marcaMapaCastroClara from '../assets/home/wa-mapa-castro-claro.svg'
import iconoMapa from '../assets/home/icono-mapa.webp'
import iconoWhatsApp from '../assets/home/whatsapp.webp'
import { WHATSAPP_URL } from '../constants'
import { getEtapaActual } from '../data/venta2027.js'

function ariaLabel(etapa) {
  if (!etapa) return 'Escríbenos por WhatsApp'
  const hasta = etapa.cierre ? ` hasta el ${etapa.cierre}` : ''
  return `Escríbenos por WhatsApp: ${etapa.nombre.toLowerCase()}${hasta}, reserva tu cupo en el Mapa Castro`
}

// Viñeta fija de WhatsApp (esquina inferior derecha), igual al bloque del
// Figma: burbuja "Últimos días", marca Mapa Castro e ícono de WhatsApp.
function WhatsAppButton() {
  const { pathname } = useLocation()
  const marcaRef = useRef(null)
  // Sobre el footer verde el "Mapa" gris no se lee: se cambia por la versión
  // clara mientras la marca esté encima del pie (en celulares, además, queda
  // sólo el ícono para no tapar el botón de correo).
  const [onFooter, setOnFooter] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const content = document.querySelector('.site-content')
      const marca = marcaRef.current
      if (!content || !marca) return
      const rect = marca.getBoundingClientRect()
      setOnFooter(content.getBoundingClientRect().bottom < rect.top + rect.height / 2)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  return (
    <a
      className={`wa-float${onFooter ? ' is-on-footer' : ''}`}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel(getEtapaActual())}
      data-ga-location="whatsapp_flotante"
      data-ga-label="WhatsApp flotante"
    >
      <img className="wa-burbuja" src={burbuja} alt="" width="189" height="138" />
      <img className="wa-icono-mapa" src={iconoMapa} alt="" width="64" height="63" />
      <span ref={marcaRef} className="wa-marca">
        <img src={marcaMapaCastro} alt="" width="104" height="42" />
        <img src={marcaMapaCastroClara} alt="" width="104" height="42" />
      </span>
      <img className="wa-icono" src={iconoWhatsApp} alt="" width="62" height="62" />
    </a>
  )
}

export default WhatsAppButton
