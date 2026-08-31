import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Heart, Shield, Users, Target, MapPin, Phone, ArrowRight, CheckCircle2, Stethoscope, Building2 } from 'lucide-react'

function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

function useTypewriter(text, speed = 45, start = false) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!start) return
    setDisplayed('')
    let i = 0
    const t = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(t)
    }, speed)
    return () => clearInterval(t)
  }, [start, text])
  return displayed
}

const values = [
  { icon: Heart,   label: 'Compassion',   color: 'from-[#0969b1] to-[#3da8d8]', glow: 'rgba(9,105,177,0.3)',   desc: 'Every patient is treated like family, with genuine care and empathy.' },
  { icon: Shield,  label: 'Ethics',        color: 'from-[#17ae95] to-[#3dc9b0]', glow: 'rgba(23,174,149,0.3)', desc: 'Transparency and integrity guide every decision we make.' },
  { icon: Users,   label: 'Community',     color: 'from-[#0969b1] to-[#17ae95]', glow: 'rgba(9,105,177,0.25)', desc: 'Committed to reaching underserved rural populations across Karnataka.' },
  { icon: Target,  label: 'Affordability', color: 'from-[#17ae95] to-[#0969b1]', glow: 'rgba(23,174,149,0.3)', desc: 'Expert healthcare at prices that make quality care a reality for all.' },
]

const highlights = [
  'Multi-specialty care under one roof',
  'Modern medical technology & equipment',
  'Dedicated doctors, nurses & support staff',
  'Affordable treatment without quality compromise',
  'Serving rural & underserved communities',
  'Personalized, patient-first approach',
]

const stats = [
  { value: '13+', label: 'Specialities' },
  { value: '5K+', label: 'Patients Served' },
  { value: '24/7', label: 'Emergency Care' },
  { value: '100%', label: 'Commitment' },
]

function ValueCard({ item, index, visible }) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-500 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
        background: hovered ? 'white' : 'rgba(255,255,255,0.8)',
        boxShadow: hovered ? `0 24px 48px ${item.glow}, 0 0 0 1px rgba(255,255,255,0.6)` : '0 2px 16px rgba(0,0,0,0.06)',
        border: '1px solid rgba(241,245,249,1)',
        backdropFilter: 'blur(12px)',
      }}>

