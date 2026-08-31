import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const url = import.meta.env.VITE_API_URL

if (import.meta.env.DEV) {
  console.log('API configured for:', url)
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
