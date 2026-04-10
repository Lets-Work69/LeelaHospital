import React, { useState, useEffect } from 'react'
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
import ServiceDetail from './pages/ServiceDetail'
import Specialities from './pages/Specialities'
import About from './pages/About'
import DoctorsPage from './pages/DoctorsPage'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AppointmentsPage from './pages/AppointmentsPage'
import LogsPage from './pages/LogsPage'
import { Calendar } from 'lucide-react'
import Gallery from './pages/Gallery'

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
    </>
  )
}

function NewApptDialog({ appt, onDismiss, onViewAll }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-slide-in">
        <div className="px-6 pt-6 pb-4 text-center" style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Calendar className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-white font-bold text-lg">New Appointment</h3>
          <p className="text-white/80 text-sm mt-1">A patient just booked an appointment</p>
        </div>
        <div className="px-6 py-5 space-y-3">
          {[
            { label: 'Patient',    value: appt.name },
            { label: 'Phone',      value: appt.phone },
            { label: 'Department', value: appt.department },
            { label: 'Date',       value: appt.date },
            ...(appt.message ? [{ label: 'Message', value: appt.message }] : [])
          ].map(row => (
            <div key={row.label} className="flex justify-between items-start">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-24 flex-shrink-0">{row.label}</span>
              <span className="text-sm font-medium text-gray-800 text-right">{row.value}</span>
            </div>
          ))}
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onDismiss}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium">
            Dismiss
          </button>
          <button onClick={onViewAll}
            className="flex-1 px-4 py-2.5 text-white rounded-xl text-sm font-medium transition-colors"
            style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
            View All
          </button>
        </div>
      </div>
    </div>
  )
}

function GlobalSSE({ onNewAppt }) {
  const playRing = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      
      const partials = [
        { ratio: 1.0,  gain: 0.6,  decay: 1.8 },
        { ratio: 2.76, gain: 0.4,  decay: 1.2 },
        { ratio: 5.40, gain: 0.25, decay: 0.8 },
        { ratio: 8.93, gain: 0.15, decay: 0.5 },
        { ratio: 13.3, gain: 0.08, decay: 0.3 },
      ]
      const fundamental = 523 

      partials.forEach(({ ratio, gain, decay }) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.connect(g)
        g.connect(ctx.destination)
        osc.type = 'sine'
        osc.frequency.value = fundamental * ratio
        g.gain.setValueAtTime(gain, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + decay)
      })
    } catch (e) {}
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'superadmin') return

    const es = new EventSource('http://localhost:5000/api/notifications')
    es.addEventListener('new-appointment', (e) => {
      playRing()
      onNewAppt(JSON.parse(e.data))
    })
    return () => es.close()
  }, [])
  return null
}

function AppInner({ introDone, setIntroDone }) {
  const [newAppt, setNewAppt] = useState(null)
  const navigate = useNavigate()

  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <GlobalSSE onNewAppt={setNewAppt} />
      {newAppt && (
        <NewApptDialog
          appt={newAppt}
          onDismiss={() => setNewAppt(null)}
          onViewAll={() => { setNewAppt(null); navigate('/appointments') }}
        />
      )}
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/specialities/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors-admin" element={<AdminDashboard />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/gallery" element={<Gallery />} />
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
