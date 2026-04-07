import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Intro from './components/Intro'
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
import About from './pages/About'
import DoctorsPage from './pages/DoctorsPage'

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
  const [introDone, setIntroDone] = useState(false)

  return (
    <BrowserRouter>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/specialities/:slug" element={<ServiceDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<DoctorsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
