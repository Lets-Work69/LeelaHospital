import React, { useRef, useEffect, useState } from 'react'
import { ArrowRight, Brain, X } from 'lucide-react'

const services = [
  {
    title: 'General Medicine\n& Diabetology',
    icon: <img src="/medicine.svg" alt="General Medicine" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Comprehensive medical care for chronic diseases including diabetes management, hypertension, and metabolic disorders. Our experienced physicians provide personalized treatment plans and lifestyle advice.',
  },
  {
    title: 'Obstetrics &\nGynecology',
    icon: <img src="/services%20icons/obstetrics.svg" alt="Obstetrics & Gynecology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Expert care throughout pregnancy, delivery, and postpartum period. We provide prenatal screening, labor management, and comprehensive women\'s health services.',
  },
  {
    title: 'Paediatrics\n& Neonatology',
    icon: <img src="/services%20icons/pediatrics_17942024.png" alt="Paediatrics & Neonatology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Specialized care for infants, children, and adolescents. Our pediatricians ensure healthy growth and development with preventive care and treatment of childhood illnesses.',
  },
  {
    title: 'Orthopedics',
    icon: <img src="/services%20icons/orthopedics.svg" alt="Orthopedics" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Treatment of bone, joint, and muscle disorders. We offer surgical and non-surgical options for fractures, arthritis, and sports injuries.',
  },
  {
    title: 'General Surgery',
    icon: <img src="/services%20icons/surgical.svg" alt="General Surgery" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Comprehensive surgical services for abdominal, digestive, and endocrine conditions. Advanced techniques and experienced surgeons for optimal outcomes.',
  },
  {
    title: 'Urology',
    icon: <img src="/services%20icons/urinary_7857026.png" alt="Urology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Specialized treatment for urinary tract and reproductive system disorders in both men and women. Minimally invasive procedures available.',
  },
  {
    title: 'Cardiology',
    icon: <img src="/services%20icons/heart.svg" alt="Cardiology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Comprehensive cardiac care including diagnosis, treatment, and prevention of heart diseases. State-of-the-art diagnostic equipment and interventional procedures.',
  },
  {
    title: 'Dermatology',
    icon: <img src="/services%20icons/dermatology.svg" alt="Dermatology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Treatment for skin conditions, cosmetic concerns, and dermatological disorders. Advanced therapies and personalized skincare guidance.',
  },
  {
    title: 'ENT',
    icon: <img src="/services%20icons/nose.png" alt="ENT" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Expert care for ear, nose, and throat conditions. Surgical and non-surgical treatments for hearing, balance, and respiratory issues.',
  },
  {
    title: 'Oncology',
    icon: <img src="/services%20icons/oncology.svg" alt="Oncology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Comprehensive cancer treatment including chemotherapy, radiation, and immunotherapy. Compassionate care and support throughout your journey.',
  },
  {
    title: 'Neurology',
    icon: <Brain className="w-7 h-7" stroke="white" strokeWidth={1.5} />,
    description: 'Expert diagnosis and treatment of neurological disorders. Management of seizures, stroke, headaches, and neurodegenerative diseases.',
  },
  {
    title: 'Nephrology',
    icon: <img src="/services%20icons/organ.png" alt="Nephrology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Specialized care for kidney diseases and renal disorders. Dialysis services, transplant evaluation, and chronic kidney disease management.',
  },
  {
    title: 'Ophthalmology',
    icon: <img src="/services%20icons/ophthalmology.svg" alt="Ophthalmology" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Complete eye care services including vision correction, cataract surgery, and treatment of eye diseases. Pediatric eye care also available.',
  },
  {
    title: 'Laparoscopy &\nEndoscopy',
    icon: <img src="/services%20icons/laparoscopy_8670713.png" alt="Laparoscopy" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)' }} />,
    description: 'Minimally invasive diagnostic and therapeutic procedures for gastrointestinal and abdominal conditions. Reduced recovery time and minimal scarring.',
  },
  {
    title: 'Psychiatry',
    icon: <img src="/services%20icons/mental-health.png" alt="Psychiatry" className="w-9 h-9" style={{ filter: 'brightness(0) invert(1)', background: 'transparent' }} />,
    description: 'Mental health services for depression, anxiety, and other psychiatric conditions. Comprehensive evaluation and treatment options available.',
  },
]