<div className="absolute -top-2 -right-2 text-7xl font-black select-none pointer-events-none"
        style={{ opacity: 0.04, background: 'linear-gradient(135deg,#0969b1,#17ae95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-5 shadow-lg transition-all duration-300`}
        style={{ transform: hovered ? 'scale(1.1) rotate(-6deg)' : 'scale(1)', boxShadow: hovered ? `0 12px 28px ${item.glow}` : '' }}>
        <Icon className="w-7 h-7 text-white" />
        {hovered && <div className={`absolute w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} opacity-30 animate-ping`} />}
      </div>

      <h3 className="font-bold text-gray-800 text-lg mb-2 group-hover:text-gray-900">{item.label}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>

<div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} transition-transform duration-500 origin-left`}
        style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
    </div>
  )
}

const founders = [
  {
    name: 'Mahesh Magari',
    role: 'Managing Director',
    color: '#0969b1',
    photo: '/leadership_team/p1.webp',
    bio: 'Mahesh Magari serves as the Managing Director of Magari Healthcare, leading Leela Hospital with exceptional leadership, vision, and a deep commitment to patient care. With an MBA in Management and valuable experience in the healthcare sector, he brings strong strategic thinking and next-level management skills. His leadership reflects trust, responsibility, and a passion to make a meaningful impact in healthcare.',
  },
  {
    name: 'Mantesh Magari',
    role: 'Director – Administration & Finance',
    color: '#17ae95',
    photo: '/leadership_team/p2.webp',
    bio: 'Mantesh Magari manages the financial and administrative backbone of the hospital, ensuring smooth day-to-day operations. With an M.Com in Finance and healthcare experience, he brings discipline, transparency, and responsibility. He is consistently present in the hospital, supporting patients, staff, and operations with dedication and care.',
  },
  {
    name: 'Siddu Magari',
    role: 'Director – Patient Services & Administration',
    color: '#0969b1',
    photo: '/leadership_team/p3.webp',
    bio: 'Siddu Magari plays a key role in patient coordination, billing, and overall patient experience. With a B.Com background, he manages the entire patient journey from entry to discharge, ensuring smooth communication between patients and doctors. His dedication and personal involvement create a supportive and patient-friendly environment.',
  },
  {
    name: 'Kumar Magari',
    role: 'Director – Operations, Marketing & Patient Support',
    color: '#17ae95',
    photo: null,
    bio: 'Kumar Magari contributes across marketing, operations, and patient care with exceptional dedication. He manages outreach, hospital maintenance, and OT coordination while ensuring patients feel cared for and comfortable. Known for his kindness and availability, he supports patients 24/7 with compassion and responsibility.',
  },
  {
    name: 'Rajesh Magari',
    role: 'Director – Clinical Support & Patient Care',
    color: '#0969b1',
    photo: '/leadership_team/p5.webp',
    bio: 'Rajesh Magari, a Pharm.D graduate, brings strong medical knowledge to the hospital. He supports both OPD and IPD care, guiding patients from admission to discharge. He explains conditions, treatments, and recovery clearly, helping patients feel informed and confident throughout their healthcare journey.',
  },
]

function LeaderCard({ f, i }) {
  const [cardRef, cardVisible] = useReveal(0.15)
  const [hovered, setHovered] = useState(false)
  const isEven = i % 2 === 0
  const accent2 = f.color === '#0969b1' ? '#17ae95' : '#0969b1'

  return (
    <div ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch rounded-3xl overflow-hidden`}
      style={{
        opacity: cardVisible ? 1 : 0,
        transform: cardVisible ? 'translateY(0)' : 'translateY(60px)',
        transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)',
        boxShadow: hovered
          ? `0 32px 64px rgba(0,0,0,0.15), 0 0 0 1px ${f.color}30`
          : '0 8px 32px rgba(0,0,0,0.08)',
      }}>

<div className="relative md:w-80 flex-shrink-0 overflow-hidden"
        style={{ minHeight: '450px', background: `linear-gradient(135deg,#022441,${f.color},${accent2})` }}>

<div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.8) 1px,transparent 0)', backgroundSize: '20px 20px' }} />

<div className="absolute -top-8 -right-8 w-40 h-40 rounded-full blur-2xl opacity-30 animate-blob"
          style={{ background: accent2 }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-2xl opacity-20 animate-blob-delay"
          style={{ background: '#7dd3fc' }} />

<div className="absolute top-5 right-6 font-black text-white/10 select-none"
          style={{ fontSize: '5rem', lineHeight: 1, fontFamily: "'Nunito',sans-serif" }}>
          {String(i + 1).padStart(2, '0')}
        </div>

{f.photo ? (
          <>
            <img src={f.photo} alt={f.name}
              className="absolute inset-0 w-full h-full object-cover object-top z-10" />
            <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-5"
              style={{ background: 'linear-gradient(to top,rgba(2,36,65,0.95),transparent)' }}>
              <div className="text-white font-extrabold text-lg" style={{ fontFamily: "'Nunito',sans-serif" }}>{f.name}</div>
              <div className="text-teal-300 text-xs font-medium mt-0.5">{f.role}</div>
            </div>
          </>
        ) : (
          <>
            
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3">
              <div className="w-28 h-28 rounded-full border-4 border-white/20 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-white/40 text-xs font-medium tracking-widest uppercase">Photo Coming Soon</p>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-5"
              style={{ background: 'linear-gradient(to top,rgba(2,36,65,0.9),transparent)' }}>
              <div className="text-white font-extrabold text-lg" style={{ fontFamily: "'Nunito',sans-serif" }}>{f.name}</div>
              <div className="text-teal-300 text-xs font-medium mt-0.5">{f.role}</div>
            </div>
          </>
        )}
      </div>

<div className="flex-1 relative overflow-hidden bg-white"
        style={{
          opacity: cardVisible ? 1 : 0,
          transform: cardVisible ? 'translateX(0)' : (isEven ? 'translateX(30px)' : 'translateX(-30px)'),
          transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.2s',
        }}>

<div className="h-1.5 w-full overflow-hidden">
          <div className="h-full transition-all duration-1000"
            style={{ width: cardVisible ? '100%' : '0%', background: `linear-gradient(90deg,${f.color},${accent2})`, transitionDelay: '0.5s' }} />
        </div>

<div className="absolute inset-0 opacity-30"
          style={{ background: `linear-gradient(135deg,${f.color}05,${accent2}05)` }} />

<div className="absolute -bottom-6 -right-6 font-black select-none pointer-events-none"
          style={{ fontSize: '10rem', lineHeight: 1, color: f.color, opacity: 0.04, fontFamily: "'Nunito',sans-serif" }}>
          {f.name.charAt(0)}
        </div>

        <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-center">

<div className="inline-flex items-center gap-2 self-start mb-5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: `${f.color}10`, color: f.color, border: `1.5px solid ${f.color}25` }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: `linear-gradient(135deg,${f.color},${accent2})` }} />
            {f.role}
          </div>

<h3 className="font-extrabold text-gray-900 mb-2 leading-tight"
            style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(1.6rem,3vw,2.2rem)',
              opacity: cardVisible ? 1 : 0, transform: cardVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.7s ease 0.35s' }}>
            {f.name}
          </h3>

<div className="mb-6 h-0.5 rounded-full overflow-hidden bg-gray-100">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: cardVisible ? '40%' : '0%', background: `linear-gradient(90deg,${f.color},${accent2})`, transitionDelay: '0.8s' }} />
          </div>

