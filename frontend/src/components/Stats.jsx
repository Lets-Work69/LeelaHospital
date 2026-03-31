import React, { useEffect, useRef, useState } from 'react'

const doctorIcon = (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-3">
    {/* Head */}
    <circle cx="32" cy="16" r="10" stroke="white" strokeWidth="2.5" fill="none"/>
    {/* Body / coat */}
    <path d="M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    {/* Coat lapels */}
    <path d="M26 36l-4 8h20l-4-8" stroke="white" strokeWidth="2" strokeLinejoin="round" fill="none"/>
    {/* Stethoscope */}
    <path d="M28 42c0 0-4 2-4 6" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="24" cy="49" r="2.5" stroke="white" strokeWidth="2" fill="none"/>
    <path d="M28 42c2 1 4 1 6 0" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M34 42c0 0 4 2 4 6" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
    {/* Cross on coat */}
    <path d="M31 44v4M29 46h4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const stats = [
  { value: 5000, suffix: '+', label: 'Patients Treated', icon: null, svg: <img src="/services%20icons/patient.svg" alt="Patients" className="w-12 h-12 mx-auto mb-3" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { value: 10, suffix: '+', label: 'Expert Doctors', icon: null, svg: <img src="/services%20icons/doctor.svg" alt="Doctors" className="w-12 h-12 mx-auto mb-3" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { value: 13, suffix: '+', label: 'Specialities', icon: null, svg: <img src="/services%20icons/hospital.svg" alt="Specialities" className="w-12 h-12 mx-auto mb-3" style={{ filter: 'brightness(0) invert(1)' }} /> },
  { value: 2, suffix: '+', label: 'Years of Trust', icon: null, svg: <img src="/services%20icons/trophy-award.svg" alt="Years of Trust" className="w-12 h-12 mx-auto mb-3" style={{ filter: 'brightness(0) invert(1)' }} /> },
]

function CountUp({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export default function Stats() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={stat.label} className="text-center group"
            style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
              {stat.svg ? stat.svg : stat.icon}
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