function ServiceCard({ service, index, onServiceClick }) {
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
      onClick={() => onServiceClick(service)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s, background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease`,
        background: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
        boxShadow: hovered ? '0 12px 30px rgba(23, 174, 149, 0.3), inset 0 1px 0 rgba(255,255,255,0.6)' : '0 6px 20px rgba(23, 174, 149, 0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
        border: `1.5px solid ${hovered ? 'rgba(23, 174, 149, 0.6)' : 'rgba(23, 174, 149, 0.4)'}`,
        backdropFilter: 'blur(16px)',
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

// Service Modal Component
function ServiceModal({ service, onClose }) {
  if (!service) return null

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        {/* Modal Header with gradient background */}
        <div
          className="px-6 py-4 relative"
          style={{
            background: 'linear-gradient(135deg, #17ae95, #0969b1)',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-white font-bold text-lg pr-8">
            {service.title.replace('\n', ' ')}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5">
          <p className="text-gray-700 text-sm leading-relaxed">
            {service.description}
          </p>
          <button
            onClick={onClose}
            className="w-full mt-6 px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-white"
            style={{
              background: 'linear-gradient(135deg, #17ae95, #0969b1)',
              boxShadow: '0 4px 12px rgba(45,184,158,0.3)',
              hover: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 6px 18px rgba(45,184,158,0.45)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 4px 12px rgba(45,184,158,0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

// Mobile Carousel Component
function MobileCarousel({ services, onServiceClick, titleVisible }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const itemsPerPage = 5
  const totalPages = Math.ceil(services.length / itemsPerPage)
  
  const currentServices = services.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  const handleTouchEnd = (e) => {
    if (!touchStart) return
    
    const endX = e.changedTouches[0].clientX
    setTouchEnd(endX)
    
    const distance = touchStart - endX
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    } else if (isRightSwipe && currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
    
    // Reset touch positions
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <div
      className="rounded-3xl p-6 md:hidden block relative"
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(23, 174, 149, 0.6)',
        boxShadow: '0 20px 60px rgba(29,111,164,0.1), 0 0 30px rgba(23, 174, 149, 0.4)',
        opacity: titleVisible ? 1 : 0,
        transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.7s ease 0.2s',
        overflow: 'hidden',
      }}
    >
      {/* Carousel Container with Swipe */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {/* Services Grid - 5 items per page */}
        <div className="grid grid-cols-1 gap-2">
          {currentServices.map((s, i) => (
            <ServiceCard
              key={`${currentPage}-${i}`}
              service={s}
              index={i}
              onServiceClick={onServiceClick}
            />
          ))}
        </div>

        {/* Indicators */}
        <div className="flex gap-2 justify-center mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: currentPage === i ? '24px' : '8px',
                background: currentPage === i
                  ? 'linear-gradient(135deg, #17ae95, #0969b1)'
                  : 'rgba(29,111,164,0.2)',
              }}
            />
          ))}
        </div>

        {/* Page indicator text */}
        <div className="text-center mt-3">
          <p className="text-xs font-medium" style={{ color: '#0969b1' }}>
            {currentPage + 1} of {totalPages}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const titleRef = useRef(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [selectedService, setSelectedService] = useState(null)

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
        {/* Desktop Grid View */}
        <div className="rounded-3xl p-8 md:p-10 hidden md:block"
          style={{
            background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(23, 174, 149, 0.6)',
            boxShadow: '0 20px 60px rgba(29,111,164,0.1), 0 0 30px rgba(23, 174, 149, 0.4)',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s ease 0.2s',
          }}>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} onServiceClick={setSelectedService} />
            ))}
          </div>
        </div>

        {/* Mobile Carousel View */}
        <MobileCarousel services={services} onServiceClick={setSelectedService} titleVisible={titleVisible} />

        {/* CTA */}
        <div className="text-center mt-10"
          style={{ opacity: titleVisible ? 1 : 0, transition: 'opacity 0.6s ease 0.8s' }}>
          <a href="#appointment" className="btn-primary inline-flex items-center gap-2">
            Book a Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  )
}

