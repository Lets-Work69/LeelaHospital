import React, { useState, useEffect, useRef, memo } from "react";
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

const galleryData = {
  sessions: [
    {
      type: "highlight",
      title: "Infection Control - A Commitment to Safe Healthcare",
      description: `Dr. Praveen Dambal (MBBS, MS - General Surgery, MCh - Urology) conducted an insightful session for the Visual Journey team on best practices in Infection Control.

This interactive session focused on maintaining hygiene standards, preventing hospital-acquired infections (HAIs), and ensuring patient safety across all departments.

At Visual Journey, we believe continuous learning is essential to delivering safe and high-quality healthcare.`,
      images: [
        "/gallery/session1.jpeg",
        "/gallery/session2.jpeg",
        "/gallery/session3.jpeg",
        "/gallery/session4.jpeg",
      ],
    },
    {
      type: "normal",
      src: "/session5.jpg",
      title: "Health Awareness Camp",
      description: "Community health awareness initiative focused on preventive care and wellness education."
    },
    {
      type: "normal", 
      src: "/session6.jpg",
      title: "Medical Training Workshop",
      description: "Advanced medical training session for healthcare professionals."
    },
    {
      type: "normal",
      src: "/session7.jpg", 
      title: "Patient Safety Program",
      description: "Comprehensive patient safety protocols and best practices training."
    }
  ],

  awards: [
    {
      src: "/award1.jpg",
      title: "Excellence in Healthcare Award",
      description: "Recognized for outstanding patient care and medical excellence."
    },
    {
      src: "/award2.jpg",
      title: "Best Hospital Award 2024",
      description: "Awarded for exceptional healthcare services and patient satisfaction."
    },
    {
      src: "/award3.jpg",
      title: "Quality Care Certification",
      description: "Certified for maintaining highest standards in medical care."
    },
    {
      src: "/award4.jpg",
      title: "Community Service Award",
      description: "Honored for contributions to community health and wellness."
    }
  ],

  events: [
    {
      src: "/event1.jpg",
      title: "Hospital Community Event",
      description: "Annual community health fair and medical camp."
    },
    {
      src: "/event2.jpg",
      title: "Health Check-up Drive",
      description: "Free health screening camp for local residents."
    },
    {
      src: "/event3.jpg",
      title: "Medical Camp 2024",
      description: "Comprehensive medical examination and consultation drive."
    },
    {
      src: "/event4.jpg",
      title: "Wellness Workshop",
      description: "Interactive wellness and lifestyle management session."
    },
    {
      src: "/event5.jpg",
      title: "Blood Donation Camp",
      description: "Community blood donation drive organized by Leela Hospital."
    },
    {
      src: "/event6.jpg",
      title: "Health Awareness Seminar",
      description: "Educational seminar on preventive healthcare measures."
    }
  ],
};

const Section = ({ title, icon, children }) => {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 glass text-primary-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
          {icon}
          {title.includes('Awards') ? 'Recognition & Excellence' : 'Community Engagement'}
        </div>
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600 mb-4">
          {title}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {title.includes('Awards') 
            ? 'Recognitions and accolades that validate our commitment to healthcare excellence'
            : 'Community outreach programs and health initiatives making a difference'
          }
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
};

/* IMAGE CARD */
const ImageCard = memo(function ImageCard({ item, setSelectedImage, index, visible }) {
  return (
    <div className="rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group cursor-pointer" style={{
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(241,245,249,1)',
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
      transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
      opacity: visible ? 1 : 0,
      boxShadow: '0 2px 16px rgba(0,0,0,0.06)'
    }} onClick={() => setSelectedImage(item.src)}>
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.src}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:-translate-y-2"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <span className="text-white text-xs font-medium">View</span>
        </div>
        <div className="absolute bottom-4 left-4 glass px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
          <Camera className="w-3 h-3 text-white mr-1" />
          <span className="text-white text-xs font-medium">Expand</span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">{item.title}</h4>
        {item.description && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-primary-600 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to view</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100" style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
            <Camera className="w-3 h-3 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
});

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

          {/* FEATURED SESSION */}
          <div className="glass rounded-3xl overflow-hidden shadow-xl mb-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2" style={{
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(9,105,177,0.1)'
              }}>
            <div className="grid md:grid-cols-2 gap-0">
              {/* LEFT: BIG IMAGE */}
              <div className="relative overflow-hidden group">
                <img
                  src="/gallery/session1.jpeg"
                  className="w-full h-full object-cover min-h-[400px] transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full">
                  <span className="text-primary-600 text-xs font-semibold">Featured Session</span>
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

          {/* IMAGE GALLERY */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/gallery/session1.jpeg",
              "/gallery/session2.jpeg", 
              "/gallery/session3.jpeg",
              "/gallery/session4.jpeg",
            ].map((img, i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden rounded-xl" 
                onClick={() => setSelectedImage(img)}
                style={{
                  transform: sessionsVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                  transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.1}s`,
                  opacity: sessionsVisible ? 1 : 0,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(241,245,249,1)'
                }}>
                <img
                  src={img}
                  className="w-full h-40 object-cover transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <Camera className="w-4 h-4 text-gray-700" />
                </div>
              </div>
            ))}
          </div>

          {/* ADDITIONAL SESSIONS */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {galleryData.sessions.slice(1).map((session, index) => (
              <div key={index} className="rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 group cursor-pointer" style={{
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(241,245,249,1)',
                transform: sessionsVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
                transition: `all 0.6s cubic-bezier(0.4,0,0.2,1) ${index * 0.15}s`,
                opacity: sessionsVisible ? 1 : 0,
                boxShadow: '0 2px 16px rgba(0,0,0,0.06)'
              }}>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={session.src}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-300">{session.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{session.description}</p>
                </div>
              </div>
            ))}
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