<p className="text-gray-500 leading-relaxed text-[0.97rem]"
            style={{ opacity: cardVisible ? 1 : 0, transform: cardVisible ? 'translateY(0)' : 'translateY(12px)',
              transition: 'all 0.7s ease 0.5s' }}>
            {f.bio}
          </p>
        </div>
      </div>
    </div>
  )
}

function FoundersSection() {
  const [sectionRef, sectionVisible] = useReveal(0.05)

  return (
    <div ref={sectionRef} className="relative overflow-hidden" style={{ background: '#fff' }}>

<div className="relative py-24">
        <div className="absolute inset-0 opacity-30"
          style={{ background: 'linear-gradient(135deg,#f0f9ff,#f0fdf4)' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />

        <div className="relative max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-14"
            style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease' }}>
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#17ae95' }}>
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,transparent,#17ae95)' }} />
              Our Story
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,#17ae95,transparent)' }} />
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Nunito',sans-serif" }}>
              About the{' '}
              <span style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                Founders
              </span>
            </h2>
          </div>

<div className="rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-5"
            style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.8s ease 0.2s' }}>

<div className="md:col-span-2 relative p-10 flex flex-col justify-center"
              style={{ background: 'linear-gradient(135deg,#022441,#0969b1,#17ae95)' }}>
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.8) 1px,transparent 0)', backgroundSize: '22px 22px' }} />
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ background: '#17ae95' }} />
              <div className="relative z-10">
                <div className="text-6xl font-black text-white/10 leading-none mb-4" style={{ fontFamily: "'Nunito',sans-serif" }}>"</div>
                <p className="text-white/90 text-lg font-semibold leading-relaxed italic" style={{ fontFamily: "'Nunito',sans-serif" }}>
                  Not just building a hospital — creating a place where people find trust, care, and hope.
                </p>
                <div className="mt-6 h-px w-16" style={{ background: 'linear-gradient(90deg,#5eead4,transparent)' }} />
                <p className="text-teal-300 text-sm font-medium mt-3">— The Magari Brothers</p>
              </div>
            </div>

<div className="md:col-span-3 bg-white p-10">
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>Magari Healthcare is founded and led by a team of brothers — <strong className="text-gray-900">Mahesh, Mantesh, Siddu, Kumar, and Rajesh Magari</strong> — who share a strong vision of making quality healthcare accessible and affordable for every individual.</p>
                <p>Coming from non-medical backgrounds, they established Magari Healthcare as a partnership firm and are successfully running Leela Hospital with dedication, courage, and purpose.</p>
                <p>With valuable experience in corporate healthcare, the founders have built strong systems across administration, finance, marketing, pharmacy, and laboratory services. They are personally involved in day-to-day operations, ensuring quality patient care and smooth functioning.</p>
                <p>Hailing from rural, middle-class families, they understand the real challenges faced by people in accessing healthcare. As first-generation entrepreneurs, they have worked with unity, courage, and vision to build a healthcare system focused on affordability, compassion, and trust.</p>
                <p className="text-teal-600 font-medium italic">They dedicate this journey to their team of doctors, staff, and everyone who contributed to making Leela Hospital a place of healing and hope.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

