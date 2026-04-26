import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Plus, Trash2, Loader2, CheckCircle, Stethoscope, Clock, Users, MoreVertical, Edit2, EyeOff, Eye, AlertTriangle, LayoutGrid, List, GripVertical } from 'lucide-react';
import Navbar from '../components/Navbar';
const url = import.meta.env.VITE_API_URL;

function ConfirmDialog({ message, onConfirm, onCancel, confirmLabel = 'Confirm', danger = false }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100]">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-6 animate-fade-in">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${danger ? 'bg-red-100' : 'bg-yellow-100'}`}>
          <AlertTriangle className={`w-6 h-6 ${danger ? 'text-red-500' : 'text-yellow-500'}`} />
        </div>
        <p className="text-center text-gray-800 font-medium mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
            Cancel
          </button>
          <button onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium text-sm transition-colors ${danger ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', specialty: '', experience: '', patients: '', rating: '', profileImage: '' });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editPhotoPreview, setEditPhotoPreview] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [viewMode, setViewMode] = useState('card'); 
  const dragItem = useRef(null);
  const dragOver = useRef(null);

  const showConfirm = (message, onConfirm, danger = false, confirmLabel = 'Confirm') => {
    setConfirmDialog({ message, onConfirm, danger, confirmLabel });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, profileImage: reader.result }));
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!localStorage.getItem('token') || user.role !== 'superadmin') {
      navigate('/login');
      return;
    }
    fetchDoctors(1, false);
    fetchAppointments();
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'superadmin') return;
    const onNewBooking = () => fetchAppointments();
    window.addEventListener('leela:new-appointment', onNewBooking);
    return () => window.removeEventListener('leela:new-appointment', onNewBooking);
  }, []);

  useEffect(() => {
    const close = () => setOpenMenuId(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchDoctors(nextPage, true);
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, page]);

  const fetchDoctors = async (pageNum = 1, append = false) => {
    const cacheKey = `admin_doctors_page_${pageNum}`;
    const cached = sessionStorage.getItem(cacheKey);
    
    if (cached && !append) {
      const cachedData = JSON.parse(cached);
      setDoctors(cachedData.doctors);
      setHasMore(cachedData.page < cachedData.totalPages);
      setLoading(false);
      return;
    }
    
    if (append) setLoadingMore(true);
    else setLoading(true);
    
    try {
      const res = await fetch(`${url}/api/doctors/all?page=${pageNum}&limit=9`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) {
        if (append) {
          setDoctors(prev => [...prev, ...data.doctors]);
        } else {
          setDoctors(data.doctors);
        }
        setHasMore(data.page < data.totalPages);
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch doctors:', err);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${url}/api/appointments`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data.success) setAppointments(data.appointments);
    } catch (err) {
      if (import.meta.env.DEV) {
        console.error('Failed to fetch appointments:', err);
      }
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Format the data before sending
    const formattedData = {
      ...formData,
      // Add "Dr." prefix if not present
      name: formData.name.trim().startsWith('Dr.') || formData.name.trim().startsWith('Dr ') 
        ? formData.name.trim() 
        : `Dr. ${formData.name.trim()}`,
      // Add "Yrs" suffix if not present (only if it's a number)
      experience: formData.experience.trim().match(/^\d+$/) 
        ? `${formData.experience.trim()} Yrs` 
        : formData.experience.trim(),
      // Add "K" suffix if not present (only if it's a number)
      patients: (() => {
        const val = formData.patients.trim();
        // If it's just a number, add K
        if (val.match(/^\d+(\.\d+)?$/)) {
          return `${val}`;
        }
        // If it already has K, make sure there's only one K
        if (val.match(/^\d+(\.\d+)?[Kk]+$/)) {
          return val.replace(/[Kk]+$/, 'K');
        }
        return val;
      })()
    };
    
    try {
      const res = await fetch(`${url}/api/doctors`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(formattedData)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setFormData({ name: '', specialty: '', experience: '', patients: '', rating: '', profileImage: '' });
        setPhotoPreview(null);
        // Clear cache and reset pagination
        sessionStorage.clear();
        setPage(1);
        setHasMore(true);
        fetchDoctors(1, false);
      } else {
        alert(data.message || 'Failed to add doctor');
      }
    } catch {
      alert('Error adding doctor');
    } finally {
      setLoading(false);
    }
  };

  const handlePermanentDelete = async (id) => {
    showConfirm(
      'Permanently delete this doctor? This cannot be undone.',
      async () => {
        setConfirmDialog(null);
        try {
          const res = await fetch(`${url}/api/doctors/${id}/permanent`, { method: 'DELETE', headers: getAuthHeaders() });
          const data = await res.json();
          if (data.success) {
            // Clear cache and reset pagination
            sessionStorage.clear();
            setPage(1);
            setHasMore(true);
            fetchDoctors(1, false);
          }
        } catch { alert('Error deleting doctor'); }
      },
      true, 'Delete'
    );
  };

  const handleToggleActive = async (doctor) => {
    try {
      const res = await fetch(`${url}/api/doctors/${doctor._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ isActive: !doctor.isActive })
      });
      const data = await res.json();
      if (data.success) {
        // Clear cache and reset pagination
        sessionStorage.clear();
        setPage(1);
        setHasMore(true);
        fetchDoctors(1, false);
      }
    } catch {
      alert('Error updating doctor');
    }
    setOpenMenuId(null);
  };

  const openEditModal = (doctor) => {
    setEditingDoctor(doctor);
    setEditFormData({ name: doctor.name, specialty: doctor.specialty, experience: doctor.experience, patients: doctor.patients, rating: doctor.rating });
    setEditPhotoPreview(doctor.profileImage || null);
    setOpenMenuId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Format the data before sending
    const formattedData = {
      ...editFormData,
      // Add "Dr." prefix if not present
      name: editFormData.name.trim().startsWith('Dr.') || editFormData.name.trim().startsWith('Dr ') 
        ? editFormData.name.trim() 
        : `Dr. ${editFormData.name.trim()}`,
      // Add "Yrs" suffix if not present (only if it's a number)
      experience: editFormData.experience.trim().match(/^\d+$/) 
        ? `${editFormData.experience.trim()} Yrs` 
        : editFormData.experience.trim(),
      // Add "K" suffix if not present (only if it's a number)
      patients: (() => {
        const val = editFormData.patients.trim();
        // If it's just a number, add K
        if (val.match(/^\d+(\.\d+)?$/)) {
          return `${val}K`;
        }
        // If it already has K, make sure there's only one K
        if (val.match(/^\d+(\.\d+)?[Kk]+$/)) {
          return val.replace(/[Kk]+$/, 'K');
        }
        return val;
      })(),
      profileImage: editPhotoPreview || editingDoctor.profileImage
    };
    
    try {
      const res = await fetch(`${url}/api/doctors/${editingDoctor._id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(formattedData)
      });
      const data = await res.json();
      if (data.success) { 
        setEditingDoctor(null); 
        // Clear cache and reset pagination
        sessionStorage.clear();
        setPage(1);
        setHasMore(true);
        fetchDoctors(1, false);
      }
      else alert(data.message || 'Failed to update');
    } catch {
      alert('Error updating doctor');
    }
  };

  const handleEditPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setEditPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleDragStart = (index) => { dragItem.current = index; };
  const handleDragEnter = (index) => { dragOver.current = index; };
  const handleDragEnd = async () => {
    const from = dragItem.current;
    const to = dragOver.current;
    if (from === null || to === null || from === to) return;
    const reordered = [...doctors];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    setDoctors(reordered);
    dragItem.current = null;
    dragOver.current = null;
    
    try {
      await fetch(`${url}/api/doctors/reorder`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ orderedIds: reordered.map(d => d._id) })
      });
    } catch (err) { 
      if (import.meta.env.DEV) {
        console.error('Failed to reorder doctors:', err);
      }
    }
  };

  const stats = [
    { label: 'Total Doctors', value: doctors.length, icon: Stethoscope, color: 'bg-blue-500' },
    { label: 'Active Doctors', value: doctors.filter(d => d.isActive).length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Total Appointments', value: appointments.length, icon: Calendar, color: 'bg-purple-500' },
    { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, icon: Calendar, color: 'bg-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8">

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>

<div className="bg-white rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Manage Doctors</h2>
            <div className="flex items-center gap-2">
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button onClick={() => setViewMode('card')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  title="Card view">
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                  title="List view">
                  <List className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <Plus className="w-4 h-4" /> Add Doctor
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center py-16 text-gray-400">No doctors added yet</div>
          ) : (
            viewMode === 'card' ? (
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {doctors.map((doctor, index) => (
                <div key={doctor._id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                  onDragOver={e => e.preventDefault()}
                  className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing active:opacity-60 active:scale-95">
                  
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${doctor.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {doctor.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

<div className="absolute top-3 left-3 z-20">
                    <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === doctor._id ? null : doctor._id); }}
                      className="p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    {openMenuId === doctor._id && (
                      <div className="absolute top-9 left-0 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-36 z-50">
                        <button onClick={() => openEditModal(doctor)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <Edit2 className="w-3.5 h-3.5 text-blue-500" /> Edit
                        </button>
                        <button onClick={() => handleToggleActive(doctor)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          {doctor.isActive
                            ? <><EyeOff className="w-3.5 h-3.5 text-yellow-500" /> Set Inactive</>
                            : <><Eye className="w-3.5 h-3.5 text-green-500" /> Set Active</>}
                        </button>
                        <div className="border-t border-gray-100 my-1" />
                        <button onClick={() => { setOpenMenuId(null); handlePermanentDelete(doctor._id); }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    )}
                  </div>

<div className="h-52 bg-gradient-to-br from-slate-100 to-blue-50 overflow-hidden">
                    {doctor.profileImage ? (
                      <img src={doctor.profileImage} alt={doctor.name}
                        className="w-full h-full object-cover object-top" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl font-black text-blue-200">{doctor.name?.charAt(0)}</span>
                      </div>
                    )}
                  </div>

<div className="p-4">
                    <div className="h-0.5 w-8 rounded-full mb-3" style={{ background: 'linear-gradient(90deg, #0969b1, #17ae95)' }} />
                    <h3 className="font-bold text-gray-900 text-sm leading-tight">{doctor.name}</h3>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: '#0969b1' }}>{doctor.specialty}</p>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Clock className="w-3 h-3 text-blue-500" />
                        </div>
                        <span className="font-semibold text-gray-700">{doctor.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <div className="w-6 h-6 rounded-lg bg-teal-50 flex items-center justify-center">
                          <Users className="w-3 h-3 text-teal-500" />
                        </div>
                        <span className="font-semibold text-gray-700">{doctor.patients}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            ) : (
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['Doctor', 'Specialty', 'Experience', 'Patients', 'Rating', 'Status', 'Actions'].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {doctors.map((doctor, index) => (
                    <tr key={doctor._id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={e => e.preventDefault()}
                      className="hover:bg-gray-50 transition-colors cursor-grab active:opacity-60">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <GripVertical className="w-4 h-4 text-gray-300 flex-shrink-0" />
                          <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-50 flex-shrink-0">
                            {doctor.profileImage
                              ? <img src={doctor.profileImage} alt={doctor.name} className="w-full h-full object-cover object-top" />
                              : <span className="w-full h-full flex items-center justify-center text-blue-300 font-bold text-sm">{doctor.name?.charAt(0)}</span>}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{doctor.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600">{doctor.specialty}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{doctor.experience}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{doctor.patients}</td>
                      <td className="px-5 py-3 text-sm text-gray-600">{doctor.rating}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${doctor.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {doctor.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="relative">
                          <button onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === doctor._id ? null : doctor._id); }}
                            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4 text-gray-500" />
                          </button>
                          {openMenuId === doctor._id && (
                            <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl border border-gray-100 py-1 w-36 z-30">
                              <button onClick={() => openEditModal(doctor)}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                <Edit2 className="w-3.5 h-3.5 text-blue-500" /> Edit
                              </button>
                              <button onClick={() => handleToggleActive(doctor)}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                {doctor.isActive
                                  ? <><EyeOff className="w-3.5 h-3.5 text-yellow-500" /> Set Inactive</>
                                  : <><Eye className="w-3.5 h-3.5 text-green-500" /> Set Active</>}
                              </button>
                              <div className="border-t border-gray-100 my-1" />
                              <button onClick={() => { setOpenMenuId(null); handlePermanentDelete(doctor._id); }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                <Trash2 className="w-3.5 h-3.5" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )
          )}
          
          {/* Infinite scroll trigger and loading indicator */}
          {!loading && hasMore && <div ref={observerRef} className="h-10" />}
          {loadingMore && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-sm text-gray-500">Loading more doctors...</span>
            </div>
          )}
          {!loading && !hasMore && doctors.length > 0 && (
            <div className="text-center py-6 text-gray-400 text-sm">
              All doctors loaded
            </div>
          )}
        </div>
      </div>

{showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Doctor</h3>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text', required: true, placeholder: 'John Smith (Dr. will be added automatically)' },
                { label: 'Specialty', key: 'specialty', type: 'text', required: true, placeholder: 'e.g. General Physician' },
                { label: 'Experience', key: 'experience', type: 'text', required: true, placeholder: 'Just enter number (e.g. 17)' },
                { label: 'Patients Treated', key: 'patients', type: 'text', required: true, placeholder: 'Just enter number (e.g. 2.0)' },
                { label: 'Rating', key: 'rating', type: 'text', required: false, placeholder: 'e.g. 4.8' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input type={f.type} value={formData[f.key]} required={f.required}
                    placeholder={f.placeholder}
                    onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              ))}

<div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Photo</label>
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-gray-50 hover:bg-blue-50"
                  style={{ minHeight: photoPreview ? 'auto' : '100px' }}>
                  {photoPreview ? (
                    <div className="relative w-full">
                      <img src={photoPreview} alt="Preview" className="w-full h-40 object-cover object-top rounded-lg" />
                      <span className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded">Change</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-6 text-gray-400">
                      <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm">Click to upload photo</span>
                      <span className="text-xs mt-1">webp, JPG up to 2MB</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => { setShowAddModal(false); setPhotoPreview(null); }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
                  {loading ? 'Adding...' : 'Add Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {confirmDialog && (
        <ConfirmDialog
          message={confirmDialog.message}
          danger={confirmDialog.danger}
          confirmLabel={confirmDialog.confirmLabel}
          onConfirm={confirmDialog.onConfirm}
          onCancel={() => setConfirmDialog(null)}
        />
      )}

{editingDoctor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setEditingDoctor(null)}>
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Doctor</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'John Smith (Dr. will be added automatically)' },
                { label: 'Specialty', key: 'specialty', placeholder: 'e.g. General Physician' },
                { label: 'Experience', key: 'experience', placeholder: 'Just enter number (e.g. 17)' },
                { label: 'Patients Treated', key: 'patients', placeholder: 'Just enter number (e.g. 2.0)' },
                { label: 'Rating', key: 'rating', placeholder: 'e.g. 4.8' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                  <input type="text" value={editFormData[f.key] || ''} placeholder={f.placeholder}
                    onChange={e => setEditFormData({ ...editFormData, [f.key]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Photo</label>
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-gray-50">
                  {editPhotoPreview ? (
                    <div className="relative w-full">
                      <img src={editPhotoPreview} alt="Preview" className="w-full h-40 object-cover object-top rounded-lg" />
                      <span className="absolute bottom-2 right-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded">Change</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center py-6 text-gray-400">
                      <span className="text-sm">Click to upload new photo</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleEditPhoto} />
                </label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditingDoctor(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
