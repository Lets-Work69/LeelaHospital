import React, { useState, useEffect } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '/about' },
  { label: 'Specialities', href: '/specialities' },
  { label: 'Doctors',      href: '/doctors' },
  { label: 'Facilities',   href: '#facilities' },
  { label: 'Gallery',      href: '#gallery' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = React.useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 30)
      if (currentY > lastScrollY.current && currentY > 100) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchorClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname !== '/') {
      // Navigate to home then scroll
      navigate('/' + href)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: '#ffffff',
        backdropFilter: 'none',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        padding: '2px 0',
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
      }}>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img src="/Leela Hospital Final Logo👍-1.png" alt="Leela Hospital" 
            className="w-auto"
            style={{ height: '70px' }}
            onError={e => { e.target.onerror = null; e.target.src = '/logo.svg' }} />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href}
                className="text-sm font-medium transition-all duration-300 hover:text-teal-500 relative group text-gray-700">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </Link>
            ) : (
              <a key={link.label} href={link.href}
                onClick={e => handleAnchorClick(e, link.href)}
                className="text-sm font-medium transition-all duration-300 hover:text-teal-500 relative group text-gray-700">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </a>
            )
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="tel:+911234567890"
            className={`flex items-center gap-2 text-sm font-semibold transition-colors text-primary-600`}>
            <Phone className="w-4 h-4" /> +91 9008371817
          </a>
          <a href="#appointment" className="btn-primary text-sm py-2.5 px-5">Book Appointment</a>
        </div>

        {/* Mobile toggle */}
        <button className={`md:hidden transition-colors text-gray-700`}
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-2xl px-4 pb-6 pt-2 border-t border-gray-100">
          {navLinks.map(link => (
            link.href.startsWith('/') ? (
              <Link key={link.label} to={link.href} onClick={() => setMenuOpen(false)}
                className="block py-3 text-gray-700 font-medium border-b border-gray-50 hover:text-primary-500 transition-colors">
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href}
                onClick={e => handleAnchorClick(e, link.href)}
                className="block py-3 text-gray-700 font-medium border-b border-gray-50 hover:text-primary-500 transition-colors">
                {link.label}
              </a>
            )
          ))}
          <a href="#appointment" className="btn-primary block text-center mt-4">Book Appointment</a>
        </div>
      )}
    </header>
  )
}