<div className="relative py-24" style={{ background: 'linear-gradient(135deg,#f8fafc,#eff6ff 40%,#f0fdf4 70%,#f8fafc)' }}>
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,#cbd5e1 1px,transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-10 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />

        <div className="relative max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16"
            style={{ opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)', transition: 'all 0.7s ease 0.1s' }}>
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#17ae95' }}>
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,transparent,#17ae95)' }} />
              Our Leadership
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,#17ae95,transparent)' }} />
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Nunito',sans-serif" }}>
              Leadership{' '}
              <span style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                Team
              </span>
            </h2>
          </div>

<div className="space-y-16">
            {founders.map((f, i) => (
              <LeaderCard key={f.name} f={f} i={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PatientQuoteCard({ visible }) {
  const words = ["We", "don't", "just", "treat", "patients", "—", "we", "care,", "we", "serve,", "and", "we", "heal", "with", "heart."]
  const [activeWords, setActiveWords] = useState(0)

  useEffect(() => {
    if (!visible) return
    let i = 0
    const t = setInterval(() => { i++; setActiveWords(i); if (i >= words.length) clearInterval(t) }, 120)
    return () => clearInterval(t)
  }, [visible])

  return (
    <div className="relative cursor-default"
      style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.4,0,0.2,1)' }}>

<div className="absolute -inset-1 rounded-3xl blur-xl opacity-40"
        style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)' }} />

      <div className="relative rounded-3xl overflow-hidden" style={{ background: '#022441' }}>

<div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg,#0969b1,#17ae95,#0969b1)', backgroundSize: '200%', animation: 'shimmer 3s linear infinite' }} />

{[...Array(5)].map((_, i) => (
          <div key={i} className="absolute rounded-full animate-float pointer-events-none"
            style={{ width: `${4+i*2}px`, height: `${4+i*2}px`, background: i%2===0?'rgba(94,234,212,0.3)':'rgba(125,211,252,0.3)', left:`${15+i*17}%`, top:`${10+i*12}%`, animationDelay:`${i*0.7}s`, animationDuration:`${3+i*0.8}s` }} />
        ))}

        <div className="relative z-10 p-10">

<div className="relative w-12 h-12 mb-8">
            <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: 'rgba(23,174,149,0.25)' }} />
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)' }}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="white">
                <path d="M0 16V10C0 4.667 2.667 1.333 8 0l1.333 2C6.444 2.889 5 4.889 5 7.333H8V16H0ZM12 16V10C12 4.667 14.667 1.333 20 0l1.333 2C18.444 2.889 17 4.889 17 7.333H20V16H12Z"/>
              </svg>
            </div>
          </div>

<blockquote className="mb-8 leading-relaxed" style={{ fontFamily:"'Nunito',sans-serif", fontSize:'1.3rem', fontWeight:700, minHeight:'100px' }}>
            {words.map((word, i) => (
              <span key={i} className="inline-block mr-2"
                style={{
                  opacity: i < activeWords ? 1 : 0,
                  transform: i < activeWords ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                  color: ['care,','serve,','heal'].includes(word) ? '#5eead4' : ['patients','heart.'].includes(word) ? '#7dd3fc' : 'white',
                }}>
                {word}
              </span>
            ))}
          </blockquote>

<div className="mb-6 h-px rounded-full overflow-hidden bg-white/10">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: visible ? '100%' : '0%', background: 'linear-gradient(90deg,#0969b1,#17ae95)', transitionDelay: '1.8s' }} />
          </div>

