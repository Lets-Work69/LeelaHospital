import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Award, Users, Camera, Heart, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
const ImageCard = ({ item, setSelectedImage, index, visible }) => {
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
};

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [typed, setTyped] = useState('');
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const fullText = 'Gallery';
  
  // Scroll reveal refs
  const [sessionsRef, sessionsVisible] = useReveal(0.15);
  const [awardsRef, awardsVisible] = useReveal(0.15);
  const [eventsRef, eventsVisible] = useReveal(0.15);

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

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative pt-24 pb-0 overflow-hidden" 
        style={{ background: 'linear-gradient(135deg, #022441 0%, #0969b1 55%, #17ae95 100%)', minHeight: '320px' }}>

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
          <div key={i} className="absolute rounded-full opacity-20 animate-float pointer-events-none"
            style={{
              width: `${6 + (i % 3) * 4}px`, height: `${6 + (i % 3) * 4}px`,
              background: i % 2 === 0 ? '#5eead4' : '#7dd3fc',
              left: `${10 + i * 11}%`, top: `${20 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.6}s`, animationDuration: `${4 + i * 0.5}s`
            }} />
        ))}

        <div className="absolute inset-0 opacity-5"
          style={{ background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)' }} />

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

          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s ease 0.15s' }}>
            <h1 className="font-extrabold text-white mb-4 leading-tight"
              style={{ fontFamily: "'Nunito',sans-serif", fontSize: 'clamp(2.5rem,6vw,4rem)' }}>
              Our{' '}
              <span style={{ background: 'linear-gradient(90deg,#7dd3fc,#5eead4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                {typed}
              </span>
              {typed.length < fullText.length && (
                <span className="text-white" style={{ animation: 'blink 0.7s step-end infinite' }}>|</span>
              )}
            </h1>
            <p className="text-white/75 text-lg max-w-xl mx-auto" style={{ fontFamily: "'Nunito',sans-serif" }}>
              Moments of Care, Excellence & Community - Capturing the heart of healthcare at Leela Hospital.
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8"
            style={{ opacity: heroVisible ? 1 : 0, transition: 'all 0.8s ease 0.35s' }}>
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,transparent,#5eead4)' }} />
            <div className="w-2 h-2 rounded-full bg-teal-300 animate-pulse" />
            <div className="h-px w-16 rounded-full" style={{ background: 'linear-gradient(90deg,#5eead4,transparent)' }} />
          </div>
        </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #f0fdf4 100%)' }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />

        <div className="relative px-6 md:px-20 py-16">

          {/* ================= SESSIONS ================= */}
          <div ref={sessionsRef} className="mb-24"
          style={{
            opacity: sessionsVisible ? 1 : 0,
            transform: sessionsVisible ? 'translateY(0)' : 'translateY(60px)',
            transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)'
          }}>

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass text-primary-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Calendar className="w-4 h-4" />
              Educational Programs
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600 mb-4">
              Sessions & Workshops
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Continuous learning and development programs for our healthcare team
            </p>
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
                />
                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full">
                  <span className="text-primary-600 text-xs font-semibold">Featured Session</span>
                </div>
              </div>

              {/* RIGHT: CONTENT */}
              <div className="p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-primary-600 text-sm font-semibold">Educational Excellence</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-6">
                  Infection Control - A Commitment to Safe Healthcare
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">
                  Dr. Praveen Dambal (MBBS, MS - General Surgery, MCh - Urology) conducted an insightful session for the Leela Hospital team on best practices in Infection Control.

                  This interactive session focused on maintaining hygiene standards, preventing hospital-acquired infections (HAIs), and ensuring patient safety across all departments.

                  At Leela Hospital, we believe continuous learning is essential to delivering safe and high-quality healthcare.
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    50+ Participants
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    4 Hours Training
                  </span>
                </div>
              </div>
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

        {/* ================= AWARDS ================= */}
      </div>
      <div ref={awardsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #fff 0%, #f8fafc 50%, #f1f5f9 100%)' }} />
        <div className="absolute top-0 left-0 w-1/2 h-full opacity-5"
          style={{ background: 'linear-gradient(135deg, #0969b1, transparent)' }} />
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="mb-20"
            style={{
              opacity: awardsVisible ? 1 : 0,
              transform: awardsVisible ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)'
            }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass text-primary-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4" />
              Recognition & Excellence
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600 mb-4">
              Awards & Achievements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recognitions and accolades that validate our commitment to healthcare excellence
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryData.awards.map((item, index) => (
              <ImageCard
                key={index}
                item={item}
                setSelectedImage={setSelectedImage}
                index={index}
                visible={awardsVisible}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= EVENTS ================= */}
      <div ref={eventsRef} className="relative py-24 overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)' }} />
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: 'radial-gradient(circle,#0969b1,transparent)' }} />
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-10 animate-blob-delay"
          style={{ background: 'radial-gradient(circle,#17ae95,transparent)' }} />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="mb-20"
            style={{
              opacity: eventsVisible ? 1 : 0,
              transform: eventsVisible ? 'translateY(0)' : 'translateY(60px)',
              transition: 'all 0.9s cubic-bezier(0.4,0,0.2,1)'
            }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass text-primary-600 text-sm font-medium px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4" />
              Community Engagement
            </div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-600 mb-4">
              Events & Activities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Community outreach programs and health initiatives making a difference
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryData.events.map((item, index) => (
              <ImageCard
                key={index}
                item={item}
                setSelectedImage={setSelectedImage}
                index={index}
                visible={eventsVisible}
              />
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* ================= LIGHTBOX ================= */}
      <div>
        {selectedImage && (
            <div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex justify-center items-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="relative max-w-[90%] max-h-[90%]">
                <img
                  src={selectedImage}
                  className="w-full h-full object-contain rounded-2xl shadow-2xl"
                />
                <button
                  className="absolute -top-12 right-0 glass px-4 py-2 rounded-full text-white hover:bg-white/20 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
