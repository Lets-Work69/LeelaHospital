import React, { useEffect, useState } from 'react'
import { X, CheckCircle, ArrowRight } from 'lucide-react'

const serviceDetails = {
  'General Medicine\n& Diabetology': {
    overview: 'Our General Medicine & Diabetology department provides comprehensive care for a wide range of medical conditions including diabetes, hypertension, infections, and lifestyle diseases. Our experienced physicians offer accurate diagnosis and personalized treatment plans.',
    treatments: ['Diabetes Management (Type 1 & 2)', 'Hypertension Control', 'Thyroid Disorders', 'Fever & Infections', 'Preventive Health Checkups', 'Lifestyle Disease Management'],
    why: 'Expert physicians with decades of experience, advanced diagnostic tools, and a patient-first approach ensure you receive the best medical care.',
  },
  'Obstetrics &\nGynecology': {
    overview: "Our Obstetrics & Gynecology department offers complete women's healthcare — from prenatal care and safe deliveries to treatment of gynecological conditions. We provide compassionate, expert care at every stage of a woman's life.",
    treatments: ['Normal & Cesarean Deliveries', 'High-Risk Pregnancy Care', 'Laparoscopic Gynecology', 'PCOS & Hormonal Disorders', 'Infertility Evaluation', 'Menstrual Disorders'],
    why: "Dedicated women's health specialists, state-of-the-art labor rooms, and 24/7 emergency obstetric care ensure safe outcomes for mother and child.",
  },
  'Paediatrics\n& Neonatology': {
    overview: 'Our Paediatrics & Neonatology department provides specialized care for newborns, infants, children, and adolescents. From routine checkups to critical neonatal care, our team ensures every child gets the best start in life.',
    treatments: ['Newborn & NICU Care', 'Childhood Vaccinations', 'Growth & Development Monitoring', 'Pediatric Infections', 'Nutritional Counseling', 'Adolescent Health'],
    why: 'Child-friendly environment, experienced pediatricians, and a dedicated NICU with advanced life support equipment.',
  },
  'Orthopedics': {
    overview: 'Our Orthopedics department specializes in the diagnosis and treatment of bone, joint, muscle, and spine conditions. From sports injuries to joint replacements, we restore mobility and improve quality of life.',
    treatments: ['Joint Replacement Surgery', 'Spine Surgery', 'Sports Injury Treatment', 'Fracture Management', 'Arthroscopy', 'Physiotherapy & Rehabilitation'],
    why: 'Experienced orthopedic surgeons, minimally invasive techniques, and comprehensive rehabilitation programs for faster recovery.',
  },
  'General Surgery': {
    overview: 'Our General Surgery department handles a wide range of surgical conditions with precision and care. We specialize in minimally invasive laparoscopic procedures that ensure faster recovery and minimal scarring.',
    treatments: ['Laparoscopic Surgery', 'Appendectomy', 'Hernia Repair', 'Gallbladder Surgery', 'Thyroid Surgery', 'Colorectal Surgery'],
    why: 'Skilled surgeons with expertise in advanced laparoscopic techniques, modern operation theaters, and dedicated post-operative care.',
  },
  'Urology': {
    overview: 'Our Urology department provides expert care for urinary tract and male reproductive system disorders. We offer both medical and surgical treatments using the latest minimally invasive techniques.',
    treatments: ['Kidney Stone Treatment', 'Prostate Disorders', 'Urinary Incontinence', 'Bladder Conditions', 'Urological Cancers', 'Laparoscopic Urology'],
    why: 'Advanced endoscopic and laparoscopic equipment, experienced urologists, and comprehensive care from diagnosis to recovery.',
  },
  'Cardiology': {
    overview: 'Our Cardiology department offers world-class heart care with advanced diagnostics and interventional procedures. Our cardiologists are dedicated to preventing, diagnosing, and treating all forms of heart disease.',
    treatments: ['ECG & Echocardiography', 'Angiography & Angioplasty', 'Heart Failure Management', 'Hypertension Treatment', 'Cardiac Rehabilitation', 'Preventive Cardiology'],
    why: 'State-of-the-art cardiac catheterization lab, experienced interventional cardiologists, and 24/7 cardiac emergency services.',
  },
  'Dermatology': {
    overview: 'Our Dermatology department provides expert care for all skin, hair, and nail conditions. From medical dermatology to cosmetic procedures, we help you achieve healthy, glowing skin.',
    treatments: ['Acne & Scar Treatment', 'Psoriasis & Eczema', 'Hair Loss Treatment', 'Skin Allergy Management', 'Mole & Wart Removal', 'Cosmetic Dermatology'],
    why: 'Expert dermatologists, advanced laser and light therapy equipment, and personalized skincare plans for lasting results.',
  },
  'ENT': {
    overview: 'Our ENT department provides comprehensive care for disorders of the ear, nose, and throat. We use advanced diagnostic and surgical techniques to treat a wide range of ENT conditions.',
    treatments: ['Hearing Loss & Tinnitus', 'Sinusitis Treatment', 'Tonsil & Adenoid Surgery', 'Voice & Throat Disorders', 'Nasal Polyps', 'Ear Infections'],
    why: 'Experienced ENT specialists, advanced endoscopic equipment, and minimally invasive surgical techniques for better outcomes.',
  },
  'Oncology': {
    overview: 'Our Oncology department provides comprehensive cancer care with a multidisciplinary approach. From early detection to advanced treatment, we are committed to fighting cancer with compassion and expertise.',
    treatments: ['Cancer Diagnosis & Staging', 'Chemotherapy', 'Radiation Therapy', 'Surgical Oncology', 'Palliative Care', 'Cancer Screening Programs'],
    why: 'Multidisciplinary cancer care team, advanced diagnostic imaging, and personalized treatment protocols for the best possible outcomes.',
  },
  'Neurology': {
    overview: 'Our Neurology department specializes in diagnosing and treating disorders of the brain, spinal cord, and nervous system. Our neurologists use cutting-edge technology to provide accurate diagnosis and effective treatment.',
    treatments: ["Stroke Management", "Epilepsy Treatment", "Migraine & Headache", "Parkinson's Disease", "Multiple Sclerosis", "Neuropathy"],
    why: 'Advanced neuroimaging, experienced neurologists, and a dedicated stroke unit with rapid response protocols.',
  },
  'Nephrology': {
    overview: 'Our Nephrology department provides expert care for kidney diseases and disorders. From early-stage kidney disease to dialysis and transplant support, we offer comprehensive renal care.',
    treatments: ['Chronic Kidney Disease', 'Dialysis Services', 'Kidney Stone Management', 'Hypertensive Nephropathy', 'Glomerulonephritis', 'Kidney Transplant Support'],
    why: 'State-of-the-art dialysis unit, experienced nephrologists, and a holistic approach to kidney health and disease management.',
  },
  'Ophthalmology': {
    overview: 'Our Ophthalmology department offers complete eye care services from routine vision checkups to complex surgical procedures. We are committed to preserving and restoring your vision.',
    treatments: ['Cataract Surgery', 'LASIK & Refractive Surgery', 'Glaucoma Treatment', 'Retinal Disorders', 'Diabetic Eye Care', 'Pediatric Ophthalmology'],
    why: 'Advanced surgical equipment, experienced eye surgeons, and comprehensive vision care for all age groups.',
  },
  'Laparoscopy &\nEndoscopy': {
    overview: 'Our Laparoscopy & Endoscopy department specializes in minimally invasive diagnostic and surgical procedures. These techniques offer faster recovery, less pain, and minimal scarring.',
    treatments: ['Diagnostic Laparoscopy', 'Upper GI Endoscopy', 'Colonoscopy', 'Laparoscopic Cholecystectomy', 'Endoscopic Biopsy', 'ERCP'],
    why: 'Advanced laparoscopic towers and endoscopy suites, skilled surgeons, and minimal hospital stay with faster return to normal life.',
  },
  'Psychiatry': {
    overview: 'Our Psychiatry department provides compassionate mental health care in a safe, confidential environment. We treat a wide range of mental health conditions with evidence-based therapies and medication management.',
    treatments: ['Depression & Anxiety', 'Bipolar Disorder', 'Schizophrenia', 'OCD Treatment', 'Addiction Counseling', 'Child & Adolescent Psychiatry'],
    why: 'Experienced psychiatrists and psychologists, evidence-based treatment protocols, and a supportive environment for mental wellness.',
  },
}

