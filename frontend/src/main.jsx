import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Security: Disable F12 and developer tools
document.addEventListener('keydown', (e) => {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.shiftKey && e.key === 'C') || (e.ctrlKey && e.shiftKey && e.key === 'J')) {
    e.preventDefault()
  }
})

// Security: Disable right-click context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})

// Verify environment configuration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
console.log('API configured for:', apiUrl)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

