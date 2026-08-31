import React from 'react'

export default function DoctorCardSkeleton({ index = 0 }) {
  return (
    <div
      className="flex-shrink-0 rounded-2xl overflow-hidden bg-white"
      style={{
        width: '260px',
        animation: `fadeIn 0.6s ease ${index * 0.08}s both`,
      }}>
      <div className="relative overflow-hidden bg-gray-200 animate-pulse" style={{ height: '300px' }}>
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-300" />
      </div>

      <div className="p-5">
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" style={{ width: '70%' }} />
        <div className="h-3 bg-gray-200 rounded animate-pulse mb-4" style={{ width: '50%' }} />
        <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100">
          <div className="h-3 bg-gray-200 rounded animate-pulse" style={{ width: '40%' }} />
          <div className="h-3 bg-gray-200 rounded animate-pulse" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  )
}
