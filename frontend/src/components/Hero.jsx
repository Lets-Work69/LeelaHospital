import React, { useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle, Star, Phone } from 'lucide-react'

const particles = [
  { size: 8, top: '15%', left: '10%', delay: '0s', color: 'rgba(23,174,149,0.4)' },
  { size: 12, top: '70%', left: '5%', delay: '1s', color: 'rgba(9,105,177,0.3)' },
  { size: 6, top: '40%', left: '90%', delay: '2s', color: 'rgba(23,174,149,0.5)' },
  { size: 10, top: '80%', left: '85%', delay: '0.5s', color: 'rgba(9,105,177,0.4)' },
  { size: 5, top: '25%', left: '75%', delay: '1.5s', color: 'rgba(23,174,149,0.3)' },
  { size: 14, top: '60%', left: '50%', delay: '2.5s', color: 'rgba(9,105,177,0.2)' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-mesh">

      {/* Animated blob backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-500 opacity-20 rounded-full animate-blob blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-teal-500 opacity-20 rounded-full animate-blob-delay blur-3xl" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div key={i} className="particle" style={{
          width: p.size, height: p.size,
          top: p.top, left: p.left,
          background: p.color,
          animationDelay: p.delay,
          animationDuration: `${4 + i}s`
        }} />
      ))}

      {/* Spinning ring decoration */}
      <div className="absolute top-20 right-20 w-64 h-64 opacity-10 animate-spin-slow hidden lg:block">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" stroke="white" strokeWidth="1" strokeDasharray="8 8"/>
          <circle cx="100" cy="100" r="70" stroke="#17ae95" strokeWidth="1" strokeDasharray="4 12"/>
          <circle cx="100" cy="100" r="50" stroke="white" strokeWidth="1" strokeDasharray="2 6"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-28 pb-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="animate-slide-up">
          <div className="inline-flex items-center gap-2 glass text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            24/7 Emergency Care Available
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Health,<br />
            <span className="text-gradient">Our Priority</span>
          </h1>

          <p className="text-blue-100 text-lg mb-8 leading-relaxed opacity-90">
            Leela Hospital brings world-class multispeciality care with compassionate doctors,
            cutting-edge technology, and a patient-first approach — all under one roof.
          </p>



          <div className="flex flex-wrap gap-6">
            {['Expert Specialists', 'Modern Equipment', 'Affordable Care'].map(item => (
              <div key={item} className="flex items-center gap-2 text-blue-100 text-sm">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Right — Hospital Visual */}
        <div className="relative flex justify-center items-center">

          {/* Pulsing glow behind image */}
          <div className="absolute w-[450px] h-[450px] rounded-full blur-3xl opacity-25 animate-pulse"
            style={{ background: 'radial-gradient(circle, #17ae95, #0969b1)' }} />

          {/* Slow rotating outer ring */}
          <div className="absolute w-[460px] h-[460px] rounded-full animate-spin-slow"
            style={{ border: '1.5px dashed rgba(23,174,149,0.5)' }} />

          {/* Counter-rotating inner ring */}
          <div className="absolute w-[400px] h-[400px] rounded-full"
            style={{ border: '1px dashed rgba(9,105,177,0.4)', animation: 'spin-slow 18s linear infinite reverse' }} />

          {/* Orbiting teal dot */}
          <div className="absolute w-[460px] h-[460px]" style={{ animation: 'spin-slow 8s linear infinite' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{ background: '#17ae95', boxShadow: '0 0 8px #17ae95, 0 0 16px rgba(23,174,149,0.5)' }} />
          </div>

          {/* Orbiting blue dot */}
          <div className="absolute w-[400px] h-[400px]" style={{ animation: 'spin-slow 12s linear infinite reverse' }}>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full"
              style={{ background: '#0969b1', boxShadow: '0 0 6px #0969b1, 0 0 12px rgba(9,105,177,0.5)' }} />
          </div>

          {/* Image card */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ border: '2px solid rgba(255,255,255,0.15)' }}>
            <img
              src="/hospital/WhatsApp Image 2026-03-30 at 12.32.59 PM.jpeg"
              alt="Leela Hospital"
              className="w-full h-auto block"
              style={{ maxWidth: '420px' }}
            />
          </div>

          {/* Floating badge — top right */}

          {/* Floating badge — bottom left */}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}