<div className="flex items-center gap-3">
            <div className="relative w-11 h-11">
              <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ background: 'rgba(23,174,149,0.3)' }} />
              <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <img src="/Leela__Logo_-1-removebg-preview.webp" alt="" className="w-7 h-7 object-contain" />
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-sm" style={{ fontFamily:"'Nunito',sans-serif" }}>Leela Hospital</div>
              <div className="text-teal-300 text-xs font-medium">Gadag, Karnataka</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-teal-300 text-xs font-semibold">Healing with Heart</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const [heroRef, heroVisible] = useReveal(0.1)
  const [whoRef, whoVisible] = useReveal()
  const [valuesRef, valuesVisible] = useReveal()
  const [patientRef, patientVisible] = useReveal()
  const [missionRef, missionVisible] = useReveal()
  const [visionRef, visionVisible] = useReveal()
  const [isMobileOrbit, setIsMobileOrbit] = useState(false)

  useEffect(() => {
    const updateOrbitLayout = () => setIsMobileOrbit(window.innerWidth < 640)
    updateOrbitLayout()
    window.addEventListener('resize', updateOrbitLayout)
    return () => window.removeEventListener('resize', updateOrbitLayout)
  }, [])

  const orbitSize = isMobileOrbit ? 300 : 380
  const innerOrbitSize = isMobileOrbit ? 220 : 280
  const orbitRadius = isMobileOrbit ? 145 : 190
  const orbitHeight = isMobileOrbit ? 390 : 480

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

<div className="relative pt-24 pb-0 overflow-hidden" style={{ background: 'linear-gradient(135deg, #022441 0%, #0969b1 55%, #17ae95 100%)', minHeight: '320px' }}>

<div className="absolute inset-0 opacity-30 animate-gradient"
          style={{ background: 'linear-gradient(270deg, #022441, #0969b1, #17ae95, #022441)', backgroundSize: '400% 400%' }} />

<div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

<div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 animate-blob"
          style={{ background: 'radial-gradient(circle, #17ae95, #0969b1, transparent)' }} />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 animate-blob-delay"
          style={{ background: 'radial-gradient(circle, #0969b1, #022441, transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(ellipse, #5eead4, transparent)' }} />

{[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20 animate-float"
            style={{
              width: `${6 + (i % 3) * 4}px`, height: `${6 + (i % 3) * 4}px`,
              background: i % 2 === 0 ? '#5eead4' : '#7dd3fc',
              left: `${10 + i * 11}%`, top: `${20 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.6}s`, animationDuration: `${4 + i * 0.5}s`
            }} />
        ))}

<div className="absolute inset-0 opacity-5"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)' }} />

        <div ref={heroRef} className="relative max-w-5xl mx-auto px-6 pt-8 pb-16 text-center">

<div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.7s ease' }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-teal-200 text-xs font-semibold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-8 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
              Leela Hospital · Gadag, Karnataka
              <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
            </span>
          </div>

<div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.15s' }}>
            <h1 className="mb-4 leading-tight" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <span className="block text-white/60 text-lg md:text-xl font-light tracking-[0.15em] uppercase mb-2"
                style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.25em' }}>
                Welcome to
              </span>
              <span className="block font-extrabold text-white"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', lineHeight: 1.05, fontFamily: "'Nunito', sans-serif", textShadow: '0 4px 40px rgba(0,0,0,0.3)' }}>
                Leela
              </span>
              <span className="block font-bold tracking-[0.18em] uppercase"
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                  fontFamily: "'Montserrat', sans-serif",
                  background: 'linear-gradient(90deg, #7dd3fc, #5eead4, #a5f3fc)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(94,234,212,0.4))',
                }}>
                Hospital
              </span>
            </h1>
          </div>

<div style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.8s ease 0.4s' }}>
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #5eead4)' }} />
              <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
              <div className="h-px w-24 rounded-full" style={{ background: 'linear-gradient(90deg, #5eead4, #7dd3fc)' }} />
              <div className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg, #7dd3fc, transparent)' }} />
            </div>
          </div>

<div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.9s ease 0.5s' }}>
            <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 400, letterSpacing: '0.01em' }}>
              A unit of <span className="text-teal-300 font-semibold">Magari Healthcare</span> — where care meets compassion.
              Built to make quality healthcare <span className="text-sky-300 font-medium">accessible, affordable,</span> and
              <span className="text-teal-300 font-medium"> trustworthy</span> for every individual.
            </p>
          </div>

