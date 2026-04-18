import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
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
import Facilities from './pages/Facilities'
const url = import.meta.env.VITE_API_URL

const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Specialities = lazy(() => import('./pages/Specialities'))
const About = lazy(() => import('./pages/About'))
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'))
const Login = lazy(() => import('./pages/Login'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const AppointmentsPage = lazy(() => import('./pages/AppointmentsPage'))
const LogsPage = lazy(() => import('./pages/LogsPage'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Gallery = lazy(() => import('./pages/Gallery'))

function OffersPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosed, setIsClosed] = useState(() => sessionStorage.getItem('homeOffersSeen') === 'true')
  const [missingImages, setMissingImages] = useState({})
  const offerImages = ['/offers/offer1.jpeg', '/offers/offer2.jpeg']

  useEffect(() => {
    if (isClosed) return

    const handleScroll = () => {
      if (window.scrollY > 180) {
        setIsOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isClosed])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const closePopup = () => {
    setIsOpen(false)
    setIsClosed(true)
    sessionStorage.setItem('homeOffersSeen', 'true')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={closePopup}
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-lg font-semibold text-gray-700 shadow hover:bg-white"
          aria-label="Close offer popup"
        >
          x
        </button>

        <div className="space-y-4 p-3 md:space-y-0 md:snap-y md:snap-mandatory">
          {offerImages.map((imageSrc, index) =>
            !missingImages[imageSrc] ? (
              <div key={imageSrc} className="md:h-[82vh] md:snap-start flex items-center justify-center">
                <img
                  src={imageSrc}
                  alt={`Hospital special offer ${index + 1}`}
                  className="block w-full h-auto rounded-xl object-contain md:max-h-full md:w-auto md:max-w-full"
                  onError={() =>
                    setMissingImages((prev) => ({
                      ...prev,
                      [imageSrc]: true,
                    }))
                  }
                />
              </div>
            ) : null
          )}

          {Object.keys(missingImages).length === offerImages.length ? (
          <div className="p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Special Offers</h3>
            <p className="mt-3 text-gray-600">
              Add your ad images at{' '}
              <span className="font-semibold">public/offers/offer1.jpeg</span> and{' '}
              <span className="font-semibold">public/offers/offer2.jpeg</span>.
            </p>
          </div>
          ) : null}
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

function GlobalSSE() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'superadmin') return undefined

    const es = new EventSource(`${url}/api/notifications`)
    
    const handleNewAppointment = (e) => {
      try {
        const detail = JSON.parse(e.data)
        window.dispatchEvent(new CustomEvent('leela:new-appointment', { detail }))
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Failed to parse SSE data:', error)
        }
      }
    }
    
    es.addEventListener('new-appointment', handleNewAppointment)
    
    es.onerror = () => {
      if (import.meta.env.DEV) {
        console.warn('SSE connection error')
      }
    }
    
    return () => {
      es.removeEventListener('new-appointment', handleNewAppointment)
      es.close()
    }
  }, [])
  return null
}

function AppInner({ introDone, setIntroDone }) {
  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <GlobalSSE />
      <div className="min-h-screen bg-white">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
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
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppInner introDone={introDone} setIntroDone={setIntroDone} />
    </Router>
  )
}
