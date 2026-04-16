import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Award, Users, Camera, Heart, Star, ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const inaugurationImages = [
  "/gallery/inauguration1.jpeg",
  "/gallery/inauguration2.jpeg", 
  "/gallery/inauguration3.jpeg",
  "/gallery/inauguration4.jpeg",
  "/gallery/inauguration5.jpeg",
  "/gallery/inauguration6.jpeg",
];

const eventImages = [
  "/gallery/event1.jpeg",
  "/gallery/event2.jpeg",
  "/gallery/event3.jpeg",
  "/gallery/event4.jpeg"
];

const communityImages = [
  "/gallery/community1.jpeg",
  "/gallery/community2.jpeg",
  "/gallery/community3.jpeg",
  "/gallery/community4.jpeg",
  "/gallery/community5.jpeg",
  "/gallery/community6.jpeg"
];

const interiorImages = [
  "/gallery/interiors/reception-area.jpg",
  "/gallery/interiors/waiting-area.jpg",
  "/gallery/interiors/consultation-room.jpg",
  "/gallery/interiors/medical-equipment.jpg",
  "/gallery/interiors/hospital-corridor.jpg",
  "/gallery/interiors/patient-room.jpg",
  "/gallery/interiors/operation-theatre.jpg",
  "/gallery/interiors/laboratory.jpg"
];

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

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [typed, setTyped] = useState('');
  const [sessionsVisible, setSessionsVisible] = useState(false);
  const heroRef = useRef(null);
  const sessionsRef = useRef(null);
  const navigate = useNavigate();
  const fullText = 'Gallery';

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    let i = 0;
    const timer = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(timer);
    }, 80);
    return () => {
      clearTimeout(t);
      clearInterval(timer);
    };
  }, []);

  const [sessionsRefElement, sessionsVisibleState] = useReveal(0.2);
  const [inaugurationRefElement, inaugurationVisibleState] = useReveal(0.2);
  const [eventsRefElement, eventsVisibleState] = useReveal(0.2);
  const [communityRefElement, communityVisibleState] = useReveal(0.2);
  const [interiorsRefElement, interiorsVisibleState] = useReveal(0.2);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="relative pt-24 pb-0 overflow-hidden" 
          style={{ background: 'linear-gradient(135deg, #022441 0%, #0969b1 55%, #17ae95 100%)', minHeight: '320px' }}>
        
          <div ref={heroRef} className="relative max-w-5xl mx-auto px-6 pt-10 pb-20 text-center">
            <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.7s ease' }}>
              <button onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white opacity-70 hover:opacity-100 mb-8 transition-opacity text-sm">
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </button>

              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-teal-200 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 backdrop-blur-md">
                <span className="w-1.5 h-1.5 bg-teal-300 rounded-full animate-pulse" />
                Visual Journey
              </span>

              <h1 className="font-extrabold text-white mb-4 leading-tight"
                style={{ fontFamily: "Nunito,sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
                Our{' '}
                <span style={{ background: 'linear-gradient(90deg,#7dd3fc,#5eead4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                  {typed}
                </span>
                {typed.length < fullText.length && (
                  <span className="text-white" style={{ animation: 'blink 0.7s step-end infinite' }}>|</span>
                )}
              </h1>
              <p className="text-white/75 text-lg max-w-xl mx-auto" style={{ fontFamily: "Nunito,sans-serif" }}>
                Moments of Care, Excellence & Community - Capturing the heart of healthcare at Leela Hospital.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Educational Sessions Section with Real Images */}

        {/* Inauguration Section with Real Images */}
        <div className="relative">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)' }} />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div ref={inaugurationRefElement} className="relative px-6 md:px-20 py-16"
            style={{
              opacity: inaugurationVisibleState ? 1 : 0,
              transform: inaugurationVisibleState ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)'
            }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 shadow-lg">
                <Award className="w-4 h-4" />
                Grand Opening
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'Nunito',sans-serif" }}>
                Inauguration Ceremony
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Grand opening moments and ceremonial highlights
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inaugurationImages.map((image, index) => {
                const [hovered, setHovered] = React.useState(false);
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => { setSelectedImage(image); setIsLightboxOpen(true); }}
                    className="relative overflow-hidden rounded-xl cursor-pointer group"
                    style={{
                      opacity: inaugurationVisibleState ? 1 : 0,
                      transform: `${inaugurationVisibleState ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(40px)'} ${inaugurationVisibleState ? (hovered ? 'scale(1.05)' : 'scale(1)') : 'scale(0.95)'}`,
                      transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
                      background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
                      boxShadow: hovered ? '0 24px 48px rgba(9,105,177,0.15), 0 0 0 1px rgba(255,255,255,0.6)' : '0 2px 16px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(241,245,249,1)',
                      backdropFilter: 'blur(12px)',
                      
                    }}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt={`Inauguration ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      
                      
                      {/* Image Number Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-gray-800 text-xs font-semibold">{index + 1}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-transform duration-500 origin-left"
                      style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Educational Sessions Section with Real Images */}
        <div className="relative">
        <div className="relative">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)' }} />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div ref={sessionsRefElement} className="relative px-6 md:px-20 py-16"
            style={{
              opacity: sessionsVisibleState ? 1 : 0,
              transform: sessionsVisibleState ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)'
            }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 shadow-lg">
                <Calendar className="w-4 h-4" />
                Educational Programs
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'Nunito',sans-serif" }}>
                Sessions & Workshops
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Continuous learning and development programs for our healthcare team
              </p>
            </div>

            {/* Featured Session with Images */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))' }}>
                
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Left: Main Image */}
                  <div className="relative overflow-hidden group">
                    <img
                      src="/gallery/session1.jpeg"
                      className="w-full h-full object-cover min-h-[400px] transition-transform duration-500 group-hover:scale-105"
                      alt="Infection Control Training"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-blue-600 text-xs font-semibold">Featured Session</span>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center shadow-lg">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-blue-600 text-sm font-semibold">Educational Excellence</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Infection Control Training</h3>
                    <p className="text-sm text-gray-500 font-medium mb-4">The Heart of Safe Healthcare</p>
                    
                    <div className="space-y-3 mb-6">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        <strong>Dr. Praveen Dambal (MBBS, MS - General Surgery, MCh - Urology)</strong> conducted a valuable session for the Leela Hospital team on best practices in Infection Control.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        This interactive session helped staff understand protocols for maintaining hygiene, preventing hospital-acquired infections (HAIs), and ensuring patient safety.
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        At Leela Hospital, we are committed to continuous learning and excellence in care.
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        50+ Staff
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        4 Hours
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Certificate
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Session Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "/gallery/session2.jpeg", 
                "/gallery/session3.jpeg",
                "/gallery/session4.jpeg",
              ].map((image, index) => {
                const [hovered, setHovered] = React.useState(false);
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => { setSelectedImage(image); setIsLightboxOpen(true); }}
                    className="relative overflow-hidden rounded-xl cursor-pointer group"
                    style={{
                      opacity: sessionsVisibleState ? 1 : 0,
                      transform: `${sessionsVisibleState ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(40px)'} ${sessionsVisibleState ? (hovered ? 'scale(1.05)' : 'scale(1)') : 'scale(0.95)'}`,
                      transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
                      background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
                      boxShadow: hovered ? '0 24px 48px rgba(9,105,177,0.15), 0 0 0 1px rgba(255,255,255,0.6)' : '0 2px 16px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(241,245,249,1)',
                      backdropFilter: 'blur(12px)',
                      
                    }}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt={`Session ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      
                      
                      {/* Image Number Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-gray-800 text-xs font-semibold">{index + 1}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-transform duration-500 origin-left"
                      style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        </div>

        {/* Events & Rituals Section with Real Images */}
        <div className="relative">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)' }} />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div ref={eventsRefElement} className="relative px-6 md:px-20 py-16"
            style={{
              opacity: eventsVisibleState ? 1 : 0,
              transform: eventsVisibleState ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)'
            }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 shadow-lg">
                <Heart className="w-4 h-4" />
                Celebrations
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'Nunito',sans-serif" }}>
                Events & Rituals
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Special occasions, ceremonies and memorable moments
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventImages.map((image, index) => {
                const [hovered, setHovered] = React.useState(false);
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => { setSelectedImage(image); setIsLightboxOpen(true); }}
                    className="relative overflow-hidden rounded-xl cursor-pointer group"
                    style={{
                      opacity: eventsVisibleState ? 1 : 0,
                      transform: `${eventsVisibleState ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(40px)'} ${eventsVisibleState ? (hovered ? 'scale(1.05)' : 'scale(1)') : 'scale(0.95)'}`,
                      transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
                      background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
                      boxShadow: hovered ? '0 24px 48px rgba(9,105,177,0.15), 0 0 0 1px rgba(255,255,255,0.6)' : '0 2px 16px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(241,245,249,1)',
                      backdropFilter: 'blur(12px)',
                      
                    }}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt={`Event ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      
                      
                      {/* Image Number Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-gray-800 text-xs font-semibold">{index + 1}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-transform duration-500 origin-left"
                      style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Community & Patients Section with Real Images */}
        <div className="relative">
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)' }} />
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div ref={communityRefElement} className="relative px-6 md:px-20 py-16"
            style={{
              opacity: communityVisibleState ? 1 : 0,
              transform: communityVisibleState ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)'
            }}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 shadow-lg">
                <Users className="w-4 h-4" />
                Our People
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: "'Nunito',sans-serif" }}>
                Community & Patients
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our dedicated team and the patients we serve
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityImages.map((image, index) => {
                const [hovered, setHovered] = React.useState(false);
                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onClick={() => { setSelectedImage(image); setIsLightboxOpen(true); }}
                    className="relative overflow-hidden rounded-xl cursor-pointer group"
                    style={{
                      opacity: communityVisibleState ? 1 : 0,
                      transform: `${communityVisibleState ? (hovered ? 'translateY(-8px)' : 'translateY(0)') : 'translateY(40px)'} ${communityVisibleState ? (hovered ? 'scale(1.05)' : 'scale(1)') : 'scale(0.95)'}`,
                      transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
                      background: hovered ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.8)',
                      boxShadow: hovered ? '0 24px 48px rgba(9,105,177,0.15), 0 0 0 1px rgba(255,255,255,0.6)' : '0 2px 16px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(241,245,249,1)',
                      backdropFilter: 'blur(12px)',
                      
                    }}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={image}
                        alt={`Community ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500"
                        style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      
                      
                      {/* Image Number Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-gray-800 text-xs font-semibold">{index + 1}</span>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-transform duration-500 origin-left"
                      style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-6xl max-h-[90vh] p-4">
            <button
              className="absolute -top-12 right-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
