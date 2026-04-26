import React from 'react'

export function AdminDoctorCardSkeleton() {
  return (
    <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="h-52 bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-0.5 w-8 rounded-full mb-3 bg-gray-300 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" style={{ width: '70%' }} />
        <div className="h-3 bg-gray-200 rounded animate-pulse mb-4" style={{ width: '50%' }} />
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <div className="h-3 bg-gray-200 rounded animate-pulse" style={{ width: '40%' }} />
          <div className="h-3 bg-gray-200 rounded animate-pulse" style={{ width: '40%' }} />
        </div>
      </div>
    </div>
  )
}

export function AdminDoctorRowSkeleton() {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '120px' }} />
        </div>
      </td>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '100px' }} />
      </td>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '60px' }} />
      </td>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '50px' }} />
      </td>
      <td className="px-5 py-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" style={{ width: '40px' }} />
      </td>
      <td className="px-5 py-3">
        <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
      </td>
      <td className="px-5 py-3">
        <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
      </td>
    </tr>
  )
}
