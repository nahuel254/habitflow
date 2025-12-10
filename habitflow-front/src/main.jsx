import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './views/LandingPage.jsx'

const path = window.location.pathname;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {path === '/' && <LandingPage />}
    {path === '/app-login' && <App initialAuthView="login" />}
    {path === '/app-register' && <App initialAuthView="register" />}
  </StrictMode>,
)