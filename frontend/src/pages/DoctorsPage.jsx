import React, { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Star, Clock, Users } from 'lucide-react'

const doctors = [
  { name: 'Dr. Vishwas Bugati',       specialty: 'Obstetrician & Gynocologist', exp: '15 Yrs', rating: 4.8, patients: '2.8K', photo: '/doctors/doctor1.PNG',  accent: '#0969b1' },
  { name: 'Dr. Praveen Dambal',       specialty: 'Urosurgeon & Andrologist',    exp: '12 Yrs', rating: 4.9, patients: '4.1K', photo: '/doctors/doctor2.PNG',  accent: '#17ae95' },
  { name: 'Dr. Sarvesh Khakandaki',   specialty: 'Orthopaedic Surgeon',         exp: '20 Yrs', rating: 4.7, patients: '2.5K', photo: '/doctors/doctor3.PNG',  accent: '#17ae95' },
  { name: 'Dr. Vinayak Kurudagi',     specialty: 'ENT Specialist',              exp: '14 Yrs', rating: 4.8, patients: '3.0K', photo: '/doctors/doctor4.PNG',  accent: '#0969b1' },
  { name: 'Dr. Timmaraddi Hosamani',  specialty: 'Pediatrics',                  exp: '16 Yrs', rating: 4.7, patients: '2.2K', photo: '/doctors/doctor5.PNG',  accent: '#17ae95' },
  { name: 'Dr. Soumya Dambal',        specialty: 'Ophthalmologist',             exp: '10 Yrs', rating: 4.9, patients: '3.8K', photo: '/doctors/doctor6.PNG',  accent: '#0969b1' },
  { name: 'Dr. Saroja Patil',         specialty: 'Dermatologist',               exp: '18 Yrs', rating: 4.6, patients: '1.9K', photo: '/doctors/doctor7.PNG',  accent: '#17ae95' },
  { name: 'Dr. Vinay Teradal',        specialty: 'General Surgeon',             exp: '13 Yrs', rating: 4.8, patients: '2.7K', photo: '/doctors/doctor8.PNG',  accent: '#0969b1' },
  { name: 'Dr. Vijaya Kattimani',     specialty: 'Pediatrics',                  exp: '11 Yrs', rating: 4.7, patients: '2.1K', photo: '/doctors/dc10.png',     accent: '#0969b1' },
  { name: 'Dr. Anitha P Dharana',     specialty: 'Obstetrician & Gynocologist', exp: '9 Yrs',  rating: 4.8, patients: '1.8K', photo: '/doctors/11.PNG',       accent: '#17ae95' },
  { name: 'Dr. Basavaraj Yanagi',     specialty: 'General Physician',           exp: '17 Yrs', rating: 4.7, patients: '2.0K', photo: '/doctors/12.PNG',       accent: '#0969b1' },
  { name: 'Dr. Tippanna Nagar',       specialty: 'General Physician',           exp: '17 Yrs', rating: 4.7, patients: '2.0K', photo: '/doctors/doctor9.PNG',  accent: '#0969b1' },
]

function DoctorCard({ doc, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const accent2 = doc.accent === '#0969b1' ? '#17ae95' : '#0969b1'

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
        transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.07}s`,
        boxShadow: hovered
          ? `0 28px 56px rgba(0,0,0,0.14), 0 0 0 1.5px ${doc.accent}40`
          : '0 4px 24px rgba(0,0,0,0.07)',
      }}>

      {/* Photo */}
      <div className="relative overflow-hidden" style={{ height: '280px' }}>
        {/* Gradient bg fallback */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,#022441,${doc.accent})` }} />

        <img src={doc.photo} alt={doc.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />

        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(2,36,65,0.7) 0%, transparent 55%)', opacity: hovered ? 1 : 0.6 }} />

        {/* Animated top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
          style={{ background: `linear-gradient(90deg,${doc.accent},${accent2})`, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }} />

        {/* Hover name overlay */}
        <div className="absolute bottom-3 right-3 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg,${doc.accent},${accent2})` }}>
            <span className="text-white text-xs font-black">{doc.name.split(' ')[1]?.charAt(0)}</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 relative">
        {/* Animated accent line */}
        <div className="h-0.5 rounded-full mb-4 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg,${doc.accent},${accent2})`,
            width: hovered ? '80%' : '32px',
          }} />

        <h3 className="font-extrabold text-gray-900 text-lg leading-tight mb-1"
          style={{ fontFamily: "'Nunito',sans-serif" }}>
          {doc.name}
        </h3>
        <p className="text-sm font-semibold mb-4" style={{ color: doc.accent }}>{doc.specialty}</p>

        {/* Stats */}
        <div className="flex items-center gap-5 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${doc.accent}12` }}>
              <Clock className="w-3.5 h-3.5" style={{ color: doc.accent }} />
            </div>
            <span className="text-sm font-bold text-gray-700">{doc.exp}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${accent2}12` }}>
              <Users className="w-3.5 h-3.5" style={{ color: accent2 }} />
            </div>
            <span className="text-sm font-bold text-gray-700">{doc.patients}</span>
          </div>
        </div>

        {/* Bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg,${doc.accent},${accent2})`, transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
      </div>
    </div>
  )
}

export default function DoctorsPage() {
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* ── Hero ── */}
      <div className="relative pt-24 pb-0 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#022441 0%,#0969b1 55%,#17ae95 100%)', minHeight: '340px' }}>

        {/* Animated mesh */}
        <div className="absolute inset-0 opacity-30 animate-gradient"
          style={{ background: 'linear-gradient(270deg,#022441,#0969b1,#17ae95,#022441)', backgroundSize: '400% 400%' }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.7) 1px,transparent 0)', backgroundSize: '28px 28px' }} />

        {/* Orbs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#7dd3fc,transparent)' }} />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20 animate-float pointer-events-none"
            style={{ width: `${5+i*3}px`, height: `${5+i*3}px`, background: i%2===0?'#5eead4':'#7dd3fc',
              left:`${10+i*15}%`, top:`${20+i*10}%`, animationDelay:`${i*0.5}s`, animationDuration:`${3+i*0.6}s` }} />
        ))}

        <div ref={heroRef} className="relative max-w-5xl mx-auto px-6 pt-10 pb-20 text-center">
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.7s ease' }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-teal-200 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
              Our Medical Team
              <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
            </span>
          </div>

          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.15s' }}>
            <h1 className="font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
              Meet Our{' '}
              <span style={{ background: 'linear-gradient(90deg,#7dd3fc,#5eead4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                Specialists
              </span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Nunito',sans-serif" }}>
              Experienced, compassionate doctors dedicated to your health and recovery.
            </p>
          </div>

          {/* Animated divider */}
          <div className="flex items-center justify-center gap-3 mt-8"
            style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.8s ease 0.35s' }}>
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#5eead4)' }} />
            <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#5eead4,transparent)' }} />
          </div>
        </div>

        {/* Wave */}
        <svg className="w-full block" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70, display: 'block', marginTop: '-1px' }}>
          <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,10 1440,35 L1440,70 L0,70 Z" fill="#f9fafb" />
        </svg>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doc, i) => (
            <DoctorCard key={doc.name} doc={doc} index={i} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
