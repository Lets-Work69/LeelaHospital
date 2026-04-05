import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import reviews from '../assets/reviews'

// ✅ filter valid reviews
const getValidReviews = (reviews) => {
  return reviews.filter(r => {
    if (!r.review) return false
    const text = r.review.trim()
    return text.length > 30 && text.split(" ").length > 5
  })
}

// ✅ shuffle + slice
const getRandomReviews = (reviews, count = 5) => {
  return [...reviews].sort(() => 0.5 - Math.random()).slice(0, count)
}

// ✅ format long text into multiple lines
const formatText = (text) => {
  if (!text) return ""
  return text.match(/.{1,120}(\s|$)/g)?.join("\n") || text
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [testimonials, setTestimonials] = useState([])

  // ✅ load random reviews once
  useEffect(() => {
    const valid = getValidReviews(reviews)
    const random = getRandomReviews(valid, 5)
    setTestimonials(random)
  }, [])

  const go = (dir) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setCurrent(c =>
        dir === 'next'
          ? (c + 1) % testimonials.length
          : (c - 1 + testimonials.length) % testimonials.length
      )
      setAnimating(false)
    }, 300)
  }

  useEffect(() => {
    const timer = setInterval(() => go('next'), 5000)
    return () => clearInterval(timer)
  }, [testimonials])

  const t = testimonials[current] || {}

  return (
    <section className="py-24 relative overflow-hidden bg-white">

      {/* Background */}
      <div className="absolute inset-0 opacity-30"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #0969b1, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #17ae95, transparent)' }} />

      <div className="relative max-w-4xl mx-auto px-4 text-center">

        <span className="inline-flex items-center gap-2 bg-primary-50 text-primary-500 font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4"
          style={{ background: '#e6f3fb', color: '#0969b1' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#0969b1' }} />
          Testimonials
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12">
          What Our <span className="text-gradient">Patients</span> Say
        </h2>

        <div className="relative" style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.3s ease' }}>
          <div className="rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0969b1, #1a8fd1)' }}>

            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 bg-white -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10 bg-white translate-y-1/2 -translate-x-1/2" />

            <Quote className="w-14 h-14 mx-auto mb-6 opacity-50 relative z-10" style={{ color: 'white' }} />

            {/* ✅ MULTI LINE TEXT */}
            <p className="text-white text-xl leading-relaxed mb-8 italic font-light relative z-10 whitespace-pre-line">
              "{formatText(t.review)}"
            </p>

            {/* ✅ DYNAMIC STARS */}
            <div className="flex justify-center gap-1 mb-6 relative z-10">
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-300 fill-yellow-300" />
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-full bg-white bg-opacity-20 border-2 border-white border-opacity-50 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {t.name?.charAt(0) || "U"}
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">{t.name}</p>
                <p className="text-white text-sm opacity-75">Patient</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button onClick={() => go('prev')}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
            style={{ background: '#0969b1', color: 'white' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 24 : 8,
                  height: 8,
                  background: i === current ? '#17ae95' : '#cbd5e1'
                }} />
            ))}
          </div>

          <button onClick={() => go('next')}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-md"
            style={{ background: '#17ae95', color: 'white' }}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}