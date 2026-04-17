import React, { useState, useEffect } from 'react'
import { Phone, Menu, X, LogOut } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { API_URL } from '../config/api'

const navLinks = [
  { label: 'Home',         href: '#home' },
  { label: 'About',        href: '/about' },
  { label: 'Specialities', href: '/specialities' },
  { label: 'Doctors',      href: '/doctors' },
  { label: 'Facilities',   href: '/facilities' },
  { label: 'Gallery',      href: '/gallery' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [pendingApptCount, setPendingApptCount] = useState(0)
  const [showNewApptDialog, setShowNewApptDialog] = useState(false)
  const [newApptCount, setNewApptCount] = useState(0)
  const previousCountRef = React.useRef(0)
  const navigate = useNavigate()
  const location = useLocation()

  // Check if we're on an admin page
  const isAdminPage = ['/doctors-admin', '/appointments', '/logs'].includes(location.pathname)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    // Only show admin navbar on admin pages
    setIsSuperAdmin(user.role === 'superadmin' && isAdminPage)
  }, [location, isAdminPage])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'superadmin' || !isAdminPage) {
      setPendingApptCount(0)
      return
    }

    const fetchPendingCount = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) return
        const res = await fetch(`${API_URL}/api/appointments`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.success && Array.isArray(data.appointments)) {
          const totalCount = data.appointments.length
          const n = data.appointments.filter(a => a.status === 'pending').length
          
          // Check if total count increased (new appointment)
          if (previousCountRef.current > 0 && totalCount > previousCountRef.current) {
            const difference = totalCount - previousCountRef.current
            setNewApptCount(difference)
            setShowNewApptDialog(true)
            // Removed auto-hide - user must manually close
          }
          
          previousCountRef.current = totalCount
          setPendingApptCount(n)
        }
      } catch (_) {
        /* ignore */
      }
    }

    fetchPendingCount()
    
    // Poll every 5 seconds for new appointments
    const pollInterval = setInterval(fetchPendingCount, 5000)
    
    window.addEventListener('leela:new-appointment', fetchPendingCount)
    window.addEventListener('leela:pending-appointments-changed', fetchPendingCount)
    return () => {
      clearInterval(pollInterval)
      window.removeEventListener('leela:new-appointment', fetchPendingCount)
      window.removeEventListener('leela:pending-appointments-changed', fetchPendingCount)
    }
  }, [isAdminPage, location.pathname])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsSuperAdmin(false)
    navigate('/')
  }

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 30)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAnchorClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/' + href)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Global New Appointment Dialog - Shows centered on all admin pages */}
      {isSuperAdmin && showNewApptDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[200]">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-green-400 max-w-md mx-4 animate-scale-in">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">New Appointment{newApptCount > 1 ? 's' : ''}!</h3>
              <p className="text-gray-600 mb-6">
                {newApptCount} new appointment{newApptCount > 1 ? 's have' : ' has'} been booked
              </p>
              <button
                onClick={() => {
                  setShowNewApptDialog(false)
                  navigate('/appointments')
                }}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors shadow-lg"
              >
                View Appointments
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: '#ffffff',
        backdropFilter: 'none',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        padding: '2px 0',
        transform: 'translateY(0)',
      }}>

      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img src="/Leela Hospital Final Logo👍-1.png" alt="Leela Hospital" 
            className="w-auto"
            style={{ height: '70px' }}
            onError={e => { e.target.onerror = null; e.target.src = '/logo.svg' }} />
        </a>

        {isSuperAdmin ? (
          <nav className="hidden md:flex items-center gap-8">
            {[{ label: 'Doctors', href: '/doctors-admin' }, { label: 'Appointments', href: '/appointments' }, { label: 'Logs', href: '/logs' }].map(link => (
              <Link key={link.label} to={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-teal-500 relative group ${location.pathname === link.href ? 'text-teal-500' : 'text-gray-700'}`}>
                <span className="relative inline-block pr-1">
                  {link.label}
                  {link.href === '/appointments' && pendingApptCount > 0 && (
                    <span
                      className="absolute -top-2 -right-2 translate-x-1/2 min-h-[18px] min-w-[18px] px-1 rounded-full bg-[#ff3b30] text-white text-[10px] font-bold leading-none inline-flex items-center justify-center ring-2 ring-white shadow-sm"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                      aria-label={`${pendingApptCount} pending appointment${pendingApptCount === 1 ? '' : 's'}`}
                    >
                      {pendingApptCount.toLocaleString()}
                    </span>
                  )}
                </span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-teal-400 transition-all duration-300 rounded-full ${location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </nav>
        ) : (
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
        )}

        <div className="hidden md:flex items-center gap-4">
          {isSuperAdmin ? (
            <button onClick={handleLogout}
              className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          ) : (
            <>
              <a href="tel:+919008371817"
                className="flex items-center gap-2 text-sm font-semibold transition-colors text-primary-600">
                <Phone className="w-4 h-4" /> +91 9008371817
              </a>
              <a href="#appointment" className="btn-primary text-sm py-2.5 px-5">Book Appointment</a>
            </>
          )}
        </div>

        <button className="md:hidden transition-colors text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && <div className="md:hidden bg-white shadow-2xl px-4 pb-6 pt-2 border-t border-gray-100">
          {isSuperAdmin ? (
            <>
              <Link to="/doctors-admin" onClick={() => setMenuOpen(false)}
                className="block py-3 text-gray-700 font-medium border-b border-gray-50 hover:text-teal-500 transition-colors">
                Doctors
              </Link>
              <Link to="/appointments" onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 py-3 text-gray-700 font-medium border-b border-gray-50 hover:text-teal-500 transition-colors">
                <span className="relative inline-block">
                  Appointments
                  {pendingApptCount > 0 && (
                    <span
                      className="absolute -top-2 -right-1 translate-x-1/2 min-h-[18px] min-w-[18px] px-1 rounded-full bg-[#ff3b30] text-white text-[10px] font-bold leading-none inline-flex items-center justify-center ring-2 ring-white shadow-sm"
                      style={{ fontVariantNumeric: 'tabular-nums' }}
                      aria-label={`${pendingApptCount} pending appointment${pendingApptCount === 1 ? '' : 's'}`}
                    >
                      {pendingApptCount.toLocaleString()}
                    </span>
                  )}
                </span>
              </Link>
              <Link to="/logs" onClick={() => setMenuOpen(false)}
                className="block py-3 text-gray-700 font-medium border-b border-gray-50 hover:text-teal-500 transition-colors">
                Logs
              </Link>
              <button onClick={handleLogout}
                className="block w-full text-left py-3 text-red-500 font-medium mt-2">
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>}
    </header>
    </>
  )
}