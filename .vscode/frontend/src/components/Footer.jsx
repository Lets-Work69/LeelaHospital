import React from 'react'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/specialities' },
  { label: 'Doctors', href: '/doctors' }
]

export default function Footer() {
  const navigate = useNavigate()

  const handleLinkClick = (href) => {
    navigate(href)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="relative overflow-hidden bg-mesh">
      
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#f9fafb"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

<div>
          <div className="relative inline-block mb-5 group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-blue-600/30 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 hover:border-teal-400/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20">
              <img src="/Leela Hospital Final Logo👍-1.png" alt="Leela Hospital" className="h-12 w-auto relative z-10"
                onError={e => { e.target.onerror = null; e.target.src = '/logo.svg' }} />
            </div>
          </div>
          
          <p className="text-sm leading-relaxed text-blue-200 mb-6">
            Committed to delivering compassionate, world-class healthcare to every patient, every day.
          </p>

          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href={i === 1 ? 'https://www.instagram.com/leela.hospital/?hl=en' : '#'}
                target={i === 1 ? '_blank' : undefined}
                rel={i === 1 ? 'noopener noreferrer' : undefined}
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white hover:bg-teal-500 hover:border-teal-500 transition-all duration-300 hover:scale-110">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map(link => (
              <li key={link.label}>
                <button 
                  onClick={() => handleLinkClick(link.href)}
                  className="text-sm text-blue-200 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

<div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
          <div className="space-y-4">
            {[
              { icon: <MapPin className="w-4 h-4" />, text: 'Leela Hospital, Near New Bus stand, Mundaragi road, Gadag, Karnataka - 582101' },
              { icon: <Phone className="w-4 h-4" />, text: '+91 08372234599, 9008371817, 9483467777', link: 'tel:+9108372234599' },
              { icon: <Mail className="w-4 h-4" />, text: 'care@leelahospitals.in', link: 'mailto:care@leelahospitals.in' },
            ].map((item, i) => {
              const content = (
                <>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
                    <span className="text-white">{item.icon}</span>
                  </div>
                  <p className="text-sm text-blue-200">{item.text}</p>
                </>
              )

              if (i === 0) {
                return <div key={i} className="flex items-start gap-3">{content}</div>
              }

              return (
                <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                  {content}
                </a>
              )
            })}
          </div>

          <div className="mt-6 p-4 rounded-2xl border border-red-500 border-opacity-40"
            style={{ background: 'rgba(220,38,38,0.15)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <p className="text-red-300 text-xs font-bold uppercase tracking-wide">Emergency</p>
            </div>
            <p className="text-white font-bold text-xl">+91 9008371817</p>
            <p className="text-red-300 text-xs mt-1">Available 24 hours / 7 days</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white border-opacity-10 py-6 text-center text-sm text-blue-300">
        © {new Date().getFullYear()} Leela Hospital. All rights reserved. | Powered by DevForYou.
      </div>
    </footer>
  )
}