</div>

<svg className="w-full block" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70, display: 'block', marginTop: '-1px' }}>
          <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,10 1440,35 L1440,70 L0,70 Z" fill="#f9fafb" />
        </svg>
      </div>

<div ref={whoRef} className="relative py-24 overflow-hidden" style={{ background: '#fff' }}>

<div className="absolute top-0 left-0 w-1/2 h-full opacity-5"
          style={{ background: 'linear-gradient(135deg, #0969b1, transparent)' }} />

        <div className="max-w-6xl mx-auto px-6">

<div className="text-center mb-16"
            style={{ opacity: whoVisible ? 1 : 0, transform: whoVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] mb-4"
              style={{ color: '#17ae95' }}>
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,transparent,#17ae95)' }} />
              Who We Are
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,#17ae95,transparent)' }} />
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Quality Healthcare,{' '}
              <span style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                For Everyone
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-start">

<div style={{ opacity: whoVisible ? 1 : 0, transform: whoVisible ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.1s' }}>
              <div className="relative flex items-center justify-center mx-auto w-full" style={{ height: `${orbitHeight}px`, maxWidth: isMobileOrbit ? '360px' : '100%' }}>

<div className="absolute w-72 h-72 rounded-full animate-blob"
                  style={{ background: 'linear-gradient(135deg,rgba(9,105,177,0.12),rgba(23,174,149,0.12))', filter: 'blur(40px)' }} />

<div className="absolute rounded-full border-2 border-dashed animate-spin-slow"
                  style={{ width: `${orbitSize}px`, height: `${orbitSize}px`, borderColor: 'rgba(23,174,149,0.2)' }} />

<div className="absolute rounded-full border border-dashed"
                  style={{ width: `${innerOrbitSize}px`, height: `${innerOrbitSize}px`, borderColor: 'rgba(9,105,177,0.15)', animation: 'spin-slow 15s linear infinite reverse' }} />

<div className="relative z-10 w-36 h-36 flex items-center justify-center flex-shrink-0">
                  <div className="absolute inset-0 rounded-full animate-spin-slow"
                    style={{ background: 'conic-gradient(from 0deg,#0969b1,#17ae95,#3dc9b0,#3da8d8,#0969b1)', padding: '3px' }}>
                    <div className="w-full h-full rounded-full bg-white" />
                  </div>
                  <div className="relative z-10 w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <img src="/Leela__Logo_-1-removebg-preview.webp" alt="Leela Hospital"
                      className="w-20 h-20 object-contain" />
                  </div>
                </div>

{[
                  { icon: CheckCircle2, text: 'Multi-Specialty',       color: '#0969b1', angle: -90  },
                  { icon: Heart,        text: 'Patient-First',          color: '#17ae95', angle: -30  },
                  { icon: MapPin,       text: 'Gadag, Karnataka',       color: '#0969b1', angle: 30   },
                  { icon: Shield,       text: 'Affordable Care',        color: '#17ae95', angle: 90   },
                  { icon: Users,        text: 'Rural Communities',      color: '#0969b1', angle: 150  },
                  { icon: Stethoscope,  text: '13+ Specialities',       color: '#17ae95', angle: 210  },
                ].map(({ icon: Icon, text, color, angle }, i) => {
                  const rad = (angle * Math.PI) / 180
                  const r = orbitRadius
                  const x = Math.round(r * Math.cos(rad))
                  const y = Math.round(r * Math.sin(rad))
                  return (
                    <div key={i}
                      className="absolute flex items-center bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-default z-20"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        whiteSpace: 'nowrap',
                        gap: isMobileOrbit ? '6px' : '8px',
                        padding: isMobileOrbit ? '6px 10px' : '8px 12px',
                      }}>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}18` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color }} />
                      </div>
                      <span className="font-semibold text-gray-700" style={{ fontSize: isMobileOrbit ? '11px' : '12px' }}>{text}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ opacity: whoVisible ? 1 : 0, transform: whoVisible ? 'translateX(0)' : 'translateX(50px)', transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1) 0.25s' }}>
              <div className="space-y-6 text-gray-600 leading-relaxed text-[1.05rem]">
                <p>
                  Leela Hospital, a unit of <strong className="text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>Magari Healthcare</strong>, is a multi-specialty hospital located in Gadag, Karnataka (582101), built with a strong purpose — to make quality healthcare <strong className="text-gray-900">accessible, affordable, and trustworthy</strong> for every individual.
                </p>
                <p>
                  We are not just a hospital; we are a place where care meets compassion. Equipped with modern medical technology and comprehensive facilities, we provide a wide range of healthcare services across all major departments, ensuring that patients receive complete care under one roof.
                </p>
                <p>
                  What truly defines us is our deep understanding of people's needs. We recognize the struggles faced by families in accessing quality healthcare, especially in rural areas. That is why we are committed to delivering the best possible treatment at the most affordable cost, without compromising on quality.
                </p>
              </div>

</div>
          </div>
        </div>
      </div>

<div className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f8fafc, #eff6ff 40%, #f0fdf4 70%, #f8fafc)' }}>
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl opacity-15 animate-blob"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-15 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />

        <div ref={valuesRef} className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-14"
            style={{ opacity: valuesVisible ? 1 : 0, transform: valuesVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <span className="inline-flex items-center gap-2 text-teal-600 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-8 h-px bg-teal-500" /> Our Values <span className="w-8 h-px bg-teal-500" />
            </span>
            <h2 className="text-4xl font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, i) => (
              <ValueCard key={item.label} item={item} index={i} visible={valuesVisible} />
            ))}
          </div>
        </div>
      </div>

<div ref={patientRef} className="relative py-24 overflow-hidden">

<div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f0fdf4 100%)' }} />
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-10 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />

        <div className="relative max-w-6xl mx-auto px-6">

<div className="text-center mb-16"
            style={{ opacity: patientVisible ? 1 : 0, transform: patientVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}>
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: '#17ae95' }}>
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,transparent,#17ae95)' }} />
              Patient First
              <span className="w-10 h-px" style={{ background: 'linear-gradient(90deg,#17ae95,transparent)' }} />
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Every Patient is{' '}
              <span style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Family</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">

<PatientQuoteCard visible={patientVisible} />

<div style={{ opacity: patientVisible ? 1 : 0, transform: patientVisible ? 'translateX(0)' : 'translateX(50px)', transition: 'all 0.9s ease 0.3s' }}>

<div className="space-y-6">
                {[
                  'At Leela Hospital, every patient is treated like family. We believe healing begins with trust, and we take time to listen, understand, and provide personalized care to each individual. Our approach is rooted in compassion, ethics, transparency, and a genuine commitment to patient well-being.',
                  'Our team of dedicated doctors, nurses, and staff work tirelessly with passion and responsibility, ensuring timely, safe, and effective care. Every life that walks through our doors matters to us, and we strive to make a positive difference in every patient\'s journey.'
                ].map((para, i) => (
                  <div key={i} className="flex gap-4 group"
                    style={{ opacity: patientVisible ? 1 : 0, transform: patientVisible ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.7s ease ${0.4 + i * 0.15}s` }}>
                    <div className="w-1 rounded-full flex-shrink-0 mt-1 transition-all duration-500 group-hover:scale-y-110"
                      style={{ background: 'linear-gradient(180deg,#0969b1,#17ae95)', minHeight: '100%' }} />
                    <p className="text-gray-600 leading-relaxed text-[1.05rem]">{para}</p>
                  </div>
                ))}
              </div>

