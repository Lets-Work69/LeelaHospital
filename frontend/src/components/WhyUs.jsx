import React, { useRef, useEffect, useState } from 'react'
import { ShieldCheck, Clock, Stethoscope, Wallet, Microscope, HeartHandshake, ArrowRight } from 'lucide-react'

const reasons = [
  { icon: <Stethoscope className="w-6 h-6" />, title: 'Expert Medical Team', desc: 'Board-certified specialists with decades of combined experience across all disciplines.', color: 'from-teal-500 to-emerald-400', glow: 'rgba(20,184,166,0.4)', num: '01' },
  { icon: <Microscope className="w-6 h-6" />, title: 'Advanced Technology', desc: 'Latest diagnostic and surgical equipment for precise, effective treatment.', color: 'from-teal-500 to-emerald-400', glow: 'rgba(20,184,166,0.4)', num: '02' },
  { icon: <Clock className="w-6 h-6" />, title: '24/7 Emergency Care', desc: 'Round-the-clock emergency services with rapid response teams always on standby.', color: 'from-teal-500 to-emerald-400', glow: 'rgba(20,184,166,0.4)', num: '03' },
  { icon: <Wallet className="w-6 h-6" />, title: 'Affordable Pricing', desc: 'World-class care at transparent, budget-friendly prices with insurance support.', color: 'from-teal-500 to-emerald-400', glow: 'rgba(20,184,166,0.4)', num: '04' },
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Safety & Hygiene', desc: 'Strict infection control protocols and NABH-standard safety practices throughout.', color: 'from-teal-500 to-emerald-400', glow: 'rgba(20,184,166,0.4)', num: '05' },
  { icon: <HeartHandshake className="w-6 h-6" />, title: 'Patient-First Approach', desc: 'Every decision is made with your comfort, dignity, and recovery in mind.', color: 'from-teal-500 to-emerald-400', glow: 'rgba(20,184,166,0.4)', num: '06' },
]

const bars = [
  { label: 'Patient Satisfaction', value: 98, color: 'from-blue-500 to-cyan-400' },
  { label: 'Treatment Success Rate', value: 95, color: 'from-purple-500 to-pink-400' },
  { label: 'Emergency Response', value: 99, color: 'from-teal-500 to-emerald-400' },
]

function FeatureCard({ r, index, sectionVisible }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative rounded-2xl p-5 cursor-pointer overflow-hidden transition-all duration-500"
      style={{
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
        transition: `all 0.5s cubic-bezier(0.4,0,0.2,1) ${0.3 + index * 0.08}s`,
        background: hovered
          ? 'linear-gradient(135deg, rgba(255,255,255,1), rgba(248,250,252,1))'
          : 'rgba(255,255,255,0.7)',
        boxShadow: hovered
          ? `0 20px 40px ${r.glow}, 0 0 0 1px rgba(255,255,255,0.8)`
          : '0 2px 12px rgba(0,0,0,0.05)',
        border: `1px solid ${hovered ? 'transparent' : '#f1f5f9'}`,
        backdropFilter: 'blur(10px)',
      }}>

{hovered && (
        <div className="absolute inset-0 rounded-2xl p-px"
          style={{ background: `linear-gradient(135deg, ${r.glow.replace('0.4', '0.8')}, transparent)`, zIndex: 0 }}>
          <div className="w-full h-full rounded-2xl bg-white" />
        </div>
      )}

<div className="absolute top-2 right-3 text-5xl font-black opacity-5 select-none transition-opacity duration-300 group-hover:opacity-10"
        style={{ background: `linear-gradient(135deg, #0969b1, #17ae95)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {r.num}
      </div>

      <div className="relative z-10 flex gap-4 items-start">
        
        <div className="relative flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} text-white flex items-center justify-center shadow-lg transition-all duration-300`}
            style={{ transform: hovered ? 'scale(1.1) rotate(-8deg)' : 'scale(1) rotate(0deg)', boxShadow: hovered ? `0 8px 20px ${r.glow}` : '' }}>
            {r.icon}
          </div>
          {hovered && <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${r.color} opacity-40 animate-ping`} />}
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-1 text-sm group-hover:text-gray-900 transition-colors">{r.title}</h4>
          <p className="text-gray-500 text-xs leading-relaxed">{r.desc}</p>
        </div>
      </div>

<div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${r.color} transition-all duration-500`}
        style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }} />
    </div>
  )
}

export default function WhyUs() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [barAnimated, setBarAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); setTimeout(() => setBarAnimated(true), 400) }
    }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-24 relative overflow-hidden">

<div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 40%, #f0fdf4 70%, #f8fafc 100%)' }} />
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '30px 30px' }} />

<div className="absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob"
        style={{ background: 'radial-gradient(circle, #0969b1, transparent)' }} />
      <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-blob-delay"
        style={{ background: 'radial-gradient(circle, #17ae95, transparent)' }} />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, #8b5cf6, transparent)' }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">

<div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' }}>

          <span className="inline-flex items-center gap-2 bg-white border border-primary-100 text-primary-500 font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />
            Why Choose Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Care You Can{' '}
            <span className="relative inline-block">
              <span className="text-gradient">Trust</span>
              
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 120 8" fill="none">
                <path d="M2 6 Q30 2 60 6 Q90 10 118 6" stroke="url(#uGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none">
                  <animate attributeName="stroke-dasharray" from="0,200" to="200,0" dur="1s" begin="0.8s" fill="freeze" />
                </path>
                <defs>
                  <linearGradient id="uGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#0969b1" />
                    <stop offset="100%" stopColor="#17ae95" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            ,<br />Every Single Time
          </h2>

          <p className="text-gray-500 leading-relaxed mb-8 text-lg">
            At Leela Hospital, we believe healthcare is more than just treatment — it's about building
            lasting relationships with our patients and their families.
          </p>

<div className="space-y-5 mb-10">
            {bars.map((bar, i) => (
              <div key={bar.label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 font-semibold">{bar.label}</span>
                  <span className="font-bold text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
                    {bar.value}%
                  </span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  
                  <div className="absolute inset-0 rounded-full"
                    style={{ background: 'linear-gradient(90deg, rgba(29,111,164,0.05), rgba(45,184,158,0.05))' }} />
                  
                  <div className="h-full rounded-full relative overflow-hidden transition-all duration-1000 ease-out"
                    style={{
                      width: barAnimated ? `${bar.value}%` : '0%',
                      background: `linear-gradient(90deg, #0969b1, #17ae95)`,
                      transitionDelay: `${i * 0.2}s`,
                    }}>
                    
                    <div className="absolute inset-0 animate-shimmer"
                      style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2s linear infinite' }} />
                  </div>
                  
                  <div className="absolute top-0 bottom-0 w-3 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      left: barAnimated ? `calc(${bar.value}% - 6px)` : '0%',
                      background: '#17ae95',
                      boxShadow: '0 0 8px #17ae95, 0 0 16px rgba(45,184,158,0.5)',
                      transitionDelay: `${i * 0.2}s`,
                    }} />
                </div>
              </div>
            ))}
          </div>

                  </div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reasons.map((r, i) => (
            <FeatureCard key={r.title} r={r} index={i} sectionVisible={visible} />
          ))}
        </div>
      </div>
    </section>
  )
}

