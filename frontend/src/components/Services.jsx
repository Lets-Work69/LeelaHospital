import React, { useRef, useEffect, useState } from 'react'
import { ArrowRight, Brain } from 'lucide-react'

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

function ServiceCard({ service, index }) {
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTitleVisible(true) },
      { threshold: 0.1 }
    )
    if (titleRef.current) observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="py-24 relative overflow-hidden">

      {/* Background — matches the image: light grey/white with teal/blue wave shapes */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #f0f4f8 0%, #e8f4fd 50%, #f0f4f8 100%)' }} />

      {/* Top-right teal blob */}
      <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(45,184,158,0.25), transparent 70%)' }} />

      {/* Bottom-left blue blob */}
      <div className="absolute bottom-0 left-0 w-80 h-60 pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(29,111,164,0.2), transparent 70%)' }} />

      {/* Subtle wave shape bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(29,111,164,0.08), transparent)' }} />

      <div className="relative max-w-5xl mx-auto px-4">

        {/* Header */}
        <div ref={titleRef} className="text-center mb-10"
          style={{ opacity: titleVisible ? 1 : 0, transform: titleVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>

          {/* Title pill — matches the image style */}
          <div className="inline-block mb-8">
            <div className="px-10 py-3 rounded-full text-white font-black text-2xl tracking-widest uppercase"
              style={{ background: 'linear-gradient(135deg, #17ae95, #0969b1)', boxShadow: '0 8px 30px rgba(29,111,164,0.3)' }}>
              Our Services
            </div>
          </div>
        </div>

        {/* Services grid inside a card — matches the bordered box in the image */}
        <div className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(29,111,164,0.15)',
            boxShadow: '0 20px 60px rgba(29,111,164,0.1)',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10"
          style={{ opacity: titleVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.8s' }}>
          <a href="#appointment" className="btn-primary inline-flex items-center gap-2">
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

