import React, { useRef, useEffect, useState } from 'react'
import { ArrowRight, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ServiceModal from './ServiceModal'

const slugMap = {
  'General Medicine\n& Diabetology': 'general-medicine-diabetology',
  'Obstetrics &\nGynecology': 'obstetrics-gynecology',
  'Paediatrics\n& Neonatology': 'paediatrics-neonatology',
  'Orthopedics': 'orthopedics',
  'General Surgery': 'general-surgery',
  'Urology': 'urology',
  'Cardiology': 'cardiology',
  'Dermatology': 'dermatology',
  'ENT': 'ent',
  'Oncology': 'oncology',
  'Neurology': 'neurology',
  'Nephrology': 'nephrology',
  'Ophthalmology': 'ophthalmology',
  'Laparoscopy &\nEndoscopy': 'laparoscopy-endoscopy',
  'Psychiatry': 'psychiatry',
}

const services = [
  {
    title: 'General Medicine\n& Diabetology',
    icon: <img src="/medicine.svg" alt="General Medicine" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Obstetrics &\nGynecology',
    icon: <img src="/services%20icons/obstetrics.svg" alt="Obstetrics & Gynecology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Paediatrics\n& Neonatology',
    icon: <img src="/services%20icons/pediatrics_17942024.png" alt="Paediatrics & Neonatology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Orthopedics',
    icon: <img src="/services%20icons/orthopedics.svg" alt="Orthopedics" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'General Surgery',
    icon: <img src="/services%20icons/surgical.svg" alt="General Surgery" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Urology',
    icon: <img src="/services%20icons/urinary_7857026.png" alt="Urology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Cardiology',
    icon: <img src="/services%20icons/heart.svg" alt="Cardiology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Dermatology',
    icon: <img src="/services%20icons/dermatology.svg" alt="Dermatology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'ENT',
    icon: <img src="/services%20icons/nose.png" alt="ENT" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Oncology',
    icon: <img src="/services%20icons/oncology.svg" alt="Oncology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Neurology',
    icon: <Brain className="w-7 h-7" stroke="white" strokeWidth={1.5} />,
  },
  {
    title: 'Nephrology',
    icon: <img src="/services%20icons/organ.png" alt="Nephrology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Ophthalmology',
    icon: <img src="/services%20icons/ophthalmology.svg" alt="Ophthalmology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Laparoscopy &\nEndoscopy',
    icon: <img src="/services%20icons/laparoscopy_8670713.png" alt="Laparoscopy" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
  },
  {
    title: 'Psychiatry',
    icon: <img src="/services%20icons/mental-health.png" alt="Psychiatry" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)', background: 'transparent' }} />,
  },
]

