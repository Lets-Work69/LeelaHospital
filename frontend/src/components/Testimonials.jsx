import React, { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import reviews from '../assets/reviews'
import videoTestimonials from '../assets/videoTestimonials.js'

// filter valid text reviews
const getValidReviews = (reviews) => {
  return reviews.filter(r => {
    if (!r.review) return false
    const text = r.review.trim()
    return text.length > 30 && text.split(" ").length > 5
  })
}

// shuffle helper
const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random())

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [items, setItems] = useState([])

  useEffect(() => {
    const textReviews = shuffle(getValidReviews(reviews)).slice(0, 3)
    const videos = shuffle(videoTestimonials).slice(0, 2)

    const combined = []
    const maxLen = Math.max(textReviews.length, videos.length)

    for (let i = 0; i < maxLen; i++) {
      if (textReviews[i]) {
        combined.push({ ...textReviews[i], type: 'text' })
      }
      if (videos[i]) {
        combined.push({ ...videos[i], type: 'video' })
      }
    }

    setItems(combined)
  }, [])

  const go = (dir) => {
    setCurrent(c =>
      dir === 'next'
        ? (c + 1) % items.length
        : (c - 1 + items.length) % items.length
    )
  }

  useEffect(() => {
    if (!items.length) return

    // ❌ Don't auto-slide if current is video
    if (items[current]?.type === 'video') return

    const timer = setInterval(() => go('next'), 5000)
    return () => clearInterval(timer)

  }, [items, current])

  const t = items[current] || {}

  return (
    <section className="py-10 md:py-14 bg-white">

      <div className="max-w-4xl mx-auto px-4 text-center">

        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          What Our Patients Say
        </h2>

        <div className="flex flex-col items-center gap-4">

          {/* CONTAINER */}
          <div className="
            w-full 
            max-w-3xl 
            aspect-video 
            sm:aspect-[9/16] 
            max-h-[480px]
            bg-black 
            rounded-3xl 
            overflow-hidden
          ">

            {t.type === 'video' ? (

              <div className="w-full h-full flex items-center justify-center bg-black">

                {/* ✅ HYBRID VIDEO SYSTEM */}
                {t.videoSrc ? (

                  // 🔥 LOCAL VIDEO (AUTOPLAY WORKS)
                  <video
                    src={t.videoSrc}
                    className="h-full aspect-[9/16] object-contain"
                    autoPlay
                    controls
                    playsInline
                    onEnded={() => go('next')}
                  />

                ) : (

                  // ⚠️ INSTAGRAM EMBED (FIXED)
                  <iframe
                    src={t.embedUrl?.includes('/embed')
                      ? t.embedUrl
                      : `${t.embedUrl?.split('?')[0]}/embed`}
                    className="h-full aspect-[9/16]"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />

                )}

              </div>

            ) : (

              // TEXT (UNCHANGED)
              <div className="h-full flex flex-col 
                              p-5 md:p-8 text-white text-center"
                style={{ background: 'linear-gradient(135deg, #0969b1, #1a8fd1)' }}>

                <Quote className="w-8 h-8 md:w-10 md:h-10 mb-3 opacity-60 mx-auto" />

                <div className="
                  flex-1 
                  flex 
                  items-center 
                  justify-center 
                  overflow-hidden
                ">

                  <div className="
                    w-full 
                    max-h-full 
                    overflow-y-auto 
                    px-2 
                    scroll-smooth
                  ">

                    <p className="text-sm md:text-lg leading-relaxed italic">
                      "{t.review}"
                    </p>

                  </div>

                </div>

                <div className="mt-3">

                  <div className="flex gap-1 mb-2 justify-center">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    ))}
                  </div>

                  <p className="font-bold">{t.name}</p>
                  <p className="text-sm opacity-80">Patient</p>

                </div>

              </div>

            )}

          </div>

          {/* CONTROLS */}
          <div className="flex justify-center items-center gap-6">

            <button
              onClick={() => go('prev')}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-blue-600 text-white hover:scale-105 transition"
            >
              <ChevronLeft />
            </button>

            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-green-500' : 'w-2 bg-gray-300'
                    }`}
                />
              ))}
            </div>

            <button
              onClick={() => go('next')}
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-md bg-green-500 text-white hover:scale-105 transition"
            >
              <ChevronRight />
            </button>

          </div>

        </div>

      </div>
    </section>
  )
}