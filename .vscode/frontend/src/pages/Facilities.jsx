import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, X,
  Ambulance, FlaskConical, ShieldPlus, Pill,
  BedDouble, Activity, ClipboardCheck, HeartPulse,
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import imgAmbulance      from '../assets/facilities/ambulance.jpg'
import imgOT             from '../assets/facilities/operation-theatre.jpg'
import imgLab            from '../assets/facilities/laboratory.jpg'
import imgRadiology      from '../assets/facilities/radiology.jpg'
import imgEmergency      from '../assets/facilities/emergency.jpg'
import imgICU            from '../assets/facilities/icu.jpg'
import imgPharmacy       from '../assets/facilities/pharmacy.jpg'
import imgPatientRoom    from '../assets/facilities/patient-room.jpg'
import imgECG            from '../assets/facilities/ecg.jpg'
import imgHealthCheckup  from '../assets/facilities/health-checkup.jpg'
import imgUSG            from '../assets/facilities/usg.jpg'
import imgPhysio         from '../assets/facilities/physiotherapy.jpg'

import iconSurgical      from '../assets/facilities/icon-surgical.svg'
import iconRadiology     from '../assets/facilities/icon-radiology.png'
import iconHeart         from '../assets/facilities/icon-heart.svg'
import iconOrthopedics   from '../assets/facilities/icon-orthopedics.svg'

