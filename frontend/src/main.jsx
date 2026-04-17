import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// Verify environment configuration
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
console.log('API configured for:', apiUrl)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

