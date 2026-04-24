import React, { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Clock, Users } from 'lucide-react'
import DoctorPageSkeleton from '../components/DoctorPageSkeleton'
const url = import.meta.env.VITE_API_URL

const hardcodedDoctors = []
const DOCTORS_PER_PAGE = 9

function DoctorCard({ doc, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const accent2 = doc.accent === '#0969b1' ? '#17ae95' : '#0969b1'

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white rounded-3xl overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.96)',
        transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.03}s`,
        boxShadow: hovered
          ? `0 28px 56px rgba(0,0,0,0.14), 0 0 0 1.5px ${doc.accent}40`
          : '0 4px 24px rgba(0,0,0,0.07)',
      }}>

<div className="relative overflow-hidden" style={{ height: '280px' }}>
        
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,#022441,${doc.accent})` }} />

        <img src={doc.photo} alt={doc.name}
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700"
          style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }} />

<div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: 'linear-gradient(to top, rgba(2,36,65,0.7) 0%, transparent 55%)', opacity: hovered ? 1 : 0.6 }} />

<div className="absolute top-0 left-0 right-0 h-1 transition-all duration-500"
          style={{ background: `linear-gradient(90deg,${doc.accent},${accent2})`, transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left' }} />

<div className="absolute bottom-3 right-3 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateY(0)' : 'translateY(6px)' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg,${doc.accent},${accent2})` }}>
            <span className="text-white text-xs font-black">{doc.name.split(' ')[1]?.charAt(0)}</span>
          </div>
        </div>
      </div>

<div className="p-5 relative">
        
        <div className="h-0.5 rounded-full mb-4 transition-all duration-500"
          style={{
            background: `linear-gradient(90deg,${doc.accent},${accent2})`,
            width: hovered ? '80%' : '32px',
          }} />

        <h3 className="font-extrabold text-gray-900 text-lg leading-tight mb-1"
          style={{ fontFamily: "'Nunito',sans-serif" }}>
          {doc.name}
        </h3>
        <p className="text-sm font-semibold mb-4" style={{ color: doc.accent }}>{doc.specialty}</p>

<div className="flex items-center gap-5 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${doc.accent}12` }}>
              <Clock className="w-3.5 h-3.5" style={{ color: doc.accent }} />
            </div>
            <span className="text-sm font-bold text-gray-700">{doc.exp}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${accent2}12` }}>
              <Users className="w-3.5 h-3.5" style={{ color: accent2 }} />
            </div>
            <span className="text-sm font-bold text-gray-700">{doc.patients}</span>
          </div>
        </div>

<div className="absolute bottom-0 left-0 right-0 h-0.5 transition-transform duration-500 origin-left"
          style={{ background: `linear-gradient(90deg,${doc.accent},${accent2})`, transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
      </div>
    </div>
  )
}

export default function DoctorsPage() {
  const [heroVisible, setHeroVisible] = useState(false)
  const heroRef = useRef(null)
  const [doctors, setDoctors] = useState(hardcodedDoctors)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [initialLoad, setInitialLoad] = useState(true)
  const observerRef = useRef(null)
  const isFetchingRef = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (isFetchingRef.current) return
    
    const cacheKey = `doctors_page_${page}`
    const cached = sessionStorage.getItem(cacheKey)
    
    if (cached) {
      const cachedData = JSON.parse(cached)
      setDoctors(prev => page === 1 ? [...hardcodedDoctors, ...cachedData] : [...prev, ...cachedData])
      setInitialLoad(false)
      
      // Check if there's more cached data
      const nextCacheKey = `doctors_page_${page + 1}`
      const hasNextCache = sessionStorage.getItem(nextCacheKey)
      if (hasNextCache) {
        setHasMore(true)
      } else {
        // Verify with a quick check if there's more data
        fetch(`${url}/api/doctors?page=${page}&limit=${DOCTORS_PER_PAGE}`)
          .then(r => r.json())
          .then(data => {
            if (data.success) {
              setHasMore(data.page < data.totalPages)
            }
          })
          .catch(() => {})
      }
      return
    }

    isFetchingRef.current = true
    setLoading(true)
    
    fetch(`${url}/api/doctors?page=${page}&limit=${DOCTORS_PER_PAGE}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          if (data.doctors.length > 0) {
            const dbDocs = data.doctors.map(d => ({
              name: d.name,
              specialty: d.specialty,
              exp: d.experience || '',
              rating: parseFloat(d.rating) || 4.5,
              patients: d.patients || '0',
              photo: d.profileImage || '',
              accent: '#0969b1'
            }))
            setDoctors(prev => page === 1 ? [...hardcodedDoctors, ...dbDocs] : [...prev, ...dbDocs])
            sessionStorage.setItem(cacheKey, JSON.stringify(dbDocs))
          }
          setHasMore(data.page < data.totalPages)
        } else {
          setHasMore(false)
        }
        setLoading(false)
        setInitialLoad(false)
        isFetchingRef.current = false
      })
      .catch(() => {
        setLoading(false)
        setInitialLoad(false)
        isFetchingRef.current = false
      })
  }, [page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !initialLoad && !isFetchingRef.current) {
          setPage(prev => prev + 1)
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, loading, initialLoad])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

