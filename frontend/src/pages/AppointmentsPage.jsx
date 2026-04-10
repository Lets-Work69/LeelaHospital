import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Loader2, Calendar, Eye, Phone, Building2, Clock, MessageSquare, Activity, Check } from 'lucide-react'
import Navbar from '../components/Navbar'

const API_URL = 'http://localhost:5000/api'

/** Open bookings: still "new" until status is completed or cancelled. */
function isNewAppointment(a) {
  const s = a?.status
  return s !== 'completed' && s !== 'cancelled'
}

const FILTER_PRESETS = [
  { value: 'all', label: 'All', dot: 'bg-gray-400' },
  { value: 'new', label: 'New', dot: 'bg-teal-500' },
]

const STATUSES = [
  { value: 'pending',   label: 'Pending',   color: 'bg-yellow-100 text-yellow-800', dot: 'bg-yellow-400' },
  { value: 'confirmed', label: 'Confirmed', color: 'bg-green-100 text-green-800',   dot: 'bg-green-400' },
  { value: 'completed', label: 'Completed', color: 'bg-blue-100 text-blue-800',     dot: 'bg-blue-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800',       dot: 'bg-red-400' },
]

function StatusDropdown({ value, onChange, direction = 'down' }) {
  const [open, setOpen] = useState(false)
  const [dropDirection, setDropDirection] = useState(direction)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const ref = useRef(null)
  const buttonRef = useRef(null)
  
  // Recalculate current status whenever value changes
  const current = STATUSES.find(s => s.value === value) || STATUSES[0]

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target) && 
          !e.target.closest('.status-dropdown-portal')) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      
      if (spaceBelow < 200 && spaceAbove > 200) {
        setDropDirection('up')
        setPosition({ top: rect.top - 10, left: rect.left })
      } else {
        setDropDirection('down')
        setPosition({ top: rect.bottom + 8, left: rect.left })
      }
    }
  }, [open])

  const handleStatusClick = (newStatus) => {
    console.log('Status clicked:', newStatus)
    setOpen(false)
    onChange(newStatus)
  }

  const dropdownContent = open ? (
    <div
      className="status-dropdown-portal fixed bg-white rounded-2xl py-2 z-[9999]"
      style={{ 
        minWidth: '160px', 
        boxShadow: '0 8px 32px rgba(0,0,0,0.14)', 
        border: '1px solid #f1f5f9',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: dropDirection === 'up' ? 'translateY(-100%)' : 'none'
      }}
    >
      {STATUSES.map((s, i) => (
        <React.Fragment key={s.value}>
          {i === 2 && <div className="my-1 mx-3 border-t border-gray-100" />}
          <button
            type="button"
            onMouseDown={(e) => { 
              e.preventDefault()
              e.stopPropagation()
              console.log('Status option clicked:', s.value)
              handleStatusClick(s.value)
            }}
            className="flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5 w-full cursor-pointer"
            style={{ width: 'calc(100% - 8px)', marginLeft: '4px' }}
          >
            <div className="flex items-center gap-3">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
              <span className="font-medium">{s.label}</span>
            </div>
            {s.value === value && <Check className="w-3.5 h-3.5 text-blue-500" />}
          </button>
        </React.Fragment>
      ))}
    </div>
  ) : null

  return (
    <>
      <div ref={ref} className="relative inline-block">
        <button
          ref={buttonRef}
          type="button"
          onClick={(e) => { 
            e.stopPropagation()
            console.log('Dropdown button clicked, current open:', open)
            setOpen(o => !o) 
          }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${current.color}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
          {current.label}
          <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {dropdownContent && createPortal(dropdownContent, document.body)}
    </>
  )
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingStatus, setUpdatingStatus] = useState(null) // Track which appointment is being updated
  const [filter, setFilter] = useState('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewAppt, setViewAppt] = useState(null)
  const filterRef = useRef(null)
  const navigate = useNavigate()

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'superadmin') { navigate('/login'); return }
    fetchAppointments()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'superadmin') return
    const onNewBooking = () => fetchAppointments()
    window.addEventListener('leela:new-appointment', onNewBooking)
    return () => window.removeEventListener('leela:new-appointment', onNewBooking)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}/appointments`, { headers: getHeaders() })
      const data = await res.json()
      if (data.success) setAppointments(data.appointments)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    console.log('Updating status for:', id, 'to:', status)
    setUpdatingStatus(id) // Show loading state
    
    try {
      const res = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status })
      })
      const data = await res.json()
      console.log('Update response:', data)
      
      if (data.success) {
        // Force immediate state update with the returned appointment
        setAppointments(prev => prev.map(a => a._id === id ? data.appointment : a))
        
        // Update the view modal if open
        if (viewAppt && viewAppt._id === id) {
          setViewAppt(data.appointment)
        }
        
        console.log('Status updated successfully to:', data.appointment.status)
      } else {
        console.error('Failed to update status:', data.message)
        alert('Failed to update status: ' + (data.message || 'Unknown error'))
      }
    } catch (err) { 
      console.error('Error updating status:', err)
      alert('Error updating status. Please check console.')
    } finally {
      setUpdatingStatus(null) // Clear loading state
    }
  }

  const filtered =
    filter === 'all'
      ? appointments
      : filter === 'new'
        ? appointments.filter(isNewAppointment)
        : appointments.filter(a => a.status === filter)
  const filterLabel =
    filter === 'all'
      ? 'All'
      : filter === 'new'
        ? 'New'
        : (STATUSES.find(s => s.value === filter)?.label || 'All')

  return (
    <>
      <Navbar />

      {viewAppt && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]"
          onClick={() => setViewAppt(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-slide-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-5 text-white" style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">Appointment Details</p>
              <h2 className="text-xl font-bold">{viewAppt.name}</h2>
              <p className="text-white/60 text-xs font-mono mt-1">#{viewAppt._id.slice(-6).toUpperCase()}</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              {[
                { icon: <Phone className="w-4 h-4" />, label: 'Phone', value: viewAppt.phone, color: 'bg-blue-50 text-blue-500' },
                { icon: <Building2 className="w-4 h-4" />, label: 'Department', value: viewAppt.department, color: 'bg-teal-50 text-teal-500' },
                { icon: <Clock className="w-4 h-4" />, label: 'Date', value: viewAppt.date, color: 'bg-purple-50 text-purple-500' },
                { icon: <Activity className="w-4 h-4" />, label: 'Booked On', value: new Date(viewAppt.createdAt).toLocaleString(), color: 'bg-orange-50 text-orange-500' },
                ...(viewAppt.message ? [{ icon: <MessageSquare className="w-4 h-4" />, label: 'Message', value: viewAppt.message, color: 'bg-gray-50 text-gray-500' }] : [])
              ].map(row => (
                <div key={row.label} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${row.color}`}>
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{row.label}</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 pb-6 flex gap-3 items-center">
              <div className="flex-1">
                <StatusDropdown key={`modal-${viewAppt._id}-${viewAppt.status}`} value={viewAppt.status} onChange={s => updateStatus(viewAppt._id, s)} direction="up" />
              </div>
              <button
                onClick={() => setViewAppt(null)}
                className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
              <p className="text-gray-500 text-sm mt-1">
                {appointments.length} total
                {filter !== 'new' && (
                  <> · {appointments.filter(isNewAppointment).length} new (until completed or cancelled)</>
                )}
              </p>
            </div>
            <div ref={filterRef} className="relative">
              <button
                onClick={() => setFilterOpen(o => !o)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
              >
                {filterLabel}
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${filterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {filterOpen && (
                <div
                  className="absolute top-full mt-2 right-0 bg-white rounded-2xl py-2 z-50"
                  style={{ minWidth: '160px', boxShadow: '0 8px 32px rgba(0,0,0,0.14)', border: '1px solid #f1f5f9' }}
                >
                  {FILTER_PRESETS.map(s => (
                    <button
                      key={s.value}
                      onClick={() => { setFilter(s.value); setFilterOpen(false) }}
                      className="flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5"
                      style={{ width: 'calc(100% - 8px)', marginLeft: '4px' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className="font-medium">{s.label}</span>
                      </div>
                      {s.value === filter && <Check className="w-3.5 h-3.5 text-blue-500" />}
                    </button>
                  ))}
                  <div className="my-1 mx-3 border-t border-gray-100" />
                  {STATUSES.map(s => (
                    <button
                      key={s.value}
                      onClick={() => { setFilter(s.value); setFilterOpen(false) }}
                      className="flex items-center justify-between text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-xl px-4 py-2.5"
                      style={{ width: 'calc(100% - 8px)', marginLeft: '4px' }}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span className="font-medium">{s.label}</span>
                      </div>
                      {s.value === filter && <Check className="w-3.5 h-3.5 text-blue-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>No appointments found</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
              <div className="w-full">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      {['#', 'Patient', 'Phone', 'Department', 'Date', 'Message', 'Status', ''].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map(apt => (
                      <tr
                        key={apt._id}
                        className={`hover:bg-gray-50 transition-colors ${isNewAppointment(apt) ? 'bg-teal-50/40' : ''}`}
                      >
                        <td className="px-5 py-4 text-xs font-mono text-gray-400">#{apt._id.slice(-6).toUpperCase()}</td>
                        <td className="px-5 py-4 text-sm font-medium text-gray-900">{apt.name}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{apt.phone}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{apt.department}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{apt.date}</td>
                        <td className="px-5 py-4 text-sm text-gray-500 max-w-xs truncate">{apt.message || '—'}</td>
                        <td className="px-5 py-4">
                          {updatingStatus === apt._id ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              Updating...
                            </div>
                          ) : (
                            <StatusDropdown key={`${apt._id}-${apt.status}`} value={apt.status} onChange={s => updateStatus(apt._id, s)} />
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <button
                            onClick={() => setViewAppt(apt)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
