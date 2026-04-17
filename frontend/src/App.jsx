﻿import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
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
import { Calendar } from 'lucide-react'

// Lazy load pages
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
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        }>
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
          </Routes>
        </Suspense>
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
