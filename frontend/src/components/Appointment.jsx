import { useState, useEffect, useRef } from 'react'
import { Calendar, User, Phone, Stethoscope, Send, MapPin, Mail, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

const departments = [
  'Cardiology', 'Neurology', 'Orthopaedics', 'Paediatrics',
  'Oncology', 'Pulmonology', 'Dental Care', 'Ophthalmology'
]

const contactInfo = [
  { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: 'Leela Hospital, Near New Bus Stand, Mundaragi road, Gadag, Karnataka - 582101', color: '#17ae95' },
  { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: '+91 08372234599, 9008371817, 9483467777', color: '#17ae95', link: null },
  { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'care@leelahospitals.in', color: '#17ae95', link: null },
  { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon–Sat: 8AM–8PM | Emergency: 24/7', color: '#17ae95', link: null },
]

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa']

function DatePicker({ value, onChange, focused, onFocus, onBlur }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const today = new Date()
  const [viewDate, setViewDate] = useState(() => value ? new Date(value) : new Date())

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = value ? new Date(value + 'T00:00:00') : null
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, cur: false })
  for (let i = 1; i <= daysInMonth; i++) cells.push({ day: i, cur: true })
  while (cells.length % 7 !== 0) cells.push({ day: cells.length - daysInMonth - firstDay + 1, cur: false })

  const selectDay = (day, cur) => {
    if (!cur) return
    const d = new Date(year, month, day)
    const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    onChange(iso)
    setOpen(false)
  }

  const isSelected = (day, cur) => {
    if (!cur || !selected) return false
    return selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === day
  }

  const isToday = (day, cur) => {
    if (!cur) return false
    return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day
  }

  const displayValue = selected
    ? selected.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  return (
    <div ref={ref} className="relative">
      <div className={`absolute left-3 top-4 z-10 transition-colors duration-300 ${focused || open ? 'text-primary-500' : 'text-gray-400'}`}>
        <Calendar className="w-4 h-4" />
      </div>
      <button type="button"
        onClick={() => { setOpen(o => !o); onFocus() }}
        onBlur={onBlur}
        className={`w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-left transition-all duration-300 outline-none bg-gray-50 ${
          open || focused
            ? 'border-2 border-primary-400 shadow-lg shadow-primary-100 bg-white'
            : 'border-2 border-gray-100 hover:border-gray-200'
        } ${!displayValue ? 'text-gray-400' : 'text-gray-800'}`}>
        {displayValue || 'Select Date'}
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl p-4 z-50"
          style={{ boxShadow: '0 -8px 32px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9' }}>

<div className="flex items-center justify-between mb-3">
            <button type="button" onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm font-semibold text-gray-800">{MONTHS[month]} {year}</span>
            <button type="button" onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>

<div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
            ))}
          </div>

<div className="grid grid-cols-7 gap-y-1">
            {cells.map((cell, i) => (
              <button key={i} type="button"
                onClick={() => selectDay(cell.day, cell.cur)}
                className={`h-8 w-full rounded-lg text-xs font-medium transition-all ${
                  !cell.cur ? 'text-gray-300 cursor-default' :
                  isSelected(cell.day, cell.cur)
                    ? 'text-white font-bold'
                    : isToday(cell.day, cell.cur)
                    ? 'border border-primary-400 text-primary-500 hover:bg-primary-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={isSelected(cell.day, cell.cur) ? { background: 'linear-gradient(135deg, #0969b1, #17ae95)' } : {}}>
                {cell.day}
              </button>
            ))}
          </div>

<div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
            <button type="button"
              onClick={() => { const t = today; const iso = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`; onChange(iso); setOpen(false) }}
              className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors">
              Today
            </button>
          </div>
        </div>
      )}
      <input type="text" value={value} required readOnly className="sr-only" tabIndex={-1} />
    </div>
  )
}

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

<div className="absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl"
        style={{ background: item.color, opacity: hovered ? 0.05 : 0 }} />

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

{hovered && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full animate-ping"
          style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }} />
      )}
    </div>
  )
}

