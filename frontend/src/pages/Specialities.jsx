import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const specialities = [
  { title: 'General Medicine & Diabetology', slug: 'general-medicine-diabetology', icon: '/medicine.svg', desc: 'Our General Medicine Department at Leela Hospital is dedicated to providing comprehensive and compassionate care for a wide range of medical conditions.' },
  { title: 'Obstetrics & Gynecology',        slug: 'obstetrics-gynecology',        icon: '/services%20icons/obstetrics.svg', desc: 'At Leela Hospital, we understand the unique healthcare needs of women at every stage of their lives. Our Obstetrics & Gynecology Department is here for you.' },
  { title: 'Paediatrics & Neonatology',      slug: 'paediatrics-neonatology',      icon: '/services%20icons/pediatrics_17942024.png', desc: 'At Leela Hospital, our Pediatric and Neonatology Department is dedicated to providing comprehensive and compassionate care for your little ones.' },
  { title: 'Orthopedics',                    slug: 'orthopedics',                  icon: '/services%20icons/orthopedics.svg', desc: 'At Leela Hospital, our Orthopedics Department is committed to providing comprehensive, compassionate, and state-of-the-art care for bone, joint, muscle & spine conditions.' },
  { title: 'General Surgery',                slug: 'general-surgery',              icon: '/services%20icons/surgical.svg', desc: 'General surgery is a vital medical specialty encompassing a wide array of surgical procedures aimed at diagnosing and treating various conditions.' },
  { title: 'Urology',                        slug: 'urology',                      icon: '/services%20icons/urinary_7857026.png', desc: 'Our team of skilled urologists specializes in diagnosing and treating a wide range of urological conditions affecting both men and women.' },
  { title: 'Cardiology',                     slug: 'cardiology',                   icon: '/services%20icons/heart.svg', desc: 'At Leela Hospital, our Cardiology Department is committed to providing comprehensive, compassionate, and state-of-the-art care for all heart conditions.' },
  { title: 'Dermatology',                    slug: 'dermatology',                  icon: '/services%20icons/dermatology.svg', desc: 'Our Dermatology unit is dedicated to providing comprehensive and personalized care for all your skin, hair, and nail concerns.' },
  { title: 'ENT',                            slug: 'ent',                          icon: '/services%20icons/nose.png', desc: 'At Leela Hospital, we prioritize your ear, nose, and throat health with dedicated expertise and compassionate care. Our ENT specialists are here for you.' },
  { title: 'Oncology',                       slug: 'oncology',                     icon: '/services%20icons/oncology.svg', desc: 'Comprehensive cancer care with a multidisciplinary approach.' },
  { title: 'Neurology',                      slug: 'neurology',                    icon: null, desc: 'At Leela Hospital, our Neurology Department is dedicated to providing exceptional care for a wide range of neurological conditions.' },
  { title: 'Nephrology',                     slug: 'nephrology',                   icon: '/services%20icons/organ.png', desc: 'Our Nephrology Department at Leela Hospital is dedicated to providing comprehensive and compassionate care for patients with kidney conditions.' },
  { title: 'Ophthalmology',                  slug: 'ophthalmology',                icon: '/services%20icons/ophthalmology.svg', desc: 'Complete eye care from routine checkups to complex surgeries.' },
  { title: 'Laparoscopy & Endoscopy',        slug: 'laparoscopy-endoscopy',        icon: '/services%20icons/laparoscopy_8670713.png', desc: 'Laparoscopic surgery, also known as minimally invasive surgery, is a modern surgical technique that involves performing operations through small incisions.' },
  { title: 'Psychiatry',                     slug: 'psychiatry',                   icon: '/services%20icons/mental-health.png', desc: 'At Leela Hospital, we understand the crucial role mental health plays in overall well-being. Our team of dedicated psychiatrists is here to support you.' },
  { title: 'Physiotherapy',                  slug: 'physiotherapy',                icon: null, desc: 'Expert rehabilitation care to help you recover strength, mobility, and independence after injury or surgery.' },
]

