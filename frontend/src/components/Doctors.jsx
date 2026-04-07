import React, { useRef, useEffect, useState } from 'react'
import { Star, Clock, Users, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

const doctors = [
  { name: 'Dr. Vishwas Bugati',specialty: 'Obstetrician & Gynocologist',exp: '15 Yrs', rating: 4.8, patients: '2.8K', photo: '/doctors/doctor1.PNG',  initials: 'RM', accent: '#0969b1', tag: 'Brain & Spine',   available: true },
  { name: 'Dr. Praveen Dambal',specialty: 'Urosurgeon & Andrologist',exp: '12 Yrs', rating: 4.9, patients: '4.1K', photo: '/doctors/doctor2.PNG',  initials: 'AR', accent: '#17ae95', tag: 'Child Care',      available: false },
  { name: 'Dr. Sarvesh Khakandaki',    specialty: 'Orthopaedic Surgeon',   exp: '20 Yrs', rating: 4.7, patients: '2.5K', photo: '/doctors/doctor3.PNG',  initials: 'SK', accent: '#17ae95', tag: 'Joint & Bone',    available: true },
  { name: 'Dr. Vinayak Kurudagi',      specialty: 'ENT Specialist',         exp: '14 Yrs', rating: 4.8, patients: '3.0K', photo: '/doctors/doctor4.PNG',  initials: 'MI', accent: '#0969b1', tag: 'Obstetrics',      available: true },
  { name: 'Dr. Timmaraddi Hosamani',       specialty: 'Pediatrics',       exp: '16 Yrs', rating: 4.7, patients: '2.2K', photo: '/doctors/doctor5.PNG',  initials: 'AN', accent: '#17ae95', tag: 'General Surgery', available: true },
  { name: 'Dr. Soumya Dambal',   specialty: 'Ophthalmologist',         exp: '10 Yrs', rating: 4.9, patients: '3.8K', photo: '/doctors/doctor6.PNG',  initials: 'KR', accent: '#0969b1', tag: 'Skin Care',       available: false },
  { name: 'Dr. Saroja Patil',    specialty: 'Dermatologist ',             exp: '18 Yrs', rating: 4.6, patients: '1.9K', photo: '/doctors/doctor7.PNG',  initials: 'SP', accent: '#17ae95', tag: 'Urology',         available: true },
  { name: 'Dr. Vinay Teradal',    specialty: 'Sample',       exp: '13 Yrs', rating: 4.8, patients: '2.7K', photo: '/doctors/doctor8.PNG',  initials: 'LD', accent: '#0969b1', tag: 'Eye Care',        available: true },
  { name: 'Dr. Vijaya Kattimani',  specialty: 'Pediatrics',        exp: '11 Yrs', rating: 4.7, patients: '2.1K', photo: '/doctors/dc10.png',     initials: 'VK', accent: '#0969b1', tag: 'ENT',             available: false },
  { name: 'Dr. Anitha P Dharana',    specialty: 'Obstetrician & Gynocologist',          exp: '9 Yrs',  rating: 4.8, patients: '1.8K', photo: '/doctors/11.PNG',       initials: 'PS', accent: '#17ae95', tag: 'Mental Health',   available: true },
  { name: 'Dr. Basavaraj Yanagi',     specialty: 'Sample',          exp: '17 Yrs', rating: 4.7, patients: '2.0K', photo: '/doctors/12.PNG',       initials: 'NB', accent: '#0969b1', tag: 'Kidney Care',     available: true },  
  { name: 'Dr. Tippanna Nagar ',     specialty: 'General Physician',          exp: '17 Yrs', rating: 4.7, patients: '2.0K', photo: '/doctors/doctor9.PNG',       initials: 'NB', accent: '#0969b1', tag: 'Kidney Care',     available: true },  
] 

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
        transform: visible
          ? 'scale(1)'
          : 'translateY(40px) scale(0.97)',
        transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.08}s,
                     transform 0.4s cubic-bezier(0.4,0,0.2,1),
                     box-shadow 0.4s ease`,
        boxShadow: hovered
          ? `0 28px 56px rgba(0,0,0,0.15), 0 0 0 1px ${doc.accent}40`
          : '0 4px 20px rgba(0,0,0,0.08)',
      }}>

      {/* Photo */}
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

        
        <div className="absolute bottom-3 left-4 flex items-center gap-1 transition-all duration-300"
          style={{ transform: 'translateY(0)' }}>
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm font-bold">{doc.rating}</span>
        </div>

              </div>

      {/* Info */}
      <div className="p-5 relative overflow-hidden">
        <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${doc.accent}08, transparent)`, opacity: hovered ? 1 : 0 }} />
        <div className="relative z-10">
          <h3 className="font-bold text-gray-900 text-base">{doc.name}</h3>
          <p className="text-sm font-semibold mt-0.5" style={{ color: '#0969b1' }}>{doc.specialty}</p>

          <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5 transition-colors duration-300" style={{ color: hovered ? doc.accent : '#9ca3af' }} />
              <span className="font-semibold text-gray-700">{doc.exp}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Users className="w-3.5 h-3.5 transition-colors duration-300" style={{ color: hovered ? doc.accent : '#9ca3af' }} />
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
  const [titleVisible, setTitleVisible] = useState(false)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTitleVisible(true) }, { threshold: 0.1 })
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
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

      {/* Gradient background */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0969b1 0%, #17ae95 100%)' }} />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />

      {/* Glow orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, white, transparent)' }} />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, white, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4">

        {/* Header */}
        <div ref={titleRef}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4"
              style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-white" />
              Our Medical Team
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">Meet Our Specialists</h2>
            <p className="text-white mt-3 text-lg max-w-lg opacity-80">Experienced doctors dedicated to your health and recovery.</p>
          </div>
          {/* Scroll controls */}
          <div className="flex gap-3">
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

        {/* Cards — horizontal scroll */}
        <div ref={scrollRef} onScroll={checkScroll}
          className="flex gap-5 pb-4"
          style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`.doctors-scroll::-webkit-scrollbar { display: none; }`}</style>
          {doctors.map((doc, i) => <DoctorCard key={doc.name} doc={doc} index={i} />)}
        </div>
      </div>
    </section>
  )
}