export default function Appointment() {
  const [form, setForm] = useState({ name: '', phone: '', department: '', date: '', message: '', consentGiven: false })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')
  const [formVisible, setFormVisible] = useState(false)
  const [deptOpen, setDeptOpen] = useState(false)
  const formRef = useRef(null)
  const deptRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setFormVisible(true) }, { threshold: 0.1 })
    if (formRef.current) observer.observe(formRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handler = (e) => { if (deptRef.current && !deptRef.current.contains(e.target)) setDeptOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.consentGiven) {
      alert('Please consent to the privacy policy to proceed')
      return
    }
    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          consentTimestamp: new Date().toISOString()
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to book')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 5000)
      setForm({ name: '', phone: '', department: '', date: '', message: '', consentGiven: false })
    } catch (err) {
      alert(err.message)
    }
  }

  const inputClass = (name) =>
    `w-full pl-10 pr-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none bg-gray-50 focus:bg-white ${
      focused === name
        ? 'border-2 border-primary-400 shadow-lg shadow-primary-100 bg-white'
        : 'border-2 border-gray-100 hover:border-gray-200'
    }`

  return (
    <section id="appointment" className="py-24 relative overflow-hidden">

<div className="absolute inset-0 animate-gradient"
        style={{ background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe, #f0fdf4, #fafafa)', backgroundSize: '400% 400%' }} />

<div className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)', backgroundSize: '28px 28px' }} />

<FloatingMedical />

<div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: 'radial-gradient(circle, #17ae95, transparent)' }} />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ background: 'radial-gradient(circle, #0969b1, transparent)', animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-4">
        
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

<div className="space-y-4">
            {contactInfo.map((item, i) => <ContactCard key={item.label} item={item} index={i} />)}

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

<div className="relative overflow-hidden rounded-2xl p-6 text-white"
              style={{ background: 'linear-gradient(135deg, #0969b1, #064e8a)' }}>

<div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white opacity-10 animate-ping" style={{ animationDuration: '2s' }} />
              <div className="absolute -right-3 -top-3 w-16 h-16 rounded-full bg-white opacity-10" />

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
                      
                      <g>
                        <rect x="4" y="12" width="28" height="12" fill="#f8fafc" rx="2"/>
                        <rect x="22" y="6" width="12" height="18" fill="#f8fafc" rx="2"/>
                        
                        <rect x="24" y="8" width="8" height="8" fill="#0969b1"/>
                        
                        <rect x="26" y="11" width="4" height="2" fill="white"/>
                        <rect x="27" y="10" width="2" height="4" fill="white"/>
                      </g>
                      
                      <circle cx="10" cy="26" r="3" fill="#1f2937"/>
                      <circle cx="24" cy="26" r="3" fill="#1f2937"/>
                      <circle cx="32" cy="26" r="3" fill="#1f2937"/>
                      
                      <rect x="34" y="8" width="3" height="5" fill="#ef4444" className="animate-flash-red"/>
                      <rect x="38" y="8" width="3" height="5" fill="#3b82f6" className="animate-flash-blue"/>
                      
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

<div ref={formRef}
            className="bg-white rounded-3xl p-8 relative"
            style={{
              opacity: formVisible ? 1 : 0,
              transform: formVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 0.7s ease',
              boxShadow: '0 25px 60px rgba(29,111,164,0.12)',
              border: '1px solid rgba(29,111,164,0.08)',
            }}>

<div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
              style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95, #0969b1)', backgroundSize: '200%', animation: 'shimmer 3s linear infinite' }} />

<div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-10"
              style={{ background: 'radial-gradient(circle, #17ae95, transparent)' }} />

            {submitted ? (
              <div className="text-center py-8">
                
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }} />
                  <div className="absolute inset-2 rounded-full animate-ping opacity-10 animation-delay-150"
                    style={{ background: 'linear-gradient(135deg, #17ae95, #0969b1)' }} />
                  <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">Appointment Requested!</h3>
                <p className="text-gray-500 mb-6">We'll contact you shortly to confirm your booking.</p>

