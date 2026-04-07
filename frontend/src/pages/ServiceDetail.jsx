import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight, ArrowLeft, Phone, HeartHandshake } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const serviceDetails = {
  'general-medicine-diabetology': {
    title: 'General Medicine & Diabetology', subtitle: 'Comprehensive General Medicine Care at Leela Hospital',
    icon: '/medicine.svg',
    overview: 'Health is the foundation of a happy life. Even small symptoms, when ignored, can lead to bigger complications. We focus on early diagnosis and long-term care.',
    treatments: ['Fever Treatment', 'BP / Thyroid Management', 'Health Checkups', 'Sugar Control'],
    why: 'Accurate diagnosis, preventive care, and chronic disease management — all with a compassionate, patient-first approach.',
    promise: 'Guiding you towards a healthier life.',
  },
  'obstetrics-gynecology': {
    title: 'Obstetrics & Gynecology', subtitle: 'Complete Women Care',
    icon: '/services%20icons/obstetrics.svg',
    overview: 'At Leela Hospital, we understand the unique healthcare needs of women at every stage of their lives. Our Obstetrics & Gynecology Department is here for you.',
    treatments: ['Delivery', 'Pregnancy Care', 'Women Health'],
    why: 'Safe pregnancy care and personalized support — we stand by you at every stage of your journey.',
    promise: 'Care and safety at every stage.',
  },
  'paediatrics-neonatology': {
    title: 'Paediatrics & Neonatology', subtitle: 'Care for Children',
    icon: '/services%20icons/pediatrics_17942024.png',
    overview: 'At Leela Hospital, our Pediatric and Neonatology Department is dedicated to providing comprehensive and compassionate care for your little ones.',
    treatments: ['Newborn Care', 'Vaccination', 'Child Illness'],
    why: 'Gentle treatment and child-friendly care — because every child deserves the best start in life.',
    promise: 'Every child treated with love.',
  },
  'orthopedics': {
    title: 'Orthopedics', subtitle: 'Advanced Orthopedic Care at Leela Hospital',
    icon: '/services%20icons/orthopedics.svg',
    overview: 'Strong bones and healthy joints are essential for a pain-free life. Injuries, aging, and lifestyle conditions can lead to pain and limited mobility. At Leela Hospital, we provide complete orthopedic care to restore movement and confidence.',
    treatments: ['Fracture Management', 'Arthritis Treatment', 'Joint Pain Care', 'Sports Injury Treatment', 'Physiotherapy Support'],
    why: 'Complete diagnosis to rehabilitation — expert handling of fractures and joint issues with modern equipment, techniques, and personalized care.',
    promise: 'We help you walk, move, and live without pain again.',
  },
  'general-surgery': {
    title: 'General Surgery', subtitle: 'Safe & Advanced Surgical Care at Leela Hospital',
    icon: '/services%20icons/surgical.svg',
    overview: 'Surgery is handled with precision, safety, and care. Our skilled surgical team ensures every procedure is performed with the highest standards of safety and expertise.',
    treatments: ['Hernia', 'Appendix', 'Gallbladder', 'Emergency Surgeries'],
    why: 'Skilled surgeons, modern operation theater, and a safe environment ensure the best surgical outcomes for every patient.',
    promise: 'Safe surgery and smooth recovery.',
  },
  'urology': {
    title: 'Urology', subtitle: 'Urinary Care',
    icon: '/services%20icons/urinary_7857026.png',
    overview: 'Our team of skilled urologists specializes in diagnosing and treating a wide range of urological conditions affecting both men and women.',
    treatments: ['Stones', 'Infection'],
    why: 'Expert urological care with a focus on your comfort and quick recovery.',
    promise: 'Comfort and care.',
  },
  'cardiology': {
    title: 'Cardiology', subtitle: 'Heart Care',
    icon: '/services%20icons/heart.svg',
    overview: 'At Leela Hospital, our Cardiology Department is committed to providing comprehensive, compassionate, and state-of-the-art care for all heart conditions.',
    treatments: ['ECG', 'BP Care'],
    why: 'Early diagnosis and preventive care — we keep your heart healthy before problems arise.',
    promise: 'Healthy heart, better life.',
  },
  'dermatology': {
    title: 'Dermatology', subtitle: 'Skin Care',
    icon: '/services%20icons/dermatology.svg',
    overview: 'Our Dermatology unit is dedicated to providing comprehensive and personalized care for all your skin, hair, and nail concerns.',
    treatments: ['Skin', 'Hair'],
    why: 'Expert dermatologists providing personalized care for all your skin and hair needs.',
    promise: 'Healthy skin confidence.',
  },
  'ent': {
    title: 'ENT', subtitle: 'Ear, Nose & Throat Specialists',
    icon: '/services%20icons/nose.png',
    overview: 'At Leela Hospital, we prioritize your ear, nose, and throat health with dedicated expertise and compassionate care. Our ENT specialists are here for you.',
    treatments: ['Hearing Loss & Tinnitus', 'Sinusitis Treatment', 'Tonsil & Adenoid Surgery', 'Voice & Throat Disorders', 'Nasal Polyps', 'Ear Infections'],
    why: 'Experienced ENT specialists, advanced endoscopic equipment, and minimally invasive surgical techniques.',
  },
  'oncology': {
    title: 'Oncology', subtitle: 'Cancer Care',
    icon: '/services%20icons/oncology.svg',
    overview: 'Our Oncology department provides comprehensive cancer care with a multidisciplinary approach. From early detection to advanced treatment, we fight cancer with compassion.',
    treatments: ['Treatment'],
    why: 'A dedicated cancer care team fighting alongside you every step of the way.',
    promise: 'Hope and strength.',
  },
  'neurology': {
    title: 'Neurology', subtitle: 'Brain & Nerve Care',
    icon: null,
    overview: 'At Leela Hospital, our Neurology Department is dedicated to providing exceptional care for a wide range of neurological conditions.',
    treatments: ['Stroke', 'Seizures'],
    why: 'Expert evaluation and advanced neurological care to help you regain strength and confidence.',
    promise: 'Restore confidence.',
  },
  'nephrology': {
    title: 'Nephrology', subtitle: 'Kidney Care',
    icon: '/services%20icons/organ.png',
    overview: 'Our Nephrology Department at Leela Hospital is dedicated to providing comprehensive and compassionate care for patients with kidney conditions.',
    treatments: ['Kidney Disease'],
    why: 'Expert nephrologists committed to protecting and preserving your kidney health.',
    promise: 'Protect kidney health.',
  },
  'ophthalmology': {
    title: 'Ophthalmology', subtitle: 'Clear Vision, Better Life',
    icon: '/services%20icons/ophthalmology.svg',
    overview: 'Our Ophthalmology department offers complete eye care services from routine vision checkups to complex surgical procedures.',
    treatments: ['Cataract Surgery', 'LASIK & Refractive Surgery', 'Glaucoma Treatment', 'Retinal Disorders', 'Diabetic Eye Care', 'Pediatric Ophthalmology'],
    why: 'Advanced surgical equipment, experienced eye surgeons, and comprehensive vision care for all age groups.',
  },
  'laparoscopy-endoscopy': {
    title: 'Laparoscopy & Endoscopy', subtitle: 'Minimally Invasive Care',
    icon: '/services%20icons/laparoscopy_8670713.png',
    overview: 'Laparoscopic surgery uses small cuts and a camera to perform operations with minimal pain and faster recovery. At Leela Hospital, we bring you the best of minimally invasive surgical care.',
    treatments: ['Gallbladder', 'Hernia', 'Appendix'],
    why: 'Less pain, faster recovery, and small cuts — our laparoscopic team ensures you heal quickly and comfortably.',
    promise: 'Faster healing, better comfort.',
  },
  'physiotherapy': {
    title: 'Physiotherapy', subtitle: 'Rehabilitation',
    icon: null,
    overview: 'At Leela Hospital, our Physiotherapy Department helps patients recover strength, mobility, and independence through expert rehabilitation care.',
    treatments: ['Exercise Therapy'],
    why: 'Dedicated physiotherapists guiding you through every step of your recovery journey.',
    promise: 'Recovery and strength.',
  },
  'psychiatry': {
    title: 'Psychiatry', subtitle: 'Mental Health',
    icon: '/services%20icons/mental-health.png',
    overview: 'At Leela Hospital, we understand the crucial role mental health plays in overall well-being. Our team of dedicated psychiatrists is here to support you.',
    treatments: ['Counseling'],
    why: 'Compassionate, confidential mental health care in a safe and supportive environment.',
    promise: 'You are not alone.',
  },
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const service = serviceDetails[slug]
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    setTimeout(() => setVisible(true), 100)
  }, [])

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 text-lg mb-4">Service not found</p>
        <button onClick={() => navigate('/')} className="btn-primary">Go Back</button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc' }}>
      <Navbar />

      {/* ── HERO HEADER ── */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0969b1 0%, #0b7fc7 50%, #17ae95 100%)', paddingTop: '100px', paddingBottom: '80px' }}>

        {/* Animated mesh */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

        {/* Glowing orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle, white, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-3xl opacity-15 animate-blob-delay"
          style={{ background: 'radial-gradient(circle, white, transparent)' }} />

        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-25"
            style={{
              width: 4 + i * 2, height: 4 + i * 2,
              top: `${15 + i * 13}%`, left: `${8 + i * 15}%`,
              background: 'white',
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }} />
        ))}

        <div className="relative max-w-5xl mx-auto px-4">
          <button onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white opacity-70 hover:opacity-100 mb-10 transition-all duration-300 hover:gap-3 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Specialities
          </button>

          <div className="flex items-start gap-6"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease' }}>

            {/* Icon */}
            {service.icon && (
              <div className="w-24 h-24 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xl"
                style={{ background: '#17ae95' }}>
                <img src={service.icon} alt={service.title} className="w-12 h-12"
                  style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
            )}

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px w-8 bg-white opacity-50" />
                <span className="text-white text-xs font-semibold uppercase tracking-widest opacity-60">Leela Hospital</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">{service.title}</h1>
              {service.subtitle && (
                <p className="text-white opacity-80 text-xl font-light">{service.subtitle}</p>
              )}

              {/* Quick stats */}
              <div className="flex gap-6 mt-6">
                {[['Expert', 'Specialists'], ['24/7', 'Available'], ['Modern', 'Equipment']].map(([v, l]) => (
                  <div key={l} className="text-center px-4 py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
                    <p className="text-white font-bold text-sm">{v}</p>
                    <p className="text-white opacity-60 text-xs">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-6">

        {/* Overview */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.2s' }}>
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95)' }} />
          <div className="p-8">
            <h2 className="font-black text-2xl mb-4 text-gray-900">Overview</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{service.overview}</p>
          </div>
        </div>

        {/* Treatments */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.35s' }}>
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #17ae95, #0969b1)' }} />
          <div className="p-8">
            <h2 className="font-black text-2xl mb-6 text-gray-900">Treatments We Provide</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.treatments.map((t, i) => (
                <div key={i} className="group flex items-center gap-3 p-4 rounded-2xl cursor-default transition-all duration-300 hover:shadow-md"
                  style={{
                    background: 'linear-gradient(135deg, #f0fdf9, #eff6ff)',
                    border: '1px solid rgba(23,174,149,0.1)',
                    animation: `slideUp 0.4s ease ${0.4 + i * 0.06}s both`,
                  }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: '#17ae95' }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-gray-700 font-semibold text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why choose — 2 col layout */}
        <div className="rounded-3xl overflow-hidden shadow-sm relative"
          style={{
            background: 'linear-gradient(135deg, #0969b1, #17ae95)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.5s',
          }}>
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          <div className="relative p-8 md:p-10">
            <h2 className="font-black text-2xl text-white mb-4">Why Choose Leela Hospital</h2>
            <p className="text-white opacity-85 leading-relaxed text-lg">{service.why}</p>
          </div>
        </div>

        {/* Our Promise */}
        {service.promise && (
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm relative overflow-hidden"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.6s' }}>
            <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95)' }} />
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center overflow-hidden border border-gray-100 bg-gradient-to-br from-blue-50 to-teal-50">
              <HeartHandshake className="w-10 h-10" style={{ color: '#0969b1' }} />
            </div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#17ae95' }}>Our Promise</p>
            <p className="text-2xl font-semibold italic text-gray-800">"{service.promise}"</p>
          </div>
        )}


      </div>

      <Footer />

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
