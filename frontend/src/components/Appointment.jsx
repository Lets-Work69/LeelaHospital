import React, { useState, useEffect, useRef } from 'react'
import { Calendar, User, Phone, Stethoscope, Send, MapPin, Mail, Clock } from 'lucide-react'

const departments = [
  'Cardiology', 'Neurology', 'Orthopaedics', 'Paediatrics',
  'Oncology', 'Pulmonology', 'Dental Care', 'Ophthalmology', 'General Medicine',
]

const contactInfo = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: 'Leela Hospital, Near New Bus Stand, Mundaragi road, Gadag, Karnataka - 582101', color: '#17ae95' },
  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 08372234599, 9008371817, 9483467777', color: '#17ae95', link: null },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'care@leelahospitals.in', color: '#17ae95', link: null },
  { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon–Sat: 8AM–8PM | Emergency: 24/7', color: '#17ae95', link: null },
]

const floatingIcons = ['💊', '🩺', '🩻', '❤️', '🧬', '💉', '🔬', '🩹']

function FloatingMedical() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {floatingIcons.map((icon, i) => (
        <div key={i} className="absolute text-2xl opacity-10 select-none"
          style={{
            left: `${8 + i * 12}%`,
            top: `${10 + (i % 3) * 30}%`,
            animation: `float ${5 + i * 0.7}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}>
          {icon}
        </div>
      ))}
    </div>
  )
}

function ContactCard({ item, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center gap-4 bg-white rounded-2xl p-5 overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-30px)',
        transition: `all 0.5s ease ${index * 0.1}s`,
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
        border: hovered ? '1px solid transparent' : '1px solid #f1f5f9',
      }}>

      {/* Animated background sweep on hover */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl"
        style={{ background: item.color, opacity: hovered ? 0.05 : 0 }} />

      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300"
        style={{ background: item.color, opacity: hovered ? 1 : 0.3 }} />

      <div className="w-12 h-12 rounded-xl text-white flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300"
        style={{ background: item.color, transform: hovered ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)' }}>
        {item.icon}
      </div>

      <div>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{item.label}</p>
        <p className="text-gray-700 font-semibold mt-0.5">{item.value}</p>
      </div>

      {/* Ripple dot on hover */}
      {hovered && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-ping"
          style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }} />
      )}
    </div>
  )
}

export default function Appointment() {
  const [form, setForm] = useState({ name: '', phone: '', department: '', date: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')
  const [formVisible, setFormVisible] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFormVisible(true) }, { threshold: 0.1 })
    if (formRef.current) observer.observe(formRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
    setForm({ name: '', phone: '', department: '', date: '', message: '' })
  }

  const inputClass = (name) =>
    `w-full pl-10 pr-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none bg-gray-50 focus:bg-white ${
      focused === name
        ? 'border-2 border-primary-400 shadow-lg shadow-primary-100 bg-white'
        : 'border-2 border-gray-100 hover:border-gray-200'
    }`

  return (
    <section id="appointment" className="py-24 relative overflow-hidden">

      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient"
        style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe, #f0fdf4, #fafafa)', backgroundSize: '400% 400%' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '28px 28px' }} />

      {/* Floating medical icons */}
      <FloatingMedical />

      {/* Glowing orbs */}
      <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: 'radial-gradient(circle, #17ae95, transparent)' }} />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: 'radial-gradient(circle, #0969b1, transparent)', animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-primary-50 text-primary-500 font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full mb-4">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book an <span className="text-gradient">Appointment</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Schedule a consultation with our specialists. We'll confirm within 2 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">

          {/* Left — contact info */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => <ContactCard key={item.label} item={item} index={i} />)}

            {/* Google Maps embed */}
            <div className="rounded-2xl overflow-hidden shadow-md border border-gray-100" style={{ height: '200px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12292.2348629131!2d75.62375420400151!3d15.420820184266091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb8f96d9a5a11fb%3A0xc3bd6862723014f3!2sLeela%20Hospital%20Gadag!5e1!3m2!1sen!2sin!4v1774927805782!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Leela Hospital Location"
              />
            </div>

            {/* Emergency banner with pulse effect */}
            <div className="relative overflow-hidden rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #0969b1, #064e8a)' }}>

              {/* Animated rings */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white opacity-10 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-white opacity-10" />

              {/* Heartbeat line */}
              <div className="absolute bottom-3 left-0 right-0 px-4 opacity-20">
                <svg viewBox="0 0 300 30" className="w-full">
                  <polyline points="0,15 40,15 55,5 65,25 75,15 120,15 135,8 145,22 155,15 200,15 215,5 225,25 235,15 300,15"
                    fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                    <animate attributeName="stroke-dasharray" from="0,600" to="600,0" dur="2.5s" repeatCount="indefinite" />
                  </polyline>
                </svg>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative">
                    <svg width="48" height="32" viewBox="0 0 48 32" className="animate-drive">
                      {/* Ambulance body */}
                      <g>
                        <rect x="4" y="12" width="28" height="12" fill="#f8fafc" rx="2"/>
                        <rect x="22" y="6" width="12" height="18" fill="#f8fafc" rx="2"/>
                        {/* Windows */}
                        <rect x="24" y="8" width="8" height="8" fill="#0969b1"/>
                        {/* Medical cross */}
                        <rect x="26" y="11" width="4" height="2" fill="white"/>
                        <rect x="27" y="10" width="2" height="4" fill="white"/>
                      </g>
                      {/* Wheels */}
                      <circle cx="10" cy="26" r="3" fill="#1f2937"/>
                      <circle cx="24" cy="26" r="3" fill="#1f2937"/>
                      <circle cx="32" cy="26" r="3" fill="#1f2937"/>
                      {/* Siren lights */}
                      <rect x="34" y="8" width="3" height="5" fill="#ef4444" className="animate-flash-red"/>
                      <rect x="38" y="8" width="3" height="5" fill="#3b82f6" className="animate-flash-blue"/>
                      {/* Road motion lines */}
                      <g className="animate-road-lines">
                        <rect x="0" y="30" width="6" height="2" fill="white" opacity="0.6"/>
                        <rect x="20" y="30" width="4" height="2" fill="white" opacity="0.6"/>
                        <rect x="40" y="30" width="8" height="2" fill="white" opacity="0.6"/>
                      </g>
                    </svg>
                  </div>
                  <p className="font-bold text-sm uppercase tracking-widest">24/7 Emergency</p>
                </div>
                <p className="text-3xl font-bold tracking-wide">+91 9008371817</p>
                <p className="text-blue-100 text-sm mt-1">Immediate response guaranteed</p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef}
            className="bg-white rounded-3xl p-8 relative overflow-hidden"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.7s ease',
              boxShadow: '0 25px 60px rgba(29,111,164,0.12)',
              border: '1px solid rgba(29,111,164,0.08)',
            }}>

            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95, #0969b1)', backgroundSize: '200%', animation: 'shimmer 3s linear infinite' }} />

            {/* Corner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10"
              style={{ background: 'radial-gradient(circle, #17ae95, transparent)' }} />

            {submitted ? (
              <div className="text-center py-12">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-30"
                    style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }} />
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>✅</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Appointment Requested!</h3>
                <p className="text-gray-500">We'll contact you shortly to confirm your booking.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Fill in your details</h3>

                {[
                  { name: 'name', icon: <User className="w-4 h-4" />, placeholder: 'Your Full Name', type: 'text' },
                  { name: 'phone', icon: <Phone className="w-4 h-4" />, placeholder: 'Phone Number', type: 'tel' },
                ].map(field => (
                  <div key={field.name} className="relative group">
                    <div className={`absolute left-3 top-4 transition-colors duration-300 ${focused === field.name ? 'text-primary-500' : 'text-gray-400'}`}>
                      {field.icon}
                    </div>
                    <input name={field.name} value={form[field.name]} onChange={handleChange} required
                      type={field.type} placeholder={field.placeholder}
                      onFocus={() => setFocused(field.name)} onBlur={() => setFocused('')}
                      className={inputClass(field.name)} />
                    {/* Glow line at bottom on focus */}
                    <div className="absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95)', opacity: focused === field.name ? 1 : 0, transform: focused === field.name ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                ))}

                <div className="relative">
                  <div className={`absolute left-3 top-4 transition-colors duration-300 ${focused === 'department' ? 'text-primary-500' : 'text-gray-400'}`}>
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <select name="department" value={form.department} onChange={handleChange} required
                    onFocus={() => setFocused('department')} onBlur={() => setFocused('')}
                    className={inputClass('department') + ' bg-white appearance-none'}>
                    <option value="">Select Department</option>
                    {departments.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>

                <div className="relative">
                  <div className={`absolute left-3 top-4 transition-colors duration-300 ${focused === 'date' ? 'text-primary-500' : 'text-gray-400'}`}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input name="date" value={form.date} onChange={handleChange} required type="date"
                    onFocus={() => setFocused('date')} onBlur={() => setFocused('')}
                    className={inputClass('date')} />
                </div>

                <div className="relative">
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Describe your symptoms (optional)" rows={3}
                    onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                    className={`w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none resize-none ${
                      focused === 'message'
                        ? 'border-2 border-primary-400 shadow-lg shadow-primary-100 bg-white'
                        : 'border-2 border-gray-100 hover:border-gray-200 bg-gray-50'
                    }`} />
                </div>

                <button type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base group">
                  <Send className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                  Request Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

