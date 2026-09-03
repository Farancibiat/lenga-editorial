// Recreación en SVG de la submarca Mapa Castro (versión color: isotipo
// degradado + gris/naranja). Reemplazar por el PNG oficial cuando esté
// disponible en el repo.
function MapaCastroLogo() {
  return (
    <span className="mc-logo">
      <svg viewBox="0 0 64 64" role="img" aria-label="Mapa Castro">
        <defs>
          <linearGradient id="mc-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFBD00" />
            <stop offset="1" stopColor="#FFA314" />
          </linearGradient>
        </defs>
        <path
          d="M8 20 L24 13 L40 20 L56 13 L56 44 L40 51 L24 44 L8 51 Z"
          fill="url(#mc-grad)"
        />
        <path
          d="M24 13 L24 44 M40 20 L40 51"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
      </svg>
      <span className="mc-word">
        <span className="mc-mapa">Mapa</span>
        <em className="mc-castro">Castro</em>
      </span>
    </span>
  )
}

export default MapaCastroLogo
