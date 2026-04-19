import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Calendar, Users, Heart, ArrowLeft, X, Award } from "lucide-react";
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

const sessionImages = [
  "/gallery/session1.jpeg",
  "/gallery/session2.jpeg",
  "/gallery/session3.jpeg",
  "/gallery/session4.jpeg",
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

function ImageGrid({ images, visibleState, altPrefix, onOpen }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image, index) => {
        const [hovered, setHovered] = React.useState(false);
        return (
          <div
            key={index}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onOpen(image)}
            className="relative overflow-hidden rounded-xl cursor-pointer"
            style={{
              opacity: visibleState ? 1 : 0,
              transform: visibleState ? (hovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)') : 'translateY(40px) scale(0.95)',
              transition: `all 0.4s cubic-bezier(0.4,0,0.2,1) ${index * 0.1}s`,
              boxShadow: hovered ? '0 24px 48px rgba(9,105,177,0.15)' : '0 2px 16px rgba(0,0,0,0.06)',
              border: '1px solid rgba(241,245,249,1)',
            }}>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={image}
                alt={`${altPrefix} ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500"
                style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-500 transition-transform duration-500 origin-left"
              style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0)' }} />
          </div>
        );
      })}
    </div>
  );
}

function SectionWrapper({ refEl, visibleState, badge, icon, title, subtitle, children }) {
  return (
    <div className="relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)' }} />
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0969b1 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div ref={refEl} className="relative px-6 md:px-20 py-16"
        style={{
          opacity: visibleState ? 1 : 0,
          transform: visibleState ? 'translateY(0)' : 'translateY(60px)',
          transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)'
        }}>
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-6 shadow-lg">
            {icon}
            {badge}
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Nunito',sans-serif" }}>{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [typed, setTyped] = useState('');
  const heroRef = useRef(null);
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
    return () => { clearTimeout(t); clearInterval(timer); };
  }, []);

  const [inaugurationRef, inaugurationVisible] = useReveal(0.2);
  const [eventsRef, eventsVisible] = useReveal(0.2);
  const [communityRef, communityVisible] = useReveal(0.2);

  const openLightbox = (image) => { setSelectedImage(image); setIsLightboxOpen(true); };

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
        </div>

        <SectionWrapper
          refEl={inaugurationRef}
          visibleState={inaugurationVisible}
          badge="Grand Opening"
          icon={<Award className="w-4 h-4" />}
          title="Inauguration Ceremony"
          subtitle="The historic opening of Leela Hospital - A new chapter in healthcare excellence"
        >
          <ImageGrid images={inaugurationImages} visibleState={inaugurationVisible} altPrefix="Inauguration" onOpen={openLightbox} />
        </SectionWrapper>

        <SectionWrapper
          refEl={eventsRef}
          visibleState={eventsVisible}
          badge="Celebrations"
          icon={<Heart className="w-4 h-4" />}
          title="Events & Rituals"
          subtitle="Special occasions, ceremonies and memorable moments"
        >
          <ImageGrid images={eventImages} visibleState={eventsVisible} altPrefix="Event" onOpen={openLightbox} />
        </SectionWrapper>

        <SectionWrapper
          refEl={communityRef}
          visibleState={communityVisible}
          badge="Our People"
          icon={<Users className="w-4 h-4" />}
          title="Community & Patients"
          subtitle="Our dedicated team and the patients we serve"
        >
          <ImageGrid images={communityImages} visibleState={communityVisible} altPrefix="Community" onOpen={openLightbox} />
        </SectionWrapper>
      </div>

      <Footer />

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