export default function Specialities() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(null)
  const [typed, setTyped] = useState('')
  const fullText = 'Our Specialities'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setTyped(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(timer)
    }, 80)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero banner */}
      <div className="pt-28 pb-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        {/* Animated blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15 animate-blob-delay"
          style={{ background: 'radial-gradient(circle, white, transparent)' }} />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20"
            style={{
              width: 4 + i * 2, height: 4 + i * 2,
              top: `${15 + i * 12}%`, left: `${10 + i * 14}%`,
              background: 'white',
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }} />
        ))}

        <div className="relative max-w-6xl mx-auto px-4">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white opacity-70 hover:opacity-100 mb-8 transition-opacity text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>

          {/* Animated title */}
          <div style={{ animation: 'slideUp 0.7s ease forwards' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-white opacity-50" />
              <span className="text-white text-xs font-semibold uppercase tracking-widest opacity-70">Leela Hospital</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              <span>{typed.startsWith('Our ') ? 'Our ' : typed}</span>
              {typed.startsWith('Our ') && (
                <span style={{
                  background: 'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.7), #ffffff)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}>
                  {typed.slice(4)}
                </span>
              )}
              {/* Blinking cursor */}
              {typed.length < fullText.length && (
                <span className="text-white" style={{ animation: 'blink 0.7s step-end infinite' }}>|</span>
              )}
            </h1>
            <p className="text-white opacity-75 text-lg max-w-xl leading-relaxed"
              style={{ animation: 'slideUp 0.9s ease forwards' }}>
              World-class medical care across 15 specialities — all under one roof at Leela Hospital.
            </p>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-10"
            style={{ animation: 'slideUp 1.1s ease forwards' }}>
            {[['15+', 'Specialities'], ['10+', 'Expert Doctors'], ['5K+', 'Patients Treated']].map(([val, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-white">{val}</p>
                <p className="text-white text-xs opacity-60 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((s, i) => (
            <div key={s.slug}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate(`/specialities/${s.slug}`)}
              className="bg-white rounded-3xl p-8 cursor-pointer flex flex-col items-center text-center gap-5 transition-all duration-300"
              style={{
                boxShadow: hovered === i ? '0 20px 50px rgba(9,105,177,0.15)' : '0 2px 16px rgba(0,0,0,0.06)',
                transform: hovered === i ? 'translateY(-6px)' : 'translateY(0)',
                border: hovered === i ? '2px solid #17ae95' : '2px solid transparent',
                animation: `slideUp 0.5s ease ${i * 0.05}s both`,
              }}>

              {/* Big icon circle */}
              <div className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  background: hovered === i
                    ? 'linear-gradient(135deg, #0969b1, #17ae95)'
                    : 'linear-gradient(135deg, #17ae95, #17ae95)',
                  boxShadow: hovered === i ? '0 8px 24px rgba(9,105,177,0.35)' : '0 4px 14px rgba(23,174,149,0.25)',
                  transform: hovered === i ? 'scale(1.1)' : 'scale(1)',
                }}>
                {s.icon ? (
                  <img src={s.icon} alt={s.title} className="w-12 h-12"
                    style={{ filter: 'brightness(0) invert(1)' }} />
                ) : (
                  <Brain className="w-12 h-12" stroke="white" strokeWidth={1.5} />
                )}
              </div>

              {/* Title */}
              <h3 className="font-bold text-gray-900 text-lg leading-tight">{s.title}</h3>

              {/* Desc */}
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>

              {/* Learn more */}
              <div className="flex items-center gap-1 text-sm font-semibold mt-auto transition-all duration-300"
                style={{ color: hovered === i ? '#0969b1' : '#17ae95' }}>
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform duration-300"
                  style={{ transform: hovered === i ? 'translateX(4px)' : 'translateX(0)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  )
}