function ServiceCard({ service, index, onClick }) {
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
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s, background 0.3s ease, box-shadow 0.3s ease`,
        background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.6)',
        boxShadow: hovered ? '0 8px 30px rgba(29,111,164,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
        border: `1px solid ${hovered ? 'rgba(29,111,164,0.2)' : 'rgba(29,111,164,0.08)'}`,
        backdropFilter: 'blur(8px)',
      }}>

      {/* Teal circle icon */}
      <div
        className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: hovered
            ? 'linear-gradient(135deg, #0969b1, #17ae95)'
            : 'linear-gradient(135deg, #17ae95, #17ae95)',
          boxShadow: hovered ? '0 6px 18px rgba(45,184,158,0.45)' : '0 3px 10px rgba(45,184,158,0.25)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
        }}>
        {service.icon}
      </div>

      {/* Title */}
      <p
        className="font-bold text-xs uppercase leading-tight tracking-wide transition-colors duration-300"
        style={{ color: hovered ? '#0969b1' : '#1e3a5f' }}>
        {service.title.split('\n').map((line, i) => (
          <span key={i}>{line}{i < service.title.split('\n').length - 1 && <br />}</span>
        ))}
      </p>

      {/* Arrow — appears on hover */}
      <ArrowRight
        className="w-4 h-4 ml-auto flex-shrink-0 transition-all duration-300"
        style={{ color: '#17ae95', opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-6px)' }}
      />
    </div>
  )
}

export default function Services() {
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [page, setPage] = useState(0)
  const [animDir, setAnimDir] = useState(null)
  const navigate = useNavigate()

  const ITEMS_PER_PAGE = 4
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE)
  const pageItems = services.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTitleVisible(true) },
      { threshold: 0.1 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  const goTo = (dir) => {
    setAnimDir(dir)
    setTimeout(() => {
      setPage(p => dir === 'next' ? Math.min(p + 1, totalPages - 1) : Math.max(p - 1, 0))
      setAnimDir(null)
    }, 250)
  }

  // Touch swipe support
  const touchStart = useRef(null)
  const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (!touchStart.current) return
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? page < totalPages - 1 && goTo('next') : page > 0 && goTo('prev')
    touchStart.current = null
  }

  return (
    <section id="services" className="py-24 relative overflow-hidden">

      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg,#f0f4f8 0%,#e8f4fd 50%,#f0f4f8 100%)' }} />
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right,rgba(45,184,158,0.25),transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom left,rgba(29,111,164,0.2),transparent 70%)' }} />

      <div className="relative max-w-5xl mx-auto px-4">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-10"
          style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <div className="inline-block mb-8">
            <div className="px-10 py-3 rounded-full text-white font-black text-2xl tracking-widest uppercase"
              style={{ background: 'linear-gradient(135deg,#17ae95,#0969b1)', boxShadow: '0 8px 30px rgba(29,111,164,0.3)' }}>
              Specialities
            </div>
          </div>
        </div>

        {/* Card container */}
        <div className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)',
            border: '2px solid rgba(29,111,164,0.15)', boxShadow: '0 20px 60px rgba(29,111,164,0.1)',
            opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}>

          {/* Desktop — all items in 3-col grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i}
                onClick={() => navigate(`/specialities/${slugMap[s.title]}`)} />
            ))}
          </div>

          {/* Mobile — paginated 2-col grid */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-300"
              style={{
                opacity: animDir ? 0 : 1,
                transform: animDir === 'next' ? 'translateX(-30px)' : animDir === 'prev' ? 'translateX(30px)' : 'translateX(0)',
                transition: 'all 0.25s ease',
              }}>
              {pageItems.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={i}
                  onClick={() => navigate(`/specialities/${slugMap[s.title]}`)} />
              ))}
            </div>

            {/* Pagination controls */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} onClick={() => { setAnimDir(i > page ? 'next' : 'prev'); setTimeout(() => { setPage(i); setAnimDir(null) }, 250) }}
                    className="rounded-full transition-all duration-300"
                    style={{ width: page === i ? '24px' : '8px', height: '8px', background: page === i ? 'linear-gradient(90deg,#0969b1,#17ae95)' : '#cbd5e1' }} />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, services.length)} of {services.length}
              </span>
              <div className="flex gap-2">
                <button onClick={() => goTo('prev')} disabled={page === 0}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: page === 0 ? '#f1f5f9' : 'linear-gradient(135deg,#0969b1,#17ae95)', color: page === 0 ? '#94a3b8' : 'white', boxShadow: page === 0 ? 'none' : '0 4px 12px rgba(9,105,177,0.3)' }}>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
                <button onClick={() => goTo('next')} disabled={page === totalPages - 1}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: page === totalPages - 1 ? '#f1f5f9' : 'linear-gradient(135deg,#0969b1,#17ae95)', color: page === totalPages - 1 ? '#94a3b8' : 'white', boxShadow: page === totalPages - 1 ? 'none' : '0 4px 12px rgba(9,105,177,0.3)' }}>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10"
          style={{ opacity: titleVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.8s' }} />
      </div>
    </section>
  )
}

