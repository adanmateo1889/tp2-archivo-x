import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import InvestigationProvider from './context/InvestigationProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvestigationProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </InvestigationProvider>
  </StrictMode>,
)