<div className="mt-10 flex flex-wrap gap-3">
                {['Compassion', 'Ethics', 'Transparency', 'Personalized Care', 'Trust'].map((tag, i) => (
                  <span key={tag}
                    className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full transition-all duration-500 hover:-translate-y-1 hover:shadow-lg cursor-default"
                    style={{
                      opacity: patientVisible ? 1 : 0,
                      transform: patientVisible ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
                      transition: `all 0.5s ease ${0.6 + i * 0.1}s`,
                      background: 'white',
                      border: '1.5px solid rgba(9,105,177,0.2)',
                      color: '#0969b1',
                      boxShadow: '0 2px 12px rgba(9,105,177,0.08)'
                    }}>
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)' }} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

<div ref={missionRef} className="relative py-24 overflow-hidden" style={{ background: '#fff' }}>

        <div className="absolute inset-0 opacity-30"
          style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%)' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

<div style={{ opacity: missionVisible ? 1 : 0, transform: missionVisible ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.8s ease' }}>
            <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-teal-600 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              Our Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              What We're{' '}
              <span style={{ background: 'linear-gradient(135deg,#0969b1,#17ae95)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                Here to Do
              </span>
            </h2>
            <div className="h-1 rounded-full overflow-hidden bg-gray-100 w-32">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: missionVisible ? '100%' : '0%', background: 'linear-gradient(90deg,#0969b1,#17ae95)', transitionDelay: '0.5s' }} />
            </div>
          </div>

<div style={{ opacity: missionVisible ? 1 : 0, transform: missionVisible ? 'translateX(0)' : 'translateX(50px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className="space-y-5">
              {[
                'Our mission is to make quality healthcare accessible to all by providing the best medical care at the most affordable cost.',
                'We are dedicated to serving people with compassion, understanding their needs, and delivering personalized treatment with honesty and care.',
                'We aim to reach rural communities, reduce healthcare challenges, and bring hope, healing, and trust to every life we touch.'
              ].map((para, i) => (
                <div key={i} className="flex gap-4 group"
                  style={{ opacity: missionVisible ? 1 : 0, transform: missionVisible ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${0.3 + i * 0.15}s` }}>
                  <div className="w-1 rounded-full flex-shrink-0 mt-1"
                    style={{ background: 'linear-gradient(180deg,#0969b1,#17ae95)', minHeight: '100%' }} />
                  <p className="text-gray-600 leading-relaxed">{para}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

<div ref={visionRef} className="relative py-24 overflow-hidden" style={{ background: '#fff' }}>

        <div className="absolute inset-0 opacity-30"
          style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #f0f9ff 100%)' }} />
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />
        <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-10 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />

        <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

<div className="order-2 md:order-1" style={{ opacity: visionVisible ? 1 : 0, transform: visionVisible ? 'translateX(0)' : 'translateX(-50px)', transition: 'all 0.8s ease 0.2s' }}>
            <div className="space-y-5">
              {[
                'Our vision is to expand across Karnataka by establishing a network of hospitals, super-specialty clinics, and advanced diagnostic centers, making quality healthcare accessible to all.',
                'We aspire to bring specialized, affordable, and reliable medical services closer to every community, especially in rural and underserved areas where access to healthcare is limited.',
                'We are driven by a deep commitment to reduce the gap between need and care, ensuring that no patient is left behind.',
                'Through continuous growth, innovation, and compassion, we aim to build a trusted healthcare system that not only treats illness but also brings hope, healing, and a better future to every life we serve.'
              ].map((para, i) => (
                <div key={i} className="flex gap-4"
                  style={{ opacity: visionVisible ? 1 : 0, transform: visionVisible ? 'translateY(0)' : 'translateY(16px)', transition: `all 0.6s ease ${0.3 + i * 0.15}s` }}>
                  <div className="w-1 rounded-full flex-shrink-0 mt-1"
                    style={{ background: 'linear-gradient(180deg,#17ae95,#0969b1)', minHeight: '100%' }} />
                  <p className="text-gray-600 leading-relaxed">{para}</p>
                </div>
              ))}
            </div>
          </div>

<div className="order-1 md:order-2 md:text-right" style={{ opacity: visionVisible ? 1 : 0, transform: visionVisible ? 'translateX(0)' : 'translateX(50px)', transition: 'all 0.8s ease' }}>
            <span className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-600 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
              style={{ fontFamily: "'Nunito', sans-serif" }}>
              Where We're{' '}
              <span style={{ background: 'linear-gradient(135deg,#17ae95,#0969b1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                Headed
              </span>
            </h2>
            <div className="h-1 rounded-full overflow-hidden bg-gray-100 w-32 md:ml-auto">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: visionVisible ? '100%' : '0%', background: 'linear-gradient(90deg,#17ae95,#0969b1)', transitionDelay: '0.5s' }} />
            </div>
          </div>
        </div>
      </div>

<FoundersSection />

      <Footer />
    </div>
  )
}
