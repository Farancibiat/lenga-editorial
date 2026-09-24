import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initAnalytics } from './analytics/gtag.js'

// Antes del primer render: así el config de gtag ya existe cuando se dispara
// la primera page_view.
initAnalytics()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
