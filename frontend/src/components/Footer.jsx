import React from 'react'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react'

const quickLinks = ['Home', 'About Us', 'Services', 'Doctors', 'Careers', 'Contact']
const services = ['Cardiology', 'Neurology', 'Orthopaedics', 'Paediatrics', 'Oncology', 'Dental Care']

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-mesh">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" fill="#f9fafb"/>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <img src="/Leela Hospital Final Logo👍-1.png" alt="Leela Hospital" className="h-16 w-auto mb-5"
            style={{ mixBlendMode: 'screen' }}
            onError={e => { e.target.onerror = null; e.target.src = '/logo.svg' }} />
          <p className="text-sm leading-relaxed text-blue-200 mb-6">
            Committed to delivering compassionate, world-class healthcare to every patient, every day.
          </p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#"
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white hover:bg-teal-500 hover:border-teal-500 transition-all duration-300 hover:scale-110">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-3">
            {quickLinks.map(link => (
              <li key={link}>
                <a href="#" className="text-sm text-blue-200 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Our Services</h4>
          <ul className="space-y-3">
            {services.map(s => (
              <li key={s}>
                <a href="#" className="text-sm text-blue-200 hover:text-teal-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all duration-300" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Contact Us</h4>
          <div className="space-y-4">
            {[
              { icon: <MapPin className="w-4 h-4" />, text: '123 Health Avenue, Bangalore - 560001', link: 'https://share.google/9NBUx8SYRl2Cy391l' },
              { icon: <Phone className="w-4 h-4" />, text: '+91 12345 67890', link: 'tel:+911234567890' },
              { icon: <Mail className="w-4 h-4" />, text: 'care@leelahosp.com', link: 'mailto:care@leelahosp.com' },
            ].map((item, i) => (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
                  <span className="text-white">{item.icon}</span>
                </div>
                <p className="text-sm text-blue-200">{item.text}</p>
              </a>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl border border-red-500 border-opacity-40"
            style={{ background: 'rgba(220,38,38,0.15)' }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              <p className="text-red-300 text-xs font-bold uppercase tracking-wide">Emergency</p>
            </div>
            <p className="text-white font-bold text-xl">+91 12345 67890</p>
            <p className="text-red-300 text-xs mt-1">Available 24 hours / 7 days</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white border-opacity-10 py-6 text-center text-sm text-blue-300">
        © {new Date().getFullYear()} Leela Hospital. All rights reserved. | Designed with ❤️ for better health.
      </div>
    </footer>
  )
}


