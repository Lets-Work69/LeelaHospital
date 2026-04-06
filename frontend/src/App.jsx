import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Doctors from './components/Doctors'
import Testimonials from './components/Testimonials'
import Appointment from './components/Appointment'
import Footer from './components/Footer'
import ServiceDetail from './pages/ServiceDetail'
import Specialities from './pages/Specialities'

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Doctors />
      <Testimonials />
      <Appointment />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/specialities/:slug" element={<ServiceDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
