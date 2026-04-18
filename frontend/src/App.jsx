import React, { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Gift, X } from 'lucide-react'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
const url = import.meta.env.VITE_API_URL

// Lazy load pages & below-the-fold home (separate JS chunks on demand)
const HomeBelowFold = lazy(() => import('./components/HomeBelowFold'))
const Facilities = lazy(() => import('./pages/Facilities'))
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

function OffersCloseButton({ onClose }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="pointer-events-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200/80 bg-white text-gray-600 shadow-md ring-1 ring-black/5 transition-all hover:bg-gray-50 hover:text-gray-900 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
      aria-label="Close offers"
    >
      <X className="h-5 w-5" strokeWidth={2.25} />
    </button>
  )
}

const OFFERS_SCROLL_TRIGGERED_KEY = 'leela:home-offers-scroll-triggered'
const OFFERS_GIFT_KEY = 'leela:home-offers-gift'

function OffersPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [giftVisible, setGiftVisible] = useState(
    () => sessionStorage.getItem(OFFERS_GIFT_KEY) === 'true'
  )
  const [missingImages, setMissingImages] = useState({})
  const hasOpenedFromScrollRef = useRef(
    sessionStorage.getItem(OFFERS_SCROLL_TRIGGERED_KEY) === 'true'
  )
  const offerImages = ['/offers/offer1.jpeg', '/offers/offer2.jpeg']

  useEffect(() => {
    const handleScroll = () => {
      if (hasOpenedFromScrollRef.current) return
      if (window.scrollY > 180) {
        hasOpenedFromScrollRef.current = true
        sessionStorage.setItem(OFFERS_SCROLL_TRIGGERED_KEY, 'true')
        setIsOpen(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    setGiftVisible(true)
    sessionStorage.setItem(OFFERS_GIFT_KEY, 'true')
  }

  const reopenOffers = () => {
    setIsOpen(true)
  }

  return (
    <>
      {giftVisible && !isOpen && (
        <button
          type="button"
          onClick={reopenOffers}
          className="fixed bottom-6 right-6 z-[99] flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 transition-transform hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
          aria-label="View special offers"
        >
          <Gift className="h-7 w-7" strokeWidth={2} />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center px-4 py-6">
          <div className="relative w-full max-w-4xl max-h-[88vh] flex flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="offers-popup-scroll max-h-[88vh] overflow-y-auto overscroll-contain">
              <div className="sticky top-0 z-20 flex justify-end px-3 pt-3 pb-2 bg-gradient-to-b from-white from-85% to-transparent pointer-events-none">
                <OffersCloseButton onClose={closePopup} />
              </div>

              <div className="space-y-4 px-3 pb-3 md:space-y-0 md:snap-y md:snap-mandatory">
                {offerImages.map((imageSrc, index) =>
                  !missingImages[imageSrc] ? (
                    <div key={imageSrc} className="md:h-[82vh] md:snap-start flex items-center justify-center">
                      <img
                        src={imageSrc}
                        alt={`Hospital special offer ${index + 1}`}
                        className="block w-full h-auto rounded-xl object-contain md:max-h-full md:w-auto md:max-w-full"
                        loading="lazy"
                        decoding="async"
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
        </div>
      )}
    </>
  )
}

function RouteLoadingFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-white" aria-hidden>
      <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent" />
    </div>
  )
}

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Suspense fallback={<RouteLoadingFallback />}>
        <HomeBelowFold />
      </Suspense>
      <OffersPopup />
    </>
  )
}

/** Keeps SSE open for superadmin; new bookings dispatch a window event (no modal). */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    let cancelled = false
    const id = decodeURIComponent(hash.replace('#', ''))
    if (!id) return undefined

    const scrollToTarget = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const t0 = window.setTimeout(scrollToTarget, 0)
    const t1 = window.setTimeout(scrollToTarget, 120)

    return () => {
      cancelled = true
      clearTimeout(t0)
      clearTimeout(t1)
    }
  }, [pathname, hash])

  return null
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
      <ScrollToTop />
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