const facilities = [
  {
    title: '24/7 Ambulance Service',
    tag: 'Emergency',
    iconType: 'lucide', Icon: Ambulance,
    image: imgAmbulance,
    short: 'Round-the-clock ambulance service with trained paramedics ready to respond at any hour.',
    para1: 'At Leela Hospital, we are committed to ensuring the safety and well-being of our community at all times. Our ambulance service operates 24 hours a day, 7 days a week, providing prompt and reliable emergency transport to patients in need.',
    para2: 'Each ambulance is staffed by trained paramedics equipped to provide immediate care during transit. Whether it is a medical emergency or a planned transfer, our team ensures patients reach the hospital safely and swiftly.',
  },
  {
    title: 'Modular Operation Theatres',
    tag: 'Surgery',
    iconType: 'img', src: iconSurgical,
    image: imgOT,
    short: 'Modern operation theatres designed for surgical excellence and strict infection control.',
    para1: 'Leela Hospital\'s operation theatres are built to the highest standards of surgical care. Our modular design ensures a clean, controlled environment that minimises the risk of infection and supports a wide range of surgical procedures.',
    para2: 'Each theatre is equipped with modern surgical tools and supported by experienced surgical teams. From routine procedures to complex operations, our theatres are designed to deliver safe and effective outcomes for every patient.',
  },
  {
    title: 'Laboratory Department',
    tag: 'Diagnostics',
    iconType: 'lucide', Icon: FlaskConical,
    image: imgLab,
    short: 'Accurate diagnostic testing with modern equipment and fast turnaround for results.',
    para1: 'Our Laboratory Department at Leela Hospital is dedicated to providing precise and reliable diagnostic services. We use modern equipment to carry out a wide range of tests, helping doctors make informed decisions about patient care.',
    para2: 'From routine blood tests to specialised investigations, our laboratory team works efficiently to deliver accurate results in a timely manner. We are committed to supporting the diagnostic needs of all departments within the hospital.',
  },
  {
    title: 'Digitalized Radiology',
    tag: 'Imaging',
    iconType: 'img', src: iconRadiology,
    image: imgRadiology,
    short: 'Digital imaging services including X-Ray, Ultrasound, and CT Scan for clear diagnosis.',
    para1: 'Leela Hospital offers comprehensive digital radiology services to support accurate diagnosis across all medical specialities. Our imaging department uses modern technology to produce clear, detailed images that assist our doctors in identifying and treating conditions effectively.',
    para2: 'Our radiology team is experienced in handling a wide range of imaging needs, from simple X-Rays to more detailed scans. Reports are prepared promptly and shared with the treating doctor to ensure continuity of care.',
  },
  {
    title: 'Emergency & Trauma Care',
    tag: 'Emergency',
    iconType: 'lucide', Icon: ShieldPlus,
    image: imgEmergency,
    short: 'Dedicated emergency unit available around the clock for all critical and trauma cases.',
    para1: 'Leela Hospital\'s Emergency and Trauma Care unit is available 24 hours a day to handle all types of medical emergencies. Our team of doctors and nurses is trained to respond quickly and provide immediate care to patients in critical condition.',
    para2: 'We understand that emergencies can be stressful for patients and their families. Our staff is committed to providing not only fast medical attention but also compassionate support throughout the process, ensuring the best possible outcome.',
  },
  {
    title: 'Modern ICU',
    tag: 'Critical Care',
    iconType: 'lucide', Icon: HeartPulse,
    image: imgICU,
    short: 'Intensive Care Unit with continuous monitoring and dedicated critical care staff.',
    para1: 'Our Intensive Care Unit at Leela Hospital is equipped to provide round-the-clock care for patients who require close monitoring and specialised treatment. The ICU is staffed by experienced doctors and nurses who are trained in critical care management.',
    para2: 'We prioritise patient safety and comfort in our ICU. Families are kept informed about their loved one\'s condition, and our team works tirelessly to support recovery and ensure the best possible care at every stage.',
  },
  {
    title: 'Pharmacy',
    tag: 'Support',
    iconType: 'lucide', Icon: Pill,
    image: imgPharmacy,
    short: '24/7 in-house pharmacy stocked with a wide range of medications and healthcare products.',
    para1: 'Leela Hospital is pleased to offer a round-the-clock pharmacy service to all patients and visitors. Our pharmacy is well-stocked with a comprehensive range of medications, ensuring that prescriptions can be filled at any time of the day or night.',
    para2: 'Our qualified pharmacists are available to answer questions about medications, dosage, and potential interactions. We are committed to making the process of obtaining medicines as smooth and convenient as possible for every patient.',
  },
  {
    title: 'Patient Rooms',
    tag: 'Comfort',
    iconType: 'lucide', Icon: BedDouble,
    image: imgPatientRoom,
    short: 'Comfortable and well-maintained rooms available across economy, shared, and private categories.',
    para1: 'At Leela Hospital, we believe that a comfortable environment plays an important role in recovery. Our patient rooms are clean, well-maintained, and designed to provide a calm and restful space for patients during their stay.',
    para2: 'We offer a range of room options to suit different needs and budgets, from economy wards to private rooms. All rooms are attended by nursing staff and equipped with the essentials to ensure a safe and comfortable experience.',
  },
  {
    title: 'ECG 12-Channel',
    tag: 'Cardiology',
    iconType: 'lucide', Icon: Activity,
    image: imgECG,
    short: 'Reliable 12-channel ECG testing for accurate assessment of heart health and cardiac conditions.',
    para1: 'Leela Hospital provides ECG testing as part of our cardiac diagnostic services. The 12-channel ECG is a widely used and reliable tool for assessing the electrical activity of the heart, helping doctors detect and monitor a range of cardiac conditions.',
    para2: 'Our trained technicians carry out the procedure quickly and comfortably. Results are reviewed by our cardiology team and shared with the treating doctor to guide appropriate care and follow-up.',
  },
  {
    title: 'Health Check-up Packages',
    tag: 'Preventive',
    iconType: 'lucide', Icon: ClipboardCheck,
    image: imgHealthCheckup,
    short: 'Preventive health packages designed to detect potential health issues early and keep you well.',
    para1: 'At Leela Hospital, we prioritise preventive healthcare through comprehensive health check-up packages tailored to suit individual needs. Our range of packages is designed to assess and monitor your well-being, detecting potential health risks early on with support from specialist consultants.',
    para2: 'Our experienced medical professionals ensure thorough examinations covering vital aspects such as cardiac health, metabolic indicators, and organ function. These check-ups are instrumental in identifying any underlying conditions, allowing for timely intervention and personalised health management.',
  },
  {
    title: 'USG & 2D Echo',
    tag: 'Imaging',
    iconType: 'img', src: iconHeart,
    image: imgUSG,
    short: 'Ultrasound and 2D Echo services for non-invasive assessment of internal organs and the heart.',
    para1: 'Leela Hospital offers ultrasonography (USG) and 2D Echocardiography services as part of our diagnostic imaging facilities. These non-invasive tests provide valuable information about the structure and function of internal organs and the heart.',
    para2: 'Our imaging specialists use modern equipment to carry out these procedures with care and precision. The results help our doctors make accurate diagnoses and plan the most appropriate treatment for each patient.',
  },
  {
    title: 'Physiotherapy & Rehab',
    tag: 'Rehabilitation',
    iconType: 'img', src: iconOrthopedics,
    image: imgPhysio,
    short: 'Personalised physiotherapy and rehabilitation programmes to support recovery and restore mobility.',
    para1: 'Our Physiotherapy and Rehabilitation unit at Leela Hospital is dedicated to helping patients regain strength, mobility, and independence following injury, surgery, or illness. Our qualified physiotherapists design personalised treatment plans based on each patient\'s specific needs and goals.',
    para2: 'We offer a range of therapeutic techniques and exercises to support recovery at every stage. Our team works closely with other departments to ensure a coordinated approach to rehabilitation, helping patients return to their daily lives as smoothly as possible.',
  },
]

