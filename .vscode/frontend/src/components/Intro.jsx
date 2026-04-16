import React, { useEffect, useState } from 'react'

export default function Intro({ onDone }) {
  
  const [phase, setPhase] = useState('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('zoom'), 400)      
    const t2 = setTimeout(() => setPhase('flash'), 1000)    
    const t3 = setTimeout(() => setPhase('tagline'), 1200)  
    const t4 = setTimeout(() => setPhase('fadeout'), 3000)  
    const t5 = setTimeout(() => onDone(), 3500)             
    return () => [t1,t2,t3,t4,t5].forEach(clearTimeout)
  }, [])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
      style={{
        background: phase === 'flash' ? '#ffffff' : '#ffffff',
        opacity: phase === 'fadeout' ? 0 : 1,
        transition: phase === 'fadeout' ? 'opacity 0.5s ease' : 'none',
        pointerEvents: 'none',
      }}>

<div style={{
        position: 'absolute', inset: 0,
        background: 'white',
        opacity: phase === 'flash' ? 1 : 0,
        transition: phase === 'flash' ? 'opacity 0.15s ease' : 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

<div style={{
        position: 'relative', zIndex: 2,
        transform: phase === 'enter' ? 'scale(0.8)' : phase === 'zoom' ? 'scale(1.2)' : 'scale(1)',
        opacity: phase === 'enter' ? 0 : phase === 'tagline' || phase === 'fadeout' ? 0.9 : 1,
        transition: phase === 'zoom'
          ? 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease'
          : phase === 'flash'
          ? 'transform 0.2s ease'
          : 'opacity 0.4s ease',
      }}>
        <img
          src="/Leela Hospital Final Logo👍-1.png"
          alt="Leela Hospital"
          style={{ height: '110px', width: 'auto' }}
          onError={e => { e.target.src = '/logo.svg' }}
        />
      </div>

<div style={{
        position: 'relative', zIndex: 2,
        opacity: phase === 'tagline' || phase === 'fadeout' ? 1 : 0,
        transform: phase === 'tagline' || phase === 'fadeout' ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: '26px',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#0969b1',
          letterSpacing: '1.5px',
        }}>
          For a Better Life
        </p>
        
        <div style={{
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, #17ae95, transparent)',
          marginTop: '8px',
          transform: phase === 'tagline' || phase === 'fadeout' ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.8s ease 0.2s',
          transformOrigin: 'center',
        }} />
      </div>
    </div>
  )
}
