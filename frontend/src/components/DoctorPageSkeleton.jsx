import React from 'react'

export default function DoctorPageSkeleton({ index = 0 }) {
  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden"
      style={{
        animation: `fadeIn 0.7s cubic-bezier(0.4,0,0.2,1) ${index * 0.03}s both`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      }}>
      <div className="relative overflow-hidden bg-gray-200 animate-pulse" style={{ height: '280px' }}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300" />
      </div>

      <div className="p-5 relative">
        <div className="h-0.5 rounded-full mb-4 bg-gray-300 animate-pulse" style={{ width: '32px' }} />
        <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" style={{ width: '75%' }} />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4" style={{ width: '50%' }} />
        <div className="flex items-center gap-5 pt-3 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '60px' }} />
          <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '60px' }} />
        </div>
      </div>
    </div>
  )
}