<div className="relative pt-24 pb-0 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#022441 0%,#0969b1 55%,#17ae95 100%)', minHeight: '340px' }}>

<div className="absolute inset-0 opacity-30 animate-gradient"
          style={{ background: 'linear-gradient(270deg,#022441,#0969b1,#17ae95,#022441)', backgroundSize: '400% 400%' }} />

<div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px,rgba(255,255,255,0.7) 1px,transparent 0)', backgroundSize: '28px 28px' }} />

<div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 animate-blob"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-15 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#7dd3fc,transparent)' }} />

{[...Array(6)].map((_, i) => (
          <div key={i} className="absolute rounded-full opacity-20 animate-float pointer-events-none"
            style={{ width: `${5+i*3}px`, height: `${5+i*3}px`, background: i%2===0?'#5eead4':'#7dd3fc',
              left:`${10+i*15}%`, top:`${20+i*10}%`, animationDelay:`${i*0.5}s`, animationDuration:`${3+i*0.6}s` }} />
        ))}

        <div ref={heroRef} className="relative max-w-5xl mx-auto px-6 pt-10 pb-20 text-center">
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.7s ease' }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-teal-200 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
              Our Medical Team
              <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
            </span>
          </div>

          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.15s' }}>
            <h1 className="font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
              Meet Our{' '}
              <span style={{ background: 'linear-gradient(90deg,#7dd3fc,#5eead4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                Specialists
              </span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Nunito',sans-serif" }}>
              Experienced, compassionate doctors dedicated to your health and recovery.
            </p>
          </div>

<div className="flex items-center justify-center gap-3 mt-8"
            style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.8s ease 0.35s' }}>
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#5eead4)' }} />
            <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#5eead4,transparent)' }} />
          </div>
        </div>

<svg className="w-full block" viewBox="0 0 1440 70" preserveAspectRatio="none" style={{ height: 70, display: 'block', marginTop: '-1px' }}>
          <path d="M0,35 C240,70 480,0 720,35 C960,70 1200,10 1440,35 L1440,70 L0,70 Z" fill="#f9fafb" />
        </svg>
      </div>

<div className="max-w-6xl mx-auto px-6 py-16" style={{ minHeight: '60vh' }}>
        {initialLoad ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <DoctorPageSkeleton key={`initial-skeleton-${i}`} index={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doc, i) => (
                <DoctorCard key={doc.name + i} doc={doc} index={i} />
              ))}
              {loading && [...Array(6)].map((_, i) => (
                <DoctorPageSkeleton key={`skeleton-${i}`} index={i} />
              ))}
            </div>
            
            {/* Infinite scroll trigger */}
            {hasMore && <div ref={observerRef} className="h-10 mt-8" />}
            
            {!loading && !hasMore && doctors.length > 0 && (
              <div className="text-center mt-8 text-gray-500">
                <p className="text-sm font-semibold">You've reached the end</p>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