const TAG_COLORS = {
  Emergency:      { bg: 'rgba(239,68,68,0.1)',    text: '#dc2626' },
  Surgery:        { bg: 'rgba(9,105,177,0.1)',     text: '#0969b1' },
  Diagnostics:    { bg: 'rgba(23,174,149,0.1)',    text: '#17ae95' },
  Imaging:        { bg: 'rgba(124,58,237,0.1)',    text: '#7c3aed' },
  'Critical Care':{ bg: 'rgba(234,88,12,0.1)',     text: '#ea580c' },
  Support:        { bg: 'rgba(23,174,149,0.1)',    text: '#17ae95' },
  Comfort:        { bg: 'rgba(9,105,177,0.1)',     text: '#0969b1' },
  Cardiology:     { bg: 'rgba(239,68,68,0.1)',     text: '#dc2626' },
  Preventive:     { bg: 'rgba(23,174,149,0.1)',    text: '#17ae95' },
  Rehabilitation: { bg: 'rgba(9,105,177,0.1)',     text: '#0969b1' },
}

/* ── Modal ── */
function FacilityModal({ facility, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [onClose])

  const tag = TAG_COLORS[facility.tag] || TAG_COLORS.Support

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(2,36,65,0.75)', backdropFilter: 'blur(8px)', animation: 'fadeIn 0.2s ease' }}
      onClick={onClose}
    >
      <div
        className="relative w-full rounded-3xl overflow-hidden"
        style={{
          maxWidth: '860px',
          background: 'white',
          boxShadow: '0 48px 96px rgba(2,36,65,0.35)',
          animation: 'modalUp 0.38s cubic-bezier(0.4,0,0.2,1)',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Gradient header banner ── */}
        <div className="relative px-8 pt-8 pb-6 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #022441 0%, #0969b1 60%, #17ae95 100%)' }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '22px 22px' }} />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl opacity-20"
            style={{ background: '#17ae95' }} />

          {/* Close */}
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)' }}>
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white opacity-55 text-xs mb-3">
              <span>Home</span>
              <span>»</span>
              <span>Facilities</span>
              <span>»</span>
              <span className="opacity-100 font-semibold">{facility.title}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight"
              style={{ fontFamily: "'Nunito',sans-serif" }}>
              {facility.title}
            </h2>
            <span className="inline-block mt-2 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.25)' }}>
              {facility.tag}
            </span>
          </div>
        </div>

        {/* ── Two-column body ── */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left: text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-extrabold text-gray-900 mb-4"
                style={{ fontFamily: "'Nunito',sans-serif" }}>
                {facility.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">{facility.para1}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{facility.para2}</p>

              <button onClick={onClose}
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)', boxShadow: '0 8px 24px rgba(9,105,177,0.3)' }}>
                <X className="w-4 h-4" /> Close
              </button>
            </div>

            {/* Right: image */}
            <div className="w-full md:w-72 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden h-56 md:h-full"
                style={{ boxShadow: '0 12px 32px rgba(9,105,177,0.15)', minHeight: '220px' }}>
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '220px' }}
                  onError={e => { e.target.style.display = 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Card ── */
function FacilityCard({ facility, index, onReadMore }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const tag = TAG_COLORS[facility.tag] || TAG_COLORS.Support

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
      onClick={() => onReadMore(facility)}
      className="relative bg-white rounded-3xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.07}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.07}s, box-shadow 0.4s ease`,
        boxShadow: hovered
          ? '0 32px 64px rgba(9,105,177,0.18), 0 0 0 1.5px rgba(23,174,149,0.4)'
          : '0 4px 28px rgba(0,0,0,0.07)',
        minHeight: '300px',
      }}
    >
      {/* Animated top bar */}
      <div className="h-1.5 w-full"
        style={{
          background: 'linear-gradient(90deg, #0969b1, #17ae95, #0969b1)',
          backgroundSize: '200% 100%',
          animation: hovered ? 'gradientShift 2s linear infinite' : 'none',
        }} />

      {/* Hover glow */}
      <div className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-3xl"
        style={{ opacity: hovered ? 1 : 0, background: 'radial-gradient(ellipse at top left, rgba(9,105,177,0.05) 0%, transparent 60%)' }} />

      <div className="p-7 flex flex-col flex-1 relative z-10">
        {/* Tag + Icon row */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: tag.bg, color: tag.text }}>
            {facility.tag}
          </span>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, #0969b1, #17ae95)',
              boxShadow: hovered ? '0 12px 28px rgba(9,105,177,0.35)' : '0 4px 12px rgba(9,105,177,0.15)',
              transform: hovered ? 'scale(1.1) rotate(-6deg)' : 'scale(1) rotate(0deg)',
            }}
          >
            {facility.iconType === 'img'
              ? <img src={facility.src} alt={facility.title} className="w-7 h-7"
                  style={{ filter: 'brightness(0) invert(1)', transition: 'filter 0.4s' }} />
              : <facility.Icon className="w-7 h-7"
                  stroke="white" strokeWidth={1.5} />
            }
          </div>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-xl leading-tight mb-3 transition-colors duration-300"
          style={{ fontFamily: "'Nunito',sans-serif", color: hovered ? '#0969b1' : '#0f172a' }}>
          {facility.title}
        </h3>

        {/* Expanding divider */}
        <div className="h-px mb-4 rounded-full transition-all duration-500"
          style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95)', width: hovered ? '60%' : '32px' }} />

        {/* Short desc */}
        <p className="text-gray-500 text-sm leading-relaxed flex-1">{facility.short}</p>

        {/* Read More indicator */}
        <div
          className="mt-6 flex items-center gap-2 text-sm font-bold self-start transition-all duration-300"
          style={{ color: hovered ? '#17ae95' : '#0969b1' }}
        >
          <span>Read More</span>
          <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? 'linear-gradient(135deg, #0969b1, #17ae95)' : 'rgba(9,105,177,0.1)',
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
            }}>
            <ArrowRight className="w-3.5 h-3.5" style={{ color: hovered ? 'white' : '#0969b1' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Page ── */
export default function Facilities() {
  const navigate = useNavigate()
  const [typed, setTyped] = useState('')
  const [modal, setModal] = useState(null)
  const fullText = 'Our Facilities'

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
    <div className="min-h-screen" style={{ background: '#f0f6ff' }}>
      <Navbar />

      {/* Hero */}
      <div className="pt-28 pb-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #022441 0%, #0969b1 55%, #17ae95 100%)', minHeight: '360px' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #17ae95, transparent)', animation: 'blob 8s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #7dd3fc, transparent)', animation: 'blob 10s ease-in-out infinite reverse' }} />
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20 pointer-events-none"
            style={{
              width: 4 + i * 2, height: 4 + i * 2,
              top: `${12 + i * 10}%`, left: `${8 + i * 11}%`,
              background: i % 2 === 0 ? '#5eead4' : '#7dd3fc',
              animation: `float ${3.5 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.35}s`,
            }} />
        ))}

        <div className="relative max-w-6xl mx-auto px-6">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white opacity-60 hover:opacity-100 mb-8 transition-opacity text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div style={{ animation: 'slideUp 0.7s ease forwards' }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-white opacity-40" />
              <span className="text-white text-xs font-semibold uppercase tracking-widest opacity-60">Leela Hospital</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight">
              <span>{typed.startsWith('Our ') ? 'Our ' : typed}</span>
              {typed.startsWith('Our ') && (
                <span style={{
                  background: 'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.65), #ffffff)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite',
                }}>
                  {typed.slice(4)}
                </span>
              )}
              {typed.length < fullText.length && (
                <span className="text-white" style={{ animation: 'blink 0.7s step-end infinite' }}>|</span>
              )}
            </h1>
            <p className="text-white opacity-70 text-lg max-w-xl leading-relaxed"
              style={{ animation: 'slideUp 0.9s ease forwards' }}>
              World-class infrastructure and services — all under one roof at Leela Hospital.
            </p>
          </div>
          <div className="flex gap-10 mt-10 pb-16" style={{ animation: 'slideUp 1.1s ease forwards' }}>
            {[ ['24/7', 'Emergency Care']].map(([val, label]) => (
              <div key={label}>
                <p className="text-3xl font-black text-white">{val}</p>
                <p className="text-white text-xs opacity-55 mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <svg className="w-full block" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70, display: 'block', marginTop: '-1px' }}>
          <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,10 1440,35 L1440,70 L0,70 Z" fill="#f0f6ff" />
        </svg>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto px-6 py-14 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {facilities.map((f, i) => (
            <FacilityCard key={f.title} facility={f} index={i} onReadMore={setModal} />
          ))}
        </div>
      </div>

      <Footer />

      {modal && <FacilityModal facility={modal} onClose={() => setModal(null)} />}

      <style>{`
        @keyframes blink         { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes shimmer       { to{background-position:200% center} }
        @keyframes slideUp       { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn        { from{opacity:0} to{opacity:1} }
        @keyframes modalUp       { from{opacity:0;transform:translateY(40px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes float         { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes blob          { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.1) translate(20px,-20px)} }
        @keyframes gradientShift { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
      `}</style>
    </div>
  )
}
