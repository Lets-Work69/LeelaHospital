import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, FileText, Stethoscope, Calendar, Check } from 'lucide-react'
import Navbar from '../components/Navbar'
import { API_URL } from '../config/api'

const ACTION_STYLES = {
  DOCTOR_ADDED:              { color: 'bg-green-100 text-green-700',  label: 'Doctor Added' },
  DOCTOR_EDITED:             { color: 'bg-blue-100 text-blue-700',    label: 'Doctor Edited' },
  DOCTOR_DELETED:            { color: 'bg-red-100 text-red-700',      label: 'Doctor Deleted' },
  DOCTOR_ACTIVATED:          { color: 'bg-teal-100 text-teal-700',    label: 'Doctor Activated' },
  DOCTOR_DEACTIVATED:        { color: 'bg-orange-100 text-orange-700',label: 'Doctor Deactivated' },
  DOCTORS_REORDERED:         { color: 'bg-indigo-100 text-indigo-700',label: 'Doctors Reordered' },
  APPOINTMENT_BOOKED:        { color: 'bg-purple-100 text-purple-700',label: 'Appointment Booked' },
  APPOINTMENT_STATUS_CHANGED:{ color: 'bg-yellow-100 text-yellow-700',label: 'Status Changed' },
  APPOINTMENT_DELETED:       { color: 'bg-red-100 text-red-700',      label: 'Appointment Deleted' },
}

export default function LogsPage() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.role !== 'superadmin') { navigate('/login'); return }
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const res = await fetch(`${API_URL}/api/logs?limit=200`, { headers: getHeaders() })
      const data = await res.json()
      if (data.success) setLogs(data.logs)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filtered = filter === 'all' ? logs : logs.filter(l => l.category === filter)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
              <p className="text-gray-500 text-sm mt-1">{filtered.length} entries</p>
            </div>

<div className="flex items-center flex-wrap bg-white border border-gray-200 rounded-xl p-1 gap-1 shadow-sm">
              {[
                { value: 'all', label: 'All', icon: <FileText className="w-3.5 h-3.5" /> },
                { value: 'doctor', label: 'Doctors', icon: <Stethoscope className="w-3.5 h-3.5" /> },
                { value: 'appointment', label: 'Appointments', icon: <Calendar className="w-3.5 h-3.5" /> },
              ].map(f => (
                <button key={f.value} onClick={() => setFilter(f.value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    filter === f.value ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}>
                  {f.icon}{f.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>No logs yet</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {filtered.map((log, i) => {
                const style = ACTION_STYLES[log.action] || { color: 'bg-gray-100 text-gray-700', label: log.action }
                const date = new Date(log.createdAt)
                return (
                  <div key={log._id}
                    className={`flex items-start gap-4 px-6 py-4 ${i !== filtered.length - 1 ? 'border-b border-gray-50' : ''} hover:bg-gray-50 transition-colors`}>
                    
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${log.category === 'doctor' ? 'bg-blue-50' : 'bg-purple-50'}`}>
                      {log.category === 'doctor'
                        ? <Stethoscope className="w-4 h-4 text-blue-500" />
                        : <Calendar className="w-4 h-4 text-purple-500" />}
                    </div>

<div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${style.color}`}>
                          {style.label}
                        </span>
                        <p className="text-sm text-gray-700">{log.description}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">by <span className="font-medium text-gray-500">{log.performedBy || 'System'}</span></p>
                    </div>

<div className="text-right flex-shrink-0">
                      <p className="text-xs font-medium text-gray-500">{date.toLocaleDateString()}</p>
                      <p className="text-xs text-gray-400">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