export default function ServiceModal({ service, onClose }) {
  const [closing, setClosing] = useState(false)
  const details = serviceDetails[service?.title] || null

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => onClose(), 400)
  }

  if (!service || !details) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}>

      {/* Backdrop */}
      <div className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.65)',
          animation: closing ? 'fadeOut 0.4s ease forwards' : 'fadeIn 0.4s ease forwards',
        }} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        style={{
          animation: closing
            ? 'modalClose 0.4s cubic-bezier(0.4,0,0.2,1) forwards'
            : 'modalOpen 0.5s cubic-bezier(0.22,1,0.36,1) forwards',
        }}>

        {/* Header */}
        <div className="sticky top-0 bg-white px-8 pt-8 pb-4 border-b border-gray-100 z-10"
          style={{ borderRadius: '24px 24px 0 0' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0969b1, #17ae95)' }}>
                {service.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {service.title.replace('\n', ' ')}
                </h2>
                <p className="text-sm font-medium mt-0.5" style={{ color: '#17ae95' }}>Leela Hospital</p>
              </div>
            </div>
            <button onClick={handleClose}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: '#0969b1' }}>Overview</h3>
            <p className="text-gray-600 leading-relaxed">{details.overview}</p>
          </div>

          <div>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-3" style={{ color: '#0969b1' }}>Treatments We Provide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {details.treatments.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#17ae95' }} />
                  <span className="text-gray-700 text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ background: 'linear-gradient(135deg, #e6f3fb, #e6faf6)' }}>
            <h3 className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: '#0969b1' }}>Why Choose Leela Hospital</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{details.why}</p>
          </div>

          <a href="#appointment" onClick={handleClose}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
            Book an Appointment <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes modalOpen {
          0%   { opacity: 0; transform: scale(0.85) translateY(30px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes modalClose {
          0%   { opacity: 1; transform: scale(1) translateY(0); }
          100% { opacity: 0; transform: scale(0.85) translateY(30px); }
        }
      `}</style>
    </div>
  )
}
