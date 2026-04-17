import React, { useRef, useEffect, useState, memo, useCallback } from 'react'
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
  { title: 'General Medicine\n& Diabetology', icon: <img src="/medicine.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Obstetrics &\nGynecology', icon: <img src="/services%20icons/obstetrics.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Paediatrics\n& Neonatology', icon: <img src="/services%20icons/pediatrics_17942024.png" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Orthopedics', icon: <img src="/services%20icons/orthopedics.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'General Surgery', icon: <img src="/services%20icons/surgical.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Urology', icon: <img src="/services%20icons/urinary_7857026.png" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Cardiology', icon: <img src="/services%20icons/heart.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Dermatology', icon: <img src="/services%20icons/dermatology.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'ENT', icon: <img src="/services%20icons/nose.png" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Oncology', icon: <img src="/services%20icons/oncology.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Neurology', icon: <Brain className="w-7 h-7" stroke="white" /> },
  { title: 'Nephrology', icon: <img src="/services%20icons/organ.png" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Ophthalmology', icon: <img src="/services%20icons/ophthalmology.svg" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Laparoscopy &\nEndoscopy', icon: <img src="/services%20icons/laparoscopy_8670713.png" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { title: 'Psychiatry', icon: <img src="/services%20icons/mental-health.png" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} /> },
]

const ServiceCard = memo(function ServiceCard({ service, index, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.7)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid rgba(29,111,164,0.08)',
      }}
    >
      <div
        className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #17ae95, #17ae95)',
        }}
      >
        {service.icon}
      </div>

      <p className="font-bold text-xs uppercase leading-tight tracking-wide text-[#1e3a5f]">
        {service.title.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < service.title.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
})

export default function Services() {
  const [animDir, setAnimDir] = useState(null)
  const [page, setPage] = useState(0)
  const navigate = useNavigate()

  const ITEMS_PER_PAGE = 4
  const totalPages = Math.ceil(services.length / ITEMS_PER_PAGE)
  const pageItems = services.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)

  const touchStart = useRef(null)

  const handleTouchStart = useCallback((e) => {
    touchStart.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (!touchStart.current) return

    const diff = touchStart.current - e.changedTouches[0].clientX

    if (Math.abs(diff) > 50) {
      if (diff > 0 && page < totalPages - 1) {
        setAnimDir('next')

        setTimeout(() => {
          setPage(p => p + 1)
        }, 300) 

        setTimeout(() => {
          setAnimDir(null) 
        }, 350)
      }

      if (diff < 0 && page > 0) {
        setAnimDir('prev')

        setTimeout(() => {
          setPage(p => p - 1)
        }, 300)

        setTimeout(() => {
          setAnimDir(null)
        }, 350)
      }
    }

    touchStart.current = null
  }, [page, totalPages])

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-4">

        <div className="text-center mb-10">
          <div className="inline-block mb-8">
            <div className="px-10 py-3 rounded-full text-white font-black text-2xl tracking-widest uppercase"
              style={{ background: 'linear-gradient(135deg,#17ae95,#0969b1)' }}>
              Specialities
            </div>
          </div>
        </div>

        <div
          className="rounded-3xl p-8 md:p-10"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(29,111,164,0.15)',
          }}
        >

          <div className="hidden md:grid md:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <ServiceCard
                key={s.title}
                service={s}
                index={i}
                onClick={() => navigate(`/specialities/${slugMap[s.title]}`)}
              />
            ))}
          </div>

          <div className="md:hidden">
            <div
              className="grid grid-cols-1 gap-4"
              style={{
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: animDir ? 0 : 1,
                transform:
                  animDir === 'next'
                    ? 'translateX(-30px)'
                    : animDir === 'prev'
                      ? 'translateX(30px)'
                      : 'translateX(0)',
              }}
            >
              {pageItems.map((s, i) => (
                <ServiceCard
                  key={s.title}
                  service={s}
                  index={i}
                  onClick={() => navigate(`/specialities/${slugMap[s.title]}`)}
                />
              ))}
            </div>

            <div className="flex flex-col items-center mt-6 gap-2">
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full"
                    style={{
                      width: page === i ? '22px' : '6px',
                      height: '6px',
                      background:
                        page === i
                          ? 'linear-gradient(90deg,#0969b1,#17ae95)'
                          : '#cbd5e1',
                    }}
                  />
                ))}
              </div>

              <span className="text-xs text-gray-400">
                {page + 1} of {totalPages}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}