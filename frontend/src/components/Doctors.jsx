import React, { useRef, useEffect, useState } from 'react'
import { Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const ACCENTS = ['#0969b1', '#17ae95']

function DoctorCard({ doc, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 rounded-2xl overflow-hidden bg-white cursor-pointer"
      style={{
        width: '260px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'translateY(40px) scale(0.97)',
        transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.08}s, transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease`,
        boxShadow: hovered ? `0 28px 56px rgba(0,0,0,0.15), 0 0 0 1px ${doc.accent}40` : '0 4px 20px rgba(0,0,0,0.08)',
      }}>

<div className="relative overflow-hidden" style={{ height: '300px', background: '#f1f5f9' }}>
        <div className="absolute top-0 left-0 right-0 z-10 transition-all duration-500"
          style={{ height: hovered ? '3px' : '2px', background: doc.accent, boxShadow: hovered ? `0 0 12px ${doc.accent}` : 'none' }} />

        {doc.photo ? (
          <img src={doc.photo} alt={doc.name} className="w-full h-full object-cover object-top"
            style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(160deg, ${doc.accent}15, ${doc.accent}30)` }}>
            <span className="text-7xl font-black" style={{ color: doc.accent, opacity: 0.5 }}>{doc.initials}</span>
          </div>
        )}

        <div className="absolute inset-0 transition-opacity duration-500"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)', opacity: hovered ? 1 : 0.7 }} />

      </div>

<div className="p-5 relative overflow-hidden">
        <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${doc.accent}08, transparent)`, opacity: hovered ? 1 : 0 }} />
        <div className="relative z-10">
          <h3 className="font-bold text-gray-900 text-base">{doc.name}</h3>
          <p className="text-sm font-semibold mt-0.5" style={{ color: '#0969b1' }}>{doc.specialty}</p>
          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" style={{ color: hovered ? doc.accent : '#9ca3af' }} />
              <span className="font-semibold text-gray-700">{doc.exp}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5" style={{ color: hovered ? doc.accent : '#9ca3af' }} />
              <span className="font-semibold text-gray-700">{doc.patients}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Doctors() {
  const titleRef = useRef(null)
  const scrollRef = useRef(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)
  const [doctors, setDoctors] = useState([])

  useEffect(() => {
    fetch(`${API_URL}/api/doctors`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setDoctors(data.doctors.map((d, i) => ({
            name: d.name,
            specialty: d.specialty,
            exp: d.experience,
            rating: parseFloat(d.rating) || 4.5,
            patients: d.patients,
            photo: d.profileImage || '',
            initials: d.name.split(' ')[1]?.charAt(0) || 'D',
            accent: ACCENTS[i % 2],
          })))
        }
      })
      .catch(() => {})
  }, [])

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 10)
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const scroll = (dir) => scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' })

  return (
    <section id="doctors" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0969b1 0%, #17ae95 100%)' }} />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, white, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, white, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4">
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-white" />
              Our Medical Team
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Meet Our Specialists</h2>
            <p className="text-white mt-3 text-lg max-w-lg opacity-80">Experienced doctors dedicated to your health and recovery.</p>
          </div>
          
          <div className="hidden md:flex gap-3">
            <button onClick={() => scroll('left')} disabled={!canLeft}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: 'white', opacity: canLeft ? 1 : 0.4, backdropFilter: 'blur(8px)' }}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} disabled={!canRight}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid white', color: '#0969b1', opacity: canRight ? 1 : 0.4, boxShadow: canRight ? '0 4px 15px rgba(0,0,0,0.2)' : 'none' }}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div ref={scrollRef} onScroll={checkScroll}
          className="flex gap-5 pb-4"
          style={{ overflowX: 'auto', overflowY: 'hidden', scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {doctors.map((doc, i) => <DoctorCard key={doc.name + i} doc={doc} index={i} />)}
        </div>

<div className="flex md:hidden justify-between mt-5 px-2">
          <button onClick={() => scroll('left')} disabled={!canLeft}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)', color: 'white', opacity: canLeft ? 1 : 0.4 }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll('right')} disabled={!canRight}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ background: 'rgba(255,255,255,0.9)', border: '2px solid white', color: '#0969b1', opacity: canRight ? 1 : 0.4 }}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
