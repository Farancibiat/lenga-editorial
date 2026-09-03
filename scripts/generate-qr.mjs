// Script one-off: los QR ya generados viven en assets/qr/ y la URL está
// impresa en el brochure. 'qrcode' no está en package.json a propósito;
// para regenerar: npm i --no-save qrcode && node scripts/generate-qr.mjs
import QRCode from 'qrcode'
import { mkdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { join } from 'path'

const TARGET_URL = 'https://www.lengaeditorial.cl/directorio'
const outDir = fileURLToPath(new URL('../assets/qr/', import.meta.url))

const INK = '#1A1815'
const CREAM = '#F2EEC8'

await mkdir(outDir, { recursive: true })

const common = {
  errorCorrectionLevel: 'M',
  margin: 2,
  color: { dark: INK, light: CREAM },
}

// PNG, print-ready size
await QRCode.toFile(join(outDir, 'directorio-qr.png'), TARGET_URL, {
  ...common,
  width: 1024,
})

// SVG, scalable for any print size
await QRCode.toFile(join(outDir, 'directorio-qr.svg'), TARGET_URL, {
  ...common,
  type: 'svg',
})

// High-contrast black/white variant, safer for scanning at small sizes or low-quality print
await QRCode.toFile(join(outDir, 'directorio-qr-bw.png'), TARGET_URL, {
  ...common,
  width: 1024,
  color: { dark: '#000000', light: '#FFFFFF' },
})

console.log('QR generated for:', TARGET_URL)