<div className="flex flex-wrap justify-center gap-2 mb-6">
                  {[
                    { icon: '📞', text: 'Confirmation call within 2 hrs' },
                    { icon: '🏥', text: 'Leela Hospital, Gadag' },
                  ].map(p => (
                    <span key={p.text} className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
                      {p.icon} {p.text}
                    </span>
                  ))}
                </div>

<div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5" />

                <p className="text-xs text-gray-400">Need help? Call us at <span className="font-semibold text-gray-600">+91 9008371817</span></p>
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
                    <input name={field.name} value={form[field.name]}
                      onChange={e => {
                        if (field.name === 'phone') {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                          setForm({ ...form, phone: val })
                        } else {
                          handleChange(e)
                        }
                      }}
                      required
                      type={field.type} placeholder={field.placeholder}
                      onFocus={() => setFocused(field.name)} onBlur={() => setFocused('')}
                      inputMode={field.name === 'phone' ? 'numeric' : undefined}
                      pattern={field.name === 'phone' ? '[0-9]{10}' : undefined}
                      minLength={field.name === 'phone' ? 10 : undefined}
                      maxLength={field.name === 'phone' ? 10 : undefined}
                      className={inputClass(field.name)} />
                    
                    <div className="absolute bottom-0 left-4 right-4 h-px rounded-full transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95)', opacity: focused === field.name ? 1 : 0, transform: focused === field.name ? 'scaleX(1)' : 'scaleX(0)' }} />
                  </div>
                ))}

                <div ref={deptRef} className="relative">
                  <div className={`absolute left-3 top-4 z-10 transition-colors duration-300 ${deptOpen || form.department ? 'text-primary-500' : 'text-gray-400'}`}>
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <button type="button"
                    onClick={() => setDeptOpen(o => !o)}
                    className={`w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-left transition-all duration-300 outline-none bg-gray-50 focus:bg-white ${
                      deptOpen
                        ? 'border-2 border-primary-400 shadow-lg shadow-primary-100 bg-white'
                        : 'border-2 border-gray-100 hover:border-gray-200'
                    } ${!form.department ? 'text-gray-400' : 'text-gray-800'}`}>
                    {form.department || 'Select Department'}
                    <svg className={`absolute right-3 top-4 w-4 h-4 text-gray-400 transition-transform ${deptOpen ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {deptOpen && (
                    <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-2xl py-2 z-50 max-h-64 overflow-y-auto"
                      style={{ boxShadow: '0 -8px 32px rgba(0,0,0,0.12)', border: '1px solid #f1f5f9' }}>
                      {departments.map(d => (
                        <button key={d} type="button"
                          onClick={() => { setForm(f => ({ ...f, department: d })); setDeptOpen(false) }}
                          className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          style={{ borderRadius: '10px', margin: '0 4px', width: 'calc(100% - 8px)' }}>
                          <span className={form.department === d ? 'font-semibold text-primary-500' : ''}>{d}</span>
                          {form.department === d && (
                            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <input type="text" name="department" value={form.department} required readOnly className="sr-only" tabIndex={-1} />
                </div>

                <DatePicker
                  value={form.date}
                  onChange={date => setForm(f => ({ ...f, date }))}
                  focused={focused === 'date'}
                  onFocus={() => setFocused('date')}
                  onBlur={() => setFocused('')}
                />

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

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={form.consentGiven}
                    onChange={e => setForm({ ...form, consentGiven: e.target.checked })}
                    className="w-5 h-5 mt-0.5 rounded border-2 border-blue-300 cursor-pointer accent-blue-600 flex-shrink-0"
                  />
                  <label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                    I consent to the hospital collecting and using my name, contact number, and appointment details only for the purpose of booking and managing my appointment with the doctor. I have read and understood the{' '}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-blue-600 hover:text-blue-700 underline"
                    >
                      Privacy Policy
                    </a>
                    {' '}and I agree to it.
                  </label>
                </div>

                <button type="submit"
                  disabled={!form.consentGiven}
                  className={`btn-primary w-full flex items-center justify-center gap-2 py-4 text-base group transition-all ${
                    !form.consentGiven ? 'opacity-50 cursor-not-allowed' : ''
                  }`}>
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

