import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Doctors from './components/Doctors'
import Testimonials from './components/Testimonials'
import Appointment from './components/Appointment'
import Footer from './components/Footer'
import ServiceDetail from './pages/ServiceDetail'
import Specialities from './pages/Specialities'
import About from './pages/About'
import DoctorsPage from './pages/DoctorsPage'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AppointmentsPage from './pages/AppointmentsPage'
import LogsPage from './pages/LogsPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Gallery from './pages/Gallery'
import Facilities from './pages/Facilities'

function OffersPopup() {
  const offers = ['/offers/offer1.jpeg', '/offers/offer2.jpeg']
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isClosed, setIsClosed] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const adScrollRef = useRef(null)

  useEffect(() => {
    const updateViewportState = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    updateViewportState()
    window.addEventListener('resize', updateViewportState)
    return () => window.removeEventListener('resize', updateViewportState)
  }, [])

  useEffect(() => {
    const firstOfferTrigger = 180
    const secondOfferTrigger = 700

    const onScroll = () => {
      if (isClosed) return

      const scrollY = window.scrollY
      if (scrollY >= secondOfferTrigger) {
        setActiveIndex(1)
        setIsVisible(true)
      } else if (scrollY >= firstOfferTrigger) {
        setActiveIndex(0)
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isClosed])

  useEffect(() => {
    if (isClosed || !isVisible) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isClosed, isVisible])

  useEffect(() => {
    if (!isVisible || isClosed || isMobileView || !adScrollRef.current) return

    const scrollContainer = adScrollRef.current
    const imageSections = scrollContainer.querySelectorAll('[data-offer-index]')
    const targetSection = imageSections[activeIndex]

    if (targetSection) {
      scrollContainer.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [activeIndex, isVisible, isClosed, isMobileView])

  if (isClosed || !isVisible) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-[95vw] overflow-hidden rounded-2xl bg-white shadow-2xl md:max-w-4xl">
        <button
          type="button"
          onClick={() => setIsClosed(true)}
          className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-2.5 py-1.5 text-lg font-bold leading-none text-white transition hover:bg-black"
          aria-label="Close offer popup"
        >
          ×
        </button>
        <div
          ref={adScrollRef}
          className={`overflow-y-auto ${isMobileView ? 'max-h-[80vh]' : 'max-h-[88vh] scroll-smooth snap-y snap-mandatory'}`}
        >
          {offers.map((offerImage, index) => (
            <section
              key={offerImage}
              data-offer-index={index}
              className={isMobileView ? '' : 'snap-start min-h-[88vh]'}
            >
              <img
                src={offerImage}
                alt={`Special offer ${index + 1}`}
                className={isMobileView ? 'block w-full h-auto' : 'h-full min-h-[88vh] w-full object-contain'}
              />
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Doctors />
      <Testimonials />
      <Appointment />
      <Footer />
      <OffersPopup />
    </>
  )
}

/** Keeps SSE open for superadmin; new bookings dispatch a window event (no modal). */
function GlobalSSE() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'superadmin') return

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const es = new EventSource(`${API_URL}/api/notifications`)
    es.addEventListener('new-appointment', (e) => {
      try {
        const detail = JSON.parse(e.data)
        window.dispatchEvent(new CustomEvent('leela:new-appointment', { detail }))
      } catch (_) {}
    })
    return () => es.close()
  }, [])
  return null
}

function AppInner({ introDone, setIntroDone }) {
  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <GlobalSSE />
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/specialities/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors-admin" element={<AdminDashboard />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/facilities" element={<Facilities />} />
        </Routes>
      </div>
    </>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <BrowserRouter>
      <AppInner introDone={introDone} setIntroDone={setIntroDone} />
    </BrowserRouter>
  )
}